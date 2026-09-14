# V3 Memory Journal setup

This implementation follows the current V3 Memory Journal architecture in `docs/architecture.md`.

## Create the backend

1. Create a Supabase project and retain its database password securely.
2. Open **SQL Editor** and run `supabase/migrations/202609140001_memory_journal.sql` once. Alternatively, link the Supabase CLI project and run `supabase db push`.
3. Verify the `memories`, `memory_images`, and `profiles` tables have RLS enabled. Verify the `memory-photos` bucket is **private**, accepts JPEG, and limits files to 6 MiB. Do not add permissive policies.
4. In Auth, enable email/password authentication and temporarily disable email confirmation: the app presents username/password, while usernames are stored internally as addresses under `auth.mydate.local` and cannot receive mail. Set the Site URL to your application URL and configure the localhost URL for development. For an invitation-only beta, create the accounts through this app or the dashboard and disable new public signups after setup. This temporary mapping must be replaced before email recovery or public registration is needed.
5. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the project API settings. The publishable key is intentionally client-visible. Never use a service-role/secret key in these variables.
6. Run `pnpm install` and `pnpm dev`. On Windows with blocked PowerShell scripts, use `pnpm.cmd`.
7. For Vercel, add the same two variables to the intended environment and rebuild. Browser variables are embedded at build time. No local filesystem storage is used.

Without configuration, public activity discovery remains usable and journal screens display an unavailable message. They do not pretend to persist a cloud Memory locally.

## Application flow

- `/account`: temporary username/password sign-in, registration, and sign-out.
- `/memories`: authenticated Memory history, optional legacy import, first-photo covers, mood and note excerpts.
- `/memories/new`: create a past Memory, either linked to a stable built-in activity ID or free-form with no activity identity.
- `/memories/{id}/create`: enrich the already-created Adventure Memory with optional journal text and optional photos, then save and open Memory detail.
- `/memories/{id}`: edit date, optional moods and journal text; add/remove/view photos; delete a Memory and its photos.
- Adventure completion: sign in if needed, choose `I got it` or `Skip` for the Memory Prompt, create the Memory idempotently, then continue to the Create Memory page.

### Adventure completion boundary

The Memory row exists before `/memories/{id}/create` opens.

The Adventure uses a stable source key:

```text
adventure:<adventureId>
```

The database uniqueness constraint ensures repeated completion requests return the same Memory instead of inserting duplicates.

### Create Memory

Create Memory is an enrichment/update surface, not a second creation event.

It contains:

- Activity title
- Experience date
- Memory Prompt text when available
- Optional journal textarea backed by `memories.note`
- Optional photo upload backed by `memory_images` + private Storage
- Save Memory action

A Memory with no journal text and no photos is valid.

Photo uploads may happen before the user taps Save Memory because the Memory row already exists. Users may remove uploaded photos before saving or edit the photo set later from Memory detail.

## Rating compatibility

User-facing rating UI is removed from the V3 Memory creation/editing flow.

Legacy rating fields may remain in database/domain structures for compatibility with older records and migration, but the V3 UI must not:

- render rating controls
- require rating
- generate new rating values
- use rating as a Save Memory prerequisite
- replace rating with another scoring system

## Moods

Moods remain optional metadata in the existing architecture. They are not required during Create Memory and may remain available in later editing flows.

## Service and security boundaries

- `AuthService`: Supabase Auth, password handling delegated to the provider.
- `MemoryService`: private relational CRUD and idempotent creation.
- `StorageService`: authenticated object upload/download/delete. Image data never enters PostgreSQL or application localStorage.
- `JournalProvider`: one account-scoped in-memory history cache; clears on account changes and rejects stale list responses.
- Database RLS checks `auth.uid() = user_id`; composite foreign keys prevent linking another owner's Memory. Column grants protect ownership and snapshots.
- Photo rows reserve one of nine unique slots before upload, locking the parent Memory. This counts incomplete reservations toward the limit and rejects a tenth insert even when bypassing the UI.
- Storage policies require a matching owned reservation. No public URLs, transfer tokens, signed sharing links, or public bucket are generated.
- Remove photo objects through the Storage API before removing their metadata. A database trigger blocks metadata deletion while an object exists. Parent deletion is restricted until image rows are removed.
- The optional `profiles` table provides minimal locale/user metadata. Auth user ID is the authoritative owner.

## Photos

The picker accepts JPEG, PNG, WebP and HEIC/HEIF, with a 20 MiB input limit. Uploads run sequentially to bound memory use. HEIC uses a lazy-loaded browser converter; an unsupported HEIC variant gets an explicit JPEG-export recovery message.

Canvas normalization applies orientation, caps the longest edge at 2400 px, uses a white background for transparency, and exports JPEG at quality 0.9. Re-encoding omits source EXIF/GPS metadata. The normalized result must fit the 6 MiB bucket limit.

Users may:

- add photos during Create Memory
- preview uploaded photos
- remove photos before leaving Create Memory
- add/remove/view photos later in Memory detail

Deleting a photo never deletes the Memory row.

## Legacy migration

Local history remains a backup and is imported only when the signed-in user selects the import action. The importer salvages valid current-schema rows, supports older migration formats, and skips invalid timestamps. The server generates Memory IDs. `(user_id, source_key)` makes retries return the existing record rather than overwrite edits or insert duplicates.

Legacy rating values may be preserved during import, but the current UI does not expose rating controls or create new ratings.

## Verification

Run:

```text
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Before beta release, use two real accounts to verify:

1. Registration/sign-in/out, refresh and relogin persistence.
2. `I got it` and `Skip` both reach Create Memory and resolve to one Memory per Adventure.
3. Empty journal + zero photos saves successfully.
4. Text-only Memory saves.
5. Photo-only Memory saves.
6. Text + photos saves.
7. No rating UI appears in creation/detail editing surfaces.
8. Journal text can be edited later.
9. Photos can be added and removed later without deleting the Memory.
10. Activity Snapshot remains unchanged through journal/photo edits.
11. Legacy Memories still render.
12. Nine photos accepted; ten rejected; partial upload failures remain recoverable.
13. User B cannot read, modify or delete User A's rows or fetch User A's storage objects.
14. Chinese/Japanese/English UI remains consistent.
15. iOS Safari, Android Chrome and desktop Chrome/Edge remain usable.

Supabase project provisioning and real-device/cloud integration remain release gates. Do not merge into `master` before the QA matrix passes.
