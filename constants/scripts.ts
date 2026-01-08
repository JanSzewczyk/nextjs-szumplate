export interface Script {
  command: string;
  description: string;
}

export const SCRIPTS: Script[] = [
  {
    command: "npm run dev",
    description: "Start development server with Turbopack"
  },
  {
    command: "npm run build",
    description: "Create production build"
  },
  {
    command: "npm run test",
    description: "Run all Vitest tests"
  },
  {
    command: "npm run test:e2e",
    description: "Run Playwright E2E tests"
  },
  {
    command: "npm run lint",
    description: "ESLint code check"
  },
  {
    command: "npm run storybook:dev",
    description: "Component development environment"
  }
];
