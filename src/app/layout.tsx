import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "myDate",
  description: "Find something good to do together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
