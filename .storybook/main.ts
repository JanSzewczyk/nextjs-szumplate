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
    reactDocgen: "react-docgen"
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const { fileURLToPath } = await import("url");

    const nextImageMock = fileURLToPath(new URL("./__mocks__/NextImage.tsx", import.meta.url));

    /**
     * Next.js >= 16.4 reads `LayoutRouterContext.parentRenderTree.data.bfcacheId` in `useRouter()`, but
     * `@storybook/nextjs-vite` (<= 10.6.2) only provides `parentTree`. Remove once Storybook ships support.
     */
    const layoutRouterCompat = {
      enforce: "pre" as const,
      name: "layout-router-parent-render-tree-compat",
      transform(code: string, id: string) {
        if (!id.includes("nextjs-vite") || !code.includes("parentTree: tree,")) {
          return null;
        }
        return code.replace("parentTree: tree,", "parentTree: tree, parentRenderTree: { data: { bfcacheId: 0 } },");
      }
    };

    return mergeConfig(config, {
      plugins: [layoutRouterCompat],
      resolve: {
        alias: {
          "next/image": nextImageMock
        },
        tsconfigPaths: true
      }
    });
  }
});
