"use client";

import Link from "next/link";
import { dateIdeas } from "../data/dateIdeas";
import { HomeIdeaBrowser } from "../components/activity/HomeIdeaBrowser";
import { MobileShell } from "../components/layout/MobileShell";
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
          <a className="secondary-button" href="#browse">
            {copy.browse}
          </a>
        </div>
      </section>

      <section className="section" id="browse">
        <div className="section-heading">
          <h2 className="section-title">{copy.ideas}</h2>
          <Link className="section-link" href="/result?mode=random">
            {copy.surprise}
          </Link>
        </div>

        <HomeIdeaBrowser ideas={dateIdeas} />
      </section>
    </MobileShell>
  );
}
