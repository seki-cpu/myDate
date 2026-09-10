# myDate V2 Product Design — MD-004 Memory First

## Product Statement

> People may change. The memories are still yours.

The user is the permanent subject of myDate. Dating partners and relationships may change, but the user's completed experiences remain theirs.

## Core Product Rule

**Activity First. Memory Second.**

V2 removes relationship progression. The product no longer evaluates whether a relationship is growing, succeeding, failing, or moving toward a shared destination.

A completed Adventure becomes a user-owned Memory.

## Canonical V2 Flow

```text
Discover Date Idea
→ Let's do it
→ Adventure
→ Adventure Complete
→ Memory Prompt
→ I got it / Skip
→ Experience Rating
→ Memory Reward Animation
→ +1 Memory
→ Memory saved
```

The Memory is actually persisted at Adventure Complete so that later optional steps cannot block or erase the completed experience.

## Memory Prompt

Every DateIdea keeps one localized Memory Prompt through the existing `photoPrompt` field.

The prompt suggests one meaningful photo the user may take with their own phone and keep in their normal gallery.

V2 does not:

- upload photos
- store photos
- request photo URLs
- verify whether a photo was taken
- use image cloud storage

`I got it` records only:

```text
memoryPromptCompleted = true
```

`Skip` leaves it false.

Both paths keep the Memory.

## Experience Rating

Rating is private and belongs to the completed experience.

The V2 domain supports:

- `overall`
- `fun`
- `comfort`
- `doAgain`

Each score, when collected, is 1–5.

The current MD-004 scope does not require every dimension to be collected. Legacy V1 single ratings migrate to `overall` only.

## Memory Reward

V1 gold-star feedback is preserved but its meaning changes.

Old:

```text
stars → Egg → XP
```

New:

```text
stars → Memories icon / Memory counter → +1 Memory
```

This is presentation-only. It must not determine whether a Memory exists.

The visual language remains:

- pale yellow
- champagne gold
- small particles
- short duration
- warm
- soft
- mobile-friendly
- reduced-motion friendly

## Removed Concepts

V2 removes:

- Egg
- Egg customization
- Egg page
- Egg progress
- hatch system
- XP
- XP settlement
- XP delta badge
- relationship progression
- love progression
- pet naming
- hatchGoal
- eggColor
- isHatched
- petName

No renamed substitute for relationship progress should be added.

## Preserved Concepts

V2 keeps:

- date discovery
- Date Cards
- random discovery
- category filtering
- Adventure flow
- Memory Prompt
- `I got it` / `Skip`
- private experience rating
- Memories
- localStorage
- localization
- existing gold-star reward style

## Not V2

- backend
- accounts
- cloud sync
- Solo mode
- partner profiles
- relationship timelines
- relationship scoring
- photo upload/storage
- social feed
- replacement XP/currency system

## V2 Success Criteria

Internal testing should answer:

- Do users understand that completed dates become their own Memories?
- Does Skip still feel safe because the Memory is preserved?
- Does the Memories surface feel personally meaningful rather than couple-dependent?
- Does the `+1 Memory` reward feel satisfying without turning Memories into a score chase?
- Does migration preserve existing completed experiences without exposing obsolete Egg/XP concepts?

## Development Rule

When choosing between a relationship-centric implementation and a user-owned experience implementation, choose the user-owned Memory model.

Do not add product complexity unless it improves discovery, doing the activity, preserving the completed experience, or revisiting Memories.
