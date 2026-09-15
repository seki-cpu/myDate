"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLocale } from "../ui/locale";

const copy = {
  en: {
    eyebrow: "Already did something else?",
    title: "Keep it as a Memory.",
    body: "It does not have to start from a myDate idea. Write what you did, then add a journal note or photos.",
    placeholder: "For example: walked by the sea",
    action: "Record this memory",
  },
  zh: {
    eyebrow: "还做了别的事情？",
    title: "也把它留成一段回忆。",
    body: "不一定要从 myDate 的约会灵感开始。写下你们已经做过的事，再添加日记或照片。",
    placeholder: "比如：去海边散步了",
    action: "记录这段回忆",
  },
  ja: {
    eyebrow: "ほかのこともした？",
    title: "それも思い出として残そう。",
    body: "myDate のアイデアから始めなくても大丈夫。やったことを書いて、日記や写真をあとから残せる。",
    placeholder: "例：海辺を散歩した",
    action: "この思い出を残す",
  },
} as const;

export function HomePastMemoryEntry() {
  const router = useRouter();
  const locale = useLocale();
  const text = copy[locale];
  const [title, setTitle] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const params = new URLSearchParams({
      title: trimmed,
      draft: crypto.randomUUID(),
    });
    router.push(`/memories/custom/new?${params.toString()}`);
  }

  return (
    <section className="section">
      <div className="journal-panel journal-form">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 className="section-title">{text.title}</h2>
        <p className="page-copy">{text.body}</p>
        <form onSubmit={submit}>
          <input
            maxLength={300}
            placeholder={text.placeholder}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label={text.eyebrow}
          />
          <button
            className="secondary-button"
            type="submit"
            disabled={!title.trim()}
          >
            {text.action}
          </button>
        </form>
      </div>
    </section>
  );
}
