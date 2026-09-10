"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { RatingScore } from "../../types/domain";
import { loadSaveData, saveMemoryRating } from "../../lib/storage";
import { notifyMemoryReward } from "../memory/MemoryMiniCounter";
import { useLocale } from "../ui/locale";
import { RewardBurst, type RewardPoint } from "./RewardBurst";
import ratingStyles from "./rating.module.css";
import rewardStyles from "./reward.module.css";

interface RatingContentProps {
  memoryId?: string;
}

type RewardPhase = "idle" | "modal" | "animating" | "done";

const ratingCopy = {
  zh: { eyebrow: "私密评分", title: "今天的约会怎么样？", note: "只给自己看。选一个 1–5 的分数，完成今天的回忆。", submit: "完成", rewardTitle: "Memory collected ✦", rewardBody: "又多了一段属于你的回忆。", ok: "OK" },
  en: { eyebrow: "Private rating", title: "How was this date?", note: "This stays private. Pick a score from 1–5 to finish this memory.", submit: "Finish", rewardTitle: "Memory collected ✦", rewardBody: "One more little memory is yours.", ok: "OK" },
  ja: { eyebrow: "自分だけの評価", title: "今日のデートはどうだった？", note: "自分だけに見える評価。1〜5を選んで、今日の思い出を完成させよう。", submit: "完了", rewardTitle: "思い出をひとつ追加 ✦", rewardBody: "またひとつ、自分の思い出が増えた。", ok: "OK" },
} as const;

export function RatingContent({ memoryId }: RatingContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const copy = ratingCopy[locale];
  const [rating, setRating] = useState<RatingScore | null>(null);
  const [phase, setPhase] = useState<RewardPhase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sourcePosition, setSourcePosition] = useState<RewardPoint | null>(null);
  const [targetPosition, setTargetPosition] = useState<RewardPoint | null>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function finish() {
    if (!memoryId || !rating || phase !== "idle") return;
    const existing = loadSaveData().memories.find((memory) => memory.id === memoryId);
    const alreadyRated = Boolean(existing?.rating?.overall);
    saveMemoryRating(memoryId, { overall: rating });
    if (alreadyRated) {
      router.push("/");
      return;
    }
    setPhase("modal");
  }

  function playReward() {
    if (phase !== "modal") return;
    const sourceRect = okButtonRef.current?.getBoundingClientRect();
    const target = document.querySelector<HTMLElement>("[data-memory-target]");
    const targetRect = target?.getBoundingClientRect();
    if (!sourceRect || !targetRect) {
      notifyMemoryReward(1);
      router.push("/");
      return;
    }
    setSourcePosition({ x: sourceRect.left + sourceRect.width / 2, y: sourceRect.top + sourceRect.height / 2 });
    setTargetPosition({ x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 });
    setPhase("animating");
  }

  function finishReward() {
    if (phase !== "animating") return;
    setPhase("done");
    notifyMemoryReward(1);
    window.setTimeout(() => router.push("/"), reducedMotion ? 120 : 260);
  }

  return (
    <div className={rewardStyles.shell}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="page-title">{copy.title}</h1>
      <p className="page-copy">{copy.note}</p>

      <section className="section">
        <div className={ratingStyles.ratingGrid} role="radiogroup" aria-label={copy.title}>
          {([1, 2, 3, 4, 5] as RatingScore[]).map((value) => {
            const selected = rating === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`${ratingStyles.ratingButton}${selected ? ` ${ratingStyles.selected}` : ""}`}
                onClick={() => setRating(value)}
                disabled={phase !== "idle"}
              >
                {value}
              </button>
            );
          })}
        </div>
      </section>

      <div className="action-stack">
        <button className="primary-button" type="button" onClick={finish} disabled={!rating || phase !== "idle"}>
          {phase !== "idle" ? "…" : copy.submit}
        </button>
      </div>

      {phase === "modal" ? (
        <div className={rewardStyles.modalBackdrop} role="presentation">
          <section className={rewardStyles.modal} role="dialog" aria-modal="true" aria-labelledby="memory-reward-title">
            <div className={rewardStyles.modalSparkle} aria-hidden="true">✦</div>
            <h2 id="memory-reward-title">{copy.rewardTitle}</h2>
            <p>{copy.rewardBody}</p>
            <button ref={okButtonRef} className="primary-button" type="button" onClick={playReward}>{copy.ok}</button>
          </section>
        </div>
      ) : null}

      <RewardBurst
        active={phase === "animating"}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        reducedMotion={reducedMotion}
        onAnimationComplete={finishReward}
      />
    </div>
  );
}
