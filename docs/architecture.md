# myDate V3 Architecture — Memory Journal

## Product Statement

> People may change. The memories are still yours.

The permanent subject of myDate is the user. Completed experiences become user-owned Memories that may later be enriched with journal text and photos.

## Product Principles

1. Activity First.
2. Memory Second.
3. User-owned experiences.
4. No relationship KPI.
5. No ratings or score-based Memory creation UI.
6. Journal text and photos are optional.
7. A blank Memory is valid.
8. Memory identity never depends on title.
9. Keep the creation flow calm and minimal.
10. Do not add abstractions that are not needed by the current product.

## Current Persistence Model

V3 uses:

- browser-local state for discovery rounds and unfinished Adventures
- Supabase Auth for the private journal account
- Supabase Postgres for Memory metadata
- Supabase Storage for private Memory photos

The current backend shape is already implemented in this branch. This change does not introduce a new backend architecture.

## Stable Activity Identity

Historical state must never depend on activity title.

```ts
type ActivitySource = "builtin" | "custom";

interface ActivityIdentity {
  source: ActivitySource;
  id: string;
}
```

Built-in activities use `DateIdea.id` with `source: "builtin"`. Custom activities use their own generated stable id.

## Activity Snapshot

Adventure completion persists an immutable activity snapshot with the Memory. Identity remains authoritative for historical matching; snapshot text is presentation/history data.

Editing or deleting the current source activity must not rewrite or delete an existing Memory snapshot.

## Canonical Memory Creation Flow

```text
Discover Date Idea
→ Let's do it
→ Adventure
→ Adventure Complete
→ Memory Prompt
→ I got it / Skip
→ Memory row created idempotently
→ Create Memory
   → optional journal text
   → optional photos
→ Save Memory
→ Memory detail
```

The Memory Prompt is optional:

```text
I got it → memory_prompt_completed = true
Skip     → memory_prompt_completed = false
```

Both paths create the same kind of Memory and continue to Create Memory.

## Creation Boundary

The server Memory already exists before the Create Memory UI opens.

Adventure completion uses one stable source key:

```text
adventure:<adventureId>
```

The database enforces uniqueness per user/source key. Replaying completion therefore resolves to the existing Memory rather than inserting a duplicate.

The Create Memory page must update/enrich that existing row. It must never create a second Memory for the same completion event.

## Journal Field

The canonical freeform journal field is:

```text
memories.note
```

Rules:

- empty string is valid
- no required validation beyond existing storage limits
- creation placeholder:
  - EN: `Write something you want to remember about today…`
  - ZH: `写一点今天想记住的东西……`
  - JA: `今日のことを少し残してみよう…`
- Save Memory remains enabled when the note is empty
- Memory detail/edit may update the note later

## Photo Attachment Flow

Photos belong to the same Memory creation/editing experience.

Canonical flow:

```text
Memory row
→ memory_images reservation
→ private Storage upload
→ ready image metadata
```

The existing `PhotoJournal` / `StorageService` path is canonical for V3.

Rules:

- photos are optional
- zero photos is valid
- users may add photos during Create Memory
- uploaded photos are previewed in the same creation surface
- users may remove photos before finishing creation
- Memory detail continues to support add/remove/view later
- deleting a photo must never delete the Memory row
- Activity Snapshot must never change because photos changed

## Moods

Moods remain supported as optional journal metadata in the current architecture.

They are not required on the Create Memory page. They may remain available in later Memory edit flows.

A Memory with no moods remains valid.

## Legacy Rating Compatibility

Legacy rating data may remain in shared domain/database structures for backward compatibility and migration.

V3 UI rules:

- do not render rating controls
- do not display rating as part of the creation/editing experience
- do not require rating
- do not create new rating values
- do not use rating to determine whether a Memory can save
- preserve legacy values without fabricating new ones

No replacement scoring system may be introduced.

## Historical Tried vs Current Discovery Round

Historical Tried is derived from Memory history and stable Activity Identity.

```text
hasTried(activity)
=
exists Memory whose Activity Snapshot identity matches activity identity
```

Current discovery-round completion is separate resettable state used only by random discovery.

Starting a new discovery round resets current-round exclusion and does not remove historical Tried.

## Save / Update Idempotency

Creation idempotency is based on the Adventure source key.

```text
same Adventure completion
→ same source key
→ existing Memory returned
→ no duplicate Memory
```

Create Memory uses update semantics for journal text. Photo rows have their own database/storage identities and may be added or removed independently.

Repeated Save Memory actions update the same Memory row.

## Memory Detail / Edit

Memory detail/edit must support at minimum:

- edit journal text
- add photos
- remove photos
- view existing photos
- preserve Memory metadata
- preserve Activity Snapshot

Deleting or editing photos does not delete the Memory itself.

## Scope Protection

Do not add as part of this change:

- ratings or replacement score systems
- XP
- Egg
- relationship progression
- relationship mode selector
- Solo mode
- title-based Memory identity
- a second Memory persistence path
- another backend architecture

The architecture is correct when `I got it` and `Skip` both lead to one idempotent Memory, Create Memory can save with no note and no photos, later edits preserve identity/snapshot, and no rating UI is exposed.
