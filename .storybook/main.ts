import tsConfigPaths from "vite-tsconfig-paths";

import { type StorybookConfig } from "@storybook/experimental-nextjs-vite";

export default {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
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
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      optimizeDeps: {
        include: ["sb-original/default-loader", "sb-original/image-context"]
      },
      plugins: [tsConfigPaths()],
      assetsInclude: ["**/*.md"]
    });
  }
} satisfies StorybookConfig;
