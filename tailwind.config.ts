import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@szum-tech/design-system/**/*{mjs,js}"
  ],
  theme: {},
  presets: [require("@szum-tech/design-system/theme/main-preset")]
};
export default config;
