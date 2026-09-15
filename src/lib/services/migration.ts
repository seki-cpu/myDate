import { dateIdeas } from "../../data/dateIdeas";
import { getImportCandidates } from "../storage";
import { AuthService } from "./auth";
import { legacyInput, MemoryService } from "./memories";
const marker = "mydate.journal.import.v1";
const ownerMarker = "mydate.journal.import.owner.v1";
export function localImportState(
  userId: string,
): "available" | "done" | "other" | "empty" {
  const owner = localStorage.getItem(marker);
  if (owner) return owner === userId ? "done" : "other";
  const inProgressOwner = localStorage.getItem(ownerMarker);
  if (inProgressOwner && inProgressOwner !== userId) return "other";
  return getImportCandidates().memories.length ? "available" : "empty";
}
export async function importLocalMemories(locale: "zh" | "en" | "ja") {
  const user = await AuthService.requireUser();
  if (localImportState(user.id) !== "available") return { skipped: 0 };
  localStorage.setItem(ownerMarker, user.id);
  const candidates = getImportCandidates();
  let skipped = candidates.invalid;
  for (const memory of candidates.memories) {
    if ((await AuthService.requireUser()).id !== user.id)
      throw new Error("account_changed");
    const input = legacyInput(memory);
    if (!input) {
      skipped++;
      continue;
    }
    const idea =
      memory.activitySnapshot.identity.source === "builtin"
        ? dateIdeas.find((i) => i.id === memory.activitySnapshot.identity.id)
        : undefined;
    if (idea) {
      input.activity_snapshot.title =
        memory.activitySnapshot.title ?? idea.title[locale];
      input.activity_snapshot.description ??= idea.description[locale];
      input.activity_snapshot.memoryPrompt ??= idea.photoPrompt[locale];
    }
    await MemoryService.create(input, `legacy:${memory.id}`);
  }
  if (!skipped) localStorage.setItem(marker, user.id);
  return { skipped };
}
