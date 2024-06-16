import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import { env } from "./env";

const reporters = env.CI ? ["json", "github-actions"] : ["text", "json", "html"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
    reporters: reporters,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true
    }
  }
});
