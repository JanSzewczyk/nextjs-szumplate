import tsConfigPaths from "vite-tsconfig-paths";

import { type StorybookConfig } from "@storybook/nextjs-vite";
import { type PresetValue, type TagsOptions } from "storybook/internal/types";

process.env.STORYBOOK = "true";

const tags: PresetValue<TagsOptions | undefined> = {
  "test-only": {
    excludeFromDocsStories: true,
    excludeFromSidebar: false
  }
};

export default {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/nextjs-vite",
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true
  },
  tags,
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      plugins: [tsConfigPaths()],
      assetsInclude: ["**/*.md"]
    });
  }
} satisfies StorybookConfig;
