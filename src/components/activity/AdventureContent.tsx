"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DateIdea } from "../../types/domain";
import { completeAdventure } from "../../lib/storage";
import { notifyEggProgressChanged } from "../egg/EggMiniProgress";
import { flowCopy, localizeIdea, useLocale } from "../ui/locale";

interface AdventureContentProps {
  idea?: DateIdea;
  adventureId?: string;
}

export function AdventureContent({ idea, adventureId }: AdventureContentProps) {
  const router = useRouter();
  const [finishing, setFinishing] = useState(false);
  const locale = useLocale();
  const copy = flowCopy[locale];
  const localizedIdea = idea ? localizeIdea(idea, locale) : undefined;

  function finishAdventure() {
    if (finishing) return;
    setFinishing(true);

    if (adventureId) {
      completeAdventure(adventureId);
      notifyEggProgressChanged();
    }

    const params = new URLSearchParams();
    if (localizedIdea) params.set("id", localizedIdea.id);
    if (adventureId) params.set("adventureId", adventureId);
    router.push(`/complete?${params.toString()}`);
  }

  return (
    <>
      <p className="eyebrow">{copy.adventureMode}</p>
      <h1 className="page-title">{copy.adventureTitle}</h1>
      <p className="page-copy">{copy.adventureCopy}</p>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" />
      </div>

      <section className="info-card">
        <p className="eyebrow">{copy.currentDate}</p>
        <h2 className="activity-title">{localizedIdea?.title ?? copy.selectedActivity}</h2>
        {localizedIdea ? <p className="info-copy">{localizedIdea.description}</p> : null}
      </section>

      <section className="section">
        <div className="prompt-card">
          <p className="eyebrow">{copy.reminder}</p>
          <h2 className="activity-title">{copy.beHere}</h2>
          <p>{copy.noChecklist}</p>
        </div>
      </section>

      <div className="bottom-action">
        <div className="bottom-action-inner">
          <button className="primary-button" type="button" disabled={finishing} onClick={finishAdventure}>
            {finishing ? "…" : copy.finished}
          </button>
        </div>
      </div>
    </>
  );
}
