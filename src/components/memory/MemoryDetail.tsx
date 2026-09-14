"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { JournalMemory } from "../../types/domain";
import { MemoryService } from "../../lib/services/memories";
import { StorageService } from "../../lib/services/photos";
import { useRouter } from "next/navigation";
import { useLocale } from "../ui/locale";
import { useJournal } from "./JournalProvider";
import { AccountPanel } from "./AccountPanel";
import { journalCopy } from "./journalCopy";
import { PhotoJournal } from "./PhotoJournal";
import { MemoryEditor } from "./MemoryEditor";
function Detail({ id }: { id: string }) {
  const locale = useLocale();
  const t = journalCopy[locale];
  const { refresh: refreshList } = useJournal();
  const router = useRouter();
  const [memory, setMemory] = useState<JournalMemory | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const refresh = useCallback(async () => {
    try {
      setMemory(await MemoryService.get(id));
      setError(false);
      await refreshList();
    } catch {
      setError(true);
    }
  }, [id, refreshList]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  async function remove() {
    if (!window.confirm(t.confirmDelete)) return;
    setBusy(true);
    setError(false);
    try {
      const current = await MemoryService.get(id);
      for (const photo of current.memory_images)
        await StorageService.remove(photo);
      await MemoryService.remove(id);
      await refreshList();
      router.replace("/memories");
    } catch {
      await refresh();
      setError(true);
    } finally {
      setBusy(false);
    }
  }
  if (!memory)
    return (
      <p role="status">
        {error ? t.missing : t.loading}
        {error && <button onClick={() => void refresh()}>{t.retry}</button>}
      </p>
    );
  return (
    <>
      <h1 className="page-title">{memory.activity_snapshot.title}</h1>
      <p className="page-copy">{t.private}</p>
      {error && <p role="alert">{t.failed}</p>}
      {editing ? (
        <MemoryEditor
          memory={memory}
          cancel={() => setEditing(false)}
          save={async (input) => {
            await MemoryService.update(id, {
              occurred_at: input.occurred_at,
              moods: input.moods,
              note: input.note,
              memory_prompt_completed: input.memory_prompt_completed,
            });
            await refresh();
            setEditing(false);
          }}
        />
      ) : (
        <section className="journal-panel">
          <time dateTime={memory.occurred_at}>
            {new Date(memory.occurred_at).toLocaleDateString(locale)}
          </time>
          <p>{memory.activity_snapshot.description}</p>
          <div className="journal-chips">
            {memory.moods.map((mood, i) => (
              <span key={i}>{mood}</span>
            ))}
          </div>
          <h2>{t.note}</h2>
          <p className="journal-note">{memory.note || "—"}</p>
          {memory.activity_snapshot.memoryPrompt && (
            <>
              <h2>{t.prompt}</h2>
              <p>{memory.activity_snapshot.memoryPrompt}</p>
            </>
          )}
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() => setEditing(true)}
          >
            {t.edit}
          </button>
        </section>
      )}
      <PhotoJournal
        memoryId={id}
        photos={memory.memory_images}
        refresh={refresh}
      />
      <div className="journal-actions">
        <Link className="secondary-button" href="/memories">
          {t.done}
        </Link>
        <button
          className="journal-danger"
          disabled={busy}
          onClick={() => void remove()}
        >
          {busy ? t.loading : t.delete}
        </button>
      </div>
    </>
  );
}
export function MemoryDetail({ id }: { id: string }) {
  const { user, loading } = useJournal();
  const t = journalCopy[useLocale()];
  if (loading) return <p>{t.loading}</p>;
  if (!user) return <AccountPanel returnTo={`/memories/${id}`} />;
  return <Detail key={`${user.id}:${id}`} id={id} />;
}
