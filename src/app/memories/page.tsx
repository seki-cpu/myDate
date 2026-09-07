import Link from "next/link";
import { MobileShell } from "../../components/layout/MobileShell";

export default function MemoriesPage() {
  return (
    <MobileShell backHref="/" trailingHref="/egg" trailingLabel="Egg">
      <p className="eyebrow">Memories</p>
      <h1 className="page-title">The little things you did together.</h1>
      <p className="page-copy">Completed dates will collect here without turning your relationship into a scorecard.</p>

      <section className="section">
        <div className="memory-card">
          <div className="memory-thumb" aria-hidden="true">♡</div>
          <div>
            <h2 className="empty-title">Nothing here yet</h2>
            <p className="empty-copy">Finish your first date idea and its memory will appear here.</p>
          </div>
        </div>
      </section>

      <div className="action-stack">
        <Link className="primary-button" href="/">Find a date idea</Link>
      </div>
    </MobileShell>
  );
}
