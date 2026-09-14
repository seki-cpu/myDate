import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";
import { RandomResultContent } from "../../components/activity/RandomResultContent";
import { ResultContent } from "../../components/activity/ResultContent";

interface ResultPageProps {
  searchParams?: Promise<{ id?: string; mode?: string }>;
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;

  if (params?.mode === "random") {
    return (
      <MobileShell backHref="/" variant="focused">
        <RandomResultContent ideas={dateIdeas} />
      </MobileShell>
    );
  }

  const idea = dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];

  return (
    <MobileShell backHref="/" variant="focused">
      <ResultContent idea={idea} />
    </MobileShell>
  );
}
