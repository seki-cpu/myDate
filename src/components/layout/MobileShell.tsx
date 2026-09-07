import type { ReactNode } from "react";
import Link from "next/link";

interface MobileShellProps {
  children: ReactNode;
  backHref?: string;
  trailingHref?: string;
  trailingLabel?: string;
}

export function MobileShell({
  children,
  backHref,
  trailingHref = "/memories",
  trailingLabel = "Memories",
}: MobileShellProps) {
  return (
    <main className="app-shell">
      <header className="topbar">
        {backHref ? (
          <Link className="icon-link" href={backHref} aria-label="Go back">
            ←
          </Link>
        ) : (
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true" />
            myDate
          </Link>
        )}

        <Link className="section-link" href={trailingHref}>
          {trailingLabel}
        </Link>
      </header>
      {children}
    </main>
  );
}
