"use client";

import Link from "next/link";
import { dateIdeas } from "../data/dateIdeas";
import { HomeIdeaBrowser } from "../components/activity/HomeIdeaBrowser";
import { MobileShell } from "../components/layout/MobileShell";
import { HomePastMemoryEntry } from "../components/memory/HomePastMemoryEntry";
import { uiCopy, useLocale } from "../components/ui/locale";

export default function HomePage() {
  const locale = useLocale();
  const copy = uiCopy[locale];

  return (
    <MobileShell variant="wide">
      <section className="discover-hero">
        <div className="discover-hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="hero-title">{copy.heroTitle}</h1>
          <p className="hero-copy">{copy.heroCopy}</p>
        </div>

        <div className="action-stack discover-actions">
          <Link className="primary-button" href="/result?mode=random">
            {copy.random}
          </Link>
          <Link className="secondary-button" href="/ideas">
            {copy.browse}
          </Link>
        </div>
      </section>

      <HomePastMemoryEntry />

      <section className="section" id="browse">
        <HomeIdeaBrowser ideas={dateIdeas} />
      </section>
    </MobileShell>
  );
}
