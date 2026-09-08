# myDate V1 Release Report

Date: 2026-09-08
Release branch: `release/v1`
Change: `MD-002 Reward Burst to Egg`
Source PR: #10 `UI: MD-002 reward burst to Egg`
Architect contract commit on `develop`: `83a9c2c5cca4df7ef0b2143cb821c2ea57276546`
PR #10 merge commit on `develop`: `b9cff53417e7b8536d17818571dab07cf0464806`

## Overall Decision

**BLOCKED FOR FINAL RELEASE — INTEGRATION PASS**

PR #10 passed Architect contract/integration review and QA static integration review and was merged into `develop`. `release/v1` was refreshed from that approved develop state while preserving release-only QA fixes.

A later V1 Egg presentation simplification was applied directly to `release/v1`: visible Egg XP totals, progress bars, stage labels, crack visuals, and hatch visuals are hidden in V1. The underlying XP settlement, derived progression state, 100-XP hatch threshold, storage contract, and shared Egg reward target remain unchanged.

No known code-level blocker remains from static review. Final release is still blocked on runtime/build/deployment gates.

## Integration Evidence

Confirmed in the current release candidate:

- `startAdventure(dateId)` creates a unique `adventureId`.
- Adventure completion uses `completeAdventure(adventureId)` and grants +20 through the canonical exactly-once award flag.
- Memory Prompt `I got it` calls `resolveMemoryPrompt(adventureId, "completed")` before modal/animation and grants +5 exactly once.
- `Skip` resolves Memory Prompt as skipped, grants 0 Memory Prompt XP, and continues to Rating.
- Modal confirmation and reward animation do not write XP.
- Rating remains tied to the same `adventureId`, has a visible selected state, and uses `completeRating(adventureId, rating)` for exactly-once +5 XP.
- Refresh/interruption after Memory Prompt resolution reconstructs business state from persisted AdventureRecord and continues to Rating.
- `EggMiniProgress` remains hydration-safe and still reads canonical derived Egg state after mount.
- Reward stars still target the shared `[data-egg-mini-target]`.
- Reward arrival still triggers the Egg mini bump/glow response.
- Internal Egg progression still derives from canonical `getEggProgress(loadSaveData())` with the same dormant / warming / glowing / cracking / hatched thresholds and 100-XP hatch threshold.
- V1 intentionally hides Egg XP totals, progress bars, stage labels, crack visuals, and hatch visuals from the user.
- Reduced-motion presentation remains implemented.
- Shared `src/lib/storage.ts` and `src/types/domain.ts` were not changed by the Egg presentation simplification.

## Release-only Fixes Preserved

- Adventure top-bar back navigation preserves selected DateIdea id.
- Activity Card category / duration / cost metadata remain localized.
- Result category metadata remains localized.
- Shared category labels remain in `src/components/ui/categoryLabel.ts`.

## MD-002 Regression Matrix

| # | Check | Status | Notes |
|---|---|---|---|
| 1 | `I got it` shows reward modal | PASS (static) | State transition is wired. |
| 2 | Modal copy readable on mobile | BLOCKED | Runtime viewport smoke pending. |
| 3 | `OK` starts reward animation | PASS (static) | `modal -> animating` is wired. |
| 4 | Stars travel toward shared Egg mini | PASS (static) / runtime pending | Shared target selector is preserved. |
| 5 | Shared Egg reacts on arrival | PASS (static) / runtime pending | Reward event still triggers bump/glow. |
| 6 | Flow continues correctly after animation | PASS (static) | Routes to Rating with same `adventureId`. |
| 7 | `I got it` grants exactly +5 XP | PASS (logic) | Canonical award flag contributes +5. |
| 8 | `I got it` cannot grant +5 twice | PASS (logic) | Settlement is idempotent per `adventureId`. |
| 9 | Repeated `OK` does not duplicate XP | PASS (logic) | OK/animation have no XP write path. |
| 10 | Refresh during reward does not duplicate XP | PASS (logic) / runtime pending | XP settles before animation; resolved state resumes at Rating. |
| 11 | Back navigation does not duplicate XP | PASS (logic) / runtime pending | Navigation does not settle XP. |
| 12 | Visual replay cannot replay XP | PASS (logic) | Presentation layer has no settlement path. |
| 13 | Internal Egg progress matches saved XP | PASS (logic) / runtime pending | Derived state remains canonical; visible progress is intentionally hidden. |
| 14 | Effect remains subtle | PASS (static) | Five small stars and brief timing. |
| 15 | Warm champagne-like star color | PASS (static) | Light warm-gold palette retained. |
| 16 | Works on supported mobile sizes | BLOCKED | Runtime smoke pending. |
| 17 | No overlap blocks controls | BLOCKED | Runtime smoke pending. |
| 18 | Reduced motion usable | PASS (static) / runtime pending | Reduced-motion path exists. |
| 19 | No console errors during rapid interaction | BLOCKED | Runtime/console evidence pending. |
| 20 | Skip still works | PASS (static) | Skip resolves with 0 Memory XP and enters Rating. |
| 21 | Rating works after reward | PASS (static) / runtime pending | Same adventure continuity and visible selected state are wired. |
| 22 | Adventure → Complete → Memory Prompt → Rating → XP intact | PASS (static) / runtime pending | Same `adventureId` is propagated. |
| 23 | Internal Egg progression / 100-XP hatch state remains correct | PASS (logic) / runtime pending | Visible hatch UI is intentionally out of V1 scope. |
| 24 | localStorage persistence correct | PASS (logic) / runtime pending | Canonical v2 storage and award flags remain unchanged. |

## V1 Egg Presentation Scope

Visible progression is intentionally deferred. V1 shows:

- the Egg mini icon as the canonical reward target
- a brief reward-arrival bump/glow
- a lightweight Egg detail page

V1 does not show:

- XP totals
- progress bars
- stage labels
- cracking visuals
- hatch visuals

Internal progression remains active and must still be correct for persistence and future compatibility.

## Required Runtime Coverage

Run the full release candidate on:

- 320 × 568
- 375 × 812
- 390 × 844
- 430 × 932

Verify:

- normal motion and reduced motion
- rapid repeated taps on `I got it`, `OK`, Rating values, and Finish
- refresh during modal and during star travel
- browser back/forward around Complete and Rating
- persisted XP after reload
- shared Egg target and reward-arrival response
- internal 25 / 50 / 75 / 100 XP thresholds through persisted state inspection where practical
- no visible Egg XP/progression/hatch UI leaks into V1
- no hydration or console errors
- no horizontal overflow or blocked controls
- production build and deployment
- production smoke of Home → Result → Adventure → Complete → Memory Prompt → Rating → Home

## Final Release Decision

**BLOCKED** until all runtime/build/deployment gates pass.

Do not merge `release/v1` into `master` yet.
