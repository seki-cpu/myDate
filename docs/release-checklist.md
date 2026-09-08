# myDate V1 Release Checklist

## Architecture

- [ ] One canonical `DateIdea` contract is used across types, content, and UI
- [ ] No legacy `category` field remains in V1 integration points
- [ ] Localized activity content uses the canonical `LocalizedText` shape
- [ ] One canonical date content source
- [ ] No unnecessary backend introduced
- [ ] No unnecessary global state framework introduced
- [ ] Egg state remains separated from activity domain
- [ ] MD-002 reward presentation remains separated from XP settlement / persistence logic

## Product

- [ ] User can discover a date idea immediately
- [ ] Browse activity flow works
- [ ] Random activity flow works
- [ ] Date detail is understandable quickly
- [ ] Start activity flow works
- [ ] Complete activity flow works
- [ ] Photo prompt is optional
- [ ] Chinese / English / Japanese work across the primary flow
- [ ] Egg remains optional
- [ ] Memory Prompt completion can grant +5 XP exactly once
- [ ] Rating remains reachable after the reward flow
- [ ] Egg progression reflects persisted XP state

## Mobile

- [ ] 320 × 568 usable
- [ ] 375 × 812 usable
- [ ] 390 × 844 usable
- [ ] 430 × 932 usable
- [ ] No horizontal overflow
- [ ] Primary CTA has comfortable touch target
- [ ] Core flow works with one-hand mobile use

## Data

- [ ] Every `DateIdea` has a unique id
- [ ] Required localized fields are populated for `zh`, `en`, and `ja`
- [ ] `categories` values are valid
- [ ] No duplicated activity records
- [ ] Photo prompts are appropriate when present

## Core Regression

- [ ] Home loads
- [ ] Browse works
- [ ] Random works
- [ ] Detail works
- [ ] Start works
- [ ] Complete works
- [ ] Photo prompt works
- [ ] Refresh does not break the selected activity flow
- [ ] Back navigation does not lose the selected activity unexpectedly
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
- [ ] 13. Egg progress after the animation matches saved XP state

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
- [ ] 23. Egg hatch behavior remains correct after repeated completed dates
- [ ] 24. localStorage persistence remains correct

## Explicitly Deferred to V1.1

The following are **not V1 release gates** unless separately promoted into V1 scope:

- saved activity persistence
- completed date history / Memories history
- interactive category / mood filters
- Egg color persistence
- automated Playwright release gate

V1 UI must not present non-functional controls that imply deferred features already work.

## Release

- [ ] All V1 contract fixes reviewed by Lead Architect
- [ ] MD-002 architecture / persistence behavior reviewed by Lead Architect
- [ ] Integration issues resolved
- [ ] `release/v1` refreshed from approved `develop`
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment succeeds
- [ ] Production smoke test passes
- [ ] QA approval
- [ ] Lead Architect approval

Only after all V1 release gates pass may `release/v1` be merged into `master`.
