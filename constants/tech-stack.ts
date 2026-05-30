export interface TechItem {
  description: string;
  href: string;
  name: string;
  src: string;
}

export interface TechCategory {
  items: Array<TechItem>;
  label: string;
  variant: "primary" | "success" | "warning" | "error" | "outline" | "secondary";
}

export const TECH_STACK: Record<string, TechCategory> = {
  cicd: {
    items: [
      {
        description: "Automated workflows",
        href: "https://github.com/features/actions",
        name: "GitHub Actions",
        src: "/github-actions.svg"
      }
    ],
    label: "CI/CD",
    variant: "secondary"
  },
  config: {
    items: [
      {
        description: "Type-safe environment variables",
        href: "https://env.t3.gg/",
        name: "T3 Env",
        src: "/t3.svg"
      }
    ],
    label: "Configuration",
    variant: "secondary"
  },
  core: {
    items: [
      {
        description: "The React Framework for Production",
        href: "https://nextjs.org",
        name: "Next.js 16",
        src: "/next.svg"
      },
      {
        description: "JavaScript with syntax for types",
        href: "https://typescriptlang.org",
        name: "TypeScript",
        src: "/typescript.svg"
      },
      {
        description: "A utility-first CSS framework",
        href: "https://tailwindcss.com",
        name: "Tailwind CSS",
        src: "/tailwindcss.svg"
      }
    ],
    label: "Core Technologies",
    variant: "primary"
  },
  forms: {
    items: [
      {
        description: "Performant form management",
        href: "https://react-hook-form.com",
        name: "React Hook Form",
        src: "/react-hook-form.svg"
      }
    ],
    label: "Forms",
    variant: "outline"
  },
  infrastructure: {
    items: [
      {
        description: "Fast JSON logger for Node.js",
        href: "https://getpino.io",
        name: "Pino",
        src: "/pino.svg"
      },
      {
        description: "TypeScript-first schema validation",
        href: "https://zod.dev",
        name: "Zod",
        src: "/zod.svg"
      }
    ],
    label: "Infrastructure",
    variant: "error"
  },
  quality: {
    items: [
      {
        description: "Find and fix problems in your code",
        href: "https://eslint.org",
        name: "ESLint",
        src: "/eslint.svg"
      },
      {
        description: "Opinionated code formatter",
        href: "https://prettier.io",
        name: "Prettier",
        src: "/prettier.svg"
      },
      {
        description: "Fully automated version management",
        href: "https://semantic-release.gitbook.io/semantic-release",
        name: "Semantic Release",
        src: "/semantic-release.svg"
      }
    ],
    label: "Code Quality",
    variant: "warning"
  },
  testing: {
    items: [
      {
        description: "Blazing fast unit test framework",
        href: "https://vitest.dev",
        name: "Vitest",
        src: "/vitest.svg"
      },
      {
        description: "Reliable end-to-end testing",
        href: "https://playwright.dev",
        name: "Playwright",
        src: "/playwright.svg"
      },
      {
        description: "Simple and complete testing utilities",
        href: "https://testing-library.com",
        name: "Testing Library",
        src: "/testing-library.svg"
      },
      {
        description: "UI component explorer for frontend devs",
        href: "https://storybook.js.org/",
        name: "Storybook",
        src: "/storybook.svg"
      }
    ],
    label: "Testing Suite",
    variant: "success"
  }
};

/** All tech stack category labels */
export const TECH_STACK_CATEGORIES = Object.values(TECH_STACK).map((category) => category.label);

/** All tech stack items flattened */
export const TECH_STACK_ITEMS = Object.values(TECH_STACK).flatMap((category) => category.items);

/** Total count of all technologies */
export const TECH_STACK_COUNT = TECH_STACK_ITEMS.length;
