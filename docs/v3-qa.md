# V3 implementation verification — 2026-09-14

## Completed checks

| Check | Result | Evidence scope |
|---|---|---|
| TypeScript | Passed | `tsc --noEmit` |
| ESLint | Passed | Source and test files; generated Next artifacts excluded |
| Production build | Passed | Next.js 15.5.24; isolated build directory |
| PostgreSQL migration and RLS | Passed | PGlite executes the actual migration with test Auth/Storage schemas |
| Private ownership | Passed | Second user cannot select another user's Memories, image rows, or objects; forged owner inserts denied; anonymous reads denied |
| Photo limit | Passed | Nine reservations accepted, tenth rejected, removed slot reusable |
| Safe deletion | Passed | Metadata cannot be removed before its object; parent cannot be deleted with image rows attached |
| Snapshot and rating rules | Passed | Snapshot mutation and out-of-range rating rejected |
| Retry/import/history | Passed | Duplicate source key rejected; valid legacy rows salvaged; invalid dates skipped; discovery reset preserves local legacy backup |
| Sign-in screen | Passed | Chromium at 390 × 844; Japanese UI rendered without application errors |
| Journal interaction | Passed with fixture | Chinese custom mood and note saved; arbitrary past Memory with zero photos/moods/note created; count updated |
| Photo interface | Passed with fixture | HEIC upload; nine-photo picker disable; full-screen viewer next/previous/Escape; desktop and mobile layout |
| HEIC normalization | Passed in Chromium | Upstream `heic2any/demo/1.heic`: 41,389 bytes converted to 1440 × 960 JPEG, 190,744 bytes |
| JPEG/PNG/WebP normalization | Passed in Chromium | 3000 × 1800 inputs normalized to 2400 × 1440 |
| Malformed HEIC | Passed in Chromium | Explicit `photo_heic` recovery error |

Three Node test groups are in `tests/journal.test.ts`. Browser fixtures live only under `tests`; the application never imports them. UI fixture requests are intercepted only for `http://127.0.0.1:3999` on `localhost:3101`. They are not evidence of a successful connection to a real Supabase project.

## Pending before beta release

- Provision a real Supabase project and apply the migration.
- Verify real email confirmation, sign-in/out, cloud persistence after relogin, authenticated Storage upload/download/delete, and two-user RLS through the live APIs.
- Test actual current iPhone HEIC/HEIF files, orientation, low-memory behavior, iOS Safari and Android Chrome. A Chromium sample conversion is not a device acceptance test.
- Test live interrupted uploads and concurrent uploads in two tabs against Supabase; database slot/ownership constraints are already covered locally.

Follow `v3-setup.md` for the full release matrix. No merge or deployment was performed.

## Reproduce browser checks

Use an isolated output directory to avoid an existing dev process overwriting build artifacts:

```powershell
$env:NEXT_DIST_DIR = '.next-v3-qa'
$env:NEXT_PUBLIC_SUPABASE_URL = 'http://127.0.0.1:3999'
$env:NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'local-ui-test-key'
pnpm.cmd dev --port 3101
```

In another terminal:

```powershell
pnpm.cmd dlx agent-browser --session mydate-v3-fixture --init-script tests/browser-fixture.js open http://localhost:3101/memories
pnpm.cmd dlx agent-browser --session mydate-v3-fixture snapshot -i
```

Photo conversion check (test assets are not committed):

```powershell
New-Item -ItemType Directory -Force artifacts
Invoke-WebRequest 'https://raw.githubusercontent.com/alexcorvi/heic2any/master/demo/1.heic' -OutFile artifacts/sample.heic
node tests/photo-browser-server.mjs
# In another terminal with the fixture browser open:
Get-Content -Raw tests/photo-browser-check.js | pnpm.cmd dlx agent-browser --session mydate-v3-fixture eval --stdin
```

Use absolute file paths for `agent-browser upload` on Windows. Stop the test servers and close their browser sessions after verification. The placeholder backend URL/key above are exclusively for the intercepted local UI fixture.
