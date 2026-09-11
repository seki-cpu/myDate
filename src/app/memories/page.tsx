"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileShell } from "../../components/layout/MobileShell";
import { dateIdeas } from "../../data/dateIdeas";
import { getMemories, loadSaveData } from "../../lib/storage";
import type { Memory } from "../../types/domain";
import { localizeIdea, useLocale } from "../../components/ui/locale";

const copy = {
  zh: { eyebrow: "Memories", title: "这些经历都属于你。", description: "人可能会变，但你经历过的那些时刻仍然是你的。", empty: "这里还没有回忆", emptyCopy: "完成一次 Adventure 后，它会自动成为一段 Memory。", back: "去找约会灵感", promptDone: "留下了记忆提示", promptSkipped: "没有记录照片提示", deletedFallback: "曾经的活动" },
  en: { eyebrow: "Memories", title: "These experiences stay yours.", description: "People may change. The memories are still yours.", empty: "No memories yet", emptyCopy: "Complete an Adventure and it will become a Memory automatically.", back: "Find a date idea", promptDone: "Memory prompt kept", promptSkipped: "Photo prompt skipped", deletedFallback: "Past activity" },
  ja: { eyebrow: "Memories", title: "この経験は、あなたのもの。", description: "相手が変わっても、過ごした時間はあなたの思い出として残る。", empty: "まだ思い出はない", emptyCopy: "Adventure を完了すると、自動的に Memory として残る。", back: "デート案を探す", promptDone: "思い出のヒントを残した", promptSkipped: "写真のヒントはスキップ", deletedFallback: "過去のアクティビティ" },
} as const;

export default function MemoriesPage() {
  const locale = useLocale();
  const text = copy[locale];
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    setMemories(getMemories(loadSaveData()));
  }, []);

  return (
    <MobileShell backHref="/">
      <p className="eyebrow">{text.eyebrow}</p>
      <h1 className="page-title">{text.title}</h1>
      <p className="page-copy">{text.description}</p>

      <section className="section">
        {memories.length === 0 ? (
          <div className="memory-card">
            <div className="memory-thumb" aria-hidden="true">✦</div>
            <div>
              <h2 className="empty-title">{text.empty}</h2>
              <p className="empty-copy">{text.emptyCopy}</p>
            </div>
          </div>
        ) : (
          <div className="activity-list">
            {memories.map((memory) => {
              const identity = memory.activitySnapshot.identity;
              const idea = identity.source === "builtin"
                ? dateIdeas.find((item) => item.id === identity.id)
                : undefined;
              const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
              const title = localizedIdea?.title ?? memory.activitySnapshot.title ?? text.deletedFallback;

              return (
                <article className="memory-card" key={memory.id}>
                  <div className="memory-thumb" aria-hidden="true">✦</div>
                  <div>
                    <h2 className="empty-title">{title}</h2>
                    <p className="empty-copy">{new Date(memory.completedAt).toLocaleDateString(locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en-US")}</p>
                    <p className="empty-copy">{memory.memoryPromptCompleted ? text.promptDone : text.promptSkipped}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <div className="action-stack">
        <Link className="primary-button" href="/">{text.back}</Link>
      </div>
    </MobileShell>
  );
}
