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
  description: string;
  iconName: FeatureIconName;
  title: string;
}

export const FEATURES: Array<Feature> = [
  {
    description:
      "Built on the latest Next.js with App Router, Server Components, and all modern React 19 features out of the box.",
    iconName: "RocketIcon",
    title: "Next.js 16 Ready"
  },
  {
    description:
      "Full RSC support with App Router architecture. Optimize performance with server-side rendering and streaming.",
    iconName: "ServerIcon",
    title: "React Server Components"
  },
  {
    description:
      "Pre-configured with Vitest, Playwright, Testing Library, and Storybook for unit, integration, and E2E testing.",
    iconName: "TestTube2Icon",
    title: "Comprehensive Testing"
  },
  {
    description:
      "ESLint, Prettier, TypeScript strict mode, and Semantic Release ensure code quality and automated versioning.",
    iconName: "ShieldCheckIcon",
    title: "Enterprise Quality"
  },
  {
    description:
      "Pino logger with pretty-print dev mode and production JSON output. Create child loggers with contextual metadata.",
    iconName: "FileTextIcon",
    title: "Structured Logging"
  },
  {
    description:
      "Kubernetes-ready /api/health endpoint with multiple aliases (/healthz, /ping). Perfect for container orchestration.",
    iconName: "ActivityIcon",
    title: "Health Checks"
  },
  {
    description:
      "Dynamic metadata API, automatic sitemap generation, robots.txt, and web manifest for maximum discoverability.",
    iconName: "SearchIcon",
    title: "SEO Optimized"
  },
  {
    description:
      "GitHub Actions workflows for testing, building, and deployment. CodeQL security scanning included out of the box.",
    iconName: "GitBranchIcon",
    title: "CI/CD Ready"
  },
  {
    description:
      "TypeScript strict mode with ts-reset and noUncheckedIndexedAccess. Catch errors at compile time, not runtime.",
    iconName: "LayersIcon",
    title: "Type Safety"
  }
];

/** All feature titles */
export const FEATURE_TITLES = FEATURES.map((feature) => feature.title);
