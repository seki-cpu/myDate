import { MobileShell } from "../../components/layout/MobileShell";
import { RatingContent } from "../../components/activity/RatingContent";

interface RatingPageProps {
  searchParams?: Promise<{ memoryId?: string }>;
}

export default async function RatingPage({ searchParams }: RatingPageProps) {
  const params = await searchParams;

  return (
    <MobileShell backHref="/">
      <RatingContent memoryId={params?.memoryId} />
    </MobileShell>
  );
}
