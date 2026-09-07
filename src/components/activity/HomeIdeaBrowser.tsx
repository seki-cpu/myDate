"use client";

import { useMemo, useState } from "react";
import type { DateIdea } from "../../types/domain";
import { ActivityCard } from "./ActivityCard";

interface HomeIdeaBrowserProps {
  ideas: DateIdea[];
}

const batchSize = 3;

export function HomeIdeaBrowser({ ideas }: HomeIdeaBrowserProps) {
  const [offset, setOffset] = useState(0);

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
        <h3 className="empty-title">Date ideas are on the way</h3>
        <p className="empty-copy">The visual experience is ready. Activity cards will appear here as soon as the shared content source is populated.</p>
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
          Show me another three
        </button>
      ) : null}
    </>
  );
}
