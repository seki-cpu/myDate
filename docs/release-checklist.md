# myDate V1 Release Checklist

## Architecture

- [ ] One canonical `DateIdea` contract is used across types, content, and UI
- [ ] `photoPrompt` is required and localized on every DateIdea
- [ ] One canonical date content source
- [ ] No photo URL or image reference exists in the V1 domain model
- [ ] No backend or cloud image storage is introduced
- [ ] XP settlement is tied to a unique `adventureId`
- [ ] Total XP is derived from persisted `xpAwarded` flags
- [ ] Egg progress is derived from total XP, not persisted separately
- [ ] Egg state remains separated from DateIdea

## Product Flow

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
- [ ] Egg progress reflects settled XP
- [ ] Chinese / English / Japanese work across the primary flow

## Memory Prompt / MD-002

- [ ] Every DateIdea has `photoPrompt.zh`, `.en`, and `.ja`
- [ ] App does not verify whether a photo was actually taken
- [ ] No upload control or image persistence exists
- [ ] `I got it` commits +5 XP before presentation animation
- [ ] Reward modal confirmation does not grant XP
- [ ] Animation start/finish/replay does not grant XP
- [ ] Reward animation targets the shared Egg mini/progress UI, not a decorative local copy
- [ ] Interrupted animation still permits continuation to Rating
- [ ] Reduced-motion users receive a simplified reward acknowledgment

## Rating

- [ ] Rating is tied to the same `adventureId`
- [ ] Rating cannot settle while Memory Prompt status is `pending`
- [ ] `Skip` continues to Rating
- [ ] Submitting a 1–5 rating grants +5 XP exactly once
- [ ] Changing an already submitted rating does not grant another +5 XP
- [ ] Refresh/back navigation preserves the submitted rating and settlement state

## XP / Idempotency

- [ ] Adventure completion grants +20 exactly once per `adventureId`
- [ ] Memory Prompt `I got it` grants +5 exactly once per `adventureId`
- [ ] Memory Prompt `Skip` grants 0 for that source
- [ ] Rating completion grants +5 exactly once per `adventureId`
- [ ] Repeated tap, repeated OK, refresh, back navigation, and animation replay do not duplicate XP
- [ ] Same DateIdea started again gets a new `adventureId` and may earn XP normally

## Egg Progression

Canonical V1 hatch threshold is **100 XP**.

- [ ] 0–24 XP renders `dormant`
- [ ] 25–49 XP renders `warming`
- [ ] 50–74 XP renders `glowing`
- [ ] 75–99 XP renders `cracking`
- [ ] 100+ XP renders `hatched`
- [ ] Progress is calculated from persisted XP after refresh
- [ ] No separate persisted Egg XP/progress counter can drift from total XP
- [ ] Crossing 100 XP deterministically produces hatched state

## Persistence

- [ ] V1 uses localStorage only
- [ ] Adventure state survives refresh where required by the flow
- [ ] Corrupted or invalid save data fails safely without crashing
- [ ] UI does not access localStorage directly
- [ ] No image data is persisted

## Mobile

- [ ] 320px usable
- [ ] 375px usable
- [ ] 390px usable
- [ ] No horizontal overflow
- [ ] Reward modal and animation do not block required navigation
- [ ] Core flow works with one-hand mobile use

## Regression

- [ ] Home loads
- [ ] Browse / random / detail work
- [ ] Start / Adventure / Complete work
- [ ] Memory Prompt works
- [ ] Reward modal / burst works
- [ ] Rating works
- [ ] XP settlement works
- [ ] Egg progress / hatch works
- [ ] Refresh/back preserve the correct adventure instance
- [ ] No release-blocking console errors

## Explicitly Deferred

- user accounts
- cloud sync
- photo upload / photo database / cloud photo storage
- photo verification
- interactive category / mood filters
- complex Egg inventory / economy / collectibles

## Release

- [ ] Architect contract approved
- [ ] Content migrated to required Memory Prompts
- [ ] UI implements Rating continuity and shared Egg target
- [ ] MD-002 presentation is connected to persisted XP without owning settlement
- [ ] Integration issues resolved
- [ ] `release/v1` refreshed from approved `develop`
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment and production smoke test pass
- [ ] QA approval
- [ ] Lead Architect approval

Only after all V1 release gates pass may `release/v1` be merged into `master`.
