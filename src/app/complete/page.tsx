import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";
import { CompleteContent } from "../../components/activity/CompleteContent";

interface CompletePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function CompletePage({ searchParams }: CompletePageProps) {
  const params = await searchParams;
  const idea = dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];

  return (
    <MobileShell backHref="/">
      <CompleteContent idea={idea} />
    </MobileShell>
  );
}
