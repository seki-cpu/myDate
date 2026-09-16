"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AccountPanel } from "../../components/memory/AccountPanel";
import { MobileShell } from "../../components/layout/MobileShell";

function safeReturnTo(value: string | null) {
  return value?.startsWith("/") ? value : "/";
}

function AccountContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const returnTo = safeReturnTo(searchParams.get("returnTo"));

  return (
    <MobileShell backHref="/" variant="focused">
      <AccountPanel returnTo={returnTo} initialMode={mode} />
    </MobileShell>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountContent />
    </Suspense>
  );
}
