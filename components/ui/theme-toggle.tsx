"use client";

import * as React from "react";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@szum-tech/design-system";

type Theme = "system" | "light" | "dark";

const THEME_CYCLE: Theme[] = ["system", "light", "dark"];

const THEME_LABELS: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme"
};

/**
 * Theme toggle button component that cycles through system, light, and dark themes.
 *
 * Features:
 * - Three states: System -> Light -> Dark -> System
 * - Accessible with proper aria-labels
 * - Keyboard navigable
 * - Shows appropriate icon for current theme
 * - Tooltip showing current theme name
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme: Theme = (theme as Theme) ?? "system";

  const cycleTheme = React.useCallback(() => {
    const currentIndex = THEME_CYCLE.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    const nextTheme = THEME_CYCLE[nextIndex];
    if (nextTheme) {
      setTheme(nextTheme);
    }
  }, [currentTheme, setTheme]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        cycleTheme();
      }
    },
    [cycleTheme]
  );

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
        <span className="size-4" />
      </Button>
    );
  }

  const renderIcon = () => {
    // When theme is "system", show icon based on resolved theme
    if (currentTheme === "system") {
      return <MonitorIcon className="size-4" />;
    }
    // For explicit light/dark, show the corresponding icon
    if (currentTheme === "light") {
      return <SunIcon className="size-4" />;
    }
    return <MoonIcon className="size-4" />;
  };

  const getNextThemeLabel = (): string => {
    const currentIndex = THEME_CYCLE.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
    const nextTheme = THEME_CYCLE[nextIndex];
    return nextTheme ? THEME_LABELS[nextTheme] : THEME_LABELS.system;
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleTheme}
          onKeyDown={handleKeyDown}
          aria-label={`Current: ${THEME_LABELS[currentTheme]}. Click to switch to ${getNextThemeLabel()}`}
        >
          {renderIcon()}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{THEME_LABELS[currentTheme]}</p>
      </TooltipContent>
    </Tooltip>
  );
}
