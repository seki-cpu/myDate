# myDate V1 Product Design

## 1. Product Goal

myDate helps two people quickly answer one question:

> Where should we go, and what should we do together?

V1 is designed for lightweight mobile use during small fragments of time. The product should get users to a usable date idea within seconds.

## 2. Product Principle

**Activity First, Egg Second.**

The primary experience is date discovery. The Egg is an optional emotional layer and must never block, delay, or dominate activity discovery.

## 3. V1 Scope

### Must Have

- Mobile-first web experience
- Browse date ideas
- Quickly get a random date idea
- Lightweight filtering
- Date idea detail view
- Save ideas locally
- Mark an idea as completed
- Optional photo prompt after completion

### Photo Prompt Principle

After a date is completed, myDate may suggest taking a memory photo. The photo should not require identifiable full faces. Prompts may suggest including traces of both people, such as:

- hands
- legs
- shoes / feet
- clothing details
- eyes
- two objects being held together
- a shared souvenir or object from the date

Photo upload is **not required in V1**.

### Not V1

- User accounts
- Cloud sync
- Database-backed content management
- AI recommendation engine
- Social feed
- Public ratings
- Couple account
- Cloud photo storage
- Complex Egg progression
- Egg inventory / economy / collectibles

## 4. Core User Flow

Home
→ Discover or Random
→ Date Idea Detail
→ Save / Start
→ Complete
→ Optional Photo Prompt

The user should never be required to interact with the Egg to reach an activity.

## 5. Home Screen Priority

The home screen must answer:

> What can we do now?

Priority order:

1. Date discovery
2. Random idea CTA
3. Quick filters
4. Date cards
5. Saved ideas
6. Optional Egg presence

## 6. Visual Direction

- Mobile first
- White as the primary background
- Minimal layout
- Small amount of subtle gold shimmer / accent
- Calm, clean, lightweight visual language
- Avoid heavy borders and visually noisy decoration
- Large tap targets
- Fast scanning over dense information

## 7. Egg Direction

The Egg is optional in V1 architecture.

If exposed in the first playable version, customization is limited to **color only**.

The architecture should allow later expansion into:

- shared couple Egg
- progression / hatching
- memories connected to Egg growth
- cosmetic customization

These later systems must remain separate from the `DateIdea` domain model.

## 8. Content Principles

Each idea should be:

- understandable in a few seconds
- specific enough to act on
- realistic for two people
- tagged for lightweight filtering
- usable without lengthy preparation

Examples of idea shapes:

- Go to a bookstore and choose one book for each other.
- Find a nearby bakery and each pick one thing the other person must try.
- Take a 30-minute walk and photograph three things in the same color.
- Visit a supermarket and build a snack tasting set under a fixed budget.

The content system should describe **what kind of place** to go to rather than hard-code local businesses in V1.

## 9. Success Criteria for Internal Test

During friend testing, we want to learn:

- Can users find an appealing idea quickly?
- Do they understand the activity without explanation?
- Are filters useful or unnecessary?
- Do users prefer browse or random discovery?
- Do users save ideas for later?
- Do users actually complete ideas?
- Does the optional memory prompt feel charming or intrusive?

## 10. V1 Development Rule

A feature should normally be postponed if it does not improve one of these:

- finding a date idea
- understanding a date idea
- saving a date idea
- completing a date idea

V1 should remain intentionally small while keeping clean extension points for later development.
