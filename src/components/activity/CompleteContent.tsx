"use client";

import Link from "next/link";
import type { DateIdea } from "../../types/domain";
import { flowCopy, localizeIdea, localizePhotoPrompt, useLocale } from "../ui/locale";

interface CompleteContentProps {
  idea?: DateIdea;
}

export function CompleteContent({ idea }: CompleteContentProps) {
  const locale = useLocale();
  const copy = flowCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;
  const prompt = idea ? localizePhotoPrompt(idea, locale) ?? copy.genericPhoto : copy.genericPhoto;

  return (
    <>
      <p className="eyebrow">{copy.dateComplete}</p>
      <h1 className="page-title">{copy.keepPiece}</h1>
      <p className="page-copy">{copy.noFaces}</p>

      <section className="section">
        <div className="prompt-card">
          <p className="eyebrow">{copy.photoIdea}</p>
          <h2 className="activity-title">{copy.memoryWithoutPosing}</h2>
          <p>{prompt}</p>
        </div>
      </section>

      <section className="section">
        <div className="info-card">
          <h2 className="empty-title">{localizedIdea?.title ?? copy.finishedDate}</h2>
          <p className="info-copy">{copy.optionalPhoto}</p>
        </div>
      </section>

      <div className="action-stack">
        <Link className="primary-button" href="/">{copy.maybeLater}</Link>
      </div>
    </>
  );
}
