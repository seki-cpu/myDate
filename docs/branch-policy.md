# myDate Branch Policy

## Protected Flow

```text
feature/ui-mobile ───────────────┐
feature/date-content ────────────┼─> PR review -> develop
fix/integration-troubleshooting ─┘
                                      ↓
                                  release/v1
                                      ↓
                                   master
```

`master` is production only.

## Branches

### master

Production branch.

No feature agent may merge directly into `master`.

### develop

Integration branch owned by the Lead Architect / Code Owner.

Feature branches target `develop` through reviewed pull requests.

### feature/ui-mobile

Owned by Mobile UI Developer.

### feature/date-content

Owned by Date Content Developer.

### fix/integration-troubleshooting

Owned by Troubleshooting Engineer.

Fixes must use minimal diffs and may cross file ownership only when required to repair a confirmed integration problem.

### release/v1

Owned jointly by QA & Release Engineer and Lead Architect.

No new product feature should be developed directly on this branch.

### architecture/v1-foundation

Temporary bootstrap branch owned by Lead Architect.

Purpose:

- product design baseline
- architecture docs
- shared TypeScript contracts
- persistence boundary

It should be reviewed before becoming the starting foundation for `develop`.

## Merge Rules

Feature agents may commit to their own branches, but may not self-merge into `develop` or `master`.

Expected flow:

```text
feature branch
→ pull request
→ Lead Architect review
→ develop
→ integration fixes if required
→ release/v1
→ QA + Architect review
→ master
```

## Shared Contract Changes

Changes to any of the following require Lead Architect ownership or explicit approval:

- `src/types/**`
- architecture docs
- branch policy
- persistence schema/version
- package/framework-level architecture choices

## Minimal Refactor Rule

Do not refactor unrelated code while implementing a feature or bug fix.

A pull request should solve the requested problem with the smallest reasonable architectural surface.
