import { MobileShell } from "../../../components/layout/MobileShell";
import { MemoryDetail } from "../../../components/memory/MemoryDetail";
export default async function MemoryPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const { memoryId } = await params;
  return (
    <MobileShell backHref="/memories" variant="wide">
      <MemoryDetail id={memoryId} />
    </MobileShell>
  );
}
