# myDate V1 Release Checklist

## Architecture

- [ ] One canonical `DateIdea` contract is used across types, content, and UI
- [ ] No legacy `category` field remains in V1 integration points
- [ ] Localized activity content uses the canonical `LocalizedText` shape
- [ ] One canonical date content source
- [ ] No unnecessary backend introduced
- [ ] No unnecessary global state framework introduced
- [ ] Egg state remains separated from activity domain

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
- [ ] Photo prompts are appropriate when present

## Regression

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

## Explicitly Deferred to V1.1

The following are **not V1 release gates**:

- saved activity persistence
- completed date persistence
- memories history
- interactive category / mood filters
- Egg color persistence
- automated Playwright release gate

V1 UI must not present non-functional controls that imply these deferred features already work.

## Release

- [ ] All V1 contract fixes reviewed by Lead Architect
- [ ] Integration issues resolved
- [ ] `release/v1` refreshed from approved `develop`
- [ ] Production build succeeds
- [ ] Mobile smoke test passes
- [ ] Deployment succeeds
- [ ] Production smoke test passes
- [ ] QA approval
- [ ] Lead Architect approval

Only after all V1 release gates pass may `release/v1` be merged into `master`.
