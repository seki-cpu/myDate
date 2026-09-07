# myDate UI Boundaries

## Product Priority

The UI must preserve this order:

1. Activity discovery
2. Random / quick choice
3. Lightweight filtering
4. Saved activities
5. Optional Egg layer

The Egg must not become the primary CTA or navigation gate.

## Mobile UI Developer Ownership

Primary ownership:

- `src/app/**`
- `src/components/activity/**`
- `src/components/layout/**`
- `src/components/ui/**`
- `src/components/egg/**`
- UI-related assets

The UI Developer may consume shared types and content but must not redefine them.

## Date Content Developer Ownership

Primary ownership:

- `src/data/dateIdeas.ts`
- future date-content assets directly tied to content

Content work must not rewrite page layout or component styling.

## Lead Architect Ownership

Primary ownership:

- `src/types/**`
- shared architecture boundaries
- cross-feature contracts
- persistence schema/version
- architecture documentation

## Troubleshooting Ownership

Troubleshooting has exception-based access across files only for confirmed integration bugs.

Rule:

> Fix the bug, not the architecture.

Do not use bug fixes as opportunities for unrelated rewrites.

## QA & Release Ownership

Primary ownership:

- tests
- e2e flows
- release checklist
- CI/release configuration

QA should report product bugs instead of silently building new product features on `release/v1`.

## Data Boundary Rule

Components must not hard-code independent activity datasets.

Bad:

```ts
const cards = [{ title: "Bookstore date" }];
```

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

Egg color personalization, if exposed, remains a small optional control rather than a dominant settings experience.
