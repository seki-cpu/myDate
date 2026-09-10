"use client";

import { useEffect, type CSSProperties } from "react";
import styles from "./reward.module.css";

export interface RewardPoint { x: number; y: number; }

interface RewardBurstProps {
  active: boolean;
  sourcePosition: RewardPoint | null;
  targetPosition: RewardPoint | null;
  reducedMotion: boolean;
  onAnimationComplete: () => void;
}

const STAR_OFFSETS = [
  { x: -22, y: -16 }, { x: 18, y: -22 }, { x: -10, y: 12 }, { x: 24, y: 8 }, { x: 2, y: -34 },
];

export function RewardBurst({ active, sourcePosition, targetPosition, reducedMotion, onAnimationComplete }: RewardBurstProps) {
  useEffect(() => {
    if (!active) return;
    const timeout = window.setTimeout(onAnimationComplete, reducedMotion ? 380 : 920);
    return () => window.clearTimeout(timeout);
  }, [active, reducedMotion, onAnimationComplete]);

  if (!active || !sourcePosition || !targetPosition) return null;
  const deltaX = targetPosition.x - sourcePosition.x;
  const deltaY = targetPosition.y - sourcePosition.y;

  return (
    <div className={`${styles.burst}${reducedMotion ? ` ${styles.reduced}` : ""}`} aria-hidden="true">
      {STAR_OFFSETS.map((offset, index) => (
        <span
          className={styles.star}
          key={`${offset.x}-${offset.y}`}
          style={{
            left: sourcePosition.x + offset.x,
            top: sourcePosition.y + offset.y,
            "--reward-x": `${deltaX - offset.x}px`,
            "--reward-y": `${deltaY - offset.y}px`,
            "--reward-delay": `${index * 55}ms`,
          } as CSSProperties}
        >★</span>
      ))}
    </div>
  );
}
