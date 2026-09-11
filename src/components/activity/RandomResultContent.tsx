"use client";

import { useEffect, useState } from "react";
import type { ActivityIdentity, DateIdea } from "../../types/domain";
import {
  isActivityCompletedInCurrentRound,
  startNewDiscoveryRound,
} from "../../lib/storage";
import { useLocale } from "../ui/locale";
import { ResultContent } from "./ResultContent";

interface RandomResultContentProps {
  ideas: DateIdea[];
}

const copy = {
  zh: {
    title: "这一轮已经都体验过了。",
    body: "开始新一轮后，之前做过的活动会重新进入随机池，但“做过”标记会保留。",
    action: "开始新一轮",
  },
  en: {
    title: "You finished this discovery round.",
    body: "Start a new round to make previously tried activities random-eligible again. Their Tried history stays visible.",
    action: "Start a new round",
  },
  ja: {
    title: "このラウンドはひと通り体験した。",
    body: "新しいラウンドを始めると、体験済みのアクティビティも再びランダム対象になる。体験済み表示は残る。",
    action: "新しいラウンドを始める",
  },
} as const;

function identityFor(idea: DateIdea): ActivityIdentity {
  return { source: "builtin", id: idea.id };
}

function pickEligibleIdea(ideas: DateIdea[]): DateIdea | undefined {
  const eligible = ideas.filter((idea) => !isActivityCompletedInCurrentRound(identityFor(idea)));
  if (eligible.length === 0) return undefined;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function RandomResultContent({ ideas }: RandomResultContentProps) {
  const locale = useLocale();
  const text = copy[locale];
  const [idea, setIdea] = useState<DateIdea | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const hasIdeas = ideas.length > 0;

  useEffect(() => {
    setIdea(pickEligibleIdea(ideas));
    setReady(true);
  }, [ideas]);

  if (!ready) return null;
  if (idea) return <ResultContent idea={idea} />;

  return (
    <section className="empty-card">
      <h1 className="page-title">{text.title}</h1>
      <p className="page-copy">{hasIdeas ? text.body : ""}</p>
      {hasIdeas ? (
        <div className="action-stack">
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              startNewDiscoveryRound();
              setIdea(pickEligibleIdea(ideas));
            }}
          >
            {text.action}
          </button>
        </div>
      ) : null}
    </section>
  );
}
