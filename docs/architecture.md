# myDate V2 Architecture — MD-004 Memory First

## Product Statement

> People may change. The memories are still yours.

The permanent subject of myDate is the user. Dating partners and relationships may change over time, while completed experiences remain user-owned memories.

## Product Principles

1. Activity First.
2. Memory Second.
3. User-owned experiences.
4. No relationship KPI.
5. No relationship success/failure state.
6. Backend-free in V2.
7. No accounts in V2.
8. No Solo mode yet.
9. Keep V2 minimal.
10. Do not add abstractions for hypothetical future features.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- localStorage only
- no backend
- no user accounts
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

UI must not redefine domain models or access localStorage directly.

## Canonical DateIdea Contract

`DateIdea` remains the single activity-content contract. MD-004 does not rename or duplicate it.

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

`photoPrompt` remains the localized Memory Prompt. It suggests a photo the user may keep in their normal phone gallery. myDate does not upload, store, or verify photos.

## Canonical Memory Contract

Memory is the primary completed-experience domain object in V2.

```ts
type RatingScore = 1 | 2 | 3 | 4 | 5;

interface MemoryRating {
  overall?: RatingScore;
  fun?: RatingScore;
  comfort?: RatingScore;
  doAgain?: RatingScore;
}

interface Memory {
  id: string;
  dateIdeaId: string;
  completedAt: string;
  memoryPromptCompleted: boolean;
  rating?: MemoryRating;
}
```

`overall` exists so the V1 private 1–5 rating can migrate without inventing values for new V2 dimensions. V2 must never infer `fun`, `comfort`, or `doAgain` from a legacy overall score.

Partner identity, relationship state, XP, Egg progress, hatch state, and photo references are intentionally absent from Memory.

## Adventure Session Contract

An in-progress activity uses a lightweight session:

```ts
interface AdventureSession {
  id: string;
  dateIdeaId: string;
  startedAt: string;
}
```

A completed Adventure creates exactly one Memory.

The Memory reuses the AdventureSession id:

```text
AdventureSession.id === Memory.id
```

This is the V2 idempotency key. Calling completion repeatedly for the same id must never create duplicate Memories.

## Canonical V2 Flow

```text
Discover Date Idea
→ Let's do it
→ Adventure
→ Adventure Complete
→ Memory created
→ Memory Prompt
→ I got it / Skip
→ Experience Rating
→ Memory Reward Animation
→ +1 Memory
→ Memory saved / Memories
```

Business truth and presentation timing are intentionally different:

- Memory is persisted at **Adventure Complete**.
- `I got it` only changes `memoryPromptCompleted` to `true`.
- `Skip` leaves `memoryPromptCompleted` as `false`.
- Rating updates the existing Memory.
- The final `+1 Memory` animation acknowledges the already-persisted Memory. It does not create it.

Therefore refresh, back navigation, skipped prompts, interrupted animations, or repeated animation playback cannot lose or duplicate the Memory.

## Memory Prompt Semantics

Memory Prompt completion is trust-based.

```text
I got it → memoryPromptCompleted = true
Skip     → memoryPromptCompleted remains false
```

Skipping never prevents Memory creation.

Once `memoryPromptCompleted` becomes true, V2 does not downgrade it to false through repeated navigation.

## Rating Semantics

Rating belongs to the Memory, not to a relationship and not to an XP settlement event.

V1 migration places the legacy single rating in:

```ts
rating.overall
```

V2 UI may collect the optional experience dimensions `fun`, `comfort`, and `doAgain`, but MD-004 does not require all dimensions to exist for a Memory to be valid.

## Reward Animation Contract

The existing pale-yellow / champagne-gold reward animation is preserved and repurposed.

Old V1 meaning:

```text
stars → Egg → XP
```

V2 meaning:

```text
stars → Memories icon / Memory counter → +1 Memory
```

Recommended presentation state sequence:

```text
idle
→ memoryRewardModalOpen
→ memoryRewardAnimationPlaying
→ memoryRewardAnimationComplete
```

These states are view-only and must not be persisted.

The animation must target the real shared Memories icon or Memory counter derived from `memories.length`, not a decorative local copy.

Animation completion must not mutate Memory state. If reduced motion is enabled, replace traveling stars with a short `+1 Memory` acknowledgment and subtle counter glow.

## Persistence Boundary

All V2 persistence goes through `src/lib/storage.ts`.

Canonical V2 storage:

```text
key: mydate.save.v3
SaveData.version = 3
```

```ts
interface SaveData {
  version: 3;
  savedDateIds: string[];
  activeAdventures: AdventureSession[];
  memories: Memory[];
}
```

There is no XP field, Egg field, hatch field, relationship progress field, photo URL, or image data in V2 SaveData.

## V1 → V2 Migration

V2 reads the current V1 key `mydate.save.v2` when no valid V2 save exists.

For every V1 AdventureRecord with `completedAt`:

```text
V1 AdventureRecord
→ V2 Memory
```

Mapping:

```text
id                      → id
dateId                  → dateIdeaId
completedAt             → completedAt
memoryPromptStatus      → memoryPromptCompleted === "completed"
rating                  → rating.overall
xpAwarded               → ignored
egg                     → ignored
```

Incomplete V1 adventures do not become Memories.

V2 also tolerates the older `mydate.save.v1` shape with `completedDates[]`; valid completed dates migrate to Memories with `memoryPromptCompleted = false` and no rating.

Migration rules:

- Memory count comes from migrated completed experiences, never XP.
- Four completed V1 adventures become four V2 Memories.
- Invalid legacy records are skipped rather than crashing the app.
- Existing legacy storage keys are not required after a valid V2 save is written.
- Migration does not invent rating dimensions or Memory Prompt completion.

## Removed V2 Concepts

The following are obsolete and must not remain in V2 business state:

- XP and XP settlement
- XP delta badge
- Egg system
- Egg customization
- Egg progress
- hatch system / hatchGoal / isHatched
- eggColor
- petName / pet naming
- relationship progression
- love progression

## Scope Protection

Do not add:

- backend APIs
- accounts
- cloud sync
- photo upload/storage
- relationship identity models
- partner profiles
- Solo mode
- replacement gamification currency
- a second Memory contract
- a second storage path
- persisted animation state

MD-004 is complete when completed activities reliably become user-owned Memories and all V1 Egg/XP progression dependencies are removed from the V2 flow.
