# myDate UI Boundaries

## Product Priority

The UI must preserve this order:

1. Activity discovery
2. Random / quick choice
3. Adventure flow
4. Memory Prompt
5. Reward feedback
6. Rating
7. XP settlement
8. Egg progress

The Egg must not become the primary CTA or navigation gate.

## Mobile UI Developer Ownership

Primary ownership:

- `src/app/**`
- `src/components/activity/**`
- `src/components/layout/**`
- `src/components/ui/**`
- `src/components/egg/**`
- UI-related assets

UI responsibilities for the V1 flow:

- consume the canonical DateIdea contract
- render localized `photoPrompt` after completion
- provide `I got it` and `Skip`
- call shared persistence helpers for adventure / Memory Prompt / rating completion
- preserve `adventureId` through refresh/back navigation
- implement MD-002 reward feedback after successful `I got it`
- implement the local presentation state sequence:
  - `idle`
  - `rewardModalOpen`
  - `rewardAnimationPlaying`
  - `rewardAnimationComplete`
- show a lightweight reward modal before the animation
- animate a small pale-yellow / champagne-gold star burst toward the Egg mini icon
- make the Egg mini icon glow / bump once
- respect reduced-motion preferences with a simpler fallback where feasible
- continue to Rating even if the animation is skipped or interrupted

UI must not:

- redefine DateIdea
- maintain a second Memory Prompt catalog
- upload photos
- store photo URLs
- access localStorage directly
- grant XP by unguarded local component increments
- make XP settlement depend on animation completion
- persist reward modal or animation state
- let animation components call persistence helpers directly

### MD-002 Component Boundary

The flow/container component owns orchestration:

```text
user action
→ persistence adapter call
→ local reward UI state
→ presentation animation
→ next step
```

View-only animation components may receive props such as:

- whether they are active
- source position
- Egg target position
- reduced-motion flag
- completion callback for UI sequencing only

They must not receive SaveData mutation responsibilities.

## Date Content Developer Ownership

Primary ownership:

- `src/data/dateIdeas.ts`
- future date-content assets directly tied to content

Content responsibilities:

- every DateIdea must contain localized `photoPrompt`
- `photoPrompt` must provide `zh`, `en`, and `ja`
- Memory Prompts should suggest one meaningful visual detail rather than default to posed couple photos
- prompts may reference environment, objects, body details, shadows, food, souvenirs, creations, or small visual details

Content must not:

- change shared types
- create another prompt lookup table
- add upload/storage language to Memory Prompts
- rewrite UI layout or business logic

## Lead Architect Ownership

Primary ownership:

- `src/types/**`
- `src/lib/storage.ts` persistence boundary
- shared architecture boundaries
- cross-feature contracts
- persistence schema/version
- XP idempotency contract
- architecture documentation

Architect owns the rule that each started activity gets a unique `adventureId` and each XP source can be awarded at most once for that id.

For MD-002, Architect also owns the rule that reward animation is presentation-only and requires no new SaveData field.

## Troubleshooting Ownership

Troubleshooting has exception-based access across files only for confirmed integration bugs.

Rule:

> Fix the bug, not the architecture.

Troubleshooting may fix:

- broken `adventureId` propagation
- stale flow state
- modal that cannot dismiss
- animation that never completes its UI callback
- star burst targeting the wrong Egg icon
- reduced-motion fallback failures
- visual replay bugs
- integration failures between the flow container and Egg mini icon

Troubleshooting must not:

- invent a second XP system
- add persisted animation flags
- move XP settlement into animation callbacks
- create a second DateIdea contract or persistence path

Any non-trivial change to XP settlement, storage schema, or domain types requires Architect review.

## QA & Release Ownership

Primary ownership:

- tests
- e2e flows
- release checklist
- CI/release configuration

QA must verify:

- every DateIdea includes a localized Memory Prompt
- no photo upload/storage/backend behavior exists
- `I got it` grants Memory Prompt XP once
- `Skip` grants no Memory Prompt XP
- adventure completion grants +20 once
- rating completion grants +5 once
- refresh/back/repeated actions do not duplicate any XP source
- the same DateIdea can be started again as a new adventure and earn XP normally
- Egg progress reads the correct derived XP

MD-002 QA must additionally verify:

- tapping `I got it` attempts business settlement before reward presentation
- reward modal opens after the action
- tapping `OK` starts the presentation-only reward animation
- star burst travels toward the Egg mini icon under normal motion settings
- Egg mini icon glows / bumps once
- interrupting or skipping the animation does not lose or duplicate XP
- refreshing after `I got it` does not grant another +5 XP
- going back and tapping `I got it` again does not grant another +5 XP
- replaying a visual effect does not change persisted XP
- reduced-motion users receive a simpler non-traveling feedback where supported
- Rating remains reachable even if the animation is interrupted

QA should report product bugs instead of silently changing architecture on `release/v1`.

## Data Boundary Rule

Components must not hard-code independent activity datasets or Memory Prompts.

Good:

```ts
import { dateIdeas } from "@/data/dateIdeas";
```

There must be one canonical DateIdea source in V1.

## Visual Direction

V1 visual language:

- mobile first
- white dominant background
- subtle gold accent / shimmer
- minimal and calm
- quick scanning
- limited decoration
- generous but not wasteful spacing

MD-002 reward feedback should use:

- small pale-yellow / champagne-gold stars
- restrained particle count
- short duration
- one directional motion toward Egg
- one soft Egg glow / bump
- no loud arcade-heavy presentation

XP and Egg feedback should feel like a lightweight reward after the activity, not the reason to use the product.
