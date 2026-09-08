# myDate V1 Release Checklist

## Architecture

- [ ] One canonical `DateIdea` contract is used across types, content, and UI
- [ ] `photoPrompt` is required and localized on every DateIdea
- [ ] No legacy `category` field remains in V1 integration points
- [ ] Localized activity content uses the canonical `LocalizedText` shape
- [ ] One canonical date content source
- [ ] No photo URL or image reference exists in the V1 domain model
- [ ] No backend or cloud image storage is introduced
- [ ] XP settlement is tied to a unique `adventureId`
- [ ] Egg state remains separated from DateIdea

## Product

- [ ] User can discover a date idea immediately
- [ ] Browse activity flow works
- [ ] Random activity flow works
- [ ] Date detail is understandable quickly
- [ ] Start activity creates a unique adventure instance
- [ ] Complete activity flow works
- [ ] Memory Prompt appears after completion
- [ ] `I got it` and `Skip` both continue the flow
- [ ] Rating appears after Memory Prompt
- [ ] XP settlement appears after rating
- [ ] Egg progress appears after XP settlement
- [ ] Chinese / English / Japanese work across the primary flow

## Memory Prompt

- [ ] Every DateIdea has `photoPrompt.zh`
- [ ] Every DateIdea has `photoPrompt.en`
- [ ] Every DateIdea has `photoPrompt.ja`
- [ ] Prompt suggests a meaningful photo the user can keep in the normal phone gallery
- [ ] Prompt does not require both people to appear
- [ ] App does not verify whether a photo was actually taken
- [ ] No upload control exists
- [ ] No photo storage or photo URL persistence exists

## XP / Idempotency

- [ ] Adventure completion grants +20 XP exactly once per `adventureId`
- [ ] Memory Prompt `I got it` grants +5 XP exactly once per `adventureId`
- [ ] Memory Prompt `Skip` grants 0 XP for that source
- [ ] Rating completion grants +5 XP exactly once per `adventureId`
- [ ] Refresh does not duplicate XP
- [ ] Back navigation does not duplicate XP
- [ ] Repeating the same action does not duplicate XP
- [ ] Starting the same DateIdea again creates a new `adventureId` and can earn XP normally
- [ ] Total XP is derived consistently from persisted award state

## Persistence

- [ ] V1 uses localStorage only
- [ ] Adventure state survives refresh where required by the flow
- [ ] Corrupted or invalid V1 save data fails safely without crashing
- [ ] UI does not access localStorage directly
- [ ] No image data is persisted

## Mobile

- [ ] 320px usable
- [ ] 375px usable
- [ ] 390px usable
- [ ] No horizontal overflow
- [ ] Primary CTA has comfortable touch target
- [ ] Core flow works with one-hand mobile use

## Data

- [ ] Every `DateIdea` has a unique id
- [ ] Required localized fields are populated for `zh`, `en`, and `ja`
- [ ] `categories` values are valid
- [ ] No duplicated activity records
- [ ] Memory Prompts are specific and appropriate

## Regression

- [ ] Home loads
- [ ] Browse works
- [ ] Random works
- [ ] Detail works
- [ ] Start works
- [ ] Adventure works
- [ ] Complete works
- [ ] Memory Prompt works
- [ ] Rating works
- [ ] XP settlement works
- [ ] Egg progress works
- [ ] Refresh/back navigation preserve the correct adventure instance
- [ ] No release-blocking console errors

## Explicitly Deferred

The following are not required by this V1 contract:

- user accounts
- cloud sync
- photo upload
- photo database
- cloud photo storage
- photo verification
- interactive category / mood filters
- complex Egg inventory / economy / collectibles

V1 UI must not present non-functional controls that imply these deferred features already work.

## Release

- [ ] All V1 contract fixes reviewed by Lead Architect
- [ ] Content migrated to required Memory Prompts
- [ ] UI migrated to the canonical flow
- [ ] Integration issues resolved
- [ ] `release/v1` refreshed from approved `develop`
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment succeeds
- [ ] Production smoke test passes
- [ ] QA approval
- [ ] Lead Architect approval

Only after all V1 release gates pass may `release/v1` be merged into `master`.
