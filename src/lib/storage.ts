import type { SaveData } from "../types/domain";

const STORAGE_KEY = "mydate.save.v1";

export const EMPTY_SAVE_DATA: SaveData = {
  version: 1,
  savedDateIds: [],
  completedDates: [],
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isSaveData(value: unknown): value is SaveData {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<SaveData>;

  return (
    candidate.version === 1 &&
    Array.isArray(candidate.savedDateIds) &&
    Array.isArray(candidate.completedDates)
  );
}

export function loadSaveData(): SaveData {
  if (!isBrowser()) return EMPTY_SAVE_DATA;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SAVE_DATA;

    const parsed: unknown = JSON.parse(raw);
    return isSaveData(parsed) ? parsed : EMPTY_SAVE_DATA;
  } catch {
    return EMPTY_SAVE_DATA;
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
