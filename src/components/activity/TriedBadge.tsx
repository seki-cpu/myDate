"use client";

import { useEffect, useState } from "react";
import type { ActivityIdentity } from "../../types/domain";
import { hasTriedActivity } from "../../lib/storage";
import { useLocale } from "../ui/locale";
import styles from "./tried.module.css";

interface TriedBadgeProps {
  identity: ActivityIdentity;
}

const copy = {
  zh: "做过",
  en: "Tried",
  ja: "体験済み",
} as const;

export function TriedBadge({ identity }: TriedBadgeProps) {
  const locale = useLocale();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    setTried(hasTriedActivity(identity));
  }, [identity.source, identity.id]);

  if (!tried) return null;
  return <span className={styles.badge}>{copy[locale]}</span>;
}
