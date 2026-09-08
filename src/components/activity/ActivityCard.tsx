"use client";

import Link from "next/link";
import type { DateIdea } from "../../types/domain";
import { getCategoryLabel } from "../ui/categoryLabel";
import { flowCopy, localizeIdea, useLocale } from "../ui/locale";

interface ActivityCardProps {
  idea: DateIdea;
}

export function ActivityCard({ idea }: ActivityCardProps) {
  const locale = useLocale();
  const copy = flowCopy[locale];
  const localizedIdea = localizeIdea(idea, locale);
  const primaryCategory = idea.categories[0];

  return (
    <Link className="activity-card" href={`/result?id=${idea.id}`}>
      <div className="activity-meta">
        {primaryCategory ? (
          <span className="meta-pill">{getCategoryLabel(primaryCategory, locale)}</span>
        ) : null}
        <span className="meta-pill">{copy.duration[idea.duration]}</span>
        <span className="meta-pill">{copy.budget[idea.cost]}</span>
      </div>
      <h3 className="activity-title">{localizedIdea.title}</h3>
      <p className="activity-description">{localizedIdea.description}</p>
    </Link>
  );
}
