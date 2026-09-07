"use client";

import Link from "next/link";
import { dateIdeas } from "../data/dateIdeas";
import { HomeIdeaBrowser } from "../components/activity/HomeIdeaBrowser";
import { MobileShell } from "../components/layout/MobileShell";
import { uiCopy, useLocale } from "../components/ui/locale";

const categoryLabels = {
  zh: ["美食", "户外", "室内", "创意", "放松"],
  en: ["Food", "Outdoor", "Indoor", "Creative", "Relaxing"],
  ja: ["食べる", "屋外", "屋内", "クリエイティブ", "リラックス"],
} as const;

export default function HomePage() {
  const locale = useLocale();
  const copy = uiCopy[locale];

  return (
    <MobileShell trailingHref="/egg" trailingLabel="Egg">
      <section>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="hero-title">{copy.heroTitle}</h1>
        <p className="hero-copy">{copy.heroCopy}</p>

        <div className="action-stack">
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
          <h2 className="section-title">{copy.mood}</h2>
        </div>
        <div className="chip-row" aria-label="Date idea categories">
          {categoryLabels[locale].map((category) => (
            <span className="chip" key={category}>
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
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
