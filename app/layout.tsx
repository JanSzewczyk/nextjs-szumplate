import * as React from "react";

import { type Metadata } from "next";

import { ThemeProvider } from "~/components/providers/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Szumplate Next App",
  description: "Template for Next App by Szum-Tech"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
