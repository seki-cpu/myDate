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
  {
    id: "pottery-for-two",
    title: "Pottery for Two",
    description:
      "Book a pottery session and make something useful, silly, or slightly crooked together.",
    category: "creative",
    cost: "medium",
    duration: "medium",
    indoor: true,
    tags: ["workshop", "hands-on", "collaboration"],
  },
  {
    id: "live-music-night",
    title: "Live Music Night",
    description:
      "Pick a small live show or concert and let the music carry the conversation for a while.",
    category: "romantic",
    cost: "medium",
    duration: "long",
    indoor: true,
    tags: ["music", "night", "event"],
  },
  {
    id: "aquarium-walk",
    title: "Aquarium Walk",
    description:
      "Walk slowly through an aquarium and spend too long watching whichever creature catches your eye.",
    category: "relaxing",
    cost: "medium",
    duration: "medium",
    indoor: true,
    tags: ["quiet", "animals", "slow"],
  },
  {
    id: "breakfast-date",
    title: "Breakfast Date",
    description:
      "Meet earlier than usual and share breakfast while the day still feels new.",
    category: "food",
    cost: "low",
    duration: "short",
    indoor: true,
    tags: ["morning", "casual", "cafe"],
  },
  {
    id: "bike-and-breeze",
    title: "Bike and Breeze",
    description:
      "Rent bikes or use your own and ride somewhere with an open view, then stop when you find a good spot.",
    category: "outdoor",
    cost: "low",
    duration: "medium",
    indoor: false,
    tags: ["active", "cycling", "scenic"],
  },
  {
    id: "dessert-split",
    title: "Dessert Split",
    description:
      "Choose two desserts neither of you has tried and share both instead of ordering your usual favorites.",
    category: "food",
    cost: "low",
    duration: "short",
    indoor: true,
    tags: ["dessert", "casual", "taste"],
  },
  {
    id: "market-wander",
    title: "Market Wander",
    description:
      "Browse a market or street fair with no shopping list and follow whatever smells, looks, or sounds interesting.",
    category: "adventure",
    cost: "low",
    duration: "medium",
    indoor: false,
    tags: ["market", "food", "exploration"],
  },
  {
    id: "museum-pick",
    title: "Museum Pick",
    description:
      "Visit a museum or gallery and each choose one piece you would happily take home if you could.",
    category: "creative",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["art", "culture", "conversation"],
  },
  {
    id: "mini-road-trip",
    title: "Mini Road Trip",
    description:
      "Choose somewhere close enough for a day trip, make one playlist, and let the ride be part of the date.",
    category: "adventure",
    cost: "medium",
    duration: "long",
    indoor: false,
    tags: ["travel", "drive", "day-trip"],
  },
  {
    id: "rainy-day-walk",
    title: "Rainy Day Walk",
    description:
      "Take umbrellas, pick a short route, and enjoy how familiar streets feel different in the rain.",
    category: "romantic",
    cost: "free",
    duration: "short",
    indoor: false,
    tags: ["rain", "walk", "cozy"],
    photoPrompt: "Take one photo of your umbrellas, shoes, or reflections in a puddle.",
  },
  {
    id: "bowling-date",
    title: "Bowling Date",
    description:
      "Play a few relaxed rounds, celebrate lucky shots, and let bad throws be part of the fun.",
    category: "indoor",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["active", "playful", "games"],
  },
  {
    id: "grocery-surprise",
    title: "Grocery Surprise",
    description:
      "Go grocery shopping together and each pick one ingredient the other person has to use somehow.",
    category: "food",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["home", "playful", "cooking"],
  },
  {
    id: "flower-shop-stop",
    title: "Flower Shop Stop",
    description:
      "Browse a flower shop and each choose one stem or small bloom you genuinely like.",
    category: "romantic",
    cost: "low",
    duration: "short",
    indoor: true,
    tags: ["flowers", "casual", "small-gift"],
  },
  {
    id: "photo-booth-date",
    title: "Photo Booth Date",
    description:
      "Find a photo booth and take a set of pictures without overthinking poses or trying to look perfect.",
    category: "romantic",
    cost: "low",
    duration: "short",
    indoor: true,
    tags: ["photo", "playful", "memory"],
    photoPrompt: "Keep one strip or image from the booth as today's memory.",
  },
  {
    id: "board-game-picnic",
    title: "Board Game Picnic",
    description:
      "Bring one easy game outside with snacks and play somewhere you can stay as long as you like.",
    category: "outdoor",
    cost: "low",
    duration: "medium",
    indoor: false,
    tags: ["games", "picnic", "casual"],
  },
  {
    id: "karaoke-for-two",
    title: "Karaoke for Two",
    description:
      "Book a small room, queue songs you actually love, and sing badly if that is what happens.",
    category: "indoor",
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["music", "playful", "night"],
  },
  {
    id: "sunrise-date",
    title: "Sunrise Date",
    description:
      "Wake up unusually early and watch the sky change somewhere with a clear view.",
    category: "romantic",
    cost: "free",
    duration: "medium",
    indoor: false,
    tags: ["morning", "outdoor", "scenic"],
    photoPrompt: "Take one photo of your two shadows after the sun comes up.",
  },
  {
    id: "room-dreaming",
    title: "Dream Room Browsing",
    description:
      "Walk through a furniture or home store and point out what you would choose for your own ideal spaces.",
    category: "indoor",
    cost: "free",
    duration: "medium",
    indoor: true,
    tags: ["home", "conversation", "playful"],
  },
  {
    id: "try-each-others-drink",
    title: "Pick Each Other's Drink",
    description:
      "At a café or tea shop, choose a drink for the other person based only on what you think they might enjoy.",
    category: "food",
    cost: "low",
    duration: "short",
    indoor: true,
    tags: ["cafe", "taste", "casual"],
  },
  {
    id: "short-hike",
    title: "Short Hike",
    description:
      "Choose an easy route with a view, bring water, and keep the pace comfortable enough to talk.",
    category: "outdoor",
    cost: "free",
    duration: "long",
    indoor: false,
    tags: ["active", "nature", "walk"],
  },
  {
    id: "make-a-playlist",
    title: "Make One Playlist",
    description:
      "Take turns adding songs until you have one shared playlist for the day, trip, or season.",
    category: "creative",
    cost: "free",
    duration: "short",
    indoor: true,
    tags: ["music", "home", "creative"],
  },
  {
    id: "night-view-stop",
    title: "Night View Stop",
    description:
      "Find a safe viewpoint, bridge, rooftop, or open space and stay long enough to notice the city getting quieter.",
    category: "romantic",
    cost: "free",
    duration: "short",
    indoor: false,
    tags: ["night", "scenic", "quiet"],
  },
  {
    id: "bakery-breakfast-pick",
    title: "Bakery Breakfast Pick",
    description:
      "Visit a bakery and each choose one thing for yourself and one thing you think the other person should try.",
    category: "food",
    cost: "low",
    duration: "short",
    indoor: true,
    tags: ["bakery", "morning", "casual"],
  },
  {
    id: "tiny-time-capsule",
    title: "Tiny Time Capsule",
    description:
      "Save a few small things from today—a receipt, ticket, note, or photo—and keep them together somewhere safe.",
    category: "creative",
    cost: "free",
    duration: "short",
    indoor: true,
    tags: ["memory", "keepsake", "quiet"],
    photoPrompt: "Add one photo from today that includes a small part of both of you.",
  },
];
