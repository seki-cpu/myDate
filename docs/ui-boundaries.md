# myDate V2/V3 Ownership Boundaries — Memory First

## Product Priority

The UI must preserve this order:

1. Activity discovery
2. Random / lightweight category filtering
3. Adventure flow
4. Memory Prompt
5. Experience Rating
6. Memory reward feedback
7. Memories

Historical `Tried` is secondary metadata. It must never visually dominate activity discovery.

## Mobile UI Developer Ownership

Primary ownership:

- `src/app/**`
- `src/components/activity/**`
- `src/components/layout/**`
- `src/components/ui/**`
- `src/components/memory/**` if introduced
- UI-related assets

UI responsibilities:

- consume canonical `DateIdea`, `ActivityIdentity`, `ActivitySnapshot`, `AdventureSession`, and `Memory`
- preserve stable activity identity across built-in and custom activity flows
- render `Tried` from `hasTriedActivity(identity)` wherever practical: Discover cards, filtered lists, My Ideas, and activity detail
- localize the indicator as `Tried` / `做过` / `体験済み`
- keep Tried visually subtle
- use current-round completion only for random-discovery eligibility
- provide `Start a new round` behavior through the shared storage adapter
- after `completeAdventure()`, continue using the resulting Memory id
- render localized `photoPrompt`
- implement `I got it` / `Skip`
- update Memory Prompt completion through the shared adapter
- collect private experience rating and update the existing Memory
- repurpose the gold-star reward toward the real Memories icon / counter
- render persisted Memories
- keep Memory counter hydration-safe
- respect reduced-motion preferences

UI must not:

- redefine shared domain types
- write localStorage directly
- persist a separate `tried` boolean
- clear Tried when starting a new round
- match history by activity title
- create a Memory from animation completion
- derive Memory count from XP
- reintroduce Egg/XP UI as hidden business state
- upload, store, or verify photos

## Historical Tried Boundary

The UI must treat these as different inputs:

```text
historical Tried
→ derived from Memory.activitySnapshot.identity

current-round completed
→ derived from discoveryRound.completedActivityKeys
```

A new discovery round resets only the second input.

Repeated experiences remain separate Memories. V3 only needs a boolean indicator, but UI may later use `getTriedCount(identity)` without schema changes.

For custom activities, UI must keep the generated stable id unchanged when title/content is edited. Deleting a custom activity must never delete its Memories.

## Reward Component Boundary

The flow/container owns orchestration:

```text
persist business state
→ local reward state
→ presentation animation
→ next navigation state
```

The animation component is view-only and must not mutate Memory or discovery state.

## Date Content Developer Ownership

Primary ownership:

- `src/data/dateIdeas.ts`
- content documentation directly tied to date ideas

Content responsibilities:

- keep built-in `DateIdea.id` stable once released; ids are historical identity
- preserve one canonical localized `photoPrompt` for every DateIdea
- keep zh/en/ja complete
- avoid upload, verification, relationship-success, or permanence wording

Content must not:

- rename/recycle an existing built-in id for a different activity
- use title as identity
- introduce a second Memory Prompt catalog
- add partner identity or relationship score fields
- modify shared domain types

## Lead Architect Ownership

Primary ownership:

- `src/types/**`
- `src/lib/storage.ts`
- persistence schema/version
- migration contract
- stable activity identity and snapshot rules
- Memory idempotency
- discovery-round vs historical-state separation
- architecture documentation

Architect invariants:

- one completed Adventure creates exactly one Memory
- Memory id reuses AdventureSession id
- Historical Tried is derived from Memory history
- Current-round exclusion is resettable and separate
- Built-in/custom matching uses stable identity, never title
- deleting an activity definition cannot delete existing Memories
- Memory count is `memories.length`, never XP-derived
- no relationship KPI is reintroduced under another name

## Troubleshooting Ownership

Allowed fixes include:

- lost activity/adventure/memory id across navigation
- duplicate Memory creation
- duplicate current-round keys
- stale Tried indicator after Memory persistence
- new-round reset accidentally clearing historical display
- custom edit breaking identity propagation
- migration failures
- corrupted localStorage recovery
- stale Memory counter
- reward target or reduced-motion failures
- hydration mismatches

Troubleshooting must not:

- add a second Tried store/boolean
- match activity history by title
- reintroduce XP/Egg state
- add a second persistence path
- create Memories from animation callbacks
- delete Memories when a custom activity is deleted

Non-trivial changes to identity, migration, or persistence require Architect review.

## QA & Release Ownership

QA must verify:

- completed Adventure creates one Memory exactly once
- completing an activity shows Tried
- refresh does not remove Tried
- starting a new round does not remove Tried
- a Tried activity is eligible again in a new round
- repeated completion does not create duplicate current-round keys
- built-in and custom activities use the same semantics
- editing a custom activity keeps Tried through stable identity
- deleting a custom activity leaves existing Memories intact
- title changes/collisions do not affect historical matching
- Skip still preserves Memory
- `I got it` updates the same Memory
- rating updates the same Memory
- reward animation does not create or increment business state
- legacy completed adventures migrate to Memories
- corrupted current/legacy data fails safely
- no Egg/XP/relationship progression remains
- no photo upload/storage/backend behavior exists
- zh/en/ja primary flow remains intact

## Obsolete V1 UI

Remove after V2/V3 integration:

- `/egg`
- `EggMiniProgress`
- `EggView`
- Egg-specific styles/assets
- Egg links
- XP labels/delta feedback
- hatch/progression copy and visuals

The existing `RewardBurst` may be reused after making its target Memory-specific or generic.

## Data Boundary Rule

Components must consume canonical sources and helpers. There must be one canonical activity source per activity kind and one persisted Memory source.
