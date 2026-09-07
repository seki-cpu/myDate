import Link from "next/link";
import { dateIdeas } from "../data/dateIdeas";
import { HomeIdeaBrowser } from "../components/activity/HomeIdeaBrowser";
import { MobileShell } from "../components/layout/MobileShell";

const categories = ["Food", "Outdoor", "Indoor", "Creative", "Relaxing"];

export default function HomePage() {
  return (
    <MobileShell trailingHref="/egg" trailingLabel="Egg">
      <section>
        <p className="eyebrow">For the two of you</p>
        <h1 className="hero-title">What should we do today?</h1>
        <p className="hero-copy">
          Find a simple date idea in seconds. No planning spiral, just something worth doing together.
        </p>

        <div className="action-stack">
          <Link className="primary-button" href="/result?mode=random">
            Pick something for us
          </Link>
          <a className="secondary-button" href="#browse">
            Browse ideas
          </a>
        </div>
      </section>

      <section className="section" id="browse">
        <div className="section-heading">
          <h2 className="section-title">Choose a mood</h2>
        </div>
        <div className="chip-row" aria-label="Date idea categories">
          {categories.map((category) => (
            <span className="chip" key={category}>
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2 className="section-title">Ideas for right now</h2>
          <Link className="section-link" href="/result?mode=random">
            Surprise us
          </Link>
        </div>

        <HomeIdeaBrowser ideas={dateIdeas} />
      </section>
    </MobileShell>
  );
}
