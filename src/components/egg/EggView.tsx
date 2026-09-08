"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  EGG_HATCH_XP,
  getEggProgress,
  loadSaveData,
  type EggProgress,
  type EggStage,
} from "../../lib/storage";
import { useLocale } from "../ui/locale";
import styles from "./eggView.module.css";

const INITIAL_PROGRESS: EggProgress = {
  totalXp: 0,
  hatchXp: EGG_HATCH_XP,
  progress: 0,
  stage: "dormant",
  hatched: false,
};

const copy = {
  zh: {
    eyebrow: "你们的 Egg",
    title: "它会跟着你们一起积累一点点变化。",
    description: "每次完成一次约会流程，Egg 都会根据已经获得的 XP 显示当前成长阶段。",
    progress: "成长进度",
    xp: "XP",
    back: "回到约会灵感",
    aria: "共享 Egg 成长状态",
    stages: {
      dormant: "安静等待",
      warming: "开始变暖",
      glowing: "正在发光",
      cracking: "出现裂纹",
      hatched: "已经孵化",
    },
  },
  en: {
    eyebrow: "Your Egg",
    title: "A small thing that grows with the dates you finish.",
    description: "As you complete date flows, the Egg reflects the current stage derived from the XP you have already earned.",
    progress: "Progress",
    xp: "XP",
    back: "Back to date ideas",
    aria: "Shared Egg progression state",
    stages: {
      dormant: "Dormant",
      warming: "Warming",
      glowing: "Glowing",
      cracking: "Cracking",
      hatched: "Hatched",
    },
  },
  ja: {
    eyebrow: "二人の Egg",
    title: "デートを重ねるたびに、少しずつ変わっていく。",
    description: "デートの流れを完了すると、これまでに獲得した XP に応じて Egg の成長段階が変わる。",
    progress: "成長の進み具合",
    xp: "XP",
    back: "デート案に戻る",
    aria: "共有 Egg の成長状態",
    stages: {
      dormant: "静かに待っている",
      warming: "あたたまり中",
      glowing: "光りはじめた",
      cracking: "ひびが入ってきた",
      hatched: "孵化した",
    },
  },
} as const;

export function EggView() {
  const locale = useLocale();
  const text = copy[locale];
  const [progress, setProgress] = useState<EggProgress>(INITIAL_PROGRESS);

  useEffect(() => {
    setProgress(getEggProgress(loadSaveData()));
  }, []);

  const stageLabel = text.stages[progress.stage as EggStage];

  return (
    <>
      <p className="eyebrow">{text.eyebrow}</p>
      <h1 className="page-title">{text.title}</h1>
      <p className="page-copy">{text.description}</p>

      <section className={styles.panel} data-egg-stage={progress.stage}>
        <div className={styles.eggWrap}>
          <div className={styles.egg} aria-label={text.aria} data-stage={progress.stage}>
            {progress.hatched ? <span className={styles.hatchedMark} aria-hidden="true">✦</span> : null}
          </div>
        </div>

        <div className={styles.stageLabel}>{stageLabel}</div>
        <div className={styles.progressHeader}>
          <span>{text.progress}</span>
          <strong>{progress.totalXp} / {progress.hatchXp} {text.xp}</strong>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <span style={{ transform: `scaleX(${progress.progress})` }} />
        </div>
      </section>

      <div className="action-stack">
        <Link className="secondary-button" href="/">
          {text.back}
        </Link>
      </div>
    </>
  );
}
