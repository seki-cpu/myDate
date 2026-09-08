"use client";

import Link from "next/link";
import type { DateIdea } from "../../types/domain";
import { flowCopy, localizeIdea, localizePhotoPrompt, useLocale } from "../ui/locale";

interface CompleteContentProps {
  idea?: DateIdea;
}

const memoryPromptCopy = {
  zh: {
    eyebrow: "记忆提示",
    title: "留下一点今天的痕迹。",
    note: "不用露脸。照片只留在你平时的手机相册里，myDate 不需要上传。想拍就拍，也可以跳过。",
    gotIt: "拍到了",
    skip: "跳过",
  },
  en: {
    eyebrow: "Memory Prompt",
    title: "Keep one small piece of today.",
    note: "No faces required. The photo stays in your normal phone gallery, and myDate does not need an upload. Take it if you want, or skip it.",
    gotIt: "I got it",
    skip: "Skip",
  },
  ja: {
    eyebrow: "思い出のヒント",
    title: "今日の小さな痕跡を残そう。",
    note: "顔は写さなくて大丈夫。写真はいつものスマホの写真フォルダに残るだけで、myDate へのアップロードは不要。撮っても、スキップしてもいい。",
    gotIt: "撮れた",
    skip: "スキップ",
  },
} as const;

export function CompleteContent({ idea }: CompleteContentProps) {
  const locale = useLocale();
  const copy = flowCopy[locale];
  const memoryCopy = memoryPromptCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
  const prompt = idea ? localizePhotoPrompt(idea, locale) ?? copy.genericPhoto : copy.genericPhoto;

  return (
    <>
      <p className="eyebrow">{copy.dateComplete}</p>
      <h1 className="page-title">{localizedIdea?.title ?? copy.finishedDate}</h1>

      <section className="memory-prompt-card" aria-labelledby="memory-prompt-title">
        <div className="memory-prompt-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img">
            <path d="M8.5 7.5 10 5.5h4l1.5 2H18a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2.5Z" />
            <circle cx="12" cy="13" r="3.2" />
          </svg>
        </div>
        <p className="eyebrow">{memoryCopy.eyebrow}</p>
        <h2 className="memory-prompt-title" id="memory-prompt-title">{memoryCopy.title}</h2>
        <p className="memory-prompt-text">{prompt}</p>
        <p className="memory-prompt-note">{memoryCopy.note}</p>
      </section>

      <div className="memory-prompt-actions">
        <Link className="primary-button" href="/">{memoryCopy.gotIt}</Link>
        <Link className="secondary-button" href="/">{memoryCopy.skip}</Link>
      </div>
    </>
  );
}
