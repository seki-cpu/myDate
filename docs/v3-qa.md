# V3 implementation verification — 2026-09-14

## Current product acceptance focus

The active Memory creation flow is journal-first, not rating-first.

```text
Adventure Complete
→ Memory Prompt
→ I got it / Skip
→ Create Memory
→ optional journal text
→ optional photos
→ Save Memory
→ Memory detail
```

The Memory row is created idempotently before the Create Memory page opens. The Create Memory page enriches/updates the existing Memory.

## QA requirements for Memory creation

QA must verify all of the following:

1. `I got it` opens Create Memory.
2. `Skip` opens Create Memory.
3. Both paths resolve to the same canonical Memory creation contract.
4. Empty journal text + no photos can still save.
5. Text-only Memory saves.
6. Photo-only Memory saves.
7. Text + photos saves.
8. No rating controls appear in Memory creation.
9. No rating controls appear in Memory editing.
10. No replacement scoring system is introduced.
11. Replaying the completion flow does not create a duplicate Memory for the same Adventure.
12. Save Memory updates the existing Memory row.
13. Save Memory routes to Memory detail.
14. Journal text can be edited later.
15. Photos can be added later.
16. Photos can be removed later.
17. Photos uploaded during creation can be removed before leaving the creation surface.
18. Removing photos does not delete the Memory.
19. Activity Snapshot remains unchanged after note/photo edits.
20. Legacy Memories still render even when they contain historical rating data.
21. Legacy rating values are not exposed as editable fields and no new rating values are created.
22. Optional moods, if used later in editing, never block saving.
23. Mobile layout remains usable.
24. Desktop layout remains readable and focused.
25. zh / en / ja copy remains consistent.
26. No release-blocking console errors occur.

## Photo verification

Verify:

- JPEG / PNG / WebP upload
- HEIC / HEIF conversion on supported target browsers
- selected/uploaded photo previews
- remove photo
- retry failed upload
- nine-photo limit
- private authenticated read
- no public Storage URL
- deleting a photo leaves the Memory intact
- deleting a Memory removes its photos through the supported deletion flow

## Backend verification

Apply `supabase/migrations/202609140001_memory_journal.sql` to the real Supabase project before live QA.

Verify:

- `profiles` exists
- `memories` exists
- `memory_images` exists
- `memory-photos` bucket exists and is private
- RLS is enabled
- User B cannot access User A's Memories or photos
- duplicate `source_key` for one user cannot insert a second Adventure Memory

A missing `public.memories` table will surface as a REST 404 and is a backend provisioning failure, not a valid application state.

## Legacy compatibility

Legacy rating schema/data may remain for backward compatibility. This does not make rating part of the current product flow.

QA should confirm:

- old Memories with rating data still load
- rating data is not required to save
- current UI does not render rating controls
- current UI does not generate new rating values

## Build / static checks

Run:

```text
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## Device matrix

At minimum:

- 320 px mobile width
- 375 px mobile width
- 390 px mobile width
- 430 px mobile width
- desktop Chrome / Edge
- iOS Safari
- Android Chrome

Do not merge into `master` until the real Supabase integration and this QA matrix pass.
