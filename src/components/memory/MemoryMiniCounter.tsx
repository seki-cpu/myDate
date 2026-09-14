"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useJournal } from "./JournalProvider";
import styles from "./memoryMini.module.css";

const memoryChangeEventName = "mydate-memory-change";
const memoryRewardEventName = "mydate-memory-reward";

export function notifyMemoryChanged() {
  window.dispatchEvent(new Event(memoryChangeEventName));
}

export function notifyMemoryReward(delta: number) {
  window.dispatchEvent(
    new CustomEvent<number>(memoryRewardEventName, { detail: delta }),
  );
}

export function MemoryMiniCounter() {
  const { memories, refresh } = useJournal();
  const count = memories.length;
  const [rewardDelta, setRewardDelta] = useState<number | null>(null);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    const refreshCount = () => {
      void refresh();
    };
    const reward = (event: Event) => {
      const delta = event instanceof CustomEvent ? Number(event.detail) : 0;
      refreshCount();
      setBumping(false);
      setRewardDelta(Number.isFinite(delta) && delta > 0 ? delta : null);
      window.requestAnimationFrame(() => setBumping(true));
      window.setTimeout(() => setBumping(false), 520);
      window.setTimeout(() => setRewardDelta(null), 1400);
    };

    window.addEventListener(memoryChangeEventName, refreshCount);
    window.addEventListener(memoryRewardEventName, reward);
    return () => {
      window.removeEventListener(memoryChangeEventName, refreshCount);
      window.removeEventListener(memoryRewardEventName, reward);
    };
  }, [refresh]);

  return (
    <Link
      href="/memories"
      className={`${styles.root}${bumping ? ` ${styles.bump}` : ""}`}
      aria-label={`Memories ${count}`}
      data-memory-target
    >
      <span className={styles.sparkle} aria-hidden="true">
        ✦
      </span>
      <span className={styles.count}>{count}</span>
      {rewardDelta ? (
        <span className={styles.delta} aria-hidden="true">
          +{rewardDelta}
        </span>
      ) : null}
    </Link>
  );
}
