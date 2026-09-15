import { MobileShell } from "../../../../components/layout/MobileShell";
import { MemoryCreation } from "../../../../components/memory/MemoryCreation";

export default async function CreateMemoryPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const { memoryId } = await params;

  return (
    <MobileShell backHref="/memories" variant="wide">
      <MemoryCreation id={memoryId} />
    </MobileShell>
  );
}
