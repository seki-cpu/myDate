"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthService } from "../../lib/services/auth";
import { isBackendConfigured } from "../../lib/supabase";
import { useLocale } from "../ui/locale";
import { useJournal } from "./JournalProvider";
import { journalCopy } from "./journalCopy";

const accountCopy = {
  en: {
    signedOut: "Private account",
    signedOutTitle: "Sign in or create your private space",
    signedOutHint: "Create an account to keep memories and photos private, or sign in if you already have one.",
    signedIn: "Signed in",
    accountLabel: "Account",
    privacyLabel: "Privacy",
    privacyValue: "Private to you",
  },
  zh: {
    signedOut: "私人账号",
    signedOutTitle: "登录或创建你的私人空间",
    signedOutHint: "创建账号后即可保存私人回忆和照片；已有账号可以直接登录。",
    signedIn: "已登录",
    accountLabel: "账号",
    privacyLabel: "隐私",
    privacyValue: "仅自己可见",
  },
  ja: {
    signedOut: "プライベートアカウント",
    signedOutTitle: "ログインまたはアカウントを作成",
    signedOutHint: "アカウントを作成すると、思い出や写真を自分だけのものとして保存できる。すでにある場合はログインしよう。",
    signedIn: "ログイン中",
    accountLabel: "アカウント",
    privacyLabel: "プライバシー",
    privacyValue: "自分だけに表示",
  },
} as const;

export function AccountPanel({
  returnTo = "/memories",
  initialMode = "signin",
}: {
  returnTo?: string;
  initialMode?: "signin" | "signup";
}) {
  const locale = useLocale();
  const t = journalCopy[locale];
  const accountText = accountCopy[locale];
  const { user, loading } = useJournal();
  const [busy, setBusy] = useState(false);
  const [signup, setSignup] = useState(initialMode === "signup");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      const username = String(form.get("username"));
      const password = String(form.get("password"));
      if (signup) {
        if (!(await AuthService.signUp(username, password))) setMessage(t.verify);
      } else {
        await AuthService.signIn(username, password);
      }
    } catch {
      setMessage(t.authError);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p role="status">{t.loading}</p>;

  if (!isBackendConfigured()) {
    return (
      <p className="journal-notice" role="status">
        {t.backend}
      </p>
    );
  }

  if (user) {
    const displayName = user.user_metadata.username ?? user.email ?? accountText.accountLabel;
    const initial = displayName.trim().charAt(0).toUpperCase() || "M";

    return (
      <section className="journal-panel account-panel">
        <header className="account-profile-header">
          <div className="account-avatar" aria-hidden="true">
            {initial}
          </div>
          <div className="account-profile-copy">
            <p className="account-status-label">{accountText.signedIn}</p>
            <h2>{displayName}</h2>
            <p className="account-helper">{t.accountSwitch}</p>
          </div>
        </header>

        <dl className="account-summary" aria-label={t.account}>
          <div>
            <dt>{accountText.accountLabel}</dt>
            <dd>{displayName}</dd>
          </div>
          <div>
            <dt>{accountText.privacyLabel}</dt>
            <dd>{accountText.privacyValue}</dd>
          </div>
        </dl>

        <div className="account-actions">
          <Link className="primary-button" href={returnTo}>
            {t.done}
          </Link>
          <button
            className="secondary-button account-signout-button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await AuthService.signOut();
              } catch {
                setMessage(t.failed);
              } finally {
                setBusy(false);
              }
            }}
          >
            {t.logout}
          </button>
        </div>

        {message ? <p className="account-message" role="status">{message}</p> : null}
      </section>
    );
  }

  return (
    <section className="journal-panel account-panel account-panel-signed-out">
      <header className="account-login-header">
        <p className="account-status-label">{accountText.signedOut}</p>
        <h2>{accountText.signedOutTitle}</h2>
        <p className="account-helper">{accountText.signedOutHint}</p>
      </header>

      <form className="journal-form account-form" onSubmit={submit}>
        <label>
          {t.username}
          <input
            name="username"
            type="text"
            required
            autoComplete="username"
            minLength={3}
            maxLength={32}
          />
        </label>
        <label>
          {t.password}
          <input
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={128}
            autoComplete={signup ? "new-password" : "current-password"}
          />
        </label>

        <div className="account-actions account-auth-actions">
          <button className="primary-button" disabled={busy}>
            {busy ? t.loading : signup ? t.signup : t.login}
          </button>
          <button
            className="secondary-button"
            type="button"
            disabled={busy}
            onClick={() => {
              setSignup(!signup);
              setMessage("");
            }}
          >
            {signup ? t.login : t.signup}
          </button>
        </div>

        {message ? <p className="account-message" role="status">{message}</p> : null}
      </form>
    </section>
  );
}
