# myDate V1 Architecture

## Architecture Goal

Keep V1 small, backend-free, and easy to test while preserving clean extension points.

The product rule remains:

**Activity First, Egg Second.**

Date discovery and completion stay primary. Egg progress is a downstream reward layer and must never block activity discovery.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- localStorage for V1 client-side persistence
- no backend
- no user account
- no image upload or image database
- Vercel for preview and production deployment

## Layering

```text
UI / routes
   ↓
shared domain types
   ↓
content source + local persistence adapter
```

UI components must not redefine domain models or access localStorage directly.

## Canonical DateIdea Contract

Canonical shared interfaces live in:

`src/types/domain.ts`

There must be one DateIdea contract across types, content, and UI.

The V1 contract is:

```ts
interface DateIdea {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  littleMission?: LocalizedText;
  photoPrompt: LocalizedText;
  categories: DateCategory[];
  cost: DateCost;
  duration: DateDuration;
  indoor: boolean;
  tags: string[];
}
```

`LocalizedText` requires `zh`, `en`, and `ja` in V1 and may later add more locale keys without changing DateIdea.

## Memory Prompt

`photoPrompt` is the canonical field name for the V1 **Memory Prompt**.

It is required for every DateIdea and follows the same `LocalizedText` contract as title and description.

The Memory Prompt suggests one meaningful photo the user may take with their own phone camera and keep in their normal phone gallery.

The prompt may focus on:

- environment
- objects
- body details
- shadows
- food
- souvenirs
- shared creations
- small visual details

The prompt does not need to include both people.

V1 must not:

- upload photos
- store photos
- request image URLs
- verify whether a photo was taken
- add a photo database
- add cloud image storage
- add a backend for images

The UI offers only two outcomes after showing the prompt:

- `I got it`
- `Skip`

`I got it` means the user says they completed the prompt. The app does not verify this claim.

## Canonical V1 Flow

```text
Date discovery
→ Let's do it
→ Adventure
→ Complete
→ Memory Prompt
→ I got it / Skip
→ Rating
→ XP settlement
→ Egg progress
```

The Egg is downstream from the activity flow. No DateIdea contains XP or Egg-specific fields.

## Adventure Instance Identity

XP idempotency requires each started activity to have a unique `adventureId`.

The same DateIdea can be completed again later. Each new start creates a new AdventureRecord with a new id.

Do not use `dateId` alone as an XP idempotency key.

## XP Contract

V1 XP values are fixed:

- complete adventure: +20 XP
- complete Memory Prompt (`I got it`): +5 XP
- complete rating: +5 XP

Skipping the Memory Prompt grants 0 XP for that source.

Each AdventureRecord stores three award flags:

```ts
xpAwarded: {
  adventure: boolean;
  memoryPrompt: boolean;
  rating: boolean;
}
```

These flags are the idempotency boundary.

Repeated clicks, refreshes, browser back navigation, or returning to a completed step must never grant the same source twice for the same `adventureId`.

Total XP is derived from persisted award flags rather than incrementing an unguarded counter.

## V1 Persistence Boundary

All V1 adventure progress goes through:

`src/lib/storage.ts`

The adapter owns:

- starting an AdventureRecord
- marking adventure completion
- resolving Memory Prompt as completed or skipped
- marking rating completion
- calculating total XP
- safe localStorage parsing and recovery

UI components must call adapter functions and must not write localStorage directly.

The persistence schema is versioned as `SaveData.version = 2` because the previous structure contained a photo URL assumption and did not support idempotent XP settlement.

No migration of stored photo data is required. V1 stores no photo reference of any kind.

## Egg Boundary

Egg progress may read derived total XP, but:

- Egg state must not modify DateIdea
- activity discovery must not depend on Egg
- Egg progress thresholds are a separate product rule
- no inventory, economy, or collectible system is introduced by this contract

## Content Source

Canonical V1 activity content lives in:

`src/data/dateIdeas.ts`

Content owns the localized wording of each Memory Prompt. UI must not maintain a second prompt catalog.

## State Management Rule

Do not introduce Redux or another global state framework for this flow.

Use the existing localStorage adapter plus local React state where needed.

## Scope Protection

Do not add:

- image upload libraries
- blob storage
- Supabase solely for V1
- backend APIs
- photo verification
- camera permission requirements
- duplicate DateIdea DTOs
- reward service layers or dependency injection

Add only the minimum code needed to keep the canonical contract, client-side flow state, XP idempotency, and Egg boundary correct.
