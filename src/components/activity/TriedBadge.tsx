"use client";

import type { ActivityIdentity } from "../../types/domain";
import { useJournal } from "../memory/JournalProvider";
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
  const { memories } = useJournal();
  const source = identity.source;
  const id = identity.id;

  const tried = memories.some(memory => memory.activity_snapshot.identity?.source === source && memory.activity_snapshot.identity.id === id);

  if (!tried) return null;
  return <span className={styles.badge}>{copy[locale]}</span>;
}
