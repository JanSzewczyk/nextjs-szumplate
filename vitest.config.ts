import tsconfigPaths from "vite-tsconfig-paths";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// Skip environment validation in tests
process.env.SKIP_ENV_VALIDATION = "true";

export default defineConfig({
  test: {
    globals: true,
    reporters: process.env.CI ? ["dot", "github-actions"] : ["tree"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true,
      include: [
        "app/**/*.{js,jsx,ts,tsx}",
        "components/**/*.{js,jsx,ts,tsx}",
        "features/**/*.{js,jsx,ts,tsx}",
        "lib/**/*.{js,ts}",
        "utils/**/*.{js,ts}"
      ],
      exclude: [
        "**/{node_modules,coverage,storybook-static}/**",
        "**/.next/**",
        "**/dist/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/*.d.ts",
        "**/virtual:*",
        "**/__x00__*",
        "**/{karma,rollup,webpack,vite,jest,ava,babel,nyc,cypress,tsup,build,prettier,release,postcss,eslint,playwright,next}.config.*",
        "**/vitest.{workspace,projects,config}.[jt]s?(on)",
        "**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
        "**/*.{types,styles,stories}.?(c|m)[jt]s?(x)",
        "**/env.ts",
        "**/app/{sitemap,robots,icon,manifest}.ts?(x)",
        "**/tests/**",
        "**/test?(s)/**",
        "test?(-*).?(c|m)[jt]s?(x)",
        "**/*{.,-}{test,spec,e2e}?(-d).?(c|m)[jt]s?(x)",
        "**/__tests__/**"
      ]
    },
    projects: [
      // Unit tests project - runs in Node environment
      {
        plugins: [tsconfigPaths()],
        test: {
          name: "unit",
          globals: true,
          include: ["**/*.{test,spec}.{ts,tsx}"],
          environment: "node",
          setupFiles: ["tests/unit/vitest.setup.ts"]
        }
      },
      // Storybook tests project - runs in browser with Playwright
      {
        plugins: [storybookTest()],
        test: {
          name: "storybook",
          exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              {
                browser: "chromium",
                headless: true
              }
            ]
          },
          setupFiles: ["tests/integration/vitest.setup.ts"]
        }
      }
    ]
  }
});
