# myDate V1 Architecture

## Architecture Goal

Keep V1 small, but make later feature expansion possible without rewriting the product core.

The architecture follows one rule:

**Activity First, Egg Second.**

## Proposed Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React state / Context only when needed
- localStorage for V1 persistence
- Vitest + React Testing Library
- Playwright for critical mobile flows
- Vercel for preview and production deployment

## Layering

```text
UI / routes
   ↓
shared domain types
   ↓
content source + persistence adapter
```

UI components must not redefine domain models or access localStorage directly.

## Proposed Directory Shape

```text
src/
  app/
  components/
    activity/
    egg/
    layout/
    ui/
  data/
    dateIdeas.ts
  lib/
    storage.ts
  types/
    domain.ts

docs/
  product-design-v1.md
  architecture.md
  branch-policy.md
  ui-boundaries.md
  release-checklist.md
```

## Domain Contract Ownership

Canonical shared interfaces live in:

`src/types/domain.ts`

No feature branch may create a competing `DateIdea` or `SaveData` interface.

## Date Content

Canonical V1 content lives in:

`src/data/dateIdeas.ts`

There must be exactly one source of truth for date ideas.

UI may read this source, but content ownership belongs to the Date Content Developer.

## Persistence

All V1 persistence goes through:

`src/lib/storage.ts`

Components should never scatter direct `localStorage.getItem` / `setItem` calls throughout the codebase.

This boundary lets V1 use localStorage now while allowing a later cloud repository or Supabase adapter without changing activity UI contracts.

## Extension Strategy

V1 static content may later evolve into:

```text
static DateIdea[]
      ↓
remote content repository / database
```

V1 local persistence may later evolve into:

```text
localStorage
      ↓
authenticated cloud sync
```

V1 simple discovery may later evolve into:

```text
filters + random
      ↓
recommendation engine
```

The `DateIdea` model must remain independent from Egg state, user accounts, rewards, and recommendation scores.

## State Management Rule

Do not introduce Redux or another global state framework in V1 unless actual cross-page state complexity proves it necessary.

Preferred order:

1. local component state
2. lifted React state
3. Context for truly shared lightweight state
4. Zustand only if V1 complexity genuinely requires it

## Scope Protection

Avoid premature abstractions such as:

- service containers
- dependency injection frameworks
- repository hierarchies for every entity
- backend APIs before a backend exists
- duplicated DTO/domain types
- speculative Egg/game systems

Add abstractions only where they protect a known boundary: domain contracts, content source, or persistence.
