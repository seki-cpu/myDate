"use client";

import Link from "next/link";
import { useLocale } from "../ui/locale";

const copy = {
  zh: {
    eyebrow: "可选功能",
    title: "一个只属于你们两个人的小东西。",
    description: "Egg 在 V1 里只是轻量的陪伴元素，不会影响你们找活动。",
    eggTitle: "你们的 Egg",
    eggCopy: "现在先保持最简单的样子。之后再考虑更多自定义和成长机制。",
    note: "V1 只展示初始状态，不需要喂养、维护或解锁。",
    back: "回到约会灵感",
    aria: "共享 Egg 预览",
  },
  en: {
    eyebrow: "Optional",
    title: "A tiny thing that belongs to both of you.",
    description: "The Egg stays a lightweight companion in V1 and never gets in the way of finding a date idea.",
    eggTitle: "Your Egg",
    eggCopy: "For now, it stays simple. More customization and progression can come later.",
    note: "V1 only shows the initial state. Nothing to feed, maintain, or unlock.",
    back: "Back to date ideas",
    aria: "Shared Egg preview",
  },
  ja: {
    eyebrow: "オプション",
    title: "二人だけの、小さなもの。",
    description: "V1 の Egg は軽い遊び要素。デート案を探す流れを邪魔しない。",
    eggTitle: "二人の Egg",
    eggCopy: "今はシンプルな初期状態だけ。カスタマイズや成長要素はあとから追加できる。",
    note: "V1 では初期状態のみ表示。世話や維持、アンロックはまだ不要。",
    back: "デート案に戻る",
    aria: "共有 Egg のプレビュー",
  },
} as const;

export function EggView() {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <>
      <p className="eyebrow">{text.eyebrow}</p>
      <h1 className="page-title">{text.title}</h1>
      <p className="page-copy">{text.description}</p>

      <section className="egg-panel">
        <div className="egg" aria-label={text.aria} />
        <h2 className="empty-title">{text.eggTitle}</h2>
        <p className="empty-copy">{text.eggCopy}</p>
      </section>

      <p className="note">{text.note}</p>

      <div className="action-stack">
        <Link className="secondary-button" href="/">
          {text.back}
        </Link>
      </div>
    </>
  );
}
