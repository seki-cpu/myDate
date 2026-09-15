import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/responsive.css";
import "../styles/journal.css";
import "../styles/account-menu.css";
import { JournalProvider } from "../components/memory/JournalProvider";

export const metadata: Metadata = {
  title: "myDate",
  description: "Find something good to do together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><JournalProvider>{children}</JournalProvider></body>
    </html>
  );
}
