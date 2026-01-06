import {
  ActivityIcon,
  BookOpenIcon,
  CodeIcon,
  FileTextIcon,
  GitBranchIcon,
  LayersIcon,
  RocketIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TerminalIcon,
  TestTube2Icon
} from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Header,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@szum-tech/design-system";
import Image from "next/image";
import { GitHubIcon } from "~/components/ui/icons/git-hub";
import logger from "~/lib/logger";

const TECH_STACK = {
  core: {
    label: "Core Technologies",
    variant: "primary" as const,
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
    variant: "success" as const,
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
    variant: "warning" as const,
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
    variant: "error" as const,
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
    variant: "outline" as const,
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
    variant: "secondary" as const,
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
    variant: "secondary" as const,
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

const FEATURES = [
  {
    icon: RocketIcon,
    title: "Next.js 16 Ready",
    description:
      "Built on the latest Next.js with App Router, Server Components, and all modern React 19 features out of the box."
  },
  {
    icon: ServerIcon,
    title: "React Server Components",
    description:
      "Full RSC support with App Router architecture. Optimize performance with server-side rendering and streaming."
  },
  {
    icon: TestTube2Icon,
    title: "Comprehensive Testing",
    description:
      "Pre-configured with Vitest, Playwright, Testing Library, and Storybook for unit, integration, and E2E testing."
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Quality",
    description:
      "ESLint, Prettier, TypeScript strict mode, and Semantic Release ensure code quality and automated versioning."
  },
  {
    icon: FileTextIcon,
    title: "Structured Logging",
    description:
      "Pino logger with pretty-print dev mode and production JSON output. Create child loggers with contextual metadata."
  },
  {
    icon: ActivityIcon,
    title: "Health Checks",
    description:
      "Kubernetes-ready /api/health endpoint with multiple aliases (/healthz, /ping). Perfect for container orchestration."
  },
  {
    icon: SearchIcon,
    title: "SEO Optimized",
    description:
      "Dynamic metadata API, automatic sitemap generation, robots.txt, and web manifest for maximum discoverability."
  },
  {
    icon: GitBranchIcon,
    title: "CI/CD Ready",
    description:
      "GitHub Actions workflows for testing, building, and deployment. CodeQL security scanning included out of the box."
  },
  {
    icon: LayersIcon,
    title: "Type Safety",
    description:
      "TypeScript strict mode with ts-reset and noUncheckedIndexedAccess. Catch errors at compile time, not runtime."
  }
];

const QUICK_START_STEPS = [
  {
    step: 1,
    title: "Use Template",
    description: "Create a new repository from this template",
    command: "gh repo create my-app --template JanSzewczyk/nextjs-szumplate"
  },
  {
    step: 2,
    title: "Install Dependencies",
    description: "Install all required packages",
    command: "npm install"
  },
  {
    step: 3,
    title: "Start Development",
    description: "Launch the development server",
    command: "npm run dev"
  }
];

const SCRIPTS = [
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

export default function Home() {
  logger.info("Home page loaded");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-primary size-5" />
            <span className="text-body-sm font-semibold">Szum-Tech</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" startIcon={<BookOpenIcon />}>
              <a
                target="_blank"
                href="https://szum-tech-design-system.vercel.app/"
                rel="noreferrer"
                aria-label="View Storybook documentation"
              >
                Docs
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" endIcon={<GitHubIcon />}>
              <a
                target="_blank"
                href="https://github.com/JanSzewczyk/nextjs-szumplate"
                rel="noreferrer"
                aria-label="View GitHub repository"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </Header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="container py-16 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Badge variant="outline" className="mb-4">
              Next.js 16 &bull; React 19 &bull; TypeScript &bull; RSC
            </Badge>
            <h1 className="text-display-lg mb-6">
              <span className="text-primary">Szum-Tech</span> Next.js Template
            </h1>
            <p className="text-lead mb-8 max-w-2xl">
              Enterprise-ready Next.js starter template with TypeScript, Tailwind CSS, comprehensive testing
              infrastructure, and the Szum-Tech Design System built-in.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" startIcon={<RocketIcon />}>
                <a href="https://github.com/JanSzewczyk/nextjs-szumplate/generate" target="_blank" rel="noreferrer">
                  Use This Template
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" endIcon={<GitHubIcon />}>
                <a href="https://github.com/JanSzewczyk/nextjs-szumplate" target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Features Section */}
        <section id="features" className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-heading-h2 mb-4">Why Choose This Template?</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Everything you need to build production-ready applications, pre-configured and ready to go.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <Card key={feature.title} className="bg-card transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="bg-primary/10 mb-4 flex size-12 items-center justify-center rounded-lg">
                      <feature.icon className="text-primary size-6" />
                    </div>
                    <CardTitle className="text-heading-h3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-body-default">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-heading-h2 mb-4">Tech Stack</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Carefully selected technologies for modern web development, all working together seamlessly.
              </p>
            </div>

            <div className="space-y-12">
              {Object.entries(TECH_STACK).map(([key, category]) => (
                <div key={key}>
                  <div className="mb-6 flex items-center gap-3">
                    <Badge variant={category.variant}>{category.label}</Badge>
                    <Separator className="flex-1" />
                  </div>
                  <ul className="flex flex-wrap justify-center gap-4 md:justify-start">
                    {category.items.map((tech) => (
                      <li key={tech.href}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={tech.href}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-card hover:border-primary/50 hover:bg-accent flex h-20 w-36 items-center justify-center rounded border transition-all hover:shadow-md focus:ring focus:outline-none"
                              aria-label={`Learn more about ${tech.name}`}
                            >
                              <Image
                                className="p-3 grayscale transition-all hover:grayscale-0"
                                width={120}
                                height={60}
                                src={tech.src}
                                alt={tech.name}
                              />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {tech.name} - {tech.description}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Quick Start Section */}
        <section id="quick-start" className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-heading-h2 mb-4">Quick Start</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Get up and running in minutes with these simple steps.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {QUICK_START_STEPS.map((item) => (
                <Card key={item.step} className="bg-card relative overflow-hidden">
                  <div className="text-primary/10 absolute -top-4 -left-2 text-8xl font-bold">{item.step}</div>
                  <CardHeader className="relative">
                    <CardTitle className="text-heading-h3 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-bold">
                        {item.step}
                      </span>
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="bg-muted rounded-lg p-3">
                      <code className="text-body-sm font-mono break-all">{item.command}</code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Built-in Scripts Section */}
        <section id="scripts" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-heading-h2 mb-4">Built-in Scripts</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                All the npm scripts you need for development, testing, and deployment.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SCRIPTS.map((script) => (
                <Card key={script.command} className="bg-card group transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <TerminalIcon className="text-primary size-4" />
                      <code className="text-code">{script.command}</code>
                    </div>
                    <p className="text-mute text-body-sm">{script.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-body-sm">
                See all available scripts in <code className="text-code">package.json</code>
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section id="cta" className="bg-primary/5 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <SparklesIcon className="text-primary mb-6 size-12" />
              <h2 className="text-heading-h2 mb-4">Ready to Build Something Amazing?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl">
                Start your next project with the Szum-Tech template and focus on what matters most - building great
                features.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" startIcon={<RocketIcon className="size-4" />}>
                  <a href="https://github.com/JanSzewczyk/nextjs-szumplate/generate" target="_blank" rel="noreferrer">
                    Use This Template
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" startIcon={<CodeIcon className="size-4" />}>
                  <a href="https://github.com/JanSzewczyk/nextjs-szumplate" target="_blank" rel="noreferrer">
                    Explore the Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-border/40 border-t py-8">
        <div className="container flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-primary size-5" />
            <span className="text-body-default font-semibold">Szum-Tech Next.js Template</span>
          </div>
          <div className="text-body-sm flex items-center gap-3">
            <span className="text-muted-foreground">{new Date().getFullYear()}</span>
            <span className="text-muted-foreground/40">|</span>
            <a
              href="https://github.com/JanSzewczyk"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Jan Szewczyk
            </a>
            <span className="text-muted-foreground/40">|</span>
            <a
              href="https://github.com/JanSzewczyk/nextjs-szumplate"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            >
              <GitHubIcon className="size-3.5" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
