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

export interface DateIdea {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  littleMission?: LocalizedText;
  categories: DateCategory[];
  cost: DateCost;
  duration: DateDuration;
  indoor: boolean;
  tags: string[];
  photoPrompt?: LocalizedText;
}

export interface CompletedDate {
  dateId: string;
  completedAt: string;
  photoUrl?: string;
}

export interface EggPreferences {
  color: string;
}

export interface SaveData {
  version: 1;
  savedDateIds: string[];
  completedDates: CompletedDate[];
  egg?: EggPreferences;
}
