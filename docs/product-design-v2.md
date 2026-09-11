# myDate V2/V3 Product Design — Memory First

## Product Statement

> People may change. The memories are still yours.

The user is the permanent subject of myDate. Dating partners and relationships may change, but the user's completed experiences remain theirs.

## Core Product Rule

**Activity First. Memory Second.**

The product does not evaluate whether a relationship is growing, succeeding, failing, or moving toward a shared destination.

A completed Adventure becomes a user-owned Memory.

## Canonical Flow

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

The Memory is persisted at Adventure Complete so later optional steps cannot block or erase the completed experience.

## Historical Tried

Activities completed at least once show a subtle historical indicator.

Recommended labels:

- English: `Tried`
- Chinese: `做过`
- Japanese: `体験済み`

Do not use `Completed`, because activities can be repeated.

Historical Tried and current discovery-round completion are different:

```text
Historical Tried
→ derived from Memories
→ never reset by a new round

Current-round completion
→ used only by random discovery
→ reset by Start a new round
```

Example:

```text
Complete Record Store Exchange
→ excluded from current random round
→ card shows Tried

Start a new round
→ eligible for random again
→ Tried remains visible
```

Tried should appear consistently where practical in Discover cards, filtered lists, My Ideas, and activity detail, but must stay visually secondary to discovery content.

Historical matching uses stable activity identity, never title. This is especially important for user-created activities that may be renamed.

Deleting a custom activity does not delete its existing Memories or historical record.

Repeated experiences create repeated Memories. V3 does not require repetition counts in the UI, but the data model must not prevent future `Tried 2 times` / `Tried 3 times` presentation.

## Memory Prompt

Every DateIdea keeps one localized Memory Prompt through the existing `photoPrompt` field.

The prompt suggests one meaningful photo the user may take with their own phone and keep in their normal gallery.

The app does not upload, store, request URLs for, or verify photos.

`I got it` records only:

```text
memoryPromptCompleted = true
```

`Skip` leaves it false. Both paths keep the Memory.

## Experience Rating

Rating is private and belongs to the completed experience.

The domain supports `overall`, `fun`, `comfort`, and `doAgain`, each 1–5 when collected. Legacy V1 single ratings migrate to `overall` only.

## Memory Reward

The gold-star feedback is preserved but its meaning changes:

```text
stars → Memories icon / Memory counter → +1 Memory
```

This is presentation-only. It never determines whether a Memory exists.

Visual language remains pale yellow / champagne gold, short, warm, soft, mobile-friendly, and reduced-motion friendly.

## Removed Concepts

Remove:

- Egg
- Egg customization/page/progress
- hatch system
- XP / XP settlement / XP delta
- relationship progression
- love progression
- pet naming
- hatchGoal / eggColor / isHatched / petName

No renamed substitute for relationship progress should be added.

## Preserved Concepts

Keep:

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
- gold-star reward style
- repeatable activities

## Not Current Scope

- backend
- accounts
- cloud sync
- Solo mode
- partner profiles
- relationship timelines/scoring
- photo upload/storage
- social feed
- replacement XP/currency system
- mandatory repetition-count UI

## Success Criteria

Internal testing should answer:

- Do completed experiences feel owned by the user?
- Does Skip feel safe because Memory is preserved?
- Does Tried help users understand personal history without making activities feel permanently finished?
- Does starting a new round clearly restore eligibility without erasing history?
- Do custom activity edits/deletion preserve historical continuity?
- Does +1 Memory feel satisfying without becoming a score chase?
- Does migration preserve existing completed experiences without exposing obsolete Egg/XP concepts?

## Development Rule

When choosing between a relationship-centric implementation and a user-owned experience implementation, choose the user-owned Memory model.

Do not add product complexity unless it improves discovery, doing the activity, preserving the completed experience, or revisiting Memories.
