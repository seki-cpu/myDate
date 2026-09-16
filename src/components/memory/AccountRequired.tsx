"use client";

import Link from "next/link";
import { isBackendConfigured } from "../../lib/supabase";
import { useLocale } from "../ui/locale";
import { journalCopy } from "./journalCopy";

const copy = {
  en: {
    eyebrow: "Private memories",
    title: "Create an account to keep this Memory",
    body: "Your memories and photos are private to your account. Create one now, or sign in if you already have one.",
    create: "Create account",
    signIn: "I already have an account",
  },
  zh: {
    eyebrow: "私人回忆",
    title: "创建账号后再保存这段回忆",
    body: "回忆和照片只会保存在你的私人账号里。现在创建一个账号，已有账号也可以直接登录。",
    create: "创建账号",
    signIn: "我已有账号",
  },
  ja: {
    eyebrow: "プライベートな思い出",
    title: "アカウントを作成して思い出を保存",
    body: "思い出や写真はあなたのアカウントだけに保存される。新しく作成するか、すでにある場合はログインしよう。",
    create: "アカウントを作成",
    signIn: "すでにアカウントがある",
  },
} as const;

export function AccountRequired({ returnTo }: { returnTo: string }) {
  const locale = useLocale();
  const text = copy[locale];
  const journal = journalCopy[locale];

  if (!isBackendConfigured()) {
    return (
      <p className="journal-notice" role="status">
        {journal.backend}
      </p>
    );
  }

  const encodedReturnTo = encodeURIComponent(returnTo);

  return (
    <section className="journal-panel account-panel account-panel-signed-out">
      <header className="account-login-header">
        <p className="account-status-label">{text.eyebrow}</p>
        <h2>{text.title}</h2>
        <p className="account-helper">{text.body}</p>
      </header>

      <div className="account-actions account-auth-actions">
        <Link className="primary-button" href={`/account?mode=signup&returnTo=${encodedReturnTo}`}>
          {text.create}
        </Link>
        <Link className="secondary-button" href={`/account?mode=signin&returnTo=${encodedReturnTo}`}>
          {text.signIn}
        </Link>
      </div>
    </section>
  );
}
