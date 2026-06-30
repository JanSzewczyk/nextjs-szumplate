import type { NextConfig } from "next";

export default {
  experimental: {
    optimizePackageImports: ["@szum-tech/design-system"]
  },
  logging: {
    browserToTerminal: true
  },
  productionBrowserSourceMaps: true,
  reactCompiler: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      { destination: "/api/health", source: "/healthz" },
      { destination: "/api/health", source: "/api/healthz" },
      { destination: "/api/health", source: "/health" },
      { destination: "/api/health", source: "/ping" }
    ];
  }
} satisfies NextConfig;
