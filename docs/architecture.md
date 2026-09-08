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

## MD-002 Reward Burst to Egg

MD-002 adds presentation feedback after a successful Memory Prompt completion.

The product sequence is:

```text
Memory Prompt
→ user taps I got it
→ resolveMemoryPrompt(adventureId, "completed")
→ reward modal opens
→ user taps OK
→ star burst travels toward Egg mini icon
→ Egg mini icon glows / bumps once
→ continue to Rating
```

The reward uses the existing +5 Memory Prompt XP source. MD-002 does **not** create a new XP source.

### SaveData Decision

MD-002 requires **no new SaveData fields**.

Persisted business truth already exists in:

```ts
memoryPromptStatus
xpAwarded.memoryPrompt
```

Reward modal visibility, animation progress, star particle positions, and Egg bump state are transient presentation state and must not be persisted.

Do not add fields such as:

- rewardModalSeen
- rewardAnimationPlayed
- rewardAnimationComplete
- starBurstComplete
- eggBumpPlayed

Replaying or skipping presentation must never affect XP truth.

### UI State Sequence

The UI-owned state machine is:

```text
idle
→ rewardModalOpen
→ rewardAnimationPlaying
→ rewardAnimationComplete
```

Definitions:

- `idle`: Memory Prompt screen is waiting for user action.
- `rewardModalOpen`: business settlement has already been attempted; reward modal is visible.
- `rewardAnimationPlaying`: user tapped OK; star burst / Egg absorption feedback is playing.
- `rewardAnimationComplete`: visual feedback finished or was intentionally skipped; UI may continue to Rating.

This state machine is view-only.

### Business / Presentation Boundary

When the user taps `I got it`:

1. UI calls `resolveMemoryPrompt(adventureId, "completed")`.
2. The adapter remains the only place that decides whether +5 XP is newly awarded.
3. The UI may open the reward modal after the call returns.
4. Animation components receive display data only; they never mutate SaveData or award XP.

The animation must not be the trigger for XP settlement.

If the animation is interrupted, skipped, reduced, or never mounts, persisted XP remains correct.

Refreshing or navigating back may re-render the Memory Prompt step, but the existing idempotency guard prevents duplicate +5 XP.

### Reduced Motion

Respect `prefers-reduced-motion` where feasible.

For reduced motion, replace the traveling star burst with a short static or near-static feedback such as:

- brief +5 XP fade
- one subtle Egg glow
- immediate transition after user acknowledgement

Reduced-motion handling must preserve the same business sequence and XP outcome.

### Visual Constraints

MD-002 should use:

- small pale-yellow / champagne-gold stars
- short duration
- one directional burst toward the Egg mini icon
- one Egg glow / bump
- restrained particle count
- no arcade-heavy sound or visual treatment

The Egg remains secondary to the activity flow.

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

MD-002 may animate toward an Egg mini icon, but that icon is a presentation target only. It must not become an XP authority or navigation requirement.

## Content Source

Canonical V1 activity content lives in:

`src/data/dateIdeas.ts`

Content owns the localized wording of each Memory Prompt. UI must not maintain a second prompt catalog.

## State Management Rule

Do not introduce Redux or another global state framework for this flow.

Use the existing localStorage adapter plus local React state where needed.

MD-002 transient states should remain local to the relevant flow container unless a small lifted state is required to coordinate the modal and Egg mini icon.

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
- persisted animation state
- animation-driven XP settlement

Add only the minimum code needed to keep the canonical contract, client-side flow state, XP idempotency, and Egg boundary correct.
