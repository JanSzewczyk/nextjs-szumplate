export interface TechItem {
  name: string;
  description: string;
  src: string;
  href: string;
}

export interface TechCategory {
  label: string;
  variant: "primary" | "success" | "warning" | "error" | "outline" | "secondary";
  items: TechItem[];
}

export const TECH_STACK: Record<string, TechCategory> = {
  core: {
    label: "Core Technologies",
    variant: "primary",
    items: [
      {
        name: "Next.js 16",
        description: "The React Framework for Production",
        src: "/next.svg",
        href: "https://nextjs.org"
      },
      {
        name: "TypeScript",
        description: "JavaScript with syntax for types",
        src: "/typescript.svg",
        href: "https://typescriptlang.org"
      },
      {
        name: "Tailwind CSS",
        description: "A utility-first CSS framework",
        src: "/tailwindcss.svg",
        href: "https://tailwindcss.com"
      }
    ]
  },
  testing: {
    label: "Testing Suite",
    variant: "success",
    items: [
      {
        name: "Vitest",
        description: "Blazing fast unit test framework",
        src: "/vitest.svg",
        href: "https://vitest.dev"
      },
      {
        name: "Playwright",
        description: "Reliable end-to-end testing",
        src: "/playwright.svg",
        href: "https://playwright.dev"
      },
      {
        name: "Testing Library",
        description: "Simple and complete testing utilities",
        src: "/testing-library.svg",
        href: "https://testing-library.com"
      },
      {
        name: "Storybook",
        description: "UI component explorer for frontend devs",
        src: "/storybook.svg",
        href: "https://storybook.js.org/"
      }
    ]
  },
  quality: {
    label: "Code Quality",
    variant: "warning",
    items: [
      {
        name: "ESLint",
        description: "Find and fix problems in your code",
        src: "/eslint.svg",
        href: "https://eslint.org"
      },
      {
        name: "Prettier",
        description: "Opinionated code formatter",
        src: "/prettier.svg",
        href: "https://prettier.io"
      },
      {
        name: "Semantic Release",
        description: "Fully automated version management",
        src: "/semantic-release.svg",
        href: "https://semantic-release.gitbook.io/semantic-release"
      }
    ]
  },
  infrastructure: {
    label: "Infrastructure",
    variant: "error",
    items: [
      {
        name: "Pino",
        description: "Fast JSON logger for Node.js",
        src: "/pino.svg",
        href: "https://getpino.io"
      },
      {
        name: "Zod",
        description: "TypeScript-first schema validation",
        src: "/zod.svg",
        href: "https://zod.dev"
      }
    ]
  },
  forms: {
    label: "Forms",
    variant: "outline",
    items: [
      {
        name: "React Hook Form",
        description: "Performant form management",
        src: "/react-hook-form.svg",
        href: "https://react-hook-form.com"
      }
    ]
  },
  cicd: {
    label: "CI/CD",
    variant: "secondary",
    items: [
      {
        name: "GitHub Actions",
        description: "Automated workflows",
        src: "/github-actions.svg",
        href: "https://github.com/features/actions"
      }
    ]
  },
  config: {
    label: "Configuration",
    variant: "secondary",
    items: [
      {
        name: "T3 Env",
        description: "Type-safe environment variables",
        src: "/t3.svg",
        href: "https://env.t3.gg/"
      }
    ]
  }
};

/** All tech stack category labels */
export const TECH_STACK_CATEGORIES = Object.values(TECH_STACK).map((category) => category.label);

/** All tech stack items flattened */
export const TECH_STACK_ITEMS = Object.values(TECH_STACK).flatMap((category) => category.items);

/** Total count of all technologies */
export const TECH_STACK_COUNT = TECH_STACK_ITEMS.length;
