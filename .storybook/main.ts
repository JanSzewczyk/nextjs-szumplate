import tsConfigPaths from "vite-tsconfig-paths";

import { type StorybookConfig } from "@storybook/nextjs-vite";

export default {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs"
  ],
  framework:  "@storybook/nextjs-vite",
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
