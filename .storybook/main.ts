import { type StorybookConfig } from "@storybook/experimental-nextjs-vite";

export default {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {}
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true
  },
  staticDirs: ["../public"]
} satisfies StorybookConfig;
