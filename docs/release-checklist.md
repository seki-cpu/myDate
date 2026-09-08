# myDate V1 Release Checklist

## Architecture

- [ ] One canonical `DateIdea` contract is used across types, content, and UI
- [ ] `photoPrompt` is required and localized on every DateIdea
- [ ] No legacy singular `category` field remains in V1 integration points
- [ ] One canonical date content source
- [ ] No photo URL or image reference exists in the V1 domain model
- [ ] No backend or cloud image storage is introduced
- [ ] XP settlement is tied to a unique `adventureId`
- [ ] Total XP is derived from persisted `xpAwarded` flags
- [ ] Egg progress is derived from total XP, not persisted separately
- [ ] Egg state remains separated from DateIdea
- [ ] MD-002 reward presentation remains separated from XP settlement / persistence logic

## Product Flow

- [ ] Home loads and user can discover a date idea immediately
- [ ] Browse works
- [ ] Random works
- [ ] Date detail works
- [ ] Start creates a unique adventure instance
- [ ] Adventure completion works
- [ ] Memory Prompt appears after completion
- [ ] `I got it` and `Skip` both resolve Memory Prompt
- [ ] MD-002 reward feedback appears after `I got it`
- [ ] Rating remains the next business step after reward handling or Skip
- [ ] Rating accepts a private value from 1 to 5
- [ ] XP settlement reflects completed sources
- [ ] Egg internal progression state reflects settled XP
- [ ] Chinese / English / Japanese work across the primary flow

## Memory Prompt / MD-002 Contract

- [ ] Every DateIdea has `photoPrompt.zh`, `.en`, and `.ja`
- [ ] App does not verify whether a photo was actually taken
- [ ] No upload control or image persistence exists
- [ ] `I got it` commits +5 XP before presentation animation
- [ ] Reward modal confirmation does not grant XP
- [ ] Animation start / finish / replay does not grant XP
- [ ] Reward animation targets the shared Egg mini UI, not a decorative local copy
- [ ] Interrupted animation still permits continuation to Rating
- [ ] Reduced-motion users receive a simplified reward acknowledgment

## Rating

- [ ] Rating is tied to the same `adventureId`
- [ ] Rating cannot settle while Memory Prompt status is `pending`
- [ ] `Skip` continues to Rating
- [ ] Selected rating has a visible state and accessible radio semantics
- [ ] Submitting a 1–5 rating grants +5 XP exactly once
- [ ] Changing an already submitted rating does not grant another +5 XP
- [ ] Refresh/back navigation preserves submitted rating and settlement state

## XP / Idempotency

- [ ] Adventure completion grants +20 exactly once per `adventureId`
- [ ] Memory Prompt `I got it` grants +5 exactly once per `adventureId`
- [ ] Memory Prompt `Skip` grants 0 for that source
- [ ] Rating completion grants +5 exactly once per `adventureId`
- [ ] Repeated tap, repeated OK, refresh, back navigation, and animation replay do not duplicate XP
- [ ] Same DateIdea started again gets a new `adventureId` and may earn XP normally

## Egg Internal Progression

Canonical V1 hatch threshold remains **100 XP** internally. V1 intentionally does **not** expose XP totals, progress bars, stage labels, crack visuals, or hatch visuals to the user.

- [ ] 0–24 XP resolves internally to `dormant`
- [ ] 25–49 XP resolves internally to `warming`
- [ ] 50–74 XP resolves internally to `glowing`
- [ ] 75–99 XP resolves internally to `cracking`
- [ ] 100+ XP resolves internally to `hatched`
- [ ] Progress is calculated from persisted XP after refresh
- [ ] No separate persisted Egg XP/progress counter can drift from total XP
- [ ] Crossing 100 XP deterministically produces internal `hatched` state
- [ ] V1 Egg UI does not expose growth progress, hatch stages, XP count, or progress bars
- [ ] Egg mini remains the canonical reward animation target and still reacts on reward arrival

## Persistence

- [ ] V1 uses localStorage only
- [ ] Adventure state survives refresh where required by the flow
- [ ] Corrupted or invalid save data fails safely without crashing
- [ ] UI consumes shared storage helpers rather than defining its own persistence contract
- [ ] No image data is persisted

## Mobile

- [ ] 320 × 568 usable
- [ ] 375 × 812 usable
- [ ] 390 × 844 usable
- [ ] 430 × 932 usable
- [ ] No horizontal overflow
- [ ] Primary CTA has comfortable touch target
- [ ] Reward modal and animation do not block required navigation
- [ ] Core flow works with one-hand mobile use

## Core Regression

- [ ] Home loads
- [ ] Browse / random / detail work
- [ ] Start / Adventure / Complete work
- [ ] Memory Prompt works
- [ ] Reward modal / burst works
- [ ] Rating works
- [ ] XP settlement works
- [ ] Egg internal progression state remains correct while progression UI stays hidden
- [ ] Refresh/back preserve the correct adventure instance
- [ ] Adventure back navigation preserves the selected DateIdea
- [ ] Category / duration / cost metadata remain localized
- [ ] No release-blocking console errors

## MD-002 Reward Burst to Egg Regression

### Functional

- [ ] 1. Tapping `I got it` shows the reward modal
- [ ] 2. Reward modal copy is visible and readable on mobile
- [ ] 3. Tapping `OK` starts the reward animation
- [ ] 4. Reward animation visibly travels toward the Egg mini icon
- [ ] 5. Egg mini icon reacts when the reward arrives
- [ ] 6. Flow continues correctly after the animation

### XP Integrity

- [ ] 7. `I got it` grants exactly +5 XP
- [ ] 8. `I got it` cannot grant +5 XP twice
- [ ] 9. Repeated `OK` taps do not duplicate XP
- [ ] 10. Refresh during the reward sequence does not duplicate XP
- [ ] 11. Back navigation does not duplicate XP
- [ ] 12. Visual replay is allowed only when appropriate and never replays XP incorrectly
- [ ] 13. Internal Egg progress after the animation matches saved XP state

### UI / Quality

- [ ] 14. Effect remains subtle and not visually overwhelming
- [ ] 15. Star color feels light / warm / champagne-like
- [ ] 16. Modal and animation work on all supported mobile viewports
- [ ] 17. No visual overlap blocks important controls
- [ ] 18. Reduced-motion behavior remains usable
- [ ] 19. Rapid interaction produces no console errors

### Regression

- [ ] 20. Memory Prompt still works when the user chooses `Skip`
- [ ] 21. Rating still works after the reward flow
- [ ] 22. Adventure → Complete → Memory Prompt → Rating → XP flow remains intact
- [ ] 23. Internal Egg progression / 100-XP hatch state remains correct after repeated completed dates; visible hatch UI is not required in V1
- [ ] 24. localStorage persistence remains correct

## Explicitly Deferred

The following are not V1 release gates unless separately promoted into V1 scope:

- user accounts
- cloud sync
- photo upload / photo database / cloud photo storage
- photo verification
- saved activity persistence
- completed date history / Memories history
- interactive category / mood filters
- Egg color persistence
- visible Egg XP / growth progress / hatch-stage UI
- complex Egg inventory / economy / collectibles
- automated Playwright release gate

## Release

- [x] Architect MD-002 contract approved
- [x] Content migrated to required Memory Prompts
- [x] UI implements Rating continuity and shared Egg target
- [x] MD-002 presentation is connected to persisted XP without owning settlement
- [x] PR #10 integration review passed and merged to `develop`
- [x] `release/v1` refreshed from approved `develop`
- [x] Lightweight Egg presentation applied directly to `release/v1` without changing shared XP/storage contract
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment succeeds
- [ ] Production smoke test passes
- [ ] QA approval
- [ ] Lead Architect final release approval

Only after all V1 release gates pass may `release/v1` be merged into `master`.
