"use client";

import Link from "next/link";
import { useLocale } from "../ui/locale";
import styles from "./eggView.module.css";

const copy = {
  zh: {
    eyebrow: "你们的 Egg",
    title: "V1 先保持轻量。",
    description: "Egg 现在只是一个小小的陪伴元素，不会影响你们找活动或完成约会流程。",
    eggTitle: "V1 暂不展示成长进度",
    eggCopy: "XP 与成长状态仍会正常记录，但 V1 不显示成长进度、孵化阶段或进度条。后续版本再考虑开放这些可视化功能。",
    note: "当前只保留初始 Egg 外观和奖励到达时的一次轻微反馈。",
    back: "回到约会灵感",
    aria: "共享 Egg 预览",
  },
  en: {
    eyebrow: "Your Egg",
    title: "V1 keeps it lightweight.",
    description: "For now, the Egg is only a small companion element and never gets in the way of finding or completing a date.",
    eggTitle: "Growth progress stays hidden in V1",
    eggCopy: "XP and growth state are still recorded normally, but V1 does not display growth progress, hatch stages, or a progress bar. Those visualizations can come in a later version.",
    note: "The current version only keeps the initial Egg appearance and a small reward arrival response.",
    back: "Back to date ideas",
    aria: "Shared Egg preview",
  },
  ja: {
    eyebrow: "二人の Egg",
    title: "V1 は軽いままで。",
    description: "今の Egg は小さな遊び要素だけ。デート案を探したり、デートを完了したりする流れを邪魔しない。",
    eggTitle: "V1では成長進捗をまだ表示しない",
    eggCopy: "XP と成長状態はこれまでどおり記録されるが、V1 では成長度、孵化段階、進捗バーを表示しない。これらの可視化は今後のバージョンで検討する。",
    note: "現在は初期状態の Egg と、報酬到着時の小さな反応だけを残す。",
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

      <section className={styles.panel}>
        <div className={styles.eggWrap}>
          <div className={styles.egg} aria-label={text.aria} />
        </div>
        <h2 className={styles.title}>{text.eggTitle}</h2>
        <p className={styles.copy}>{text.eggCopy}</p>
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
