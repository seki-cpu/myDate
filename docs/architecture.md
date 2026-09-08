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

Canonical shared interfaces live in `src/types/domain.ts`.

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

`photoPrompt` is the required localized Memory Prompt. It never represents an uploaded or stored image.

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

## Adventure Identity and XP Idempotency

Every started activity gets a unique `adventureId`.

XP values are fixed:

- adventure complete: +20 XP
- Memory Prompt completed with `I got it`: +5 XP
- rating completed: +5 XP

Each AdventureRecord persists three award flags:

```ts
xpAwarded: {
  adventure: boolean;
  memoryPrompt: boolean;
  rating: boolean;
}
```

These flags are the source of truth for exactly-once settlement. Total XP is derived from them and must never be maintained as an unguarded incrementing counter.

The Memory Prompt +5 XP is committed when `I got it` resolves the Memory Prompt through the shared persistence adapter. Modal confirmation and reward animation are presentation-only and cannot grant XP.

`Skip` resolves the Memory Prompt with 0 XP and still continues to Rating.

## Rating Contract

V1 Rating is a private per-adventure score:

```ts
type DateRating = 1 | 2 | 3 | 4 | 5;
```

The value is stored on the AdventureRecord:

```ts
rating?: DateRating;
ratingCompletedAt?: string;
```

Submitting a valid rating grants +5 XP exactly once for that `adventureId`.

The rating value may later be changed without granting additional XP. Rating must not be available while Memory Prompt status is still `pending`.

The canonical UI continuation is:

```text
Memory Prompt resolved
→ /rating?adventureId=<id>
→ submit 1–5 rating
→ XP settlement / Egg progress
```

The exact route path may be implemented by UI, but Rating must remain a distinct step tied to the same `adventureId`.

## Egg Progression Contract

Egg progression is **derived from persisted XP**, not stored as a second progress counter.

Canonical V1 hatch threshold:

```text
100 XP
```

Derived stages:

```text
0–24 XP   dormant
25–49 XP  warming
50–74 XP  glowing
75–99 XP  cracking
100+ XP   hatched
```

`getEggProgress(saveData)` is the canonical derivation boundary.

The result exposes:

- total XP
- hatch threshold
- normalized progress from 0 to 1
- stage
- hatched boolean

Hatching is deterministic: if persisted XP is at least 100, the Egg is hatched. No separate `eggProgress`, `eggXp`, or `hatched` field is persisted.

This avoids conflicting state such as saved XP saying 80 while a separately stored Egg counter says 60.

## MD-002 Reward Burst Boundary

UI-only reward states are:

```text
idle
→ rewardModalOpen
→ rewardAnimationPlaying
→ rewardAnimationComplete
```

These states are never written to SaveData.

Sequence:

```text
I got it
→ resolveMemoryPrompt(adventureId, "completed")
→ open reward modal
→ OK
→ star burst toward shared Egg mini icon
→ Egg glow / bump
→ continue to Rating
```

Interrupted or skipped animation must not change XP correctness.

The animation target must be the actual shared Egg mini/progress UI state derived from persisted XP, not a decorative duplicate owned by the animation component.

Reduced-motion may replace particle travel with a short +5 XP acknowledgment and Egg glow.

## Persistence Boundary

All V1 adventure progress goes through `src/lib/storage.ts`.

The adapter owns:

- starting AdventureRecord
- adventure completion
- Memory Prompt resolution
- Rating persistence and settlement
- total XP derivation
- Egg progress derivation
- safe localStorage parsing and recovery

UI must not write localStorage directly.

`SaveData.version = 2` remains the V1 schema for this contract.

## Scope Protection

Do not add:

- image upload/storage/backend
- duplicate DateIdea contracts
- separate XP counters
- separately persisted Egg progress
- reward service layers
- Redux solely for this flow
- animation state in SaveData

Add only the minimum code required for canonical flow state, idempotent XP, Rating continuity, and deterministic Egg progression.
