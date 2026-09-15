"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { JournalMemory } from "../../types/domain";
import { MemoryService } from "../../lib/services/memories";
import { useLocale } from "../ui/locale";
import { AccountPanel } from "./AccountPanel";
import { useJournal } from "./JournalProvider";
import { PhotoJournal } from "./PhotoJournal";
import { journalCopy } from "./journalCopy";

const createCopy = {
  en: {
    eyebrow: "Create Memory",
    title: "Keep what matters from today.",
    journal: "Journal",
    placeholder: "Write something you want to remember about today…",
    optional: "Optional — leave this blank if the moment already says enough.",
    photosOptional: "Optional — add photos now, later, or not at all.",
    save: "Save Memory",
  },
  zh: {
    eyebrow: "创建回忆",
    title: "留下今天真正想记住的东西。",
    journal: "日记",
    placeholder: "写一点今天想记住的东西……",
    optional: "可选。不想写也没关系，留空也可以保存。",
    photosOptional: "可选。现在、以后添加照片都可以，也可以完全不加。",
    save: "保存回忆",
  },
  ja: {
    eyebrow: "思い出を作る",
    title: "今日、残しておきたいことを。",
    journal: "日記",
    placeholder: "今日のことを少し残してみよう…",
    optional: "任意。書かなくても、そのまま保存できる。",
    photosOptional: "任意。写真は今でも後からでも追加でき、なくても保存できる。",
    save: "思い出を保存",
  },
} as const;

function CreationSession({ id }: { id: string }) {
  const router = useRouter();
  const locale = useLocale();
  const copy = createCopy[locale];
  const journal = journalCopy[locale];
  const { refresh: refreshList } = useJournal();
  const [memory, setMemory] = useState<JournalMemory | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const next = await MemoryService.get(id);
      setMemory(next);
      setNote((current) => (current ? current : next.note));
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function saveMemory() {
    if (!memory || saving) return;
    setSaving(true);
    setError(false);
    try {
      await MemoryService.update(id, { note });
      await refreshList();
      router.replace(`/memories/${id}`);
    } catch {
      setError(true);
      setSaving(false);
    }
  }

  if (loading) return <p>{journal.loading}</p>;
  if (!memory) {
    return (
      <p role="alert">
        {error ? journal.missing : journal.loading}
      </p>
    );
  }

  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="page-title">{memory.activity_snapshot.title}</h1>
      <p className="page-copy">{copy.title}</p>

      <section className="journal-panel">
        <time dateTime={memory.occurred_at}>
          {new Date(memory.occurred_at).toLocaleDateString(locale)}
        </time>
        {memory.activity_snapshot.memoryPrompt ? (
          <>
            <h2>{journal.prompt}</h2>
            <p>{memory.activity_snapshot.memoryPrompt}</p>
          </>
        ) : null}
      </section>

      <section className="journal-panel journal-form">
        <label>
          {copy.journal}
          <textarea
            rows={6}
            maxLength={20000}
            placeholder={copy.placeholder}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>
        <p className="page-copy">{copy.optional}</p>
      </section>

      <div>
        <p className="page-copy">{copy.photosOptional}</p>
        <PhotoJournal
          memoryId={id}
          photos={memory.memory_images}
          refresh={refresh}
        />
      </div>

      {error ? <p role="alert">{journal.failed}</p> : null}

      <div className="action-stack">
        <button
          className="primary-button"
          type="button"
          disabled={saving}
          onClick={() => void saveMemory()}
        >
          {saving ? journal.loading : copy.save}
        </button>
      </div>
    </>
  );
}

export function MemoryCreation({ id }: { id: string }) {
  const locale = useLocale();
  const t = journalCopy[locale];
  const { user, loading } = useJournal();

  if (loading) return <p>{t.loading}</p>;
  if (!user) return <AccountPanel returnTo={`/memories/${id}/create`} />;

  return <CreationSession key={`${user.id}:${id}`} id={id} />;
}
