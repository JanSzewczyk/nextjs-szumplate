import { type NextConfig } from "next";
import withPlugins from "next-compose-plugins";

import withBundleAnalyzer from "@next/bundle-analyzer";

import { env } from "./env";

const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@szum-tech/design-system"],
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
