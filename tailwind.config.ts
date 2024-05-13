import { type Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@szum-tech/design-system/dist/*{mjs,js}"
  ],
  theme: {},
  presets: [require("@szum-tech/design-system/theme/main-preset")]
} satisfies Config;
