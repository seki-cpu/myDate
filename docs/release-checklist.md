# myDate V2/V3 Release Checklist — Memory First

## Architecture

- [ ] One canonical `DateIdea` contract is used across content and UI
- [ ] One canonical `Memory` contract is used across domain, persistence, and UI
- [ ] Stable activity identity uses `{ source, id }`
- [ ] Memory stores `activitySnapshot.identity`
- [ ] Historical Tried is derived from Memories, not a persisted boolean
- [ ] Current discovery-round completion is stored separately from historical state
- [ ] `SaveData.version = 3` is the only current persisted schema
- [ ] Memory count is derived from `memories.length`
- [ ] No XP, Egg, hatch, love, or relationship progression remains
- [ ] No photo URL, image data, backend, or cloud storage is introduced
- [ ] UI does not access localStorage directly

## Core Flow

- [ ] Browse works
- [ ] Random discovery works
- [ ] Category filtering works
- [ ] Date detail works
- [ ] `Let's do it` creates one AdventureSession
- [ ] Adventure Complete creates one Memory
- [ ] Memory Prompt appears for that Memory
- [ ] `I got it` sets `memoryPromptCompleted = true`
- [ ] `Skip` leaves it false
- [ ] Both paths continue to Experience Rating
- [ ] Rating updates the same Memory
- [ ] Memory reward animation runs after rating
- [ ] Reward targets the shared Memories icon/counter
- [ ] Memories view displays persisted Memories

## Historical Tried / Discovery Round

- [ ] Completing an activity makes `hasTriedActivity(identity)` true
- [ ] Tried survives refresh
- [ ] Tried survives `Start a new round`
- [ ] Starting a new round clears only `discoveryRound.completedActivityKeys`
- [ ] A Tried activity can be randomly selected again in a new round
- [ ] Completing an activity adds one current-round activity key only
- [ ] Repeating completion for the same Adventure does not duplicate current-round state
- [ ] Repeating the same activity in a later round creates another Memory without identity drift
- [ ] Built-in and custom activities behave consistently
- [ ] Editing custom title/content preserves its stable id and Tried state
- [ ] Deleting a custom activity does not delete existing Memories
- [ ] Historical matching does not use snapshot title
- [ ] Two activities with colliding titles do not share Tried state
- [ ] `getTriedCount(identity)` reflects repeated Memories correctly even if count is not displayed

## Memory Identity / Idempotency

- [ ] `AdventureSession.id` becomes `Memory.id`
- [ ] Repeated Adventure completion cannot create duplicate Memories
- [ ] Refresh after completion does not create another Memory
- [ ] Back navigation and repeated taps do not create another Memory
- [ ] Replaying reward animation does not change Memory count
- [ ] Memory Prompt completion never creates another Memory
- [ ] Rating never creates another Memory

## Legacy Migration

- [ ] Valid current save loads without rerunning migration
- [ ] V1 `mydate.save.v2` is detected when no valid current save exists
- [ ] Every completed V1 AdventureRecord becomes exactly one Memory
- [ ] Incomplete legacy adventures do not become Memories
- [ ] Legacy `dateId` maps to `{ source: "builtin", id: dateId }`
- [ ] Legacy Memory Prompt completion maps correctly
- [ ] Legacy rating maps to `rating.overall`
- [ ] Legacy XP/Egg state does not affect Memories or Tried
- [ ] Legacy migration starts with an empty current discovery round
- [ ] Migrated Memories immediately drive historical Tried
- [ ] Older `mydate.save.v1.completedDates[]` records migrate safely
- [ ] Invalid legacy records are skipped without crashing
- [ ] Four completed legacy experiences result in four Memories regardless of XP

## Memory Rating

- [ ] Rating is private and attached to Memory
- [ ] Legacy overall rating is preserved without fabricating dimensions
- [ ] Any collected rating dimension accepts only 1–5
- [ ] Rating may be absent without invalidating Memory
- [ ] Updating rating does not change Memory count

## Reward Animation

- [ ] Existing pale-yellow / champagne-gold visual language is preserved
- [ ] Old Egg/XP meaning is removed
- [ ] New meaning is `+1 Memory`
- [ ] Animation targets a real shared Memories icon/counter
- [ ] Animation is presentation-only
- [ ] Interrupted animation does not lose Memory
- [ ] Replayed animation does not duplicate Memory
- [ ] Reduced-motion users receive simplified feedback
- [ ] No XP badge or XP delta is displayed

## Egg / XP Removal

- [ ] `/egg` route removed
- [ ] `EggMiniProgress` removed
- [ ] `EggView` removed
- [ ] Egg-specific styles/assets removed when unused
- [ ] Egg links removed
- [ ] XP/Egg helpers absent from current business logic
- [ ] XP/Egg fields absent from current SaveData
- [ ] No hidden relationship KPI replaces removed systems

## Memories

- [ ] Memories page reads persisted `memories[]`
- [ ] Memory count equals array length
- [ ] Empty state works
- [ ] Migrated Memories render safely
- [ ] Memory remains valid when Prompt was skipped
- [ ] Memory remains valid without rating
- [ ] Deleted/missing activity definitions do not destroy Memory rendering
- [ ] Snapshot title is presentation fallback only

## Persistence / Recovery

- [ ] localStorage only
- [ ] `mydate.save.v3` survives refresh
- [ ] Corrupted current data fails safely
- [ ] Corrupted legacy data fails safely
- [ ] Legacy keys do not override a valid current save
- [ ] No image data persisted

## Localization / Mobile

- [ ] zh/en/ja primary flow works
- [ ] Tried labels are `Tried` / `做过` / `体験済み`
- [ ] Memory Prompt remains localized
- [ ] Memories and Memory reward copy are localized
- [ ] 320px usable
- [ ] 375px usable
- [ ] 390px usable
- [ ] No horizontal overflow
- [ ] Tried indicator is visible but not dominant
- [ ] No release-blocking hydration or console errors

## Explicitly Not Current Scope

- user accounts
- backend
- cloud sync
- photo upload/storage/verification
- partner profiles
- relationship progression
- relationship success/failure score
- Solo mode
- replacement currency/gamification economy
- repetition count UI unless trivial

## Release

- [ ] Architect contract approved
- [ ] Content ids reviewed for stability
- [ ] UI separates historical Tried from current-round state
- [ ] UI removes Egg/XP dependencies and implements Memory flow
- [ ] Troubleshooting fixes preserve stable identity
- [ ] Migration tests pass
- [ ] Historical Tried QA matrix passes
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment smoke test passes
- [ ] QA approval
- [ ] Lead Architect approval

Do not merge into `master` until all release gates pass.
