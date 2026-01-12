"use client";

import * as React from "react";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * Theme provider component that wraps next-themes ThemeProvider.
 * Provides light/dark/system theme support throughout the application.
 *
 * This component must be used as a client component and should wrap the
 * application content in the root layout.
 *
 * @example
 * ```tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   {children}
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
