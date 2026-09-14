"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { MobileShell } from "../../../components/layout/MobileShell";
import { useJournal } from "../../../components/memory/JournalProvider";
import { AccountPanel } from "../../../components/memory/AccountPanel";
import { MemoryEditor } from "../../../components/memory/MemoryEditor";
import { journalCopy } from "../../../components/memory/journalCopy";
import { useLocale } from "../../../components/ui/locale";
import { MemoryService } from "../../../lib/services/memories";
export default function NewMemoryPage() {
  const { user, loading, refresh } = useJournal();
  const router = useRouter();
  const t = journalCopy[useLocale()];
  const requestKey = useRef<string | null>(null);
  return (
    <MobileShell backHref="/memories" variant="wide">
      <h1 className="page-title">{t.add}</h1>
      {loading ? (
        <p>{t.loading}</p>
      ) : !user ? (
        <AccountPanel returnTo="/memories/new" />
      ) : (
        <MemoryEditor
          key={user.id}
          cancel={() => router.push("/memories")}
          save={async (input) => {
            requestKey.current ??= `manual:${crypto.randomUUID()}`;
            const memory = await MemoryService.create(
              input,
              requestKey.current,
            );
            await refresh();
            router.replace(`/memories/${memory.id}`);
          }}
        />
      )}
    </MobileShell>
  );
}
