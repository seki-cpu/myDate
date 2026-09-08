"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getEggProgress, loadSaveData } from "../../lib/storage";
import styles from "./eggMini.module.css";

const progressEventName = "mydate-egg-progress-change";
const rewardEventName = "mydate-egg-reward";

export function notifyEggProgressChanged() {
  window.dispatchEvent(new Event(progressEventName));
}

export function notifyEggRewardArrival() {
  window.dispatchEvent(new Event(rewardEventName));
}

export function EggMiniProgress() {
  const [progress, setProgress] = useState(() => getEggProgress(loadSaveData()));
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    const refresh = () => setProgress(getEggProgress(loadSaveData()));
    const reward = () => {
      refresh();
      setBumping(false);
      window.requestAnimationFrame(() => setBumping(true));
      window.setTimeout(() => setBumping(false), 520);
    };

    refresh();
    window.addEventListener(progressEventName, refresh);
    window.addEventListener(rewardEventName, reward);
    return () => {
      window.removeEventListener(progressEventName, refresh);
      window.removeEventListener(rewardEventName, reward);
    };
  }, []);

  return (
    <Link
      href="/egg"
      className={`${styles.root}${bumping ? ` ${styles.bump}` : ""}`}
      aria-label={`Egg progress ${progress.totalXp} of ${progress.hatchXp} XP`}
      data-egg-mini-target
      data-egg-stage={progress.stage}
    >
      <span className={styles.egg} aria-hidden="true" />
      <span className={styles.progress} aria-hidden="true">
        <span style={{ transform: `scaleX(${progress.progress})` }} />
      </span>
    </Link>
  );
}
