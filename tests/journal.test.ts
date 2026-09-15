import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { validatePhoto, MAX_UPLOAD_BYTES } from "../src/lib/services/photos";
import { legacyInput } from "../src/lib/services/memories";
import { usernameToAuthEmail } from "../src/lib/services/auth";
import {
  getImportCandidates,
  finishJournalAdventure,
  loadSaveData,
  startAdventure,
  startNewDiscoveryRound,
} from "../src/lib/storage";

test("temporary username auth mapping is normalized and constrained", () => {
  assert.equal(
    usernameToAuthEmail("  Mia.Example "),
    "mia.example@auth.mydate.local",
  );
  assert.throws(() => usernameToAuthEmail("ab"), /invalid_username/);
  assert.throws(() => usernameToAuthEmail("name with spaces"), /invalid_username/);
});

test("database ownership, nine slots, storage privacy, snapshots and retry keys", async () => {
  const db = new PGlite();
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth; create schema storage;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
    alter table storage.objects enable row level security;
    grant usage on schema public,auth,storage to authenticated,anon;
    grant select,insert,delete on storage.objects to authenticated;
  `);
  await db.exec(
    await readFile(
      "supabase/migrations/202609140001_memory_journal.sql",
      "utf8",
    ),
  );
  const alice = "11111111-1111-4111-8111-111111111111";
  const bob = "22222222-2222-4222-8222-222222222222";
  await db.query("insert into auth.users values ($1),($2)", [alice, bob]);
  await db.exec(
    `set role authenticated; set request.jwt.claim.sub = '${alice}';`,
  );
  const created = await db.query<{ id: string }>(
    "insert into public.memories(activity_snapshot,occurred_at,source_key,moods) values ($1,now(),'legacy:one',$2) returning id",
    [
      {
        title: "Original title",
        identity: { source: "builtin", id: "night-walk" },
      },
      [" 今天很好玩 "],
    ],
  );
  const memoryId = created.rows[0].id;
  await assert.rejects(
    db.query(
      "insert into public.memories(activity_snapshot,occurred_at,source_key) values ($1,now(),'legacy:one')",
      [{ title: "Duplicate" }],
    ),
    /unique/i,
  );
  await assert.rejects(
    db.query(
      "update public.memories set activity_snapshot = $1 where id = $2",
      [{ title: "Changed" }, memoryId],
    ),
    /permission/i,
  );
  await assert.rejects(
    db.query("update public.memories set rating = $1 where id = $2", [
      { fun: 6 },
      memoryId,
    ]),
    /check/i,
  );
  await db.query(
    "update public.memories set note = $1, rating = $2 where id = $3",
    [" 私人日记 ", { fun: 5 }, memoryId],
  );
  const photos: { id: string; path: string }[] = [];
  for (let n = 0; n < 9; n++) {
    const id = crypto.randomUUID();
    const path = `users/${alice}/memories/${memoryId}/${id}.jpg`;
    await db.query(
      "insert into public.memory_images(id,memory_id,storage_path) values ($1,$2,$3)",
      [id, memoryId, path],
    );
    photos.push({ id, path });
  }
  const tenth = crypto.randomUUID();
  await assert.rejects(
    db.query(
      "insert into public.memory_images(id,memory_id,storage_path) values ($1,$2,$3)",
      [tenth, memoryId, `users/${alice}/memories/${memoryId}/${tenth}.jpg`],
    ),
    /photo_limit/,
  );
  await db.query(
    "insert into storage.objects(bucket_id,name) values ('memory-photos',$1)",
    [photos[0].path],
  );
  await assert.rejects(
    db.query("delete from public.memory_images where id=$1", [photos[0].id]),
    /remove_photo_file_first/,
  );
  await assert.rejects(
    db.query("delete from public.memories where id=$1", [memoryId]),
    /foreign key/,
  );
  await db.exec(`set request.jwt.claim.sub = '${bob}';`);
  assert.equal(
    (await db.query("select * from public.memories")).rows.length,
    0,
  );
  assert.equal(
    (await db.query("select * from public.memory_images")).rows.length,
    0,
  );
  assert.equal(
    (await db.query("select * from storage.objects")).rows.length,
    0,
  );
  await assert.rejects(
    db.query(
      "insert into public.memories(user_id,activity_snapshot,occurred_at) values ($1,$2,now())",
      [alice, { title: "Hijack" }],
    ),
    /row-level security/,
  );
  await assert.rejects(
    db.query(
      "insert into storage.objects(bucket_id,name) values ('memory-photos',$1)",
      [photos[0].path],
    ),
    /row-level security/,
  );
  await assert.rejects(
    db.query(
      "insert into public.memory_images(memory_id,storage_path) values ($1,'bad')",
      [memoryId],
    ),
    /memory_unavailable/,
  );
  await db.exec(`set request.jwt.claim.sub = '${alice}';`);
  const original = (
    await db.query<{ moods: string[]; note: string }>(
      "select moods,note from public.memories",
    )
  ).rows[0];
  assert.deepEqual(original.moods, [" 今天很好玩 "]);
  assert.equal(original.note, " 私人日记 ");
  await db.query("delete from storage.objects where name=$1", [photos[0].path]);
  await db.query("delete from public.memory_images where id=$1", [
    photos[0].id,
  ]);
  await db.query(
    "insert into public.memory_images(id,memory_id,storage_path) values ($1,$2,$3)",
    [tenth, memoryId, `users/${alice}/memories/${memoryId}/${tenth}.jpg`],
  );
  await db.query("delete from public.memory_images where memory_id=$1", [
    memoryId,
  ]);
  await db.query("delete from public.memories where id=$1", [memoryId]);
  await db.exec("reset role; set role anon;");
  await assert.rejects(db.query("select * from public.memories"), /permission/);
  await db.close();
});

test("upload validation accepts iPhone HEIC explicitly and rejects large or unsafe files", () => {
  for (const type of [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ])
    assert.doesNotThrow(() =>
      validatePhoto({ size: 100, name: "photo", type }),
    );
  assert.doesNotThrow(() =>
    validatePhoto({ size: 100, name: "IMG_123.HEIC", type: "" }),
  );
  assert.throws(
    () =>
      validatePhoto({
        size: MAX_UPLOAD_BYTES + 1,
        name: "a.jpg",
        type: "image/jpeg",
      }),
    /photo_large/,
  );
  assert.throws(
    () => validatePhoto({ size: 100, name: "a.svg", type: "image/svg+xml" }),
    /photo_format/,
  );
});

test("partial legacy recovery and discovery reset never remove original history", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
  Object.defineProperty(globalThis, "window", {
    value: { localStorage: storage },
    configurable: true,
  });
  const memory = {
    id: "legacy-one",
    activitySnapshot: {
      identity: { source: "builtin" as const, id: "walk" },
      title: "A past title",
    },
    completedAt: "2025-01-01T12:00:00Z",
    memoryPromptCompleted: false,
  };
  const baseline = {
    version: 3,
    savedDateIds: [],
    activeAdventures: [],
    memories: [memory],
    discoveryRound: { completedActivityKeys: [] },
  };
  storage.setItem(
    "mydate.save.v3",
    JSON.stringify({ ...baseline, memories: [memory, { bad: true }] }),
  );
  assert.equal(getImportCandidates().invalid, 1);
  assert.equal(getImportCandidates().memories.length, 1);
  assert.equal(
    JSON.parse(storage.getItem("mydate.save.v3")!).memories.length,
    2,
  );
  assert.equal(legacyInput({ ...memory, completedAt: "bad" }), undefined);
  storage.setItem("mydate.save.v3", JSON.stringify(baseline));
  const adventure = startAdventure(memory.activitySnapshot);
  finishJournalAdventure(adventure.id);
  assert.deepEqual(loadSaveData().discoveryRound.completedActivityKeys, [
    "builtin:walk",
  ]);
  assert.equal(loadSaveData().memories.length, 1);
  startNewDiscoveryRound();
  assert.equal(loadSaveData().memories.length, 1);
  assert.equal(loadSaveData().discoveryRound.completedActivityKeys.length, 0);
});
