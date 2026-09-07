"use client";

import { useEffect, useRef, useState } from "react";
import { setStoredLocale, type Locale, useLocale } from "./locale";

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function selectLocale(nextLocale: Locale) {
    setStoredLocale(nextLocale);
    setOpen(false);
  }

  return (
    <div className="language-menu" ref={rootRef}>
      <button
        className="icon-link language-trigger"
        type="button"
        aria-label="Change language"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.4 5.1 3.4 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.6 8.6 8.6 12s1.2 6.2 3.4 8.5" />
        </svg>
      </button>

      {open ? (
        <div className="language-popover" role="menu" aria-label="Language">
          {localeOptions.map((option) => (
            <button
              className={`language-option${locale === option.value ? " is-active" : ""}`}
              type="button"
              role="menuitemradio"
              aria-checked={locale === option.value}
              key={option.value}
              onClick={() => selectLocale(option.value)}
            >
              <span>{option.label}</span>
              {locale === option.value ? <span aria-hidden="true">✓</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
