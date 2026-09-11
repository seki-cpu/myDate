"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { DateIdea } from "../../types/domain";
import { setMemoryPromptCompleted } from "../../lib/storage";
import { notifyMemoryReward } from "../memory/MemoryMiniCounter";
import { flowCopy, localizeIdea, localizePhotoPrompt, useLocale } from "../ui/locale";
import { RewardBurst, type RewardPoint } from "./RewardBurst";
import styles from "./reward.module.css";

interface CompleteContentProps {
  idea?: DateIdea;
  memoryId?: string;
}

type RewardPhase = "idle" | "modal" | "animating" | "done";

const memoryPromptCopy = {
  zh: {
    eyebrow: "记忆提示",
    title: "留下一点今天的痕迹。",
    note: "不用露脸。照片只留在你平时的手机相册里，myDate 不需要上传。想拍就拍，也可以跳过。",
    gotIt: "拍到了",
    skip: "跳过",
    rewardTitle: "Memory collected ✦",
    rewardBody: "又多了一段属于你的回忆。",
    ok: "OK",
  },
  en: {
    eyebrow: "Memory Prompt",
    title: "Keep one small piece of today.",
    note: "No faces required. The photo stays in your normal phone gallery, and myDate does not need an upload. Take it if you want, or skip it.",
    gotIt: "I got it",
    skip: "Skip",
    rewardTitle: "Memory collected ✦",
    rewardBody: "One more little memory is yours.",
    ok: "OK",
  },
  ja: {
    eyebrow: "思い出のヒント",
    title: "今日の小さな痕跡を残そう。",
    note: "顔は写さなくて大丈夫。写真はいつものスマホの写真フォルダに残るだけで、myDate へのアップロードは不要。撮っても、スキップしてもいい。",
    gotIt: "撮れた",
    skip: "スキップ",
    rewardTitle: "思い出をひとつ追加 ✦",
    rewardBody: "またひとつ、自分の思い出が増えた。",
    ok: "OK",
  },
} as const;

export function CompleteContent({ idea, memoryId }: CompleteContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const copy = flowCopy[locale];
  const memoryCopy = memoryPromptCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
  const prompt = idea ? localizePhotoPrompt(idea, locale) ?? copy.genericPhoto : copy.genericPhoto;
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

  function resolvePrompt(completed: boolean) {
    if (phase !== "idle") return;
    if (!memoryId) {
      router.push("/");
      return;
    }

    if (completed) setMemoryPromptCompleted(memoryId, true);
    setPhase("modal");
  }

  function playReward() {
    if (phase !== "modal") return;

    const sourceRect = okButtonRef.current?.getBoundingClientRect();
    const target = document.querySelector<HTMLElement>("[data-memory-target]");
    const targetRect = target?.getBoundingClientRect();

    if (!sourceRect || !targetRect) {
      notifyMemoryReward(1);
      setPhase("done");
      router.push("/");
      return;
    }

    setSourcePosition({
      x: sourceRect.left + sourceRect.width / 2,
      y: sourceRect.top + sourceRect.height / 2,
    });
    setTargetPosition({
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    });
    setPhase("animating");
  }

  const finishReward = useCallback(() => {
    setPhase((current) => {
      if (current !== "animating") return current;
      notifyMemoryReward(1);
      window.setTimeout(() => router.push("/"), reducedMotion ? 120 : 260);
      return "done";
    });
  }, [reducedMotion, router]);

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
        <button
          className="primary-button"
          type="button"
          onClick={() => resolvePrompt(true)}
          disabled={phase !== "idle"}
        >
          {phase === "idle" ? memoryCopy.gotIt : "…"}
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => resolvePrompt(false)}
          disabled={phase !== "idle"}
        >
          {memoryCopy.skip}
        </button>
      </div>

      {phase === "modal" ? (
        <div className={styles.modalBackdrop} role="presentation">
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="memory-reward-title">
            <div className={styles.modalSparkle} aria-hidden="true">✦</div>
            <h2 id="memory-reward-title">{memoryCopy.rewardTitle}</h2>
            <p>{memoryCopy.rewardBody}</p>
            <button ref={okButtonRef} className="primary-button" type="button" onClick={playReward}>
              {memoryCopy.ok}
            </button>
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
