"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { MobileShell } from "../../../../components/layout/MobileShell";
import { AccountRequired } from "../../../../components/memory/AccountRequired";
import { useJournal } from "../../../../components/memory/JournalProvider";
import { journalCopy } from "../../../../components/memory/journalCopy";
import { useLocale } from "../../../../components/ui/locale";
import { MemoryService } from "../../../../lib/services/memories";

const copy = {
  en: {
    eyebrow: "Custom Memory",
    title: "What did you do?",
    titleLabel: "Activity",
    dateLabel: "Date",
    helper: "Create the Memory first, then add an optional journal note or photos.",
    action: "Continue",
  },
  zh: {
    eyebrow: "自定义回忆",
    title: "你们做了什么？",
    titleLabel: "做过的事情",
    dateLabel: "日期",
    helper: "先创建这段回忆，下一步可以选择添加日记或照片。",
    action: "继续",
  },
  ja: {
    eyebrow: "カスタムの思い出",
    title: "何をした？",
    titleLabel: "体験したこと",
    dateLabel: "日付",
    helper: "まず思い出を作り、次の画面で日記や写真を任意で追加できる。",
    action: "続ける",
  },
} as const;

function localDateValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function CustomMemoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const text = copy[locale];
  const journal = journalCopy[locale];
  const { user, loading, refresh } = useJournal();
  const queryDraft = searchParams.get("draft") ?? "";
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [title, setTitle] = useState(searchParams.get("title") ?? "");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const draftId = queryDraft || generatedDraft;

  useEffect(() => {
    if (!queryDraft) setGeneratedDraft(crypto.randomUUID());
    setDate((current) => current || localDateValue());
  }, [queryDraft]);

  const returnTo = `/memories/custom/new?${new URLSearchParams({
    title,
    ...(draftId ? { draft: draftId } : {}),
  }).toString()}`;

  async function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || !draftId || !date || saving) return;

    setSaving(true);
    setError(false);
    try {
      const memory = await MemoryService.create(
        {
          activity_snapshot: {
            identity: { source: "custom", id: draftId },
            title: trimmed,
          },
          occurred_at: new Date(`${date}T12:00:00`).toISOString(),
          rating: {},
          moods: [],
          note: "",
          memory_prompt_completed: false,
        },
        `custom:${draftId}`,
      );
      await refresh();
      router.replace(`/memories/${memory.id}/create`);
    } catch {
      setError(true);
      setSaving(false);
    }
  }

  return (
    <MobileShell backHref="/" variant="wide">
      <p className="eyebrow">{text.eyebrow}</p>
      <h1 className="page-title">{text.title}</h1>
      <p className="page-copy">{text.helper}</p>

      {loading ? (
        <p>{journal.loading}</p>
      ) : !user ? (
        <AccountRequired returnTo={returnTo} />
      ) : (
        <form className="journal-panel journal-form" onSubmit={submit}>
          <label>
            {text.titleLabel}
            <input
              required
              maxLength={300}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            {text.dateLabel}
            <input
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>

          {error ? <p role="alert">{journal.failed}</p> : null}

          <button
            className="primary-button"
            type="submit"
            disabled={saving || !title.trim() || !draftId || !date}
          >
            {saving ? journal.loading : text.action}
          </button>
        </form>
      )}
    </MobileShell>
  );
}

export default function CustomMemoryPage() {
  return (
    <Suspense fallback={null}>
      <CustomMemoryContent />
    </Suspense>
  );
}
