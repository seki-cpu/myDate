import type {
  AdventureRecord,
  DateRating,
  MemoryPromptStatus,
  SaveData,
} from "../types/domain";

const STORAGE_KEY = "mydate.save.v2";

export const XP_REWARDS = {
  adventure: 20,
  memoryPrompt: 5,
  rating: 5,
} as const;

export const EGG_HATCH_XP = 100;

export type EggStage = "dormant" | "warming" | "glowing" | "cracking" | "hatched";

export interface EggProgress {
  totalXp: number;
  hatchXp: number;
  progress: number;
  stage: EggStage;
  hatched: boolean;
}

function createEmptySaveData(): SaveData {
  return {
    version: 2,
    savedDateIds: [],
    adventures: [],
  };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isMemoryPromptStatus(value: unknown): value is MemoryPromptStatus {
  return value === "pending" || value === "completed" || value === "skipped";
}

function isDateRating(value: unknown): value is DateRating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

function isAdventureRecord(value: unknown): value is AdventureRecord {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<AdventureRecord>;
  const xpAwarded = candidate.xpAwarded as Partial<AdventureRecord["xpAwarded"]> | undefined;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.dateId === "string" &&
    typeof candidate.startedAt === "string" &&
    (candidate.completedAt === undefined || typeof candidate.completedAt === "string") &&
    isMemoryPromptStatus(candidate.memoryPromptStatus) &&
    (candidate.memoryPromptResolvedAt === undefined ||
      typeof candidate.memoryPromptResolvedAt === "string") &&
    (candidate.rating === undefined || isDateRating(candidate.rating)) &&
    (candidate.ratingCompletedAt === undefined ||
      typeof candidate.ratingCompletedAt === "string") &&
    !!xpAwarded &&
    typeof xpAwarded.adventure === "boolean" &&
    typeof xpAwarded.memoryPrompt === "boolean" &&
    typeof xpAwarded.rating === "boolean"
  );
}

function isSaveData(value: unknown): value is SaveData {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<SaveData>;

  return (
    candidate.version === 2 &&
    isStringArray(candidate.savedDateIds) &&
    Array.isArray(candidate.adventures) &&
    candidate.adventures.every(isAdventureRecord)
  );
}

export function loadSaveData(): SaveData {
  if (!isBrowser()) return createEmptySaveData();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptySaveData();

    const parsed: unknown = JSON.parse(raw);
    return isSaveData(parsed) ? parsed : createEmptySaveData();
  } catch {
    return createEmptySaveData();
  }
}

export function saveSaveData(data: SaveData): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearSaveData(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getTotalXp(data: SaveData): number {
  return data.adventures.reduce((total, adventure) => {
    return (
      total +
      (adventure.xpAwarded.adventure ? XP_REWARDS.adventure : 0) +
      (adventure.xpAwarded.memoryPrompt ? XP_REWARDS.memoryPrompt : 0) +
      (adventure.xpAwarded.rating ? XP_REWARDS.rating : 0)
    );
  }, 0);
}

export function getEggProgress(data: SaveData): EggProgress {
  const totalXp = getTotalXp(data);
  const progress = Math.min(totalXp / EGG_HATCH_XP, 1);

  let stage: EggStage = "dormant";
  if (totalXp >= EGG_HATCH_XP) stage = "hatched";
  else if (totalXp >= 75) stage = "cracking";
  else if (totalXp >= 50) stage = "glowing";
  else if (totalXp >= 25) stage = "warming";

  return {
    totalXp,
    hatchXp: EGG_HATCH_XP,
    progress,
    stage,
    hatched: totalXp >= EGG_HATCH_XP,
  };
}

function updateAdventure(
  adventureId: string,
  updater: (adventure: AdventureRecord) => AdventureRecord,
): AdventureRecord | undefined {
  const data = loadSaveData();
  const index = data.adventures.findIndex((adventure) => adventure.id === adventureId);
  if (index === -1) return undefined;

  const updated = updater(data.adventures[index]);
  data.adventures[index] = updated;
  saveSaveData(data);
  return updated;
}

export function startAdventure(dateId: string): AdventureRecord {
  const data = loadSaveData();
  const adventure: AdventureRecord = {
    id: crypto.randomUUID(),
    dateId,
    startedAt: new Date().toISOString(),
    memoryPromptStatus: "pending",
    xpAwarded: {
      adventure: false,
      memoryPrompt: false,
      rating: false,
    },
  };

  data.adventures.push(adventure);
  saveSaveData(data);
  return adventure;
}

export function completeAdventure(adventureId: string): AdventureRecord | undefined {
  return updateAdventure(adventureId, (adventure) => {
    if (adventure.xpAwarded.adventure) return adventure;

    return {
      ...adventure,
      completedAt: adventure.completedAt ?? new Date().toISOString(),
      xpAwarded: { ...adventure.xpAwarded, adventure: true },
    };
  });
}

export function resolveMemoryPrompt(
  adventureId: string,
  status: Exclude<MemoryPromptStatus, "pending">,
): AdventureRecord | undefined {
  return updateAdventure(adventureId, (adventure) => {
    if (!adventure.completedAt) return adventure;
    if (adventure.memoryPromptStatus === "completed") return adventure;

    const completed = status === "completed";

    return {
      ...adventure,
      memoryPromptStatus: status,
      memoryPromptResolvedAt: adventure.memoryPromptResolvedAt ?? new Date().toISOString(),
      xpAwarded: {
        ...adventure.xpAwarded,
        memoryPrompt: adventure.xpAwarded.memoryPrompt || completed,
      },
    };
  });
}

export function completeRating(
  adventureId: string,
  rating: DateRating,
): AdventureRecord | undefined {
  return updateAdventure(adventureId, (adventure) => {
    if (adventure.memoryPromptStatus === "pending") return adventure;

    return {
      ...adventure,
      rating,
      ratingCompletedAt: adventure.ratingCompletedAt ?? new Date().toISOString(),
      xpAwarded: { ...adventure.xpAwarded, rating: true },
    };
  });
}
