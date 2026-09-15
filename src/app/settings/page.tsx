"use client";

import { MobileShell } from "../../components/layout/MobileShell";
import { setStoredLocale, type Locale, useLocale } from "../../components/ui/locale";

const copy = {
  en: {
    eyebrow: "Settings",
    title: "Make myDate feel like yours.",
    subtitle: "Keep app preferences separate from your private account.",
    language: "Language",
    languageHint: "Choose the language used across myDate.",
  },
  zh: {
    eyebrow: "设置",
    title: "把 myDate 调成你喜欢的样子。",
    subtitle: "应用偏好和私人账号分开管理。",
    language: "语言",
    languageHint: "选择 myDate 全局使用的语言。",
  },
  ja: {
    eyebrow: "設定",
    title: "myDate を自分らしく整えよう。",
    subtitle: "アプリの設定とプライベートアカウントは分けて管理します。",
    language: "言語",
    languageHint: "myDate 全体で使用する言語を選択します。",
  },
} as const;

const options: Array<{ value: Locale; label: string }> = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export default function SettingsPage() {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <MobileShell backHref="/" variant="focused">
      <div className="settings-heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1 className="page-title">{text.title}</h1>
        <p className="page-copy">{text.subtitle}</p>
      </div>

      <section className="journal-panel settings-panel">
        <div>
          <h2>{text.language}</h2>
          <p className="journal-helper">{text.languageHint}</p>
        </div>

        <div className="settings-options" role="radiogroup" aria-label={text.language}>
          {options.map((option) => (
            <button
              className={`settings-option${locale === option.value ? " is-active" : ""}`}
              type="button"
              role="radio"
              aria-checked={locale === option.value}
              key={option.value}
              onClick={() => setStoredLocale(option.value)}
            >
              <span>{option.label}</span>
              {locale === option.value ? <span aria-hidden="true">✓</span> : null}
            </button>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
