# myDate V1 Release Checklist

## Architecture

- [ ] No duplicate `DateIdea` interfaces
- [ ] No duplicate `SaveData` interfaces
- [ ] One canonical date content source
- [ ] No direct localStorage usage scattered in UI components
- [ ] No unnecessary backend introduced
- [ ] No unnecessary global state framework introduced
- [ ] Egg state remains separated from activity domain

## Product

- [ ] User can discover a date idea immediately
- [ ] Random activity flow works
- [ ] Lightweight filters work
- [ ] Date detail is understandable quickly
- [ ] Save works
- [ ] Complete works
- [ ] Photo prompt is optional
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
- [ ] Required fields are populated
- [ ] Enum values are valid
- [ ] No duplicated activity records
- [ ] Photo prompts are appropriate

## Persistence

- [ ] Saved activities survive refresh
- [ ] Completed activities survive refresh
- [ ] Egg color survives refresh if Egg is enabled
- [ ] Corrupted or missing localStorage does not crash the app
- [ ] Save schema version is validated

## Regression

- [ ] Home loads
- [ ] Browse works
- [ ] Random works
- [ ] Filters work
- [ ] Detail works
- [ ] Save / unsave works
- [ ] Complete works
- [ ] Photo prompt works

## Release

- [ ] All feature PRs reviewed by Lead Architect
- [ ] Integration issues resolved
- [ ] `release/v1` created from approved `develop`
- [ ] Production build succeeds
- [ ] Playwright critical flow passes
- [ ] Mobile smoke test passes
- [ ] QA approval
- [ ] Lead Architect approval

Only after all release gates pass may `release/v1` be merged into `master`.
