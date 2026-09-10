"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMemoryCount, loadSaveData } from "../../lib/storage";
import styles from "./memoryMini.module.css";

const memoryChangeEventName = "mydate-memory-change";
const memoryRewardEventName = "mydate-memory-reward";

export function notifyMemoryChanged() {
  window.dispatchEvent(new Event(memoryChangeEventName));
}

export function notifyMemoryReward(delta: number) {
  window.dispatchEvent(new CustomEvent<number>(memoryRewardEventName, { detail: delta }));
}

export function MemoryMiniCounter() {
  const [count, setCount] = useState(0);
  const [rewardDelta, setRewardDelta] = useState<number | null>(null);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    const refresh = () => setCount(getMemoryCount(loadSaveData()));
    const reward = (event: Event) => {
      const delta = event instanceof CustomEvent ? Number(event.detail) : 0;
      refresh();
      setBumping(false);
      setRewardDelta(Number.isFinite(delta) && delta > 0 ? delta : null);
      window.requestAnimationFrame(() => setBumping(true));
      window.setTimeout(() => setBumping(false), 520);
      window.setTimeout(() => setRewardDelta(null), 1400);
    };

    refresh();
    window.addEventListener(memoryChangeEventName, refresh);
    window.addEventListener(memoryRewardEventName, reward);
    return () => {
      window.removeEventListener(memoryChangeEventName, refresh);
      window.removeEventListener(memoryRewardEventName, reward);
    };
  }, []);

  return (
    <Link
      href="/memories"
      className={`${styles.root}${bumping ? ` ${styles.bump}` : ""}`}
      aria-label={`Memories ${count}`}
      data-memory-target
    >
      <span className={styles.sparkle} aria-hidden="true">✦</span>
      <span className={styles.count}>{count}</span>
      {rewardDelta ? <span className={styles.delta} aria-hidden="true">+{rewardDelta}</span> : null}
    </Link>
  );
}
