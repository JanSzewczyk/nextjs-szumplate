import {
  type LucideIcon,
  ActivityIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitBranchIcon,
  LayersIcon,
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
import { GithubIcon } from "~/components/ui/icons/github";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import {
  type FeatureIconName,
  type SzumTechIconName,
  FEATURES,
  QUICK_START_STEPS,
  SCRIPTS,
  SZUM_TECH_PACKAGES,
  TECH_STACK
} from "~/constants";

const FEATURE_ICONS: Record<FeatureIconName, LucideIcon> = {
  RocketIcon,
  ServerIcon,
  TestTube2Icon,
  ShieldCheckIcon,
  FileTextIcon,
  ActivityIcon,
  SearchIcon,
  GitBranchIcon,
  LayersIcon
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
      {/* Header */}
      <Header>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-primary size-5" />
            <span className="text-body-sm font-semibold">Szum-Tech</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" endIcon={<GithubIcon />}>
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
              <Button asChild variant="outline" size="lg" endIcon={<GithubIcon />}>
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
              {FEATURES.map((feature) => {
                const Icon = FEATURE_ICONS[feature.iconName];
                return (
                  <Card key={feature.title} className="bg-card transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="bg-primary/10 mb-4 flex size-12 items-center justify-center rounded-lg">
                        <Icon className="text-primary size-6" />
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
        <section id="ecosystem" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <Badge variant="primary" className="mb-4">
                Open Source
              </Badge>
              <h2 className="text-heading-h2 mb-4">Szum-Tech Ecosystem</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                This template is powered by a suite of open-source packages designed to accelerate development and
                maintain consistency across projects.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SZUM_TECH_PACKAGES.map((pkg) => {
                const Icon = SZUM_TECH_ICONS[pkg.iconName];
                return (
                  <Card key={pkg.packageName} className="group relative overflow-hidden transition-all hover:shadow">
                    <div className="from-primary/5 via-primary/2 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <CardHeader className="relative">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
                          <Icon className="text-primary size-6" />
                        </div>
                        <div className="flex gap-2">
                          {pkg.docsUrl && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button asChild variant="ghost" size="sm">
                                  <a
                                    href={pkg.docsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`View documentation for ${pkg.name}`}
                                  >
                                    <ExternalLinkIcon className="size-4" />
                                  </a>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Documentation</TooltipContent>
                            </Tooltip>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button asChild variant="ghost" size="sm">
                                <a
                                  href={pkg.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={`View ${pkg.name} on GitHub`}
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
                      <CardDescription className="text-body-default mb-4">{pkg.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
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
              <p className="text-muted-foreground text-body-sm mb-4">
                All packages are maintained by Szum-Tech and follow semantic versioning.
              </p>
              <Button asChild variant="outline" size="sm" endIcon={<GithubIcon className="size-4" />}>
                <a href="https://github.com/JanSzewczyk" target="_blank" rel="noreferrer">
                  Explore All Packages
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Tech Stack Section */}
        <section id="tech-stack" className="bg-muted/50 py-16 md:py-24">
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
        <section id="quick-start" className="py-16 md:py-24">
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
        <section id="scripts" className="bg-muted/50 py-16 md:py-24">
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
                    <p className="text-mute">{script.description}</p>
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
              <GithubIcon className="size-3.5" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
