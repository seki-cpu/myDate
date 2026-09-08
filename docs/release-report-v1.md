# myDate V1 Release Report

Date: 2026-09-08
Release branch: `release/v1`
Release mode: **Lightweight Beta**
Change: `MD-002 Reward Burst to Egg`
Source PR: #10 `UI: MD-002 reward burst to Egg`
Architect contract commit on `develop`: `83a9c2c5cca4df7ef0b2143cb821c2ea57276546`
PR #10 merge commit on `develop`: `b9cff53417e7b8536d17818571dab07cf0464806`
Release build fix: `149ba51ef6e9229940cdd2faabbad1e28553b8fa`

## Overall Decision

**APPROVED FOR LIGHTWEIGHT BETA MERGE TO `master`**

This is not final GA approval. The current release candidate has passed architecture/integration review, QA static review, TypeScript typecheck, and Next.js production build. The product owner explicitly chose to ship a lightweight beta before the full mobile/runtime/production smoke matrix is complete.

Known remaining GA gates are documented below and must still be completed before calling the release fully production-verified.

## Build Evidence

A release-only GitHub Actions workflow now runs:

- dependency install with the locked pnpm version
- `pnpm typecheck`
- `pnpm build`

The first run exposed one real TypeScript narrowing issue in `ResultContent.tsx`. That release blocker was fixed without changing behavior by capturing the selected `ideaId` after the existing null guard.

The second run on commit `149ba51ef6e9229940cdd2faabbad1e28553b8fa` passed both TypeScript typecheck and the Next.js production build.

## Integrated V1 Scope

Confirmed in the current release candidate:

- 32 localized Date Ideas in zh / en / ja
- localized Memory Prompt on every V1 DateIdea
- no photo upload, photo storage, photo verification, or backend
- unique `adventureId` per started date
- Adventure completion settles +20 XP exactly once
- Memory Prompt `I got it` settles +5 XP exactly once before reward presentation
- Memory Prompt `Skip` settles 0 Memory Prompt XP and continues to Rating
- reward modal + champagne-gold star burst targets the shared Egg mini
- reward animation itself never writes XP
- Rating remains tied to the same `adventureId` and settles +5 XP exactly once
- Egg internal progression derives from canonical persisted XP state
- V1 intentionally hides visible Egg XP totals, progress bars, stage labels, cracking, and hatch visuals
- Egg mini remains the canonical reward target and still reacts with bump/glow
- reduced-motion reward behavior remains implemented
- Adventure back navigation preserves the selected DateIdea
- category / duration / cost metadata remain localized

## MD-002 Regression Status

| # | Check | Status |
|---|---|---|
| 1 | `I got it` shows reward modal | PASS (static) |
| 2 | Modal copy readable on mobile | PENDING runtime smoke |
| 3 | `OK` starts reward animation | PASS (static) |
| 4 | Stars travel toward shared Egg mini | PASS (static), runtime timing pending |
| 5 | Egg mini reacts on arrival | PASS (static), runtime timing pending |
| 6 | Flow continues to Rating | PASS (static) |
| 7 | `I got it` grants exactly +5 XP | PASS (logic) |
| 8 | `I got it` cannot grant twice | PASS (logic) |
| 9 | Repeated `OK` cannot duplicate XP | PASS (logic) |
| 10 | Refresh during reward cannot duplicate XP | PASS (logic), runtime pending |
| 11 | Back navigation cannot duplicate XP | PASS (logic), runtime pending |
| 12 | Visual replay cannot replay XP | PASS (logic) |
| 13 | Internal Egg state matches saved XP | PASS (logic), runtime pending |
| 14 | Effect remains subtle | PASS (static) |
| 15 | Champagne-like star color | PASS (static) |
| 16 | Supported mobile sizes | PENDING runtime smoke |
| 17 | No control-blocking overlap | PENDING runtime smoke |
| 18 | Reduced motion | PASS (static), runtime pending |
| 19 | Rapid interaction console safety | PENDING runtime smoke |
| 20 | Skip still works | PASS (static) |
| 21 | Rating follows reward flow | PASS (static), runtime pending |
| 22 | Adventure → Complete → Memory Prompt → Rating → XP | PASS (static), runtime pending |
| 23 | Internal 100-XP hatch state remains correct | PASS (logic), runtime pending |
| 24 | localStorage persistence contract | PASS (logic), runtime pending |

## Lightweight Egg Scope

V1 shows:

- the Egg mini icon
- the reward-arrival bump/glow
- a lightweight Egg detail page

V1 intentionally does not show:

- XP totals
- progress bars
- stage labels
- cracking visuals
- hatch visuals

Internal progression remains active for persistence and future compatibility.

## Remaining Final-GA Gates

Before calling this release fully production-verified, complete:

- 320 × 568 mobile smoke
- 375 × 812 mobile smoke
- 390 × 844 mobile smoke
- 430 × 932 mobile smoke
- rapid repeated interaction checks
- refresh / back / forward runtime persistence checks
- reduced-motion runtime verification
- browser console verification
- deployed production smoke of Home → Result → Adventure → Complete → Memory Prompt → Rating → Home

## Release Decision

**QA decision for this request: APPROVED FOR LIGHTWEIGHT BETA.**

`release/v1` may be merged into `master` for an early lightweight release. This approval intentionally accepts the documented runtime-smoke gaps and must not be represented as final GA certification.
