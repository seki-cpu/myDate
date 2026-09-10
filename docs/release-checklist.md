# myDate V2 Release Checklist — MD-004 Memory First

## Architecture

- [ ] One canonical `DateIdea` contract is used across content and UI
- [ ] One canonical `Memory` contract is used across domain, persistence, and UI
- [ ] `SaveData.version = 3` is the only V2 persisted schema
- [ ] Memory count is derived from `memories.length`
- [ ] No XP, Egg, hatch, love, or relationship progression state remains in V2 business logic
- [ ] No photo URL, image data, backend, or cloud storage is introduced
- [ ] UI does not access localStorage directly

## Core Flow

- [ ] Browse works
- [ ] Random discovery works
- [ ] Lightweight category filtering works if present in V2 UI
- [ ] Date detail works
- [ ] `Let's do it` creates one AdventureSession
- [ ] Adventure works
- [ ] Adventure Complete creates one Memory
- [ ] Memory Prompt appears for that Memory
- [ ] `I got it` sets `memoryPromptCompleted = true`
- [ ] `Skip` leaves `memoryPromptCompleted = false`
- [ ] Both Memory Prompt paths continue to Experience Rating
- [ ] Rating updates the same Memory
- [ ] Memory reward animation runs after rating
- [ ] Reward targets the shared Memories icon/counter
- [ ] Memories view displays persisted Memories

## Memory Identity / Idempotency

- [ ] `AdventureSession.id` becomes `Memory.id`
- [ ] Repeated Adventure completion cannot create duplicate Memories
- [ ] Refresh after completion does not create another Memory
- [ ] Back navigation and repeated taps do not create another Memory
- [ ] Replaying reward animation does not change Memory count
- [ ] Memory Prompt completion never creates an additional Memory
- [ ] Rating never creates an additional Memory

## V1 → V2 Migration

- [ ] A valid V2 save is loaded without running migration again
- [ ] Current V1 `mydate.save.v2` data is detected when no valid V2 save exists
- [ ] Every V1 AdventureRecord with `completedAt` becomes exactly one V2 Memory
- [ ] Incomplete V1 adventures do not become Memories
- [ ] V1 `memoryPromptStatus === "completed"` maps to `memoryPromptCompleted = true`
- [ ] Other V1 Memory Prompt states map to `false`
- [ ] Valid V1 1–5 rating maps to `rating.overall`
- [ ] V1 XP flags do not affect Memory count
- [ ] V1 Egg preferences/progress do not enter V2 state
- [ ] Older `mydate.save.v1.completedDates[]` records migrate safely when applicable
- [ ] Invalid legacy records are skipped without crashing
- [ ] Four completed legacy experiences result in four Memories regardless of XP

## Memory Rating

- [ ] Rating is private and attached to Memory
- [ ] Legacy overall rating is preserved without fabricating `fun`, `comfort`, or `doAgain`
- [ ] Any collected rating dimension accepts only 1–5
- [ ] Rating may be absent without invalidating the Memory
- [ ] Updating rating does not change Memory count

## Reward Animation

- [ ] Existing pale-yellow / champagne-gold visual language is preserved
- [ ] Old Egg/XP meaning is removed
- [ ] New meaning is `+1 Memory`
- [ ] Animation targets a real shared Memories icon/counter
- [ ] Animation is presentation-only
- [ ] Interrupted animation does not lose an already-created Memory
- [ ] Replayed animation does not duplicate a Memory
- [ ] Reduced-motion users receive a simplified acknowledgment
- [ ] No XP badge or XP delta is displayed

## Egg / XP Removal

- [ ] `/egg` route is removed
- [ ] `EggMiniProgress` is removed
- [ ] `EggView` is removed
- [ ] Egg-specific styles/assets are removed when unused
- [ ] Egg links are removed from navigation and Memories
- [ ] `XP_REWARDS`, `EGG_HATCH_XP`, `getTotalXp`, and `getEggProgress` are absent from V2
- [ ] `xpAwarded`, Egg preferences, hatch fields, and progression fields are absent from V2 SaveData
- [ ] No hidden relationship KPI replaces the removed systems

## Memories

- [ ] Memories page reads canonical persisted `memories[]`
- [ ] Memory count equals persisted Memory array length
- [ ] Empty state works
- [ ] Migrated V1 Memories render without crashing
- [ ] A Memory remains valid when Memory Prompt was skipped
- [ ] A Memory remains valid without rating
- [ ] Missing/deleted DateIdea content is handled gracefully for legacy Memory records

## Persistence / Recovery

- [ ] V2 uses localStorage only
- [ ] `mydate.save.v3` survives refresh
- [ ] Corrupted V2 data fails safely
- [ ] Corrupted legacy data fails safely
- [ ] Legacy keys do not override a valid V2 save
- [ ] No image data is persisted

## Localization / Mobile

- [ ] zh/en/ja primary flow works
- [ ] Memory Prompt remains localized
- [ ] Memories and Memory reward copy are localized
- [ ] 320px usable
- [ ] 375px usable
- [ ] 390px usable
- [ ] No horizontal overflow
- [ ] No release-blocking hydration or console errors

## Explicitly Not V2

- user accounts
- backend
- cloud sync
- photo upload/storage/verification
- partner profiles
- relationship progression
- relationship success/failure score
- Solo mode
- replacement currency or gamification economy

## Release

- [ ] Architect V2 contract approved
- [ ] Content reviewed for Memory First semantics
- [ ] UI removed Egg/XP dependencies and implemented Memory flow
- [ ] Troubleshooting regression fixes preserve the canonical contract
- [ ] Migration tests pass
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment smoke test passes
- [ ] QA approval
- [ ] Lead Architect approval

Do not merge V2 into `master` until all V2 release gates pass.
