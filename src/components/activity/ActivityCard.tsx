"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ActivityIdentity, DateIdea } from "../../types/domain";
import { hasTriedActivity } from "../../lib/storage";
import { localizeIdea, useLocale } from "../ui/locale";

interface ActivityCardProps {
  idea: DateIdea;
}

const triedCopy = {
  zh: "做过",
  en: "Tried",
  ja: "体験済み",
} as const;

export function ActivityCard({ idea }: ActivityCardProps) {
  const locale = useLocale();
  const localizedIdea = localizeIdea(idea, locale);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const identity: ActivityIdentity = { source: "builtin", id: idea.id };
    setTried(hasTriedActivity(identity));
  }, [idea.id]);

  return (
    <Link className="activity-card" href={`/result?id=${idea.id}`}>
      <div className="activity-meta">
        {idea.categories[0] ? <span className="meta-pill">{idea.categories[0]}</span> : null}
        <span className="meta-pill">{idea.duration}</span>
        <span className="meta-pill">{idea.cost}</span>
        {tried ? <span className="tried-pill">{triedCopy[locale]}</span> : null}
      </div>
      <h3 className="activity-title">{localizedIdea.title}</h3>
      <p className="activity-description">{localizedIdea.description}</p>
    </Link>
  );
}
