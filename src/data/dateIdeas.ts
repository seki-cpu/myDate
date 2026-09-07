import type { DateIdea } from "../types/domain";

/**
 * Canonical V1 date idea source.
 *
 * The Date Content Developer owns the records in this file.
 * UI code should consume this source rather than defining independent
 * activity arrays inside components.
 *
 * Note: V1 currently keeps English copy here because DateIdea has not yet
 * been approved for localized fields. Chinese and Japanese copy lives in
 * docs/date-content-v1.md for UI integration after the localization model
 * is approved by the architect.
 */
export const dateIdeas: DateIdea[] = [
  {
    id: "sunset-walk",
    title: "Sunset Walk",
    description:
      "Pick a scenic route and walk without a destination. Stop whenever the moment feels right.",
    category: "romantic",
    cost: "free",
    duration: "medium",
    indoor: false,
    tags: ["outdoor", "relaxing", "walk"],
    photoPrompt: "Take one photo with both of your shoes or shadows in the frame.",
  },
  {
    id: "one-canvas",
    title: "One Canvas",
    description:
      "Share one canvas and take turns adding colors, shapes, and little things only the two of you understand.",
    category: "creative",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["art", "collaboration", "playful"],
  },
  {
    id: "dance-night",
    title: "Dance Night",
    description:
      "Find a place playing music you both like. No games, no challenges—just dance and enjoy the night.",
    category: "adventure",
    cost: "medium",
    duration: "long",
    indoor: true,
    tags: ["night", "music", "active"],
  },
  {
    id: "convenience-store-picnic",
    title: "Convenience Store Picnic",
    description:
      "Pick a few snacks and drinks, then find a park, riverside spot, or quiet bench to share them.",
    category: "food",
    cost: "low",
    duration: "short",
    indoor: false,
    tags: ["outdoor", "casual", "spontaneous"],
  },
  {
    id: "five-beautiful-things",
    title: "Find Five Beautiful Things",
    description:
      "Wander without a destination and find five things worth stopping to notice.",
    category: "adventure",
    cost: "free",
    duration: "medium",
    indoor: false,
    tags: ["outdoor", "photo", "exploration"],
    photoPrompt: "Make the final photo include a small part of both of you.",
  },
  {
    id: "arcade-date",
    title: "Arcade Date",
    description:
      "Race, play rhythm games, try a claw machine—just follow whatever looks fun.",
    category: "indoor",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["playful", "games", "casual"],
  },
  {
    id: "cook-something-new",
    title: "Cook Something New",
    description:
      "Choose a recipe neither of you has made before and figure it out together. Success is optional.",
    category: "food",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["creative", "collaboration", "home"],
  },
  {
    id: "quiet-reading-date",
    title: "Quiet Reading Date",
    description:
      "Find a cozy café and read your own books side by side. You do not have to keep talking to be together.",
    category: "relaxing",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["quiet", "cafe", "reading"],
  },
];
