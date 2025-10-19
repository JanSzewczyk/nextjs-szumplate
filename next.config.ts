import { type NextConfig } from "next";
import withPlugins from "next-compose-plugins";

import withBundleAnalyzer from "@next/bundle-analyzer";

import { env } from "./data/env/server";

const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["pino", "pino-pretty"],
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"]
  },
  async rewrites() {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" }
    ];
  }
};

export default withPlugins([withBundleAnalyzer({ enabled: env.ANALYZE }), config]);
