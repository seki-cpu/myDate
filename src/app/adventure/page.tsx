import { dateIdeas } from "../../data/dateIdeas";
import { MobileShell } from "../../components/layout/MobileShell";
import { AdventureContent } from "../../components/activity/AdventureContent";

interface AdventurePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AdventurePage({ searchParams }: AdventurePageProps) {
  const params = await searchParams;
  const idea = dateIdeas.find((item) => item.id === params?.id) ?? dateIdeas[0];

  return (
    <MobileShell backHref={idea ? `/result?id=${idea.id}` : "/result"}>
      <AdventureContent idea={idea} />
    </MobileShell>
  );
}
