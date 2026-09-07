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

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: DateCategory;
  cost: DateCost;
  duration: DateDuration;
  indoor: boolean;
  tags: string[];
  photoPrompt?: string;
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
