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
 * Optional journal photos are stored privately, separately from activity content.
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
  description?: string;
  memoryPrompt?: string;
}

export interface MemoryImage {
  id: string;
  user_id: string;
  memory_id: string;
  storage_path: string;
  sort_order: number;
  width: number | null;
  height: number | null;
  ready: boolean;
  created_at: string;
}

/** Database-backed journal. Local legacy Memory remains an import contract only. */
export interface JournalMemory {
  id: string;
  user_id: string;
  source_key: string | null;
  activity_snapshot: { title: string; description?: string; memoryPrompt?: string; identity?: ActivityIdentity };
  occurred_at: string;
  rating: MemoryRating;
  moods: string[];
  note: string;
  memory_prompt_completed: boolean;
  created_at: string;
  updated_at: string;
  memory_images: MemoryImage[];
}

export type JournalInput = Pick<JournalMemory, "activity_snapshot" | "occurred_at" | "rating" | "moods" | "note" | "memory_prompt_completed">;

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
