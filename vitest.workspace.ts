import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      include: ["**\/*.{test,spec}.ts"],
      name: "unit",
      environment: "node",
      setupFiles: ["test/setup.ts"]
    }
  },
  {
    extends: "vitest.config.ts",
    plugins: [storybookTest()],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        name: "chromium",
        // Make sure to install Playwright
        provider: "playwright",
        headless: true
      },
      setupFiles: [".storybook/vitest.setup.ts"]
    }
  }
]);
