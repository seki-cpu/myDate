import Link from "next/link";
import type { DateIdea } from "../../types/domain";

interface ActivityCardProps {
  idea: DateIdea;
}

export function ActivityCard({ idea }: ActivityCardProps) {
  return (
    <Link className="activity-card" href={`/result?id=${idea.id}`}>
      <div className="activity-meta">
        <span className="meta-pill">{idea.category}</span>
        <span className="meta-pill">{idea.duration}</span>
        <span className="meta-pill">{idea.cost}</span>
      </div>
      <h3 className="activity-title">{idea.title}</h3>
      <p className="activity-description">{idea.description}</p>
    </Link>
  );
}
