# myDate UI Boundaries

## Product Priority

The UI must preserve this order:

1. Activity discovery
2. Random / quick choice
3. Adventure flow
4. Memory Prompt
5. Rating
6. XP settlement
7. Egg progress

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
- provide the rating step
- call shared persistence helpers for adventure / Memory Prompt / rating completion
- display XP settlement and Egg progress feedback
- preserve `adventureId` through refresh/back navigation

UI must not:

- redefine DateIdea
- maintain a second Memory Prompt catalog
- upload photos
- store photo URLs
- access localStorage directly
- grant XP by unguarded local component increments

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

## Troubleshooting Ownership

Troubleshooting has exception-based access across files only for confirmed integration bugs.

Rule:

> Fix the bug, not the architecture.

Troubleshooting may fix broken `adventureId` propagation, stale flow state, or integration failures, but must not invent a second XP system, DateIdea contract, or persistence path.

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

XP and Egg feedback should feel like a lightweight reward after the activity, not the reason to use the product.
