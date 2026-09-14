"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { LanguageMenu } from "../ui/LanguageMenu";
import { shellCopy, useLocale } from "../ui/locale";
import { MemoryMiniCounter } from "../memory/MemoryMiniCounter";

interface MobileShellProps {
  children: ReactNode;
  backHref?: string;
  trailingHref?: string;
  trailingLabel?: string;
  variant?: "default" | "wide" | "focused";
}

export function MobileShell({
  children,
  backHref,
  trailingHref,
  trailingLabel,
  variant = "default",
}: MobileShellProps) {
  const locale = useLocale();
  const copy = shellCopy[locale];
  const hasTrailingAction = Boolean(trailingHref && trailingLabel);

  return (
    <main className={`app-shell app-shell-${variant}`}>
      <header className="topbar mobile-topbar">
        {backHref ? (
          <Link className="icon-link" href={backHref} aria-label={copy.goBack}>
            ←
          </Link>
        ) : (
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true" />
            myDate
          </Link>
        )}

        <div className="topbar-actions">
          <MemoryMiniCounter />
          <LanguageMenu />
          {hasTrailingAction ? (
            <Link className="section-link" href={trailingHref!}>
              {trailingLabel}
            </Link>
          ) : null}
        </div>
      </header>

      <header className="desktop-header">
        <div className="desktop-header-inner">
          <div className="desktop-header-start">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true" />
              myDate
            </Link>
            <nav className="desktop-nav" aria-label={copy.primaryNavigation}>
              <Link className="desktop-nav-link" href="/">{copy.discover}</Link>
              <Link className="desktop-nav-link" href="/memories">{copy.memories}</Link>
            </nav>
          </div>

          <div className="topbar-actions">
            {backHref ? (
              <Link className="desktop-back-link" href={backHref}>← {copy.back}</Link>
            ) : null}
            <MemoryMiniCounter />
            <LanguageMenu />
            {hasTrailingAction ? (
              <Link className="section-link" href={trailingHref!}>
                {trailingLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <div className="app-content">{children}</div>
    </main>
  );
}
