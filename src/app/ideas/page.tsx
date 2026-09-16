"use client";

import { ActivityCard } from "../../components/activity/ActivityCard";
import { MobileShell } from "../../components/layout/MobileShell";
import { useLocale } from "../../components/ui/locale";
import { dateIdeas } from "../../data/dateIdeas";

const copy = {
  zh: {
    eyebrow: "全部主意",
    title: "主意一览",
    body: "慢慢看看，选一个你们现在想做的。",
  },
  en: {
    eyebrow: "All ideas",
    title: "Browse ideas",
    body: "Take a look through everything and pick what feels right for the two of you.",
  },
  ja: {
    eyebrow: "すべてのアイデア",
    title: "アイデア一覧",
    body: "ゆっくり眺めて、今の二人に合うものを選ぼう。",
  },
} as const;

export default function IdeasPage() {
  const locale = useLocale();
  const text = copy[locale];

  return (
    <MobileShell variant="wide" backHref="/">
      <section>
        <p className="eyebrow">{text.eyebrow}</p>
        <h1 className="page-title">{text.title}</h1>
        <p className="page-copy">{text.body}</p>
      </section>

      <section className="section">
        <div className="activity-list">
          {dateIdeas.map((idea) => (
            <ActivityCard idea={idea} key={idea.id} />
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
