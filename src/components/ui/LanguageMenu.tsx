"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "zh" | "en" | "ja";

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const language = navigator.language.toLowerCase();
  if (language.startsWith("zh")) return "zh";
  if (language.startsWith("ja")) return "ja";
  return "en";
}

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("mydate-locale") as Locale | null;
    setLocale(saved === "zh" || saved === "ja" || saved === "en" ? saved : detectLocale());
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("mydate-locale", nextLocale);
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
        <span aria-hidden="true">🌐</span>
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
          <p className="language-note">Full translated activity copy will activate after the shared localization model is approved.</p>
        </div>
      ) : null}
    </div>
  );
}
