export type DateCategory =
  | "food"
  | "outdoor"
  | "indoor"
  | "creative"
  | "romantic"
  | "relaxing"
  | "adventure"
  | "random";

export type DateCost = "free" | "low" | "medium" | "high";

export type DateDuration = "short" | "medium" | "long";

/**
 * V2/V3 ships with Chinese, English, and Japanese.
 * Additional locale keys may be added later without changing DateIdea.
 */
export interface LocalizedText extends Record<string, string> {
  zh: string;
  en: string;
  ja: string;
}

/**
 * Canonical date activity content contract.
 * photoPrompt remains the localized Memory Prompt shown after completion.
 * The app does not upload or store user photos.
 */
export interface DateIdea {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  littleMission?: LocalizedText;
  photoPrompt: LocalizedText;
  categories: DateCategory[];
  cost: DateCost;
  duration: DateDuration;
  indoor: boolean;
  tags: string[];
}

export type ActivitySource = "builtin" | "custom";

/**
 * Stable identity used for matching activity history.
 * Titles are presentation and must never be used as identity.
 */
export interface ActivityIdentity {
  source: ActivitySource;
  id: string;
}

/**
 * Immutable presentation snapshot captured for an Adventure / Memory.
 * identity is authoritative for matching; title is only a historical fallback.
 */
export interface ActivitySnapshot {
  identity: ActivityIdentity;
  title?: string;
}

export type RatingScore = 1 | 2 | 3 | 4 | 5;

/**
 * Private user-owned experience rating.
 * overall preserves the V1 single-score rating without inventing new data.
 * Optional dimensions may be used by later UI without making them required.
 */
export interface MemoryRating {
  overall?: RatingScore;
  fun?: RatingScore;
  comfort?: RatingScore;
  doAgain?: RatingScore;
}

/**
 * Primary completed-experience domain object.
 * One completed Adventure creates exactly one Memory.
 */
export interface Memory {
  id: string;
  activitySnapshot: ActivitySnapshot;
  completedAt: string;
  memoryPromptCompleted: boolean;
  rating?: MemoryRating;
}

/**
 * Lightweight in-progress activity state.
 * Once completed, this session becomes a Memory with the same id.
 */
export interface AdventureSession {
  id: string;
  activitySnapshot: ActivitySnapshot;
  startedAt: string;
}

/**
 * Resettable discovery-cycle state.
 * Historical Tried state is never stored here; it is derived from Memories.
 */
export interface DiscoveryRound {
  completedActivityKeys: string[];
}

export interface SaveData {
  version: 3;
  savedDateIds: string[];
  activeAdventures: AdventureSession[];
  memories: Memory[];
  discoveryRound: DiscoveryRound;
}
