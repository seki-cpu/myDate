import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import "../styles/responsive.css";
import "../styles/journal.css";
import "../styles/account-menu.css";
import { JournalProvider } from "../components/memory/JournalProvider";

export const metadata: Metadata = {
  title: "myDate",
  description: "Find something good to do together.",
  applicationName: "myDate",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "myDate",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffdf9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><JournalProvider>{children}</JournalProvider></body>
    </html>
  );
}
