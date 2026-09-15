-- V3 private journal. Run once in the Supabase SQL editor or with db push.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  preferred_locale text check (preferred_locale in ('zh', 'en', 'ja')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy profiles_owner on public.profiles for all to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
grant select, insert on public.profiles to authenticated;
grant update (preferred_locale) on public.profiles to authenticated;

create function public.valid_rating(value jsonb) returns boolean
language sql immutable set search_path = '' as $$
  select jsonb_typeof(value) = 'object' and not exists (
    select 1 from jsonb_each(value) e where e.key not in ('overall','fun','comfort','doAgain')
    or e.value not in ('1'::jsonb,'2'::jsonb,'3'::jsonb,'4'::jsonb,'5'::jsonb)
  );
$$;

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  source_key text check (length(source_key) <= 512),
  activity_snapshot jsonb not null check (coalesce((
    jsonb_typeof(activity_snapshot) = 'object' and
    jsonb_typeof(activity_snapshot->'title') = 'string' and
    length(activity_snapshot->>'title') between 1 and 300
  ), false)),
  occurred_at timestamptz not null,
  rating jsonb not null default '{}'::jsonb check (public.valid_rating(rating)),
  moods text[] not null default '{}' check (cardinality(moods) <= 30),
  note text not null default '' check (length(note) <= 20000),
  memory_prompt_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, source_key),
  unique (id, user_id)
);
create index memories_owner_date on public.memories(user_id, occurred_at desc);
alter table public.memories enable row level security;
create policy memories_owner on public.memories for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
revoke all on public.memories from anon, authenticated;
grant select, insert, delete on public.memories to authenticated;
grant update (occurred_at, rating, moods, note, memory_prompt_completed) on public.memories to authenticated;

create function public.touch_memory() returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
create trigger touch_memory before update on public.memories for each row execute function public.touch_memory();

create table public.memory_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  memory_id uuid not null,
  storage_path text not null unique,
  sort_order integer not null check (sort_order between 0 and 8),
  width integer check (width between 1 and 2400),
  height integer check (height between 1 and 2400),
  ready boolean not null default false,
  created_at timestamptz not null default now(),
  foreign key (memory_id, user_id) references public.memories(id, user_id),
  unique (memory_id, sort_order),
  check (storage_path = 'users/' || user_id::text || '/memories/' || memory_id::text || '/' || id::text || '.jpg')
);
alter table public.memory_images enable row level security;
create policy images_owner on public.memory_images for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
revoke all on public.memory_images from anon, authenticated;
grant select, insert, delete on public.memory_images to authenticated;
grant update (ready) on public.memory_images to authenticated;

create function public.reserve_photo_slot() returns trigger language plpgsql set search_path = '' as $$
begin
  perform 1 from public.memories where id = new.memory_id and user_id = auth.uid() for update;
  if not found then raise exception 'memory_unavailable'; end if;
  select slot into new.sort_order from generate_series(0,8) slot
    where not exists (select 1 from public.memory_images i where i.memory_id = new.memory_id and i.sort_order = slot)
    order by slot limit 1;
  if new.sort_order is null then raise exception 'photo_limit'; end if;
  return new;
end;
$$;
create trigger reserve_photo_slot before insert on public.memory_images for each row execute function public.reserve_photo_slot();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('memory-photos', 'memory-photos', false, 6291456, array['image/jpeg']);

create policy journal_photo_read on storage.objects for select to authenticated using (
  bucket_id = 'memory-photos' and exists (
    select 1 from public.memory_images i where i.storage_path = name and i.user_id = (select auth.uid())
  )
);
create policy journal_photo_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'memory-photos' and exists (
    select 1 from public.memory_images i where i.storage_path = name and not i.ready and i.user_id = (select auth.uid())
  )
);
create policy journal_photo_delete on storage.objects for delete to authenticated using (
  bucket_id = 'memory-photos' and exists (
    select 1 from public.memory_images i where i.storage_path = name and i.user_id = (select auth.uid())
  )
);

-- Never remove metadata while an object still exists. Storage API deletion comes first.
create function public.guard_photo_delete() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from storage.objects where bucket_id = 'memory-photos' and name = old.storage_path) then
    raise exception 'remove_photo_file_first';
  end if;
  return old;
end;
$$;
revoke all on function public.guard_photo_delete() from public;
create trigger guard_photo_delete before delete on public.memory_images for each row execute function public.guard_photo_delete();
