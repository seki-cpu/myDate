"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DateIdea } from "../../types/domain";
import { finishJournalAdventure, loadSaveData } from "../../lib/storage";
import { MemoryService } from "../../lib/services/memories";
import { useJournal } from "../memory/JournalProvider";
import { AccountPanel } from "../memory/AccountPanel";
import { journalCopy } from "../memory/journalCopy";
import {
  flowCopy,
  localizeIdea,
  localizePhotoPrompt,
  useLocale,
} from "../ui/locale";
import styles from "./reward.module.css";

interface CompleteContentProps {
  idea?: DateIdea;
  memoryId?: string;
}

type SaveError = "backend" | "generic" | null;

const memoryPromptCopy = {
  zh: {
    eyebrow: "记忆提示",
    title: "留下一点今天的痕迹。",
    note: "不用露脸。你可以照着提示拍，也可以跳过；两种情况都会继续创建这段 Memory。",
    gotIt: "拍到了",
    skip: "跳过",
  },
  en: {
    eyebrow: "Memory Prompt",
    title: "Keep one small piece of today.",
    note: "No faces required. Take the suggested photo if you want, or skip it; either way you can keep this Memory.",
    gotIt: "I got it",
    skip: "Skip",
  },
  ja: {
    eyebrow: "思い出のヒント",
    title: "今日の小さな痕跡を残そう。",
    note: "顔は写さなくて大丈夫。撮っても、スキップしても、この Memory はそのまま残せる。",
    gotIt: "撮れた",
    skip: "スキップ",
  },
} as const;

function isBackendUnavailable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { code?: unknown; message?: unknown; status?: unknown };
  if (candidate.code === "PGRST205" || candidate.status === 404) return true;
  return (
    typeof candidate.message === "string" &&
    candidate.message.toLowerCase().includes("memories") &&
    candidate.message.toLowerCase().includes("schema")
  );
}

export function CompleteContent(props: CompleteContentProps) {
  const { user } = useJournal();
  return <CompleteSession key={user?.id ?? "guest"} {...props} />;
}

function CompleteSession({ idea, memoryId }: CompleteContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const copy = flowCopy[locale];
  const memoryCopy = memoryPromptCopy[locale];
  const journal = journalCopy[locale];
  const { user, loading, refresh } = useJournal();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<SaveError>(null);
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
  const prompt = idea
    ? localizePhotoPrompt(idea, locale) ?? copy.genericPhoto
    : copy.genericPhoto;

  async function resolvePrompt(completed: boolean) {
    if (saving) return;
    if (!memoryId) {
      router.push("/");
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      const adventure = loadSaveData().activeAdventures.find(
        (item) => item.id === memoryId,
      );
      if (!adventure) throw new Error("adventure_unavailable");

      const snapshot = adventure.activitySnapshot;
      const memory = await MemoryService.create(
        {
          activity_snapshot: {
            ...snapshot,
            title: snapshot.title ?? localizedIdea?.title ?? journal.legacy,
          },
          occurred_at: new Date().toISOString(),
          rating: {},
          moods: [],
          note: "",
          memory_prompt_completed: completed,
        },
        `adventure:${adventure.id}`,
      );

      finishJournalAdventure(adventure.id);
      await refresh();
      router.push(`/memories/${memory.id}/create`);
    } catch (error) {
      setSaveError(isBackendUnavailable(error) ? "backend" : "generic");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>{journal.loading}</p>;

  if (!user) {
    return (
      <AccountPanel
        returnTo={`/complete?${new URLSearchParams({
          id: idea?.id ?? "",
          memoryId: memoryId ?? "",
        })}`}
      />
    );
  }

  return (
    <div className={styles.shell}>
      <p className="eyebrow">{copy.dateComplete}</p>
      <h1 className="page-title">{localizedIdea?.title ?? copy.finishedDate}</h1>

      <section
        className={`section ${styles.promptFocus}`}
        aria-labelledby="memory-prompt-title"
      >
        <div className={styles.promptIcon} aria-hidden="true">
          ✦
        </div>
        <p className="eyebrow">{memoryCopy.eyebrow}</p>
        <h2 className="activity-title" id="memory-prompt-title">
          {memoryCopy.title}
        </h2>
        <p className={styles.promptText}>{prompt}</p>
        <p className={styles.promptNote}>{memoryCopy.note}</p>
      </section>

      {saveError && (
        <p role="alert">
          {saveError === "backend" ? journal.backend : journal.failed}
        </p>
      )}

      <div className={`action-stack ${styles.actions}`}>
        <button
          className="primary-button"
          type="button"
          onClick={() => resolvePrompt(true)}
          disabled={saving}
        >
          {saving ? "…" : memoryCopy.gotIt}
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => resolvePrompt(false)}
          disabled={saving}
        >
          {memoryCopy.skip}
        </button>
      </div>
    </div>
  );
}
