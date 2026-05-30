import { defineMain } from "@storybook/nextjs-vite/node";
import type { PresetValue, TagsOptions } from "storybook/internal/types";

process.env.STORYBOOK = "true";

const tags: PresetValue<TagsOptions | undefined> = {
  "test-only": {
    excludeFromDocsStories: true,
    excludeFromSidebar: false
  }
};

export default defineMain({
  addons: [
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook-community/storybook-dark-mode",
    "storybook-addon-tag-badges"
  ],
  features: {
    experimentalTestSyntax: true
  },
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  tags,
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript"
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const { fileURLToPath } = await import("url");

    const nextImageMock = fileURLToPath(new URL("./__mocks__/NextImage.tsx", import.meta.url));

    return mergeConfig(config, {
      resolve: {
        alias: {
          "next/image": nextImageMock
        },
        tsconfigPaths: true
      }
    });
  }
});
