"use client";

import { useMemo, useState } from "react";
import type { DateIdea } from "../../types/domain";
import { uiCopy, useLocale } from "../ui/locale";
import { ActivityCard } from "./ActivityCard";

interface HomeIdeaBrowserProps {
  ideas: DateIdea[];
}

const batchSize = 3;

export function HomeIdeaBrowser({ ideas }: HomeIdeaBrowserProps) {
  const [offset, setOffset] = useState(0);
  const locale = useLocale();
  const copy = uiCopy[locale];

  const visibleIdeas = useMemo(() => {
    if (ideas.length <= batchSize) return ideas;
    return Array.from({ length: batchSize }, (_, index) => ideas[(offset + index) % ideas.length]);
  }, [ideas, offset]);

  function showNextBatch() {
    if (ideas.length <= batchSize) return;
    setOffset((current) => (current + batchSize) % ideas.length);
  }

  if (ideas.length === 0) {
    return (
      <div className="empty-card">
        <h3 className="empty-title">{copy.emptyTitle}</h3>
        <p className="empty-copy">{copy.emptyCopy}</p>
      </div>
    );
  }

  return (
    <>
      <div className="activity-list">
        {visibleIdeas.map((idea) => (
          <ActivityCard idea={idea} key={idea.id} />
        ))}
      </div>

      {ideas.length > batchSize ? (
        <button className="refresh-ideas-button" type="button" onClick={showNextBatch}>
          <span aria-hidden="true">↻</span>
          {copy.more}
        </button>
      ) : null}
    </>
  );
}
