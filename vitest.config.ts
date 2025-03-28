import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

import { env } from "./env";

const reporters = env.CI ? ["dot", "github-actions"] : ["default"];

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    reporters,
    coverage: {
      include: ["**"],
      exclude: [
        "{coverage,storybook-static}/**",
        "dist/**",
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
        "env.ts"
      ],
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true,
      provider: "v8"
    }
  }
});
