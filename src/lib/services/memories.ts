import type { JournalInput, JournalMemory, Memory } from "../../types/domain";
import { supabase } from "../supabase";
import { AuthService } from "./auth";

const fields = "*, memory_images(*)";
export const MemoryService = {
  async list(): Promise<JournalMemory[]> {
    const { data, error } = await supabase()
      .from("memories")
      .select(fields)
      .order("occurred_at", { ascending: false });
    if (error) throw error;
    return data as JournalMemory[];
  },
  async get(id: string): Promise<JournalMemory> {
    const { data, error } = await supabase()
      .from("memories")
      .select(fields)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as JournalMemory;
  },
  async create(
    input: JournalInput,
    sourceKey?: string,
  ): Promise<JournalMemory> {
    const user = await AuthService.requireUser();
    const { data, error } = await supabase()
      .from("memories")
      .insert({ ...input, user_id: user.id, source_key: sourceKey ?? null })
      .select(fields)
      .single();
    if (error?.code === "23505" && sourceKey) {
      const existing = await supabase()
        .from("memories")
        .select(fields)
        .eq("source_key", sourceKey)
        .single();
      if (existing.error) throw existing.error;
      return existing.data as JournalMemory;
    }
    if (error) throw error;
    return data as JournalMemory;
  },
  async update(
    id: string,
    input: Partial<Omit<JournalInput, "activity_snapshot">>,
  ) {
    const { error } = await supabase()
      .from("memories")
      .update(input)
      .eq("id", id)
      .select("id")
      .single();
    if (error) throw error;
  },
  async remove(id: string) {
    // Image removal goes through StorageService first; the database also enforces this.
    const { error } = await supabase()
      .from("memories")
      .delete()
      .eq("id", id)
      .select("id")
      .single();
    if (error) throw error;
  },
};

export function legacyInput(memory: Memory): JournalInput | undefined {
  if (!Number.isFinite(Date.parse(memory.completedAt))) return undefined;
  return {
    activity_snapshot: {
      ...memory.activitySnapshot,
      title:
        memory.activitySnapshot.title || memory.activitySnapshot.identity.id,
    },
    occurred_at: new Date(memory.completedAt).toISOString(),
    rating: memory.rating ?? {},
    moods: [],
    note: "",
    memory_prompt_completed: memory.memoryPromptCompleted,
  };
}
