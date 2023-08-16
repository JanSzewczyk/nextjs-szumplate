import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next App - Szumplate",
  description: "Template for Next App by Szum-Tech"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body >{children}</body>
    </html>
  );
}
