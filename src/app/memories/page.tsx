"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileShell } from "../../components/layout/MobileShell";
import { AccountPanel } from "../../components/memory/AccountPanel";
import { useJournal } from "../../components/memory/JournalProvider";
import { journalCopy } from "../../components/memory/journalCopy";
import { PrivatePhoto } from "../../components/memory/PrivatePhoto";
import { useLocale } from "../../components/ui/locale";
import {
  importLocalMemories,
  localImportState,
} from "../../lib/services/migration";
export default function MemoriesPage() {
  const locale = useLocale();
  const t = journalCopy[locale];
  const { user, loading, memories, error, refresh } = useJournal();
  const [importState, setImportState] = useState("empty");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setImportState(user ? localImportState(user.id) : "empty");
    setMessage("");
  }, [user]);
  async function migrate() {
    setBusy(true);
    setMessage("");
    try {
      const result = await importLocalMemories(locale);
      setMessage(result.skipped ? t.importInvalid : t.importDone);
      setImportState(user ? localImportState(user.id) : "empty");
      await refresh();
    } catch {
      setMessage(t.failed);
    } finally {
      setBusy(false);
    }
  }
  return (
    <MobileShell backHref="/" variant="wide">
      <div className="journal-heading">
        <p className="eyebrow">Memories</p>
        <h1 className="page-title">{t.title}</h1>
        <p className="page-copy">{t.subtitle}</p>
      </div>
      {loading ? (
        <p role="status">{t.loading}</p>
      ) : !user ? (
        <AccountPanel />
      ) : (
        <>
          <Link href="/memories/new" className="primary-button">
            + {t.add}
          </Link>
          {importState === "available" && (
            <section className="journal-notice">
              <p>{t.importHint}</p>
              <button
                className="secondary-button"
                disabled={busy}
                onClick={() => void migrate()}
              >
                {busy ? t.importing : t.import}
              </button>
            </section>
          )}
          {importState === "other" && <p>{t.importOther}</p>}
          <p role="status">{message}</p>
          {error && (
            <p role="alert">
              {t.failed}{" "}
              <button onClick={() => void refresh()}>{t.retry}</button>
            </p>
          )}
          <section className="journal-cards">
            {memories.length === 0 ? (
              <p>{t.empty}</p>
            ) : (
              memories.map((memory) => {
                const cover = [...memory.memory_images]
                  .filter((p) => p.ready)
                  .sort((a, b) => a.sort_order - b.sort_order)[0];
                return (
                  <article className="journal-entry" key={memory.id}>
                    {cover && <PrivatePhoto photo={cover} />}
                    <Link href={`/memories/${memory.id}`}>
                      <time dateTime={memory.occurred_at}>
                        {new Date(memory.occurred_at).toLocaleDateString(
                          locale,
                        )}
                      </time>
                      <h2>{memory.activity_snapshot.title}</h2>
                      <p className="journal-excerpt">
                        {memory.moods.join(" · ")}
                      </p>
                      <p className="journal-excerpt">{memory.note}</p>
                    </Link>
                  </article>
                );
              })
            )}
          </section>
        </>
      )}
    </MobileShell>
  );
}
