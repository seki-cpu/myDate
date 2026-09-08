"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DateRating } from "../../types/domain";
import { completeRating } from "../../lib/storage";
import { notifyEggProgressChanged } from "../egg/EggMiniProgress";
import { useLocale } from "../ui/locale";

interface RatingContentProps {
  adventureId?: string;
}

const ratingCopy = {
  zh: {
    eyebrow: "私密评分",
    title: "今天的约会怎么样？",
    note: "只给自己看。选一个 1–5 的分数，就结束今天的流程。",
    submit: "完成",
    skip: "暂时不评分",
  },
  en: {
    eyebrow: "Private rating",
    title: "How was this date?",
    note: "This stays private. Pick a score from 1–5 to finish today’s flow.",
    submit: "Finish",
    skip: "Not now",
  },
  ja: {
    eyebrow: "自分だけの評価",
    title: "今日のデートはどうだった？",
    note: "自分だけに見える評価。1〜5を選んで、今日の流れを終えよう。",
    submit: "完了",
    skip: "今は評価しない",
  },
} as const;

export function RatingContent({ adventureId }: RatingContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const copy = ratingCopy[locale];
  const [rating, setRating] = useState<DateRating | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function finish() {
    if (!adventureId || !rating || submitting) return;
    setSubmitting(true);
    completeRating(adventureId, rating);
    notifyEggProgressChanged();
    router.push("/");
  }

  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="page-title">{copy.title}</h1>
      <p className="page-copy">{copy.note}</p>

      <section className="section">
        <div className="detail-grid" role="radiogroup" aria-label={copy.title}>
          {([1, 2, 3, 4, 5] as DateRating[]).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              className="secondary-button"
              onClick={() => setRating(value)}
              disabled={submitting}
            >
              {value}
            </button>
          ))}
        </div>
      </section>

      <div className="action-stack">
        <button className="primary-button" type="button" onClick={finish} disabled={!rating || submitting}>
          {submitting ? "…" : copy.submit}
        </button>
        <button className="secondary-button" type="button" onClick={() => router.push("/")} disabled={submitting}>
          {copy.skip}
        </button>
      </div>
    </>
  );
}
