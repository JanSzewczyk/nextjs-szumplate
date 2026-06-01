import { create } from "storybook/theming";

export default create({
  // --background: oklch(0.147 0.004 49.25)
  appBg: "#201c15",
  // --border: oklch(1 0 0 / 10%)
  appBorderColor: "rgba(255, 255, 255, 0.1)",
  // --radius: 0.25rem = 4px
  appBorderRadius: 4,
  // --card: oklch(0.216 0.006 56.043)
  appContentBg: "#2e2921",

  // --background
  barBg: "#201c15",
  // --chart-2 (brighter than primary for visibility on dark bg)
  barSelectedColor: "#3b82f6",
  // --muted-foreground: oklch(0.709 0.01 56.259)
  barTextColor: "#a49e93",
  base: "dark",

  brandTitle: "Szum-Tech Design System",

  // --primary: oklch(0.424 0.199 265.638) ≈ blue-800
  // --chart-2: oklch(0.623 0.214 259.815) ≈ blue-500 (jaśniejszy dla widoczności)
  colorPrimary: "#1e40af",
  colorSecondary: "#3b82f6",

  // Typography
  fontBase: "'Poppins', sans-serif",
  fontCode: "'JetBrains Mono', monospace",

  // --foreground: oklch(0.985 0.001 106.423)
  textColor: "#f8f7f2"
});
