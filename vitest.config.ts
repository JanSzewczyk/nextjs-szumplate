/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // include: ["./app/**/*.test.{ts,tsx}"],
    globals: true,
    environment: "happy-dom",
    // setupFiles: ["./test/setup-test-env.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["./app/**/*.{ts,tsx}"],
      all: true
    }
  }
});
