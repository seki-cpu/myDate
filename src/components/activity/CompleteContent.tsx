"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { DateIdea } from "../../types/domain";
import { flowCopy, localizeIdea, localizePhotoPrompt, useLocale } from "../ui/locale";
import { RewardBurst, type RewardPoint } from "./RewardBurst";
import styles from "./reward.module.css";

interface CompleteContentProps { idea?: DateIdea; }
type RewardPhase = "idle" | "modal" | "animating" | "done";

const memoryPromptCopy = {
  zh: { eyebrow: "记忆提示", title: "留下一点今天的痕迹。", note: "不用露脸。照片只留在你平时的手机相册里，myDate 不需要上传。想拍就拍，也可以跳过。", gotIt: "拍到了", skip: "跳过", rewardTitle: "太好了！", rewardBody: "你为今天留住了一小段回忆。", ok: "OK" },
  en: { eyebrow: "Memory Prompt", title: "Keep one small piece of today.", note: "No faces required. The photo stays in your normal phone gallery, and myDate does not need an upload. Take it if you want, or skip it.", gotIt: "I got it", skip: "Skip", rewardTitle: "Nice!", rewardBody: "You kept a little piece of today.", ok: "OK" },
  ja: { eyebrow: "思い出のヒント", title: "今日の小さな痕跡を残そう。", note: "顔は写さなくて大丈夫。写真はいつものスマホの写真フォルダに残るだけで、myDate へのアップロードは不要。撮っても、スキップしてもいい。", gotIt: "撮れた", skip: "スキップ", rewardTitle: "いい感じ！", rewardBody: "今日の小さな思い出をひとつ残せた。", ok: "OK" },
} as const;

export function CompleteContent({ idea }: CompleteContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const copy = flowCopy[locale];
  const memoryCopy = memoryPromptCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
  const prompt = idea ? localizePhotoPrompt(idea, locale) ?? copy.genericPhoto : copy.genericPhoto;
  const [phase, setPhase] = useState<RewardPhase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sourcePosition, setSourcePosition] = useState<RewardPoint | null>(null);
  const [eggTargetPosition, setEggTargetPosition] = useState<RewardPoint | null>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const eggRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function goHome() {
    if (phase !== "idle") return;
    setPhase("done");
    router.push("/");
  }

  function openRewardModal() {
    if (phase !== "idle") return;
    setPhase("modal");
  }

  function playReward() {
    if (phase !== "modal") return;
    const sourceRect = okButtonRef.current?.getBoundingClientRect();
    const eggRect = eggRef.current?.getBoundingClientRect();
    if (!sourceRect || !eggRect) {
      setPhase("done");
      router.push("/");
      return;
    }
    setSourcePosition({ x: sourceRect.left + sourceRect.width / 2, y: sourceRect.top + sourceRect.height / 2 });
    setEggTargetPosition({ x: eggRect.left + eggRect.width / 2, y: eggRect.top + eggRect.height / 2 });
    setPhase("animating");
  }

  function finishReward() {
    if (phase !== "animating") return;
    setPhase("done");
    window.setTimeout(() => router.push("/"), reducedMotion ? 80 : 220);
  }

  const actionLocked = phase !== "idle";

  return (
    <div className={styles.shell}>
      <div ref={eggRef} className={`${styles.eggTarget}${phase === "animating" ? ` ${reducedMotion ? styles.reducedEgg : styles.eggReceiving}` : ""}`} aria-hidden="true">
        <span className={styles.eggShape} />
      </div>

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
        <button className="primary-button" type="button" onClick={openRewardModal} disabled={actionLocked}>
          {phase === "animating" || phase === "done" ? "…" : memoryCopy.gotIt}
        </button>
        <button className="secondary-button" type="button" onClick={goHome} disabled={actionLocked}>
          {memoryCopy.skip}
        </button>
      </div>

      {phase === "modal" ? (
        <div className={styles.modalBackdrop} role="presentation">
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="reward-modal-title">
            <div className={styles.modalSparkle} aria-hidden="true">✦</div>
            <h2 id="reward-modal-title">{memoryCopy.rewardTitle}</h2>
            <p>{memoryCopy.rewardBody}</p>
            <button ref={okButtonRef} className="primary-button" type="button" onClick={playReward}>{memoryCopy.ok}</button>
          </section>
        </div>
      ) : null}

      <RewardBurst
        active={phase === "animating"}
        sourcePosition={sourcePosition}
        eggTargetPosition={eggTargetPosition}
        reducedMotion={reducedMotion}
        onAnimationComplete={finishReward}
      />
    </div>
  );
}
