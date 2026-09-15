# myDate V3 — Memory Journal Design

## Status

**Photo Handoff / photo transfer is NOT included in this version.**

That feature is deferred for later discussion.

This version focuses only on turning **Memories** into a private personal journal.

---

# 1. Product Goal

V2 established the product principle:

> **People may change. The memories are still yours.**

V3 extends this by making each completed experience a real journal entry.

A Memory should no longer be only:

```text
Activity
Date
Rating
```

It should become something the user can return to later and actually remember.

Target experience:

```text
Discover / Activity
↓
Adventure
↓
Complete
↓
Memory Prompt
↓
Experience Rating
↓
+1 Memory
↓
Optional:
Photos
Moods
Journal Note
↓
Saved in Memories
```

The journal must remain optional and lightweight.

Completing an Adventure must never require the user to write a diary entry.

---

# 2. Core Product Model

Keep these concepts separate:

```text
Activity
= something the user may do

Adventure
= something the user is currently doing

Memory
= something the user actually experienced
```

A Memory is permanent user-owned history.

---

# 3. Memory Journal

Each Memory may contain:

- activity title snapshot
- activity description snapshot
- Memory Prompt snapshot
- experience date
- existing experience rating
- arbitrary moods
- optional journal note
- up to **9 photos**
- createdAt
- updatedAt

A valid Memory may contain:

```text
0 photos
0 moods
0 note
```

The user should still be able to save it.

---

# 4. Memory Detail Page

Users can open a Memory from the Memories page.

Conceptual route:

```text
/memories/{memoryId}
```

The page should show:

```text
← Memory

Record Store Exchange

September 14, 2026

🥰 Excited
😌 Comfortable

Fun
★★★★★

Comfort
★★★★★

Would do again
★★★★☆

[ photo ] [ photo ] [ photo ]
[ photo ] [ photo ]

Journal

We stayed much longer than expected.
The album he chose was completely different
from what I normally listen to.

Memory Prompt

Photograph two records that probably
would never appear in the same photo otherwise.
```

Available actions:

```text
Edit
Delete
Add photos
Remove photos
```

No public sharing is required.

---

# 5. Photo Journal

Photos belong to a Memory.

## Maximum

A single Memory may contain:

```text
0–9 photos
```

The maximum must be enforced in both:

- UI
- backend

If the Memory already contains 7 photos:

```text
Add photos
→ maximum 2 additional photos
```

If the user attempts to select too many:

```text
You can add up to 9 photos to one Memory.
```

Chinese:

```text
一次回忆最多可以保存 9 张照片。
```

Japanese:

```text
1つの思い出に保存できる写真は最大9枚です。
```

---

# 6. Photo Upload UX

## Mobile

Inside Memory Detail / Edit:

```text
Photos                         5 / 9

[photo] [photo] [photo]
[photo] [photo] [ + ]

[ Add photos ]
```

Use the device's normal photo picker.

Where supported, the browser may also expose camera capture.

Do not require camera access.

## Desktop

Support:

```text
[ Add photos ]
```

Optionally support drag-and-drop if implementation is simple.

Do not make drag-and-drop the only upload method.

---

# 7. Photo Viewer

Tapping a photo opens a larger viewer.

Mobile:

```text
←                         2 / 5

        [ LARGE PHOTO ]

‹                           ›

        ● ○ ○ ○ ○
```

Desktop:

```text
        [ LARGE PHOTO ]

[1] [2] [3] [4] [5]
```

Required:

- next
- previous
- close
- current photo index

No advanced photo editor is required.

---

# 8. Photo Storage

Photo binaries must NOT be stored directly inside PostgreSQL.

Use object storage.

Recommended V3 stack:

```text
Next.js / Vercel
        │
        ▼
     Supabase
        │
 ┌──────┼──────────────┐
 │      │              │
Auth  Postgres       Storage
       │              │
       │              └── Memory Photos
       │
       └── Memories / Ratings / Moods / Notes
```

For the initial private beta, Supabase Free is sufficient.

---

# 9. Storage Path

Recommended conceptual structure:

```text
users/
  {userId}/
    memories/
      {memoryId}/
        {imageId}.jpg
```

The final extension may differ depending on image normalization.

Do not expose raw internal storage paths in the UI.

---

# 10. Photo Privacy

All Memory photos are private.

They must only be accessible by the authenticated owner.

Requirements:

```text
current authenticated user
=
Memory.userId
```

and:

```text
current authenticated user
=
MemoryImage.userId
```

Do NOT use a public storage bucket.

Do NOT rely only on frontend hiding.

Ownership must be enforced by backend/database/storage rules.

---

# 11. Photo Processing

The product should avoid storing unnecessarily huge phone originals.

Before or during upload:

```text
validate
↓
normalize orientation
↓
resize if extremely large
↓
compress reasonably
↓
remove unnecessary metadata where practical
↓
upload
```

The system should prioritize good visual quality over aggressive compression.

Suggested target:

```text
long edge around 2000–2500 px
```

Final values should be chosen by the implementation team after testing.

Do not intentionally preserve GPS EXIF metadata.

---

# 12. Supported Image Formats

At minimum support:

```text
JPEG
PNG
WebP
```

iPhone HEIC / HEIF behavior must be explicitly tested.

If direct HEIC upload/display is not reliable in the chosen browser/storage pipeline:

```text
HEIC / HEIF
→ normalize / convert
→ supported web format
```

Do not silently fail common iPhone photo uploads.

---

# 13. Upload Error Handling

Required states:

### Uploading

```text
Uploading 4 photos…
```

### Partial failure

```text
3 photos uploaded.
1 photo couldn't be uploaded.

[ Retry ]
```

### Too many photos

```text
A Memory can contain up to 9 photos.
```

### Unsupported file

```text
This photo format isn't supported.
```

### Large file

Provide a recoverable error rather than silently failing.

---

# 14. Moods

A Memory may contain arbitrary moods.

Do NOT use a hard-coded enum.

Suggested data:

```ts
moods: string[]
```

The UI may suggest common options:

```text
🥰 Excited
😌 Comfortable
🤣 Fun
🥹 Emotional
🌙 Peaceful
✨ Special
```

But users can add their own:

```text
+ Add mood
```

Examples:

```text
有点舍不得
第一次觉得他很可爱
累死了但很好玩
莫名其妙的一天
```

User-entered mood text must remain exactly as authored.

---

# 15. Journal Note

Each Memory may contain an optional free-form note.

Example:

```text
Write something about today…

________________________________

________________________________
```

The note is private.

Do not impose minimum length.

Do not require it during Adventure completion.

---

# 16. Experience Rating

Existing experience rating remains.

It evaluates:

> How did this experience feel to me?

Not:

> How good was my dating partner?

Suggested rating dimensions:

```text
Fun
Comfort
Would do again
```

The final existing V2 contract should be reused where possible.

---

# 17. Add a Past Memory

Users must be able to add something they already experienced before using myDate.

Entry:

```text
Memories
→ + Add Memory
```

Options:

```text
From a myDate activity

Something we already did
```

For:

```text
Something we already did
```

allow the user to enter:

- activity title
- experience date
- rating
- moods
- journal note
- up to 9 photos

This creates a **Memory directly**.

The user does not need to create a future Activity first.

---

# 18. Past Memory and Activity Identity

If the user chooses an existing myDate Activity:

```text
Memory
→ linked to Activity
→ Activity shows Tried
```

If the user creates a completely free-form past Memory:

```text
Memory only
```

Do NOT fuzzy-match it to an Activity by title.

Example:

```text
Night Walk
Night Walking
Walk at Night
```

must not automatically be treated as the same activity.

Stable IDs are required for linked activity history.

---

# 19. Activity Snapshot

Every Memory must preserve what the activity was at the time it happened.

Conceptual structure:

```ts
activitySnapshot: {
  title: string;
  description?: string;
  memoryPrompt?: string;
}
```

If a linked activity is later:

```text
edited
renamed
deleted
```

the historical Memory must remain unchanged.

Past history must not mutate with future edits.

---

# 20. Tried State

Historical:

```text
Tried
做过
体験済み
```

should remain derived from Memory history.

This is separate from the current Discovery Cycle.

```text
Memory
= historical experience

Tried
= this activity has at least one Memory

Discovery Cycle
= what has been completed in the current round
```

Starting a new Discovery Cycle must not remove Tried.

---

# 21. Authentication

Because V3 stores private:

- Memories
- notes
- moods
- ratings
- photos

a real authenticated user identity is required.

For the initial version, keep authentication minimal.

Recommended behavior:

```text
Discover
→ may remain accessible before login

Save Memory
Upload Photo
Edit Memory
→ authentication required
```

For an initial two-user beta, do not build a large account/profile system.

No requirement for:

```text
profile photo
bio
gender
relationship status
public username
```

The account exists only for private data ownership.

---

# 22. Minimal User Model

Conceptually:

```ts
type User = {
  id: string;
  preferredLocale?: string;
  createdAt: string;
};
```

Authentication-provider metadata may live separately.

---

# 23. Database Model

Suggested V3 journal schema:

```text
User
 │
 └── Memory
       │
       └── MemoryImage
```

Possible relational structure:

```ts
Memory {
  id
  userId

  sourceActivityType
  sourceActivityId?

  activitySnapshot

  occurredAt

  ratingFun?
  ratingComfort?
  ratingDoAgain?

  moods[]

  note?

  memoryPromptCompleted

  createdAt
  updatedAt
}
```

```ts
MemoryImage {
  id
  userId
  memoryId

  storagePath
  sortOrder

  width?
  height?

  createdAt
}
```

Final schema should be reviewed by the Architect.

---

# 24. Supabase Initial Implementation

Recommended for the first private beta:

```text
Supabase Auth
Supabase PostgreSQL
Supabase Storage
Supabase Row Level Security
```

Reason:

The initial expected usage is very small.

The product currently needs a simple integrated backend rather than
multiple independent cloud services.

However, UI components should not directly scatter provider-specific
storage/database logic everywhere.

Prefer service boundaries:

```text
MemoryService
AuthService
StorageService
```

Example:

```text
Memory UI
↓
MemoryService
↓
Supabase implementation
```

This keeps later migration possible.

---

# 25. localStorage Responsibilities

After V3:

## Database

Store:

```text
Memories
ratings
moods
notes
image metadata
```

## Object Storage

Store:

```text
Memory photos
```

## localStorage

May continue to store:

```text
language
filters
temporary Adventure state
lightweight UI state
migration marker
```

localStorage is no longer the permanent source of truth for Memories.

---

# 26. V2 → V3 Migration

Existing V2 Memories stored locally must not disappear.

Migration flow:

```text
Detect V2 local data
↓
authenticated user available
↓
import Memories
↓
server assigns IDs
↓
mark migration completed
```

Migration must be:

- idempotent
- retry-safe
- duplicate-resistant
- resilient to partially invalid local data

Do not delete the original local data until successful migration is confirmed.

---

# 27. Completion Flow

Keep Adventure completion lightweight:

```text
Adventure Complete
↓
Memory Prompt
↓
I got it / Skip
↓
Experience Rating
↓
Memory created
↓
✨ +1 Memory
```

Then:

```text
Add to this Memory?

[ Add photos & note ]
[ Done ]
```

If the user chooses Done:

the Memory is still valid.

The user may later edit it from Memories.

---

# 28. Memories List

Memory cards should show enough context to invite revisiting.

Example:

```text
September 14

┌────────────────────────┐
│ [      cover photo   ] │
│                        │
│ Record Store Exchange  │
│ 🥰 😌                   │
│                        │
│ We stayed much longer… │
└────────────────────────┘
```

If photos exist:

use the first photo as the visual cover.

If no photos exist:

use the normal myDate card presentation.

Do not require a placeholder stock photo.

---

# 29. Localization

System UI supports:

```text
Chinese
Japanese
English
```

User content remains exactly as authored.

Example:

```text
UI:
Japanese

Journal:
今天两个人都累死了但是超级好玩
```

This is valid.

Do not automatically translate:

- journal notes
- moods
- free-form Memory titles

---

# 30. Out of Scope

This version does NOT include:

- Photo Handoff
- QR photo transfer
- shared download links
- Save All to another person's phone
- shared albums
- Couple Accounts
- Partner Sync
- public Memories
- social feed
- likes
- comments
- followers
- partner tagging
- AI-written journal entries
- AI relationship analysis
- face recognition
- automatic photo categorization
- complex photo editing

Photo transfer may be reconsidered in a later version.

---

# 31. Acceptance Criteria

The Memory Journal version is complete when:

1. A logged-in user can create a Memory.
2. A Memory can exist without photos or journal text.
3. A user can add up to 9 photos to one Memory.
4. A 10th photo cannot be added.
5. Photos remain available after refresh/relogin.
6. Photos can be viewed from Memory Detail.
7. Photos can be removed from a Memory.
8. Another user cannot access the Memory or its photos.
9. Mood text supports arbitrary user input.
10. Journal note is optional.
11. Existing rating behavior is preserved.
12. A user can edit an existing Memory.
13. A user can delete a Memory.
14. A user can manually add a past Memory.
15. Linked existing Activities correctly show Tried.
16. Free-form past Memories are not fuzzy-matched to Activities.
17. Starting a new discovery round does not delete Memories or Tried.
18. Existing V2 local Memories can be migrated safely.
19. Mobile and desktop Memory layouts both work correctly.
20. Chinese / Japanese / English system UI remains functional.
21. User-generated text is never automatically translated.
22. No Photo Handoff code or UI is included.

---

# 32. Architect Instruction

Before implementation, the Architect must:

1. Inspect the current V2 repository.
2. Review the current Memory contract.
3. Define the final V3 Memory schema.
4. Define MemoryImage schema.
5. Confirm the maximum of 9 photos per Memory.
6. Define Supabase Auth integration.
7. Define PostgreSQL schema.
8. Define private Storage bucket and RLS policies.
9. Define image upload/normalization pipeline.
10. Explicitly test iPhone HEIC behavior.
11. Define upload-size limits.
12. Define Memory Detail routes and data loading.
13. Define Add Past Memory behavior.
14. Define Activity Snapshot behavior.
15. Preserve existing Tried / Discovery Cycle semantics.
16. Define V2 → V3 migration.
17. Introduce MemoryService / AuthService / StorageService boundaries.
18. Define UI handoff.
19. Define QA acceptance criteria.
20. Do not implement Photo Handoff.
21. Do not introduce social features.
22. Do not merge into master until QA passes.

Report in Chinese.

Use English for:

- code
- comments
- type names
- database names
- commit messages
- technical documentation
