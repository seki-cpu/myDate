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
 * V1 ships with Chinese, English, and Japanese.
 * Additional locale keys may be added later without changing DateIdea.
 */
export interface LocalizedText extends Record<string, string> {
  zh: string;
  en: string;
  ja: string;
}

/**
 * Canonical V1 activity contract.
 * photoPrompt is the required localized Memory Prompt shown after completion.
 * It never represents an uploaded or stored image.
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

export type MemoryPromptStatus = "pending" | "completed" | "skipped";

export interface XpAwardState {
  adventure: boolean;
  memoryPrompt: boolean;
  rating: boolean;
}

/**
 * One user-started instance of a DateIdea.
 * The same DateIdea may be started again later with a new id.
 */
export interface AdventureRecord {
  id: string;
  dateId: string;
  startedAt: string;
  completedAt?: string;
  memoryPromptStatus: MemoryPromptStatus;
  memoryPromptResolvedAt?: string;
  ratingCompletedAt?: string;
  xpAwarded: XpAwardState;
}

export interface EggPreferences {
  color: string;
}

export interface SaveData {
  version: 2;
  savedDateIds: string[];
  adventures: AdventureRecord[];
  egg?: EggPreferences;
}
