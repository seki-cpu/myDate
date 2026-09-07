"use client";

import { useEffect, useRef, useState } from "react";
import { getStoredLocale, setStoredLocale, type Locale, useLocale } from "./locale";

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
    getStoredLocale();
  }, []);

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
        <span className="language-globe" aria-hidden="true">◎</span>
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
