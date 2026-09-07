import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";
import { ResultContent } from "../../components/activity/ResultContent";

interface ResultPageProps {
  searchParams?: Promise<{ id?: string; mode?: string }>;
}

function pickRandomIdea() {
  if (dateIdeas.length === 0) return undefined;
  return dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const idea =
    params?.mode === "random"
      ? pickRandomIdea()
      : dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];

  return (
    <MobileShell backHref="/" trailingHref="/memories" trailingLabel="Saved">
      <ResultContent idea={idea} />
    </MobileShell>
  );
}
