import Link from "next/link";
import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";

interface ResultPageProps {
  searchParams?: Promise<{ id?: string; mode?: string }>;
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const idea = dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];

  return (
    <MobileShell backHref="/" trailingHref="/memories" trailingLabel="Saved">
      {idea ? (
        <>
          <section className="result-hero">
            <div className="result-number">TONIGHT'S PICK</div>
            <p className="eyebrow">{idea.category}</p>
            <h1 className="page-title">{idea.title}</h1>
            <p className="page-copy">{idea.description}</p>
            <div className="detail-grid">
              <div className="detail-cell"><span className="detail-label">Time</span><span className="detail-value">{idea.duration}</span></div>
              <div className="detail-cell"><span className="detail-label">Cost</span><span className="detail-value">{idea.cost}</span></div>
              <div className="detail-cell"><span className="detail-label">Place</span><span className="detail-value">{idea.indoor ? "Indoor" : "Flexible"}</span></div>
            </div>
          </section>
          <div className="action-stack">
            <Link className="secondary-button" href="/result?mode=random">Give us another</Link>
          </div>
          <div className="bottom-action"><div className="bottom-action-inner"><Link className="primary-button" href={`/adventure?id=${idea.id}`}>Let's do this</Link></div></div>
        </>
      ) : (
        <section className="empty-card">
          <p className="eyebrow">Result preview</p>
          <h1 className="page-title">Your date idea will land here.</h1>
          <p className="page-copy">The shared content list is empty right now. Once the content branch adds ideas, this screen will render them automatically.</p>
          <div className="action-stack"><Link className="secondary-button" href="/">Back home</Link></div>
        </section>
      )}
    </MobileShell>
  );
}
