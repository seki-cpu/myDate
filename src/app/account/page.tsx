import { AccountPanel } from "../../components/memory/AccountPanel";
import { MobileShell } from "../../components/layout/MobileShell";

export default function AccountPage() {
  return (
    <MobileShell backHref="/" variant="focused">
      <AccountPanel returnTo="/" />
    </MobileShell>
  );
}
