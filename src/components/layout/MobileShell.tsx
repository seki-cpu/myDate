import type { ReactNode } from "react";
import Link from "next/link";
import { LanguageMenu } from "../ui/LanguageMenu";

interface MobileShellProps {
  children: ReactNode;
  backHref?: string;
  trailingHref?: string;
  trailingLabel?: string;
}

export function MobileShell({
  children,
  backHref,
  trailingHref,
  trailingLabel,
}: MobileShellProps) {
  const hasTrailingAction = Boolean(trailingHref && trailingLabel);

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

        <div className="topbar-actions">
          <LanguageMenu />
          {hasTrailingAction ? (
            <Link className="section-link" href={trailingHref!}>
              {trailingLabel}
            </Link>
          ) : null}
        </div>
      </header>
      {children}
    </main>
  );
}
