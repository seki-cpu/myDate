"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DateIdea } from "../../types/domain";
import { setMemoryPromptCompleted } from "../../lib/storage";
import { flowCopy, localizeIdea, localizePhotoPrompt, useLocale } from "../ui/locale";
import styles from "./reward.module.css";

interface CompleteContentProps {
  idea?: DateIdea;
  memoryId?: string;
}

const memoryPromptCopy = {
  zh: { eyebrow: "记忆提示", title: "留下一点今天的痕迹。", note: "不用露脸。照片只留在你平时的手机相册里，myDate 不需要上传。想拍就拍，也可以跳过。", gotIt: "拍到了", skip: "跳过" },
  en: { eyebrow: "Memory Prompt", title: "Keep one small piece of today.", note: "No faces required. The photo stays in your normal phone gallery, and myDate does not need an upload. Take it if you want, or skip it.", gotIt: "I got it", skip: "Skip" },
  ja: { eyebrow: "思い出のヒント", title: "今日の小さな痕跡を残そう。", note: "顔は写さなくて大丈夫。写真はいつものスマホの写真フォルダに残るだけで、myDate へのアップロードは不要。撮っても、スキップしてもいい。", gotIt: "撮れた", skip: "スキップ" },
} as const;

export function CompleteContent({ idea, memoryId }: CompleteContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const copy = flowCopy[locale];
  const memoryCopy = memoryPromptCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
  const prompt = idea ? localizePhotoPrompt(idea, locale) ?? copy.genericPhoto : copy.genericPhoto;
  const [processing, setProcessing] = useState(false);

  const ratingHref = memoryId ? `/rating?memoryId=${encodeURIComponent(memoryId)}` : "/rating";

  function continueToRating(completed: boolean) {
    if (processing) return;
    setProcessing(true);
    if (memoryId && completed) setMemoryPromptCompleted(memoryId, true);
    router.push(ratingHref);
  }

  return (
    <div className={styles.shell}>
      <p className="eyebrow">{copy.dateComplete}</p>
      <h1 className="page-title">{localizedIdea?.title ?? copy.finishedDate}</h1>

      <section className={`section ${styles.promptFocus}`} aria-labelledby="memory-prompt-title">
        <div className={styles.promptIcon} aria-hidden="true">✦</div>
        <p className="eyebrow">{memoryCopy.eyebrow}</p>
        <h2 className="activity-title" id="memory-prompt-title">{memoryCopy.title}</h2>
        <p className={styles.promptText}>{prompt}</p>
        <p className={styles.promptNote}>{memoryCopy.note}</p>
      </section>

      <div className={`action-stack ${styles.actions}`}>
        <button className="primary-button" type="button" onClick={() => continueToRating(true)} disabled={processing}>
          {processing ? "…" : memoryCopy.gotIt}
        </button>
        <button className="secondary-button" type="button" onClick={() => continueToRating(false)} disabled={processing}>
          {memoryCopy.skip}
        </button>
      </div>
    </div>
  );
}
