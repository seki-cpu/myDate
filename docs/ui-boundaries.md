# myDate V2 Ownership Boundaries — MD-004 Memory First

## Product Priority

The UI must preserve this order:

1. Activity discovery
2. Random / lightweight category filtering
3. Adventure flow
4. Memory Prompt
5. Experience Rating
6. Memory reward feedback
7. Memories

The product must not present relationship progression, Egg progression, XP, hatch state, or love/progress scoring.

## Mobile UI Developer Ownership

Primary ownership:

- `src/app/**`
- `src/components/activity/**`
- `src/components/layout/**`
- `src/components/ui/**`
- `src/components/memory/**` if introduced
- UI-related assets

UI responsibilities:

- consume the canonical `DateIdea`, `AdventureSession`, and `Memory` contracts
- preserve the active adventure id until completion
- after `completeAdventure()`, continue the flow using the resulting Memory id
- render localized `photoPrompt`
- implement `I got it` / `Skip`
- update Memory Prompt completion through the shared storage adapter
- collect private experience rating and update the existing Memory
- repurpose the existing gold-star reward effect toward the real Memories icon / Memory counter
- show `+1 Memory` as presentation feedback only
- render Memories from canonical persisted `memories[]`
- make the shared Memory counter hydration-safe
- respect reduced-motion preferences

UI must not:

- redefine shared domain types
- write localStorage directly
- create a Memory from animation completion
- derive Memory count from XP
- keep Egg or XP UI as a hidden source of truth
- maintain a decorative duplicate Memory counter as the reward target
- upload, store, or verify photos

### Reward Component Boundary

The flow/container component owns orchestration:

```text
persist business state
→ local reward state
→ presentation animation
→ next navigation state
```

The animation component is view-only. It may receive source/target positions, reduced-motion state, and a UI completion callback. It must not receive storage mutation responsibilities.

## Date Content Developer Ownership

Primary ownership:

- `src/data/dateIdeas.ts`
- content documentation directly tied to date ideas

Content responsibilities:

- preserve one canonical localized `photoPrompt` for every DateIdea
- keep zh/en/ja complete
- keep prompts focused on meaningful visual details the user can save in their own phone gallery
- avoid wording that implies upload, verification, relationship success, or couple permanence

MD-004 does not require a content schema rewrite. `photoPrompt` remains the canonical localized Memory Prompt field.

Content must not:

- introduce a second Memory Prompt catalog
- add partner identity or relationship score fields
- modify shared domain types
- implement persistence or UI logic

## Lead Architect Ownership

Primary ownership:

- `src/types/**`
- `src/lib/storage.ts`
- persistence schema/version
- V1 → V2 migration contract
- Memory identity/idempotency rules
- architecture and ownership documentation

Architect owns these invariants:

- one completed Adventure creates exactly one Memory
- Memory id reuses the AdventureSession id
- Memory exists independently of Memory Prompt completion
- Memory count is `memories.length`, never XP-derived
- legacy XP/Egg state does not enter V2 business state
- no relationship KPI is reintroduced under another name

## Troubleshooting Ownership

Troubleshooting may fix confirmed integration defects across files, but must preserve the V2 contract.

Typical allowed fixes:

- lost adventure/memory id across navigation
- duplicate Memory creation caused by UI replay
- migration failures for valid legacy records
- corrupted localStorage recovery
- stale Memory counter after a persisted update
- reward animation targeting the wrong Memories element
- reduced-motion failures
- hydration mismatch in Memory counter/list UI

Troubleshooting must not:

- reintroduce XP or Egg state as a shortcut
- add a second persistence key for feature-specific state
- create Memories from animation callbacks
- infer memories from legacy XP
- invent partner or relationship state

Non-trivial changes to domain types, migration, or persistence require Architect review.

## QA & Release Ownership

Primary ownership:

- tests
- e2e flows
- migration regression
- release checklist
- release branch and production verification

QA must verify:

- completed Adventure creates one Memory exactly once
- Skip still produces a Memory
- `I got it` sets `memoryPromptCompleted = true`
- repeated `I got it` cannot duplicate a Memory
- private rating updates the same Memory
- Memory reward animation does not create or increment business state
- Memory counter equals persisted Memory count
- V1 completed adventures migrate one-to-one into V2 Memories
- V1 XP/Egg state is ignored
- corrupted current or legacy data fails safely
- no Egg/XP/relationship progression UI remains reachable
- no photo upload/storage/backend behavior is introduced
- zh/en/ja primary flow remains intact
- mobile and reduced-motion behavior remains usable

QA should report product defects rather than adding new features on the release branch.

## Obsolete V1 UI

The following V1 UI concepts are obsolete in V2 and should be removed by UI after the V2 contract is integrated:

- `/egg` route
- `EggMiniProgress`
- `EggView`
- Egg-specific CSS modules/assets
- Egg links in `MobileShell` or Memories
- XP labels / XP delta feedback
- hatch/progression copy and visuals

The existing `RewardBurst` visual may be reused after making its target semantics generic or Memory-specific.

## Data Boundary Rule

Components must consume canonical sources:

```ts
import { dateIdeas } from "@/data/dateIdeas";
import { getMemories } from "@/lib/storage";
```

There must be one canonical date idea source and one canonical persisted Memory source.
