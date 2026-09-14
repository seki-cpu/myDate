# V3 Memory Journal setup

This implementation follows `myDate_V3_Memory_Journal.md`. Photo Handoff is deferred. Earlier V2 documents describe the historical local-only implementation and do not constrain V3 journal storage.

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

- `/account`: temporary username/password sign-in, registration, and sign-out. Usernames are mapped to internal Supabase Auth email identifiers; there is no email recovery yet.
- `/memories`: authenticated history, optional legacy import, first-photo covers, mood and note excerpts.
- `/memories/new`: create a past Memory, either linked to a stable built-in activity ID or free-form with no activity identity. After saving, its detail screen accepts photos.
- `/memories/{id}`: edit date, ratings, moods and note; add/remove photos; view full-screen photos; delete a Memory and its photos.
- Adventure completion: sign in if needed, choose optional experience ratings and a prompt outcome, save remotely, then receive the existing reward animation and an optional journal-edit link. Empty journals are valid.

Activity snapshots are captured when an Adventure starts, or when a past Memory is created. They are immutable to authenticated database updates. User-authored strings are preserved, including mood whitespace. Linked Tried indicators and the counter read the current account's database history. Discovery rounds and unfinished Adventures remain browser-local.

## Service and security boundaries

- `AuthService`: Supabase Auth, password handling delegated to the provider.
- `MemoryService`: private relational CRUD and idempotent creation.
- `StorageService`: authenticated object upload/download/delete. Image data never enters PostgreSQL or application localStorage.
- `JournalProvider`: one account-scoped in-memory history cache; clears on account changes and rejects stale list responses.
- Database RLS checks `auth.uid() = user_id`; composite foreign keys prevent linking another owner's Memory. Column grants protect ownership and snapshots.
- Photo rows reserve one of nine unique slots before upload, locking the parent Memory. This counts incomplete reservations toward the limit and rejects a tenth insert even when bypassing the UI.
- Storage policies require a matching owned reservation. No public URLs, transfer tokens, signed sharing links, or public bucket are generated. Photos are fetched with the authenticated SDK into revocable browser Blob URLs.
- Remove photo objects through the Storage API before removing their metadata. A database trigger blocks metadata deletion while an object exists. Parent deletion is restricted until image rows are removed. Partial failures remain retryable; interrupted upload reservations are shown with a remove action.
- The optional `profiles` table provides the minimal locale/user metadata contract. Auth user ID is the authoritative owner; the temporary username mapping and password are provider-managed.

## Photos

The picker accepts JPEG, PNG, WebP and HEIC/HEIF, with a 20 MiB input limit. Uploads run sequentially to bound memory use. HEIC uses a lazy-loaded browser converter; an unsupported HEIC variant gets an explicit JPEG-export recovery message. Multi-image HEIC containers keep the first image.

Canvas normalization applies orientation, caps the longest edge at 2400 px, uses a white background for transparency, and exports JPEG at quality 0.9. Re-encoding omits source EXIF/GPS metadata. The normalized result must fit the 6 MiB bucket limit. Users can retry individual failures. Image processing is client-side for this private beta; the bucket also enforces MIME/size limits but does not perform independent pixel/EXIF validation of a malicious custom client's bytes.

## Legacy migration

Local history remains a backup and is imported only when the signed-in user selects the import action. The importer salvages valid current-schema rows, supports older migration formats, and skips invalid timestamps. The server generates Memory IDs. `(user_id, source_key)` makes retries return the existing record rather than overwrite edits or insert duplicates.

A browser-local owner marker binds a started import to one account; the completed marker is written only after all candidates succeed. An invalid record leaves a recoverable status and the original data intact. No original local history is deleted. Browser backup restoration into a fresh browser is a new explicit import; do not manually clear migration markers to repeat a completed import after deleting imported Memories.

## Verification

Run `pnpm test`, `pnpm typecheck`, `pnpm lint`, and `pnpm build`.

The automated database test executes the migration in PGlite PostgreSQL, with small test-only Auth/Storage schema fixtures. It exercises owner isolation, anonymous denial, immutable snapshots, ratings, nine-photo limit, reserved-slot reuse, private object policies, safe deletion and duplicate source keys. Separate tests cover input formats, size limits, partial legacy recovery and discovery-history separation. These checks are not a substitute for a real Supabase Auth/Storage integration run.

Before beta release, use two real accounts to verify:

1. Email registration/confirmation, sign-in/out, refresh and relogin persistence.
2. Empty Memory creation, linked/free-form past Memories, unchanged snapshot titles, optional ratings, Chinese/Japanese/English UI and unmodified user text.
3. Nine photos accepted; ten rejected; partial failure retry; interrupted upload removal; fullscreen previous/next/close.
4. JPEG/PNG/WebP, rotated iPhone photos, actual HEIC/HEIF files from target iPhones, oversized and malformed files.
5. User B cannot read, modify or delete User A's rows or fetch User A's storage objects through the SDK, guessed IDs or raw URLs.
6. Import retries, invalid local rows, account switching and source backups; new Discovery round preserves Tried.
7. iOS Safari, Android Chrome and desktop Chrome/Edge, including low-memory devices and slow uploads.

Supabase project provisioning and real-device/cloud integration are pending until project configuration is supplied. Do not merge into `master` before this QA matrix passes.

References: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Storage access control](https://supabase.com/docs/guides/storage/security/access-control), [Storage deletion](https://supabase.com/docs/guides/storage/management/delete-objects), [HEIC converter](https://github.com/alexcorvi/heic2any).
