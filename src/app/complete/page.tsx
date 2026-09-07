import Link from "next/link";
import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";

interface CompletePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function CompletePage({ searchParams }: CompletePageProps) {
  const params = await searchParams;
  const idea = dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];
  const prompt = idea?.photoPrompt ?? "Take one photo that shows a small trace of both of you: two hands, two pairs of shoes, or something you picked together.";

  return (
    <MobileShell backHref="/" trailingHref="/memories" trailingLabel="Memories">
      <p className="eyebrow">Date complete</p>
      <h1 className="page-title">Keep a little piece of it.</h1>
      <p className="page-copy">No faces required. A small detail can be enough to remember the day.</p>

      <section className="section">
        <div className="prompt-card">
          <p className="eyebrow">Photo idea</p>
          <h2 className="activity-title">A memory without posing</h2>
          <p>{prompt}</p>
        </div>
      </section>

      <section className="section">
        <div className="info-card">
          <h2 className="empty-title">{idea?.title ?? "Your finished date"}</h2>
          <p className="info-copy">In V1, taking or uploading a photo is optional. Finishing the date matters more than filling out the app.</p>
        </div>
      </section>

      <div className="action-stack">
        <Link className="primary-button" href="/memories">Save this memory</Link>
        <Link className="secondary-button" href="/">Maybe later</Link>
      </div>
    </MobileShell>
  );
}
