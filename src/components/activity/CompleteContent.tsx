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

      <section className="section">
        <div className="prompt-card">
          <p className="eyebrow">{memoryCopy.eyebrow}</p>
          <h2 className="activity-title">{memoryCopy.title}</h2>
          <p>{prompt}</p>
        </div>
      </section>

      <section className="section">
        <div className="info-card">
          <p className="info-copy">{memoryCopy.note}</p>
        </div>
      </section>

      <div className="action-stack">
        <Link className="primary-button" href="/">{memoryCopy.gotIt}</Link>
        <Link className="secondary-button" href="/">{memoryCopy.skip}</Link>
      </div>
    </>
  );
}
