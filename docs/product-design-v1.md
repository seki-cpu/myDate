# myDate V1 Product Design

## 1. Product Goal

myDate helps two people quickly answer one question:

> Where should we go, and what should we do together?

V1 is designed for lightweight mobile use during small fragments of time. The product should get users to a usable date idea within seconds.

## 2. Product Principle

**Activity First, Egg Second.**

The primary experience is date discovery and doing the activity. Egg progress is a reward layer after the date flow and must never block, delay, or dominate discovery.

## 3. V1 Scope

### Must Have

- Mobile-first web experience
- Browse date ideas
- Quickly get a random date idea
- Date idea detail view
- Start an adventure
- Complete an adventure
- Required localized Memory Prompt for every DateIdea
- Memory Prompt actions: `I got it` or `Skip`
- MD-002 lightweight reward feedback after `I got it`
- Rating step after Memory Prompt reward feedback
- XP settlement
- Egg progress driven by XP
- Chinese / English / Japanese across the primary flow

### Memory Prompt Principle

Every DateIdea includes one Memory Prompt.

The prompt suggests one meaningful photo the user may take with their own phone camera and keep in their normal phone gallery.

The photo does not need to include both people. It can focus on:

- environment
- objects
- body details
- shadows
- food
- souvenirs
- shared creations
- small visual details

Examples:

- Picnic: photograph your favorite shade of green today.
- Sunset: do not photograph the sun; photograph something lit by the sunset.
- Arcade: photograph something that feels like today's trophy.
- Bookstore: photograph the book the other person held the longest.
- Walk: photograph something you probably would not have noticed if you were alone.

V1 never verifies whether the photo was actually taken.

### No Photo Storage

V1 does not upload or store user photos.

There is:

- no photo database
- no image backend
- no cloud image storage
- no photo URL stored in app state
- no image verification

The user's phone gallery remains the only place where the photo exists.

### XP Rules

- Complete adventure: +20 XP
- Complete Memory Prompt: +5 XP
- Complete rating: +5 XP

Each XP source is idempotent per started adventure. Refreshing, navigating back, or repeating an action must never grant duplicate XP.

Skipping the Memory Prompt grants 0 XP for that source.

### MD-002 Reward Burst to Egg

After the user completes the Memory Prompt by tapping `I got it`, V1 gives a short, soft reward moment before continuing.

Product sequence:

```text
Memory Prompt
→ I got it
→ lightweight reward modal
→ OK
→ pale-yellow / champagne-gold star burst toward Egg mini icon
→ Egg mini icon glows / bumps once
→ continue to Rating
```

The visual effect represents the existing +5 XP Memory Prompt reward. It does not create additional XP.

Design intent:

- warm
- soft
- minimal
- short
- satisfying without feeling arcade-heavy
- mobile-friendly
- secondary to the activity itself

The effect should use a restrained number of small pale-yellow / champagne-gold stars.

The reward modal should be lightweight and quick to dismiss.

The animation is presentation-only. The experience must remain correct if the user skips, interrupts, or does not see the animation.

Reduced-motion users should receive a simpler feedback treatment where feasible, such as a brief +5 XP fade and subtle Egg glow without traveling particles.

V1 does not require sound effects for MD-002.

### Not V1

- User accounts
- Cloud sync
- Database-backed content management
- AI recommendation engine
- Social feed
- Public ratings
- Couple account
- Photo upload
- Cloud photo storage
- Photo verification
- Complex Egg economy / inventory / collectibles
- Interactive category / mood filters
- Persisted animation history
- MD-002 sound effects

## 4. Core User Flow

```text
Date discovery
→ Let's do it
→ Adventure
→ Complete
→ Memory Prompt
→ I got it / Skip
→ Reward feedback when completed
→ Rating
→ XP settlement
→ Egg progress
```

The user should never be required to interact with Egg before finding or starting an activity.

## 5. Home Screen Priority

The home screen must answer:

> What can we do now?

Priority order:

1. Date discovery
2. Random idea CTA
3. Date cards
4. Optional Egg presence

## 6. Visual Direction

- Mobile first
- White as the primary background
- Minimal layout
- Small amount of subtle gold shimmer / accent
- Calm, clean, lightweight visual language
- Avoid heavy borders and visually noisy decoration
- Large tap targets
- Fast scanning over dense information

For MD-002 specifically:

- use small pale-yellow / champagne-gold stars
- use one short directional burst
- use one soft Egg glow / bump
- avoid excessive particles
- avoid arcade-heavy visual language

## 7. Egg Direction

Egg progress is included as the final reward feedback in the V1 activity flow.

The Egg remains architecturally separate from DateIdea.

MD-002 may use the Egg mini icon as a visual absorption target, but Egg still does not become the primary navigation or discovery surface.

V1 does not introduce inventory, economy, collectibles, or other game systems beyond XP-driven progress.

## 8. Content Principles

Each idea should be:

- understandable in a few seconds
- specific enough to act on
- realistic for two people
- usable without lengthy preparation
- paired with one meaningful Memory Prompt

Memory Prompts should help preserve a visual trace of the experience rather than defaulting to posed couple photos.

The content system should describe **what kind of place** to go to rather than hard-code local businesses in V1.

## 9. Success Criteria for Internal Test

During friend testing, we want to learn:

- Can users find an appealing idea quickly?
- Do they understand the activity without explanation?
- Do users prefer browse or random discovery?
- Do users actually complete ideas?
- Do Memory Prompts feel meaningful rather than intrusive?
- Does `I got it` / `Skip` feel frictionless?
- Does MD-002 feel rewarding without slowing the flow?
- Does the XP and Egg feedback feel rewarding without distracting from the date?

## 10. V1 Development Rule

A feature should normally be postponed if it does not improve one of these:

- finding a date idea
- understanding a date idea
- doing a date idea
- preserving one small memory cue
- completing the lightweight reward loop

V1 should remain intentionally small and backend-free.
