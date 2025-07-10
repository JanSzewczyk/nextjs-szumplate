import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";

import { env } from "./data/env/server";

const reporters = env.CI ? ["dot", "github-actions"] : ["default"];

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    reporters,
    exclude: [
      "**\/node_modules/**",
      "**\/dist/**",
      "**\/cypress/**",
      "**\/.{idea,git,cache,output,temp}/**",
      "**\/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"
    ],
    coverage: {
      include: ["**"],
      exclude: [
        "**\/{node_modules,coverage,storybook-static}/**",
        "**\/dist/**",
        "**\/[.]**",
        "packages/*\/test?(s)/**",
        "**\/*.d.ts",
        "**\/virtual:*",
        "**\/__x00__*",
        "**\/\x00*",
        "cypress/**",
        "**\/test?(s)/**",
        "test?(-*).?(c|m)[jt]s?(x)",
        "**\/*{.,-}{test,spec,e2e}?(-d).?(c|m)[jt]s?(x)",
        "**\/__tests__/**",
        "**\/{karma,rollup,webpack,vite,jest,ava,babel,nyc,cypress,tsup,build,prettier,release,postcss,eslint,playwright,next}.config.*",
        "**\/vitest.{workspace,projects,config}.[jt]s?(on)",
        "**\/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
        "**\/*.{types,styles,stories}.?(c|m)[jt]s?(x)",
        "env.ts",
        "**\/app\/{sitemap,robots,icon,manifest}.ts?(x)"
      ],
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true,
      provider: "v8"
    },
    projects: [
      {
        extends: "vitest.config.ts",
        test: {
          include: ["**\/*.{test,spec}.ts"],
          name: "unit",
          environment: "node",
          setupFiles: ["tests/unit/vitest.setup.ts"]
        }
      },
      {
        extends: "vitest.config.ts",
        plugins: [storybookTest()],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium", headless: true }]
          },
          setupFiles: ["tests/integration/vitest.setup.ts"]
        }
      }
    ]
  }
});
