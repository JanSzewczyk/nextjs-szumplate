import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import { env } from "./env";

const reporter = env.CI ? ["json", "github-actions"] : ["text", "json", "html"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
    coverage: {
      provider: "v8",
      reporter,
      all: true
    }
  }
});
