import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@szum-tech/design-system/{components,hooks,contexts}/**/*{js,ts,jsx,tsx}"
  ],
  theme: {},
  presets: [require("@szum-tech/design-system/theme/main-preset")]
};
export default config;
