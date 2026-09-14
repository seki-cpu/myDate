"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthService } from "../../lib/services/auth";
import { isBackendConfigured } from "../../lib/supabase";
import { useLocale } from "../ui/locale";
import { useJournal } from "./JournalProvider";
import { journalCopy } from "./journalCopy";

export function AccountPanel({
  returnTo = "/memories",
}: {
  returnTo?: string;
}) {
  const t = journalCopy[useLocale()];
  const { user, loading } = useJournal();
  const [busy, setBusy] = useState(false);
  const [signup, setSignup] = useState(false);
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
      } else await AuthService.signIn(username, password);
    } catch {
      setMessage(t.authError);
    } finally {
      setBusy(false);
    }
  }
  if (loading) return <p role="status">{t.loading}</p>;
  if (!isBackendConfigured())
    return (
      <p className="journal-notice" role="status">
        {t.backend}
      </p>
    );
  if (user)
    return (
      <section className="journal-panel">
        <h2>{t.account}</h2>
        <p>{user.user_metadata.username ?? user.email}</p>
        <p>{t.accountSwitch}</p>
        <Link className="primary-button" href={returnTo}>
          {t.done}
        </Link>
        <button
          className="secondary-button"
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
        <p role="status">{message}</p>
      </section>
    );
  return (
    <form className="journal-panel journal-form" onSubmit={submit}>
      <h2>{signup ? t.signup : t.login}</h2>
      <p>{t.loginHint}</p>
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
      <p role="status">{message}</p>
    </form>
  );
}
