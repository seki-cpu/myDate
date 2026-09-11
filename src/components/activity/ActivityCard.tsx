"use client";

import Link from "next/link";
import type { DateIdea } from "../../types/domain";
import { localizeIdea, useLocale } from "../ui/locale";
import { TriedBadge } from "./TriedBadge";

interface ActivityCardProps {
  idea: DateIdea;
}

export function ActivityCard({ idea }: ActivityCardProps) {
  const locale = useLocale();
  const localizedIdea = localizeIdea(idea, locale);

  return (
    <Link className="activity-card" href={`/result?id=${idea.id}`}>
      <div className="activity-meta">
        {idea.categories[0] ? <span className="meta-pill">{idea.categories[0]}</span> : null}
        <span className="meta-pill">{idea.duration}</span>
        <span className="meta-pill">{idea.cost}</span>
        <TriedBadge identity={{ source: "builtin", id: idea.id }} />
      </div>
      <h3 className="activity-title">{localizedIdea.title}</h3>
      <p className="activity-description">{localizedIdea.description}</p>
    </Link>
  );
}
