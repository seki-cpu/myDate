# myDate V1 Release Report

Date: 2026-09-08
Release branch: `release/v1`
Change under review: `MD-002 Reward Burst to Egg`
PR: #10 `UI: MD-002 reward burst to Egg`
PR head reviewed: `ab46f20bff6f49a68f0f29f69338ecdbaaa99344`

## Overall Decision

**BLOCKED**

The updated PR #10 now integrates the Architect-approved XP / Rating / Egg progression contract through shared helpers and fixes the two original functional blockers: Rating continuity and the shared Egg target. Static code review shows the MD-002 business flow is now substantially aligned with Issue #11.

However, PR #10 is still not merge-ready because the architecture dependency is not yet canonical in `develop`, there are remaining UI/runtime blockers, and the required mobile/console regression suite has not run.

## Confirmed Fixed by Static Re-review

- `startAdventure(dateId)` creates a unique `adventureId`.
- `completeAdventure(adventureId)` settles Adventure XP via an idempotent award flag.
- Memory Prompt `I got it` calls `resolveMemoryPrompt(adventureId, "completed")` before the reward modal/animation.
- Memory Prompt XP is represented by a persisted boolean award flag; modal confirmation and animation do not award XP.
- `Skip` resolves the prompt as skipped, grants no Memory Prompt XP, and continues to Rating.
- Rating is tied to the same `adventureId` and uses `completeRating(adventureId, rating)`.
- Rating XP remains exactly-once even if the rating value is changed later because XP is derived from a boolean award flag.
- Refresh/interruption after a resolved Memory Prompt is designed to reconstruct state from persisted adventure data and continue to Rating.
- Reward stars now target `[data-egg-mini-target]` on the shared `EggMiniProgress` mounted in `MobileShell`.
- Egg progress is derived from `getEggProgress(loadSaveData())`, with 100 XP as the canonical hatch threshold.
- Reduced-motion behavior remains implemented.

## Remaining Blocking Findings

1. **Architect contract is not yet in `develop`.**
   PR #14 merged `architecture/v1-memory-xp-contract` into `feature/ui-mobile` as a temporary dependency sync only. PR #10 currently contains architecture files (`src/lib/storage.ts`, `src/types/domain.ts`, architecture/release docs). Do not merge PR #10 as-is until the approved contract lands in `develop` and these dependency diffs disappear from the UI PR.

2. **Hydration / console risk in `EggMiniProgress`.**
   `useState(() => getEggProgress(loadSaveData()))` is not hydration-safe for returning users. Server render sees no `window` and produces zero XP; the first client hydration render may read persisted XP and produce different `aria-label` / progress transform values. This can cause React hydration mismatch warnings, directly conflicting with the no-console-error release gate. Initialize to a deterministic server-safe value and load persisted progress after mount, or use an equivalent hydration-safe external-store pattern.

3. **Rating selection has no visible selected state.**
   Rating buttons correctly use `role="radio"` and `aria-checked`, but all 1–5 buttons keep the same visual `secondary-button` styling. A sighted user cannot tell which rating is selected before pressing Finish. Add a clear visible selected state while preserving the accessible radio semantics.

4. **Egg hatch/progression UI is inconsistent with the new V1 contract.**
   `EggMiniProgress` exposes a stage and progress bar, but the existing `/egg` page still says V1 is initial-state only and that progression comes later. `EggView` does not consume `getEggProgress` and does not visibly represent warming / glowing / cracking / hatched states. Regression gate #23 cannot pass in the current UI state.

5. **Runtime evidence is still missing.**
   No CI/status checks are attached to the current PR head. Required viewport smoke, rapid-interaction console testing, refresh/back interruption testing, reduced-motion verification, and actual star-arrival timing have not been executed on a runnable preview candidate.

6. **Release-only fixes must be preserved.**
   PR #10 targets `develop`, which does not contain the QA-only `release/v1` fixes for Adventure back navigation and localized category/duration/cost metadata. When the final approved develop state is refreshed into `release/v1`, those fixes must remain intact.

## MD-002 Regression Status

| # | Check | Current status | Notes |
|---|---|---|---|
| 1 | `I got it` shows reward modal | PASS (static) | State transition is wired. |
| 2 | Modal copy readable on mobile | BLOCKED | Runtime viewport smoke pending. |
| 3 | `OK` starts reward animation | PASS (static) | `modal -> animating` is wired. |
| 4 | Stars travel toward shared Egg mini | PASS (static) / runtime pending | Target changed to `[data-egg-mini-target]`. |
| 5 | Shared Egg reacts on arrival | PASS (static) / runtime pending | Reward event triggers shared Egg bump/glow. |
| 6 | Flow continues correctly after animation | PASS (static) | Routes to Rating with same `adventureId`. |
| 7 | `I got it` grants exactly +5 XP | PASS (static) | Persisted memoryPrompt award flag contributes exactly +5. |
| 8 | `I got it` cannot grant +5 twice | PASS (static) | Award flag is idempotent. |
| 9 | Repeated `OK` does not duplicate XP | PASS (static) | OK/animation do not call settlement. |
| 10 | Refresh during reward does not duplicate XP | PASS (static) / runtime pending | XP settles before animation; resolved record redirects to Rating after reload. |
| 11 | Back navigation does not duplicate XP | PASS (static) / runtime pending | Settlement is flag-based; navigation itself awards nothing. |
| 12 | Visual replay cannot replay XP | PASS (static) | Animation layer has no XP write path. |
| 13 | Egg progress matches saved XP | PASS (logic) / BLOCKED (hydration) | Progress derives from persisted award flags, but initial rendering is not hydration-safe. |
| 14 | Effect subtle | PASS (static) | Small five-star treatment. |
| 15 | Warm champagne star color | PASS (static) | Light warm gold palette retained. |
| 16 | Works on supported mobile sizes | BLOCKED | Runtime smoke pending. |
| 17 | No visual overlap blocks controls | BLOCKED | Runtime smoke pending. |
| 18 | Reduced motion usable | PASS (static) | Reduced-motion path exists. |
| 19 | No console errors during rapid interaction | BLOCKED | No runtime evidence; hydration mismatch risk identified. |
| 20 | Skip still works | PASS (static) | Skip resolves no memory XP and enters Rating. |
| 21 | Rating works after reward | BLOCKED | Business flow exists, but selected rating is not visibly indicated; runtime test pending. |
| 22 | Adventure -> Complete -> Memory Prompt -> Rating -> XP intact | PASS (static) / runtime pending | `adventureId` is carried forward through the intended path. |
| 23 | Egg hatch correct after repeated completed dates | BLOCKED | Business threshold exists, but `/egg` UI remains initial-state-only and does not render progression/hatch. |
| 24 | localStorage persistence correct | PASS (logic) / runtime pending | V2 storage and award flags are implemented; browser persistence/interruption smoke still required. |

## Required Runtime Coverage

Before QA approval, run the complete flow on:

- 320 × 568
- 375 × 812
- 390 × 844
- 430 × 932

Verify at minimum:

- normal motion and reduced motion
- rapid repeated taps on `I got it`, `OK`, Rating and Finish
- refresh during modal and during star travel
- browser back/forward around Complete and Rating
- persisted XP after reload
- Egg mini progress after +20 / +5 / +5 settlements
- repeated adventures and the 25 / 50 / 75 / 100 XP stage thresholds
- no hydration or console errors
- no horizontal overflow or blocked controls

## Merge Decision for PR #10

**BLOCKED — do not merge yet.**

Re-review after:

1. Architect merges the approved MD-002 contract into `develop`.
2. PR #10 is refreshed so architecture dependency diffs disappear.
3. `EggMiniProgress` hydration is made safe.
4. Rating gets a visible selected state.
5. Egg progression/hatch UI is reconciled with the new V1 contract.
6. Required build/mobile/console regression gates are executed.
