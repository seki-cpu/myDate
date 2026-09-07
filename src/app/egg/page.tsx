import Link from "next/link";
import { MobileShell } from "../../components/layout/MobileShell";

export default function EggPage() {
  return (
    <MobileShell backHref="/" trailingHref="/memories" trailingLabel="Memories">
      <p className="eyebrow">Optional</p>
      <h1 className="page-title">A tiny thing that belongs to both of you.</h1>
      <p className="page-copy">The Egg stays secondary. In V1, the only customization is color.</p>

      <section className="egg-panel">
        <div className="egg" aria-label="Shared egg preview" />
        <h2 className="empty-title">Choose its color</h2>
        <p className="empty-copy">Nothing to maintain, feed, or unlock yet.</p>
        <div className="color-row" aria-label="Egg color options">
          <button className="color-dot" type="button" aria-label="Champagne egg" />
          <button className="color-dot" type="button" aria-label="Rose egg" />
          <button className="color-dot" type="button" aria-label="Sage egg" />
          <button className="color-dot" type="button" aria-label="Blue egg" />
        </div>
      </section>

      <p className="note">V1 visual preview only. Persistence remains owned by the shared storage layer.</p>

      <div className="action-stack">
        <Link className="secondary-button" href="/">Back to date ideas</Link>
      </div>
    </MobileShell>
  );
}
