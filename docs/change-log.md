# myDate Change Log

This file is the single coordination log for product changes moving through the myDate V1 development pipeline.

## Standard Delivery Flow

```text
Product Change
→ Architect
→ Content
→ UI
→ Architect Review
→ develop
→ Troubleshooting (only when integration/runtime/state bugs exist)
→ develop
→ release/v1
→ QA / Release
→ Architect Approval
→ master
→ Production
```

## Branch Responsibilities

- `master`
  - Production-ready code only.
  - Changes should arrive only after QA passes and Architect approval.

- `develop`
  - Integration and pre-release branch.
  - Approved feature work is merged here before release testing.

- `feature/date-content`
  - Date Ideas, localized content, Memory Prompts, and content documentation.

- `feature/ui-mobile`
  - Mobile-first pages, components, interaction, responsive behavior, and visual polish.

- `fix/integration-troubleshooting`
  - Small, targeted fixes for build, runtime, state, persistence, routing, merge, and integration defects.

- `release/v1`
  - Release candidate branch used for regression testing, release-blocking fixes, deployment verification, and production smoke testing.

## Role Order

### 1. Architect

The Architect goes first whenever a product change affects contracts, shared types, persistence, routing, XP rules, ownership boundaries, or cross-team behavior.

Responsibilities:

- define the canonical contract;
- keep V1 scope minimal;
- update architecture documentation when required;
- define ownership boundaries;
- review feature work before it reaches `develop`;
- approve release readiness before `master`.

### 2. Content

Content work starts only after the relevant product contract is stable.

Responsibilities:

- maintain Date Ideas;
- maintain localized copy;
- maintain Memory Prompts;
- keep content short, actionable, mobile-readable, and non-judgmental;
- avoid changing shared types without Architect approval.

### 3. UI

UI work consumes the approved contract and content.

Responsibilities:

- implement the mobile-first experience;
- preserve Activity First, Egg Second;
- implement interaction and visual states;
- avoid inventing competing schemas or business rules inside UI components.

### 4. Troubleshooting

Troubleshooting is not a mandatory stage for every product change.

Use it only when defects appear during development or integration.

Responsibilities:

- identify root cause;
- make the smallest possible fix;
- avoid unrelated refactors;
- escalate architecture changes to the Architect.

### 5. QA / Release

QA starts from the approved `develop` state through `release/v1`.

Responsibilities:

- regression testing;
- mobile viewport testing;
- persistence and corrupted-state recovery;
- refresh/back-navigation behavior;
- XP and hatch behavior;
- build and console verification;
- deployment verification;
- production smoke testing;
- final release report.

A release must not reach `master` unless QA passes and the Architect approves it.

## Change IDs

Every non-trivial product change should receive a stable ID:

```text
MD-001
MD-002
MD-003
...
```

Use the same ID across Architect, Content, UI, QA, issues, commits, and release notes where practical.

Example commit messages:

```text
feat(content): add memory prompts [MD-001]
feat(ui): add memory prompt completion flow [MD-001]
fix(state): prevent duplicate XP settlement [MD-001]
test(release): verify memory prompt flow [MD-001]
```

## Change Entry Template

Copy this section for each product change.

```md
## MD-XXX Change Title

Status: Proposed | Architecture | Content | UI | Integration | QA | Blocked | Released

Product decision:
- ...

Architect:
- Pending

Content:
- Pending / N/A

UI:
- Pending / N/A

Troubleshooting:
- Pending / N/A

QA:
- Pending

Release:
- Pending
```

---

## MD-001 Memory Prompt

Status: Architecture

Product decision:

- V1 does not upload or store user photos.
- Every DateIdea includes a Memory Prompt.
- The Memory Prompt suggests one meaningful photo the user may take with their own phone and keep in the normal phone gallery.
- The photo does not need to contain both people or even contain a person.
- myDate does not verify whether the photo was taken.
- Completing the prompt through `I got it` may contribute XP, while `Skip` remains available.

Target flow:

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

Architect:
- Pending canonical contract update and persistence review.

Content:
- Pending Memory Prompt coverage for V1 Date Ideas.

UI:
- Pending Memory Prompt completion flow.

Troubleshooting:
- Pending only if integration/state defects appear.

QA:
- Pending.

Release:
- Pending.
