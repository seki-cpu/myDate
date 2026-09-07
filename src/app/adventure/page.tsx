import Link from "next/link";
import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";

interface AdventurePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AdventurePage({ searchParams }: AdventurePageProps) {
  const params = await searchParams;
  const idea = dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];

  return (
    <MobileShell backHref="/result" trailingHref="/memories" trailingLabel="Memories">
      <p className="eyebrow">Adventure mode</p>
      <h1 className="page-title">You are doing it.</h1>
      <p className="page-copy">
        Keep the app quiet while you are together. Come back when the date is done.
      </p>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" />
      </div>

      <section className="info-card">
        <p className="eyebrow">Current date</p>
        <h2 className="activity-title">{idea?.title ?? "Your selected activity"}</h2>
        <p className="info-copy">
          {idea?.description ?? "Your chosen date idea will stay visible here once content is available."}
        </p>
      </section>

      <section className="section">
        <div className="prompt-card">
          <p className="eyebrow">Tiny reminder</p>
          <h2 className="activity-title">Be here, not in the app.</h2>
          <p>No checklist. No score. Just enjoy the thing you picked together.</p>
        </div>
      </section>

      <div className="bottom-action">
        <div className="bottom-action-inner">
          <Link className="primary-button" href={`/complete${idea ? `?id=${idea.id}` : ""}`}>
            We finished it
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
