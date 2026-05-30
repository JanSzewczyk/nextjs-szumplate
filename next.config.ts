import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import withPlugins from "next-compose-plugins";

import { env } from "./data/env/server";

const config: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      { destination: "/api/health", source: "/healthz" },
      { destination: "/api/health", source: "/api/healthz" },
      { destination: "/api/health", source: "/health" },
      { destination: "/api/health", source: "/ping" }
    ];
  },
  serverExternalPackages: ["pino", "pino-pretty"]
};

export default withPlugins([withBundleAnalyzer({ enabled: env.ANALYZE }), config]);
