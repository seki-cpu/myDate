"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { setStoredLocale, type Locale, useLocale } from "../ui/locale";

const copy = {
  en: { menu: "Profile menu", settings: "Settings", account: "Account", language: "Language" },
  zh: { menu: "个人菜单", settings: "设置", account: "账号", language: "语言" },
  ja: { menu: "プロフィールメニュー", settings: "設定", account: "アカウント", language: "言語" },
} as const;

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export function UserMenu() {
  const locale = useLocale();
  const text = copy[locale];
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setLanguageOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setLanguageOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function selectLocale(nextLocale: Locale) {
    setStoredLocale(nextLocale);
    setLanguageOpen(false);
  }

  return (
    <div className="user-menu" ref={rootRef}>
      <button
        className="icon-link user-menu-trigger"
        type="button"
        aria-label={text.menu}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => {
          setOpen((value) => !value);
          if (open) setLanguageOpen(false);
        }}
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
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.6 19c.7-3.3 3.1-5 6.4-5s5.7 1.7 6.4 5" />
        </svg>
      </button>

      {open ? (
        <div className="user-menu-popover" role="menu" aria-label={text.menu}>
          <Link className="user-menu-item" href="/settings" role="menuitem" onClick={() => setOpen(false)}>
            <span className="user-menu-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
              </svg>
            </span>
            <span>{text.settings}</span>
          </Link>

          <Link className="user-menu-item" href="/account" role="menuitem" onClick={() => setOpen(false)}>
            <span className="user-menu-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="3" />
                <path d="M6 19c.8-3.1 2.9-4.7 6-4.7s5.2 1.6 6 4.7" />
              </svg>
            </span>
            <span>{text.account}</span>
          </Link>

          <button
            className="user-menu-item user-menu-button"
            type="button"
            role="menuitem"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((value) => !value)}
          >
            <span className="user-menu-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.4 5.1 3.4 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.6 8.6 8.6 12s1.2 6.2 3.4 8.5" />
              </svg>
            </span>
            <span>{text.language}</span>
            <span className="user-menu-chevron" aria-hidden="true">{languageOpen ? "⌃" : "⌄"}</span>
          </button>

          {languageOpen ? (
            <div className="user-menu-language-options" role="group" aria-label={text.language}>
              {localeOptions.map((option) => (
                <button
                  className={`user-menu-language-option${locale === option.value ? " is-active" : ""}`}
                  type="button"
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
      ) : null}
    </div>
  );
}
