# myDate V2/V3 Architecture — Memory First

## Product Statement

> People may change. The memories are still yours.

The permanent subject of myDate is the user. Dating partners and relationships may change over time, while completed experiences remain user-owned memories.

## Product Principles

1. Activity First.
2. Memory Second.
3. User-owned experiences.
4. No relationship KPI.
5. No relationship success/failure state.
6. Backend-free.
7. No accounts.
8. No Solo mode yet.
9. Keep the product minimal.
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

`DateIdea` remains the single built-in activity-content contract.

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

`photoPrompt` remains the localized Memory Prompt. myDate does not upload, store, or verify photos.

## Stable Activity Identity

Historical state must never depend on activity title.

```ts
type ActivitySource = "builtin" | "custom";

interface ActivityIdentity {
  source: ActivitySource;
  id: string;
}
```

Built-in activities use their stable `DateIdea.id` with `source: "builtin"`.

User-created activities use a generated stable id with `source: "custom"`. Editing a custom activity may change its title or content but must not change this id. Deleting the custom activity removes the editable activity definition only; existing Memories remain intact.

## Activity Snapshot

Every Adventure and Memory carries a small presentation snapshot:

```ts
interface ActivitySnapshot {
  identity: ActivityIdentity;
  title?: string;
}
```

`identity` is authoritative for historical matching. `title` is only a presentation fallback so an old Memory can still render after the source activity is renamed or deleted.

Do not match historical state using `activitySnapshot.title`.

## Canonical Memory Contract

Memory is the primary completed-experience domain object.

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
  activitySnapshot: ActivitySnapshot;
  completedAt: string;
  memoryPromptCompleted: boolean;
  rating?: MemoryRating;
}
```

`overall` preserves the V1 single-score rating without inventing values for new dimensions.

Partner identity, relationship state, XP, Egg progress, hatch state, and photo references are intentionally absent from Memory.

## Adventure Session Contract

An in-progress activity uses:

```ts
interface AdventureSession {
  id: string;
  activitySnapshot: ActivitySnapshot;
  startedAt: string;
}
```

A completed Adventure creates exactly one Memory with the same id:

```text
AdventureSession.id === Memory.id
```

This is the completion idempotency key.

## Canonical Flow

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
→ Memories
```

Business truth and presentation timing are intentionally different:

- Memory is persisted at Adventure Complete.
- `I got it` only changes `memoryPromptCompleted` to `true`.
- `Skip` leaves it `false`.
- Rating updates the existing Memory.
- The final `+1 Memory` animation acknowledges the already-persisted Memory.

## Historical Tried vs Current Discovery Round

These are two separate concepts and must never share one boolean.

### Historical Tried

Historical state is derived from Memories:

```text
hasTried(activity)
=
exists Memory where
memory.activitySnapshot.identity == activity.identity
```

Canonical helper behavior:

```ts
hasTriedActivity(identity)
getTriedCount(identity)
```

`hasTriedActivity` is the V3 UI requirement. `getTriedCount` is provided so future `Tried 2 times` UI does not require a data migration, but repetition count display is not required now.

Starting a new discovery round never changes historical Tried state.

Recommended labels:

- English: `Tried`
- Chinese: `做过`
- Japanese: `体験済み`

Avoid `Completed`, because an activity may be repeated in future rounds.

### Current Discovery Round

The random discovery algorithm uses resettable state:

```ts
interface DiscoveryRound {
  completedActivityKeys: string[];
}
```

The key is generated from stable identity, not title.

Completing an Adventure adds its activity key to the current round once. Starting a new round clears only this array.

```text
complete Adventure
→ Memory persists forever
→ Tried becomes true forever
→ excluded from current random round

Start a new round
→ current-round exclusion resets
→ Tried remains true
→ activity becomes random-eligible again
```

This applies identically to built-in and custom activities.

## Memory Prompt Semantics

Memory Prompt completion is trust-based.

```text
I got it → memoryPromptCompleted = true
Skip     → memoryPromptCompleted remains false
```

Skipping never prevents Memory creation. Once true, the flag is not downgraded by repeated navigation.

## Rating Semantics

Rating belongs to the Memory, not to a relationship and not to a reward settlement event.

Legacy single rating migrates to `rating.overall`. Do not infer `fun`, `comfort`, or `doAgain` from it.

## Reward Animation Contract

The existing pale-yellow / champagne-gold reward animation is preserved and repurposed.

```text
stars → Memories icon / Memory counter → +1 Memory
```

Recommended presentation state:

```text
idle
→ memoryRewardModalOpen
→ memoryRewardAnimationPlaying
→ memoryRewardAnimationComplete
```

These states are view-only and never persisted. The animation targets the real shared Memories counter derived from `memories.length`. Animation completion must not mutate Memory state.

## Persistence Boundary

All persistence goes through `src/lib/storage.ts`.

Canonical storage:

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
  discoveryRound: DiscoveryRound;
}
```

There is no XP, Egg, hatch, relationship progress, photo URL, or image data in SaveData.

Historical Tried is not persisted as a separate boolean. It is always derived from `memories`.

## V1 → Current Migration

When no valid current save exists, valid completed V1 adventures migrate one-to-one into Memories.

Legacy built-in ids become:

```ts
activitySnapshot.identity = {
  source: "builtin",
  id: legacyDateId,
};
```

Legacy migration initializes `discoveryRound.completedActivityKeys` as empty. Historical Memories therefore immediately show Tried, while upgraded users begin with a fresh random-discovery round.

Migration rules:

- Memory count comes from completed experiences, never XP.
- Invalid legacy records are skipped rather than crashing.
- Legacy XP/Egg state is ignored.
- Legacy rating maps only to `rating.overall`.
- Migration does not infer current-round exclusions from historical Memories.

## Removed Concepts

The following must not remain in business state:

- XP and XP settlement
- XP delta badge
- Egg system / customization / progress
- hatch system / hatchGoal / isHatched
- eggColor
- petName
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
- a separate `tried` boolean
- title-based historical matching
- persisted animation state

The architecture is correct when activity completion reliably creates user-owned Memories, current-round random exclusion resets independently, and historical Tried remains stable through refresh, new rounds, custom edits, and custom deletion.
