import type {
  ActivityIdentity,
  ActivitySnapshot,
  AdventureSession,
  DiscoveryRound,
  Memory,
  MemoryRating,
  RatingScore,
  SaveData,
} from "../types/domain";

const STORAGE_KEY = "mydate.save.v3";
const LEGACY_V1_STORAGE_KEY = "mydate.save.v2";
const LEGACY_PRE_XP_STORAGE_KEY = "mydate.save.v1";

function createEmptyDiscoveryRound(): DiscoveryRound {
  return { completedActivityKeys: [] };
}

function createEmptySaveData(): SaveData {
  return {
    version: 3,
    savedDateIds: [],
    activeAdventures: [],
    memories: [],
    discoveryRound: createEmptyDiscoveryRound(),
  };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isRatingScore(value: unknown): value is RatingScore {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

function isMemoryRating(value: unknown): value is MemoryRating {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MemoryRating>;

  return [candidate.overall, candidate.fun, candidate.comfort, candidate.doAgain].every(
    (score) => score === undefined || isRatingScore(score),
  );
}

function isActivityIdentity(value: unknown): value is ActivityIdentity {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ActivityIdentity>;

  return (
    (candidate.source === "builtin" || candidate.source === "custom") &&
    typeof candidate.id === "string" &&
    candidate.id.length > 0
  );
}

function isActivitySnapshot(value: unknown): value is ActivitySnapshot {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ActivitySnapshot>;

  return (
    isActivityIdentity(candidate.identity) &&
    (candidate.title === undefined || typeof candidate.title === "string")
  );
}

function isMemory(value: unknown): value is Memory {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Memory>;

  return (
    typeof candidate.id === "string" &&
    isActivitySnapshot(candidate.activitySnapshot) &&
    typeof candidate.completedAt === "string" &&
    typeof candidate.memoryPromptCompleted === "boolean" &&
    (candidate.rating === undefined || isMemoryRating(candidate.rating))
  );
}

function isAdventureSession(value: unknown): value is AdventureSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AdventureSession>;

  return (
    typeof candidate.id === "string" &&
    isActivitySnapshot(candidate.activitySnapshot) &&
    typeof candidate.startedAt === "string"
  );
}

function isDiscoveryRound(value: unknown): value is DiscoveryRound {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<DiscoveryRound>;
  return isStringArray(candidate.completedActivityKeys);
}

function isSaveData(value: unknown): value is SaveData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SaveData>;

  return (
    candidate.version === 3 &&
    isStringArray(candidate.savedDateIds) &&
    Array.isArray(candidate.activeAdventures) &&
    candidate.activeAdventures.every(isAdventureSession) &&
    Array.isArray(candidate.memories) &&
    candidate.memories.every(isMemory) &&
    isDiscoveryRound(candidate.discoveryRound)
  );
}

function safeParse(raw: string | null): unknown {
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}

function uniqueMemories(memories: Memory[]): Memory[] {
  const seen = new Set<string>();
  return memories.filter((memory) => {
    if (seen.has(memory.id)) return false;
    seen.add(memory.id);
    return true;
  });
}

function legacyBuiltinSnapshot(dateIdeaId: string): ActivitySnapshot {
  return {
    identity: { source: "builtin", id: dateIdeaId },
  };
}

function migrateLegacyV1(value: unknown): SaveData | undefined {
  if (!value || typeof value !== "object") return undefined;
  const legacy = value as {
    version?: unknown;
    savedDateIds?: unknown;
    adventures?: unknown;
  };

  if (legacy.version !== 2 || !Array.isArray(legacy.adventures)) return undefined;

  const memories: Memory[] = [];

  for (const item of legacy.adventures) {
    if (!item || typeof item !== "object") continue;
    const adventure = item as {
      id?: unknown;
      dateId?: unknown;
      completedAt?: unknown;
      memoryPromptStatus?: unknown;
      rating?: unknown;
    };

    if (
      typeof adventure.id !== "string" ||
      typeof adventure.dateId !== "string" ||
      typeof adventure.completedAt !== "string"
    ) {
      continue;
    }

    const rating = isRatingScore(adventure.rating)
      ? { overall: adventure.rating }
      : undefined;

    memories.push({
      id: adventure.id,
      activitySnapshot: legacyBuiltinSnapshot(adventure.dateId),
      completedAt: adventure.completedAt,
      memoryPromptCompleted: adventure.memoryPromptStatus === "completed",
      rating,
    });
  }

  return {
    version: 3,
    savedDateIds: isStringArray(legacy.savedDateIds) ? legacy.savedDateIds : [],
    activeAdventures: [],
    memories: uniqueMemories(memories),
    discoveryRound: createEmptyDiscoveryRound(),
  };
}

function migrateLegacyCompletedDates(value: unknown): SaveData | undefined {
  if (!value || typeof value !== "object") return undefined;
  const legacy = value as {
    version?: unknown;
    savedDateIds?: unknown;
    completedDates?: unknown;
  };

  if (legacy.version !== 1 || !Array.isArray(legacy.completedDates)) return undefined;

  const memories: Memory[] = [];

  for (const item of legacy.completedDates) {
    if (!item || typeof item !== "object") continue;
    const completed = item as { dateId?: unknown; completedAt?: unknown };

    if (typeof completed.dateId !== "string" || typeof completed.completedAt !== "string") {
      continue;
    }

    memories.push({
      id: `legacy:${completed.dateId}:${completed.completedAt}`,
      activitySnapshot: legacyBuiltinSnapshot(completed.dateId),
      completedAt: completed.completedAt,
      memoryPromptCompleted: false,
    });
  }

  return {
    version: 3,
    savedDateIds: isStringArray(legacy.savedDateIds) ? legacy.savedDateIds : [],
    activeAdventures: [],
    memories: uniqueMemories(memories),
    discoveryRound: createEmptyDiscoveryRound(),
  };
}

function loadMigratedData(): SaveData | undefined {
  if (!isBrowser()) return undefined;

  const v1 = migrateLegacyV1(safeParse(window.localStorage.getItem(LEGACY_V1_STORAGE_KEY)));
  if (v1) return v1;

  return migrateLegacyCompletedDates(
    safeParse(window.localStorage.getItem(LEGACY_PRE_XP_STORAGE_KEY)),
  );
}

export function loadSaveData(): SaveData {
  if (!isBrowser()) return createEmptySaveData();

  const current = safeParse(window.localStorage.getItem(STORAGE_KEY));
  if (isSaveData(current)) return current;

  const migrated = loadMigratedData();
  if (migrated) {
    saveSaveData(migrated);
    return migrated;
  }

  return createEmptySaveData();
}

export function saveSaveData(data: SaveData): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearSaveData(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_V1_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_PRE_XP_STORAGE_KEY);
}

export function getActivityKey(identity: ActivityIdentity): string {
  return `${identity.source}:${identity.id}`;
}

export function sameActivityIdentity(a: ActivityIdentity, b: ActivityIdentity): boolean {
  return a.source === b.source && a.id === b.id;
}

function updateMemory(
  memoryId: string,
  updater: (memory: Memory) => Memory,
): Memory | undefined {
  const data = loadSaveData();
  const index = data.memories.findIndex((memory) => memory.id === memoryId);
  if (index === -1) return undefined;

  const updated = updater(data.memories[index]);
  data.memories[index] = updated;
  saveSaveData(data);
  return updated;
}

export function startAdventure(activitySnapshot: ActivitySnapshot): AdventureSession {
  const data = loadSaveData();
  const adventure: AdventureSession = {
    id: crypto.randomUUID(),
    activitySnapshot,
    startedAt: new Date().toISOString(),
  };

  data.activeAdventures.push(adventure);
  saveSaveData(data);
  return adventure;
}

/**
 * Completing an Adventure creates exactly one Memory and excludes that activity
 * from random discovery for the current round exactly once.
 */
export function completeAdventure(adventureId: string): Memory | undefined {
  const data = loadSaveData();
  const existing = data.memories.find((memory) => memory.id === adventureId);

  if (existing) {
    const key = getActivityKey(existing.activitySnapshot.identity);
    if (!data.discoveryRound.completedActivityKeys.includes(key)) {
      data.discoveryRound.completedActivityKeys.push(key);
      saveSaveData(data);
    }
    return existing;
  }

  const index = data.activeAdventures.findIndex((adventure) => adventure.id === adventureId);
  if (index === -1) return undefined;

  const adventure = data.activeAdventures[index];
  const memory: Memory = {
    id: adventure.id,
    activitySnapshot: adventure.activitySnapshot,
    completedAt: new Date().toISOString(),
    memoryPromptCompleted: false,
  };

  const key = getActivityKey(adventure.activitySnapshot.identity);
  data.activeAdventures.splice(index, 1);
  data.memories.push(memory);
  if (!data.discoveryRound.completedActivityKeys.includes(key)) {
    data.discoveryRound.completedActivityKeys.push(key);
  }
  saveSaveData(data);
  return memory;
}

export function setMemoryPromptCompleted(
  memoryId: string,
  completed: boolean,
): Memory | undefined {
  return updateMemory(memoryId, (memory) => ({
    ...memory,
    memoryPromptCompleted: memory.memoryPromptCompleted || completed,
  }));
}

export function saveMemoryRating(
  memoryId: string,
  rating: MemoryRating,
): Memory | undefined {
  if (!isMemoryRating(rating)) return undefined;
  return updateMemory(memoryId, (memory) => ({ ...memory, rating }));
}

export function getMemories(data: SaveData = loadSaveData()): Memory[] {
  return [...data.memories].sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}

export function getMemoryCount(data: SaveData = loadSaveData()): number {
  return data.memories.length;
}

/** Historical state. Never reset by a new discovery round. */
export function hasTriedActivity(
  identity: ActivityIdentity,
  data: SaveData = loadSaveData(),
): boolean {
  return data.memories.some((memory) =>
    sameActivityIdentity(memory.activitySnapshot.identity, identity),
  );
}

/** Useful for future "Tried N times" UI without changing persisted state. */
export function getTriedCount(
  identity: ActivityIdentity,
  data: SaveData = loadSaveData(),
): number {
  return data.memories.filter((memory) =>
    sameActivityIdentity(memory.activitySnapshot.identity, identity),
  ).length;
}

/** Current-cycle state used by random discovery only. */
export function isActivityCompletedInCurrentRound(
  identity: ActivityIdentity,
  data: SaveData = loadSaveData(),
): boolean {
  return data.discoveryRound.completedActivityKeys.includes(getActivityKey(identity));
}

export function startNewDiscoveryRound(): SaveData {
  const data = loadSaveData();
  data.discoveryRound = createEmptyDiscoveryRound();
  saveSaveData(data);
  return data;
}
