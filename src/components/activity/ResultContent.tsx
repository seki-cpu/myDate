"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DateIdea } from "../../types/domain";
import { startAdventure } from "../../lib/storage";
import { flowCopy, localizeIdea, useLocale } from "../ui/locale";

interface ResultContentProps {
  idea?: DateIdea;
}

export function ResultContent({ idea }: ResultContentProps) {
  const router = useRouter();
  const [starting, setStarting] = useState(false);
  const locale = useLocale();
  const copy = flowCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;

  if (!localizedIdea) {
    return (
      <section className="empty-card">
        <p className="eyebrow">{copy.resultPreview}</p>
        <h1 className="page-title">{copy.resultEmptyTitle}</h1>
        <p className="page-copy">{copy.resultEmptyCopy}</p>
        <div className="action-stack">
          <Link className="secondary-button" href="/">
            {copy.backHome}
          </Link>
        </div>
      </section>
    );
  }

  function beginAdventure() {
    if (starting || !localizedIdea) return;
    setStarting(true);
    const dateId = localizedIdea.id;
    const adventure = startAdventure(dateId);
    router.push(`/adventure?id=${dateId}&adventureId=${adventure.id}`);
  }

  return (
    <>
      <section className="result-hero">
        <div className="result-number">{copy.resultPick}</div>
        <p className="eyebrow">{localizedIdea.categories[0] ?? ""}</p>
        <h1 className="page-title">{localizedIdea.title}</h1>
        <p className="page-copy">{localizedIdea.description}</p>
        <div className="detail-grid">
          <div className="detail-cell">
            <span className="detail-label">{copy.time}</span>
            <span className="detail-value">{copy.duration[localizedIdea.duration]}</span>
          </div>
          <div className="detail-cell">
            <span className="detail-label">{copy.cost}</span>
            <span className="detail-value">{copy.budget[localizedIdea.cost]}</span>
          </div>
          <div className="detail-cell">
            <span className="detail-label">{copy.place}</span>
            <span className="detail-value">{localizedIdea.indoor ? copy.indoor : copy.flexible}</span>
          </div>
        </div>
      </section>

      <div className="action-stack">
        <Link className="secondary-button" href="/result?mode=random">
          {copy.another}
        </Link>
      </div>

      <div className="bottom-action">
        <div className="bottom-action-inner">
          <button className="primary-button" type="button" disabled={starting} onClick={beginAdventure}>
            {starting ? "…" : copy.start}
          </button>
        </div>
      </div>
    </>
  );
}
