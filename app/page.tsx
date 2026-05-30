"use client";

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
import {
  ActivityIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitBranchIcon,
  LayersIcon,
  type LucideIcon,
  PaletteIcon,
  RocketIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TagIcon,
  TerminalIcon,
  TestTube2Icon
} from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "~/components/ui/icons/github";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import {
  FEATURES,
  type FeatureIconName,
  QUICK_START_STEPS,
  SCRIPTS,
  SZUM_TECH_PACKAGES,
  type SzumTechIconName,
  TECH_STACK
} from "~/constants";

const FEATURE_ICONS: Record<FeatureIconName, LucideIcon> = {
  ActivityIcon,
  FileTextIcon,
  GitBranchIcon,
  LayersIcon,
  RocketIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  TestTube2Icon
};

const SZUM_TECH_ICONS: Record<SzumTechIconName, LucideIcon> = {
  PaletteIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TagIcon
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to main content link for keyboard users */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
        href="#main-content"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="size-5 text-primary" />
            <span className="font-semibold text-body-sm">Szum-Tech</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild endIcon={<GithubIcon />} size="sm" variant="outline">
              <a
                aria-label="View GitHub repository (opens in new tab)"
                href="https://github.com/JanSzewczyk/nextjs-szumplate"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </Header>

      <main className="flex-1" id="main-content">
        {/* Hero Section */}
        <section className="container py-16 md:py-24 lg:py-32" id="hero">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Next.js 16 &bull; React 19 &bull; TypeScript &bull; RSC
            </Badge>
            <h1 className="mb-6 text-display-lg">
              <span className="text-primary">Szum-Tech</span> Next.js Template
            </h1>
            <p className="mb-8 max-w-2xl text-lead">
              Enterprise-ready Next.js starter template with TypeScript, Tailwind CSS, comprehensive testing
              infrastructure, and the Szum-Tech Design System built-in.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" startIcon={<RocketIcon />}>
                <a
                  aria-label="Use this template (opens in new tab)"
                  href="https://github.com/JanSzewczyk/nextjs-szumplate/generate"
                  rel="noreferrer"
                  target="_blank"
                >
                  Use This Template
                </a>
              </Button>
              <Button asChild endIcon={<GithubIcon />} size="lg" variant="outline">
                <a
                  aria-label="View on GitHub (opens in new tab)"
                  href="https://github.com/JanSzewczyk/nextjs-szumplate"
                  rel="noreferrer"
                  target="_blank"
                >
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Features Section */}
        <section className="bg-muted/50 py-16 md:py-24" id="features">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-heading-h2">Why Choose This Template?</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Everything you need to build production-ready applications, pre-configured and ready to go.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = FEATURE_ICONS[feature.iconName];
                return (
                  <Card className="bg-card transition-shadow hover:shadow-lg" key={feature.title}>
                    <CardHeader>
                      <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <CardTitle className="text-heading-h3">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-body-default">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <Separator />

        {/* Szum-Tech Ecosystem Section */}
        <section className="py-16 md:py-24" id="ecosystem">
          <div className="container">
            <div className="mb-12 text-center">
              <Badge className="mb-4" variant="primary">
                Open Source
              </Badge>
              <h2 className="mb-4 text-heading-h2">Szum-Tech Ecosystem</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                This template is powered by a suite of open-source packages designed to accelerate development and
                maintain consistency across projects.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SZUM_TECH_PACKAGES.map((pkg) => {
                const Icon = SZUM_TECH_ICONS[pkg.iconName];
                return (
                  <Card className="group relative overflow-hidden transition-all hover:shadow" key={pkg.packageName}>
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <CardHeader className="relative">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="size-6 text-primary" />
                        </div>
                        <div className="flex gap-2">
                          {pkg.docsUrl && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button asChild size="sm" variant="ghost">
                                  <a
                                    aria-label={`View documentation for ${pkg.name} (opens in new tab)`}
                                    href={pkg.docsUrl}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <ExternalLinkIcon aria-hidden="true" className="size-4" />
                                  </a>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Documentation</TooltipContent>
                            </Tooltip>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button asChild size="sm" variant="ghost">
                                <a
                                  aria-label={`View ${pkg.name} on GitHub (opens in new tab)`}
                                  href={pkg.githubUrl}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  <GithubIcon className="size-4" />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>GitHub Repository</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <CardTitle className="text-heading-h3">{pkg.name}</CardTitle>
                      <code className="text-code text-primary/80 text-sm">{pkg.packageName}</code>
                    </CardHeader>
                    <CardContent className="relative">
                      <CardDescription className="mb-4 text-body-default">{pkg.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.map((feature) => (
                          <Badge className="text-xs" key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <p className="mb-4 text-body-sm text-muted-foreground">
                All packages are maintained by Szum-Tech and follow semantic versioning.
              </p>
              <Button asChild endIcon={<GithubIcon className="size-4" />} size="sm" variant="outline">
                <a
                  aria-label="Explore all packages (opens in new tab)"
                  href="https://github.com/JanSzewczyk"
                  rel="noreferrer"
                  target="_blank"
                >
                  Explore All Packages
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Tech Stack Section */}
        <section className="bg-muted/50 py-16 md:py-24" id="tech-stack">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-heading-h2">Tech Stack</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
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
                              aria-label={`Learn more about ${tech.name} (opens in new tab)`}
                              className="flex h-20 w-36 items-center justify-center rounded border bg-card transition-all hover:border-primary/50 hover:bg-accent hover:shadow-md focus:outline-none focus:ring"
                              href={tech.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <Image
                                alt={`${tech.name} logo`}
                                className="p-3 grayscale transition-all hover:grayscale-0"
                                height={60}
                                src={tech.src}
                                width={120}
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
        <section className="py-16 md:py-24" id="quick-start">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-heading-h2">Quick Start</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Get up and running in minutes with these simple steps.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {QUICK_START_STEPS.map((item) => (
                <Card className="relative overflow-hidden bg-card" key={item.step}>
                  <div className="absolute -top-4 -left-2 font-bold text-8xl text-primary/10">{item.step}</div>
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2 text-heading-h3">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                        {item.step}
                      </span>
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="rounded-lg bg-muted p-3">
                      <code className="break-all font-mono text-body-sm">{item.command}</code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Built-in Scripts Section */}
        <section className="bg-muted/50 py-16 md:py-24" id="scripts">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-heading-h2">Built-in Scripts</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                All the npm scripts you need for development, testing, and deployment.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SCRIPTS.map((script) => (
                <Card className="group bg-card transition-shadow hover:shadow-md" key={script.command}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <TerminalIcon className="size-4 text-primary" />
                      <code className="text-code">{script.command}</code>
                    </div>
                    <p className="text-mute">{script.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-body-sm text-muted-foreground">
                See all available scripts in <code className="text-code">package.json</code>
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 md:py-24" id="cta">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <SparklesIcon className="mb-6 size-12 text-primary" />
              <h2 className="mb-4 text-heading-h2">Ready to Build Something Amazing?</h2>
              <p className="mb-8 max-w-xl text-muted-foreground">
                Start your next project with the Szum-Tech template and focus on what matters most - building great
                features.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" startIcon={<RocketIcon className="size-4" />}>
                  <a
                    aria-label="Use this template (opens in new tab)"
                    href="https://github.com/JanSzewczyk/nextjs-szumplate/generate"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Use This Template
                  </a>
                </Button>
                <Button asChild size="lg" startIcon={<CodeIcon className="size-4" />} variant="outline">
                  <a
                    aria-label="Explore the code (opens in new tab)"
                    href="https://github.com/JanSzewczyk/nextjs-szumplate"
                    rel="noreferrer"
                    target="_blank"
                  >
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
            <SparklesIcon className="size-5 text-primary" />
            <span className="font-semibold text-body-default">Szum-Tech Next.js Template</span>
          </div>
          <div className="flex items-center gap-3 text-body-sm">
            <span className="text-muted-foreground">{new Date().getFullYear()}</span>
            <span className="text-muted-foreground/40">|</span>
            <a
              aria-label="Visit Jan Szewczyk's GitHub profile (opens in new tab)"
              className="text-muted-foreground transition-colors hover:text-primary"
              href="https://github.com/JanSzewczyk"
              rel="noreferrer"
              target="_blank"
            >
              Jan Szewczyk
            </a>
            <span className="text-muted-foreground/40">|</span>
            <a
              aria-label="View source code on GitHub (opens in new tab)"
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              href="https://github.com/JanSzewczyk/nextjs-szumplate"
              rel="noreferrer"
              target="_blank"
            >
              <GithubIcon className="size-3.5" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
