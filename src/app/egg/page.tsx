import { MobileShell } from "../../components/layout/MobileShell";
import { EggView } from "../../components/egg/EggView";

export default function EggPage() {
  return (
    <MobileShell backHref="/" trailingHref="/memories" trailingLabel="Memories">
      <EggView />
    </MobileShell>
  );
}
