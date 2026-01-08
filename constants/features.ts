export type FeatureIconName =
  | "RocketIcon"
  | "ServerIcon"
  | "TestTube2Icon"
  | "ShieldCheckIcon"
  | "FileTextIcon"
  | "ActivityIcon"
  | "SearchIcon"
  | "GitBranchIcon"
  | "LayersIcon";

export interface Feature {
  iconName: FeatureIconName;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    iconName: "RocketIcon",
    title: "Next.js 16 Ready",
    description:
      "Built on the latest Next.js with App Router, Server Components, and all modern React 19 features out of the box."
  },
  {
    iconName: "ServerIcon",
    title: "React Server Components",
    description:
      "Full RSC support with App Router architecture. Optimize performance with server-side rendering and streaming."
  },
  {
    iconName: "TestTube2Icon",
    title: "Comprehensive Testing",
    description:
      "Pre-configured with Vitest, Playwright, Testing Library, and Storybook for unit, integration, and E2E testing."
  },
  {
    iconName: "ShieldCheckIcon",
    title: "Enterprise Quality",
    description:
      "ESLint, Prettier, TypeScript strict mode, and Semantic Release ensure code quality and automated versioning."
  },
  {
    iconName: "FileTextIcon",
    title: "Structured Logging",
    description:
      "Pino logger with pretty-print dev mode and production JSON output. Create child loggers with contextual metadata."
  },
  {
    iconName: "ActivityIcon",
    title: "Health Checks",
    description:
      "Kubernetes-ready /api/health endpoint with multiple aliases (/healthz, /ping). Perfect for container orchestration."
  },
  {
    iconName: "SearchIcon",
    title: "SEO Optimized",
    description:
      "Dynamic metadata API, automatic sitemap generation, robots.txt, and web manifest for maximum discoverability."
  },
  {
    iconName: "GitBranchIcon",
    title: "CI/CD Ready",
    description:
      "GitHub Actions workflows for testing, building, and deployment. CodeQL security scanning included out of the box."
  },
  {
    iconName: "LayersIcon",
    title: "Type Safety",
    description:
      "TypeScript strict mode with ts-reset and noUncheckedIndexedAccess. Catch errors at compile time, not runtime."
  }
];

/** All feature titles */
export const FEATURE_TITLES = FEATURES.map((feature) => feature.title);
