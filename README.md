<div align="center">

# 🚀 Next.js Szumplate

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_source=github&utm_campaign=nextjs-szumplate)
[![GitHub stars](https://img.shields.io/github/stars/JanSzewczyk/nextjs-szumplate?style=social)](https://github.com/JanSzewczyk/nextjs-szumplate/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/JanSzewczyk/nextjs-szumplate/actions/workflows/pr-check.yml/badge.svg)](https://github.com/JanSzewczyk/nextjs-szumplate/actions/workflows/pr-check.yml)

**An enterprise-ready Next.js template that accelerates your development workflow**

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-table-of-contents) •
[Deployment](#-deployment)

</div>

---

## 👋 Hello there!

This is **Next.js Szumplate**, an open-source template for enterprise projects! It is packed with features that will
help you create an efficient, maintainable, and enjoyable application. This template will save you a lot of time, so sit
back, relax, and get ready to conquer the whole world with your new awesome app!

## ✨ Features

### 🏗️ Core Technologies

- [![Next.js](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/next?logo=nextdotjs&logoColor=white&label=Next.js)](https://nextjs.org/)
  — App Router, Server Components, Server Actions, and Turbopack for fast builds
- [![React](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/react?logo=react&logoColor=white&label=React)](https://react.dev/)
  — React 19 with React Compiler for automatic memoization without manual optimization
- [![TypeScript](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/typescript?logo=typescript&logoColor=white&label=TypeScript)](https://www.typescriptlang.org/)
  — Strict mode with `ts-reset` library for ultimate type safety
- [![Tailwind CSS](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/tailwindcss?logo=tailwindcss&logoColor=white&label=Tailwind%20CSS)](https://tailwindcss.com/)
  — CSS-first configuration with design tokens and utility-first styling
- [![Design System](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/@szum-tech/design-system?label=Design%20System)](https://szum-tech-design-system.vercel.app/)
  — Pre-built accessible components and design tokens from Szum-Tech
- [![Zod](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/zod?logo=zod&logoColor=white&label=Zod)](https://zod.dev/)
  — TypeScript-first schema validation
- [![React Hook Form](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/react-hook-form?label=React%20Hook%20Form)](https://react-hook-form.com/)
  — Performant forms with easy validation
- **🎯 Absolute imports** — `~/` path alias for clean, spaghetti-free imports

### 🧪 Testing & Quality

- [![Vitest](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/vitest?logo=vitest&logoColor=white&label=Vitest)](https://vitest.dev/)
  — Rock-solid, high-speed unit and integration tests with browser mode
- [![React Testing Library](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/@testing-library/react?label=React%20Testing%20Library)](https://testing-library.com/react)
  — Component testing with accessibility-first queries
- [![Playwright](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/@playwright/test?logo=playwright&logoColor=white&label=Playwright)](https://playwright.dev/)
  — End-to-end tests with cross-browser support and Playwright UI
- [![Storybook](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/storybook?logo=storybook&logoColor=white&label=Storybook)](https://storybook.js.org/)
  — Component development, documentation, and interaction testing
- [![Biome](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/@biomejs/biome?logo=biome&logoColor=white&label=Biome)](https://biomejs.dev/)
  — All-in-one linter and formatter replacing ESLint + Prettier

### 🤖 Automation & DevOps

- [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
  — Pre-configured CI/CD workflows (PR checks, CodeQL, semantic releases)
- [![Semantic Release](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/dev/semantic-release?label=Semantic%20Release)](https://github.com/semantic-release/semantic-release)
  — Automated versioning and CHANGELOG generation via Conventional Commits
- [![Dependabot](https://img.shields.io/badge/Dependabot-025E8C?logo=dependabot&logoColor=white)](https://github.com/dependabot)
  — Automated dependency security updates

### 🔧 Developer Experience

- [![T3 Env](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/@t3-oss/env-nextjs?label=T3%20Env)](https://env.t3.gg/)
  — Type-safe environment variable management with build-time validation
- [![Bundle Analyzer](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/@next/bundle-analyzer?label=Bundle%20Analyzer)](https://www.npmjs.com/package/@next/bundle-analyzer)
  — Bundle size analysis for Client, Server, and Edge environments
- [![Pino](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/pino?label=Pino)](https://getpino.io/)
  — High-performance structured JSON logging with automatic request tracking
- [![next-themes](https://img.shields.io/github/package-json/dependency-version/JanSzewczyk/nextjs-szumplate/next-themes?label=next-themes)](https://github.com/pacocoursey/next-themes)
  — Dark/light/system theme switching with localStorage persistence
- **⚕️ Health Checks** — Kubernetes-compatible endpoint at `/api/health` with aliases `/healthz`, `/health`, `/ping`
- **🔒 Server-only Guards** — Prevents server code from leaking into client bundles

### 🏆 Performance

- **💯 Perfect Lighthouse Score** — Optimized for performance, accessibility, and SEO
- **⚡ React Compiler** — Automatic memoization without `useMemo`/`useCallback`/`memo` boilerplate

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎯 Getting Started](#-getting-started)
- [🚀 Deployment](#-deployment)
- [📃 Scripts Overview](#-scripts-overview)
- [🧪 Testing](#-testing)
- [🎨 Styling and Design System](#-styling-and-design-system)
- [💻 Environment Variables](#-environment-variables)
- [📝 Logging](#-logging)
- [🤖 GitHub Actions](#-github-actions)
- [🔒 Keeping Server-only Code out of the Client Environment](#-keeping-server-only-code-out-of-the-client-environment)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📧 Contact & Support](#-contact--support)

---

## 🎯 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 24.x or higher)
- **npm** package manager
- **Git** for version control

### 📦 Installation

#### 1. Star and Fork the Repository

Don't forget to star ⭐ and fork the repository first!

#### 2. Clone the Repository

```bash
git clone https://github.com/<your_username>/nextjs-szumplate.git
cd nextjs-szumplate
```

#### 3. Install Dependencies

```bash
npm ci
```

#### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url
# LOG_LEVEL=debug
```

#### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. You can start editing by modifying `app/page.tsx` —
the page auto-updates as you edit.

### Optional Configuration

#### Semantic Release Setup

To enable automated releases with [Semantic Release](https://github.com/semantic-release/semantic-release):

1. Open `.github/workflows/release.yml`
2. Uncomment lines 26–30
3. Enjoy automated versioning and changelog generation
   ([more details](https://www.npmjs.com/package/@szum-tech/semantic-release-config))

---

## 🚀 Deployment

Deploy your Next.js app instantly with **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_source=github&utm_campaign=nextjs-szumplate)

### Deployment Steps

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub repository
3. Configure environment variables in the Vercel dashboard
4. Deploy — your app will be live in minutes with automatic CI/CD

---

## 📃 Scripts Overview

### Development

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the development server with Turbopack |
| `npm run build`   | Build the app for production                |
| `npm run start`   | Start the production server                 |
| `npm run analyze` | Analyze bundle sizes (Client, Server, Edge) |

### Code Quality

| Script                      | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `npm run biome:check`       | Run Biome check (lint + format)                |
| `npm run biome:ci`          | Run Biome CI check with GitHub reporter        |
| `npm run biome:fix`         | Auto-fix all lint and format issues            |
| `npm run biome:lint`        | Run Biome linter only                          |
| `npm run biome:lint:fix`    | Auto-fix lint issues                           |
| `npm run biome:format`      | Check code formatting                          |
| `npm run biome:format:fix`  | Auto-fix formatting                            |
| `npm run type-check`        | Run TypeScript type checking                   |

### Testing

| Script                            | Description                                   |
| --------------------------------- | --------------------------------------------- |
| `npm run test`                    | Run all Vitest tests                          |
| `npm run test:ci`                 | Run all tests with coverage (CI mode)         |
| `npm run test:coverage`           | Generate full coverage report                 |
| `npm run test:unit`               | Run unit tests only                           |
| `npm run test:unit:coverage`      | Unit tests with separate coverage report      |
| `npm run test:watch`              | Run tests in watch mode                       |
| `npm run test:ui`                 | Vitest UI dashboard                           |
| `npm run test:storybook`          | Storybook component tests with coverage       |
| `npm run test:storybook:coverage` | Storybook tests with separate coverage report |
| `npm run test:e2e`                | Run Playwright E2E tests                      |
| `npm run test:e2e:ui`             | E2E tests with Playwright UI                  |
| `npm run test:e2e:ci`             | E2E tests in CI mode                          |

### Storybook

| Script                    | Description                       |
| ------------------------- | --------------------------------- |
| `npm run storybook:dev`   | Start Storybook (port 6006)       |
| `npm run storybook:build` | Build static Storybook            |
| `npm run storybook:serve` | Serve the built Storybook locally |

---

## 🧪 Testing

This template provides a comprehensive testing infrastructure covering unit, component, and E2E tests.

### 🔬 Unit & Integration Tests

```bash
npm run test
```

Watch mode for active development:

```bash
npm run test:watch
```

Generate a coverage report:

```bash
npm run test:coverage
```

Vitest is configured with two project modes:

- **unit** — Node environment for `*.test.ts` files
- **storybook** — Browser environment (Playwright) for Storybook component tests

### 🎭 End-to-End Tests

```bash
npm run test:e2e
```

Interactive debugging with Playwright UI:

```bash
npm run test:e2e:ui
```

### 📚 Storybook Tests

```bash
npm run test:storybook
```

Storybook tests use `play` functions for interaction testing with accessibility checks via `@storybook/addon-a11y`. Use
the `test-only` tag to exclude stories from docs while keeping them in the test suite.

---

## 🎨 Styling and Design System

This template uses [Tailwind CSS](https://tailwindcss.com/) (CSS-first configuration) alongside the
[Szum-Tech Design System](https://szum-tech-design-system.vercel.app/), which provides:

- ✅ Fully designed, accessible components built on Radix UI
- 🎨 OKLCH semantic color palette and design tokens
- 🛠️ Utility functions and helpers
- 📖 Comprehensive Storybook documentation

### Usage Example

```tsx
import { Button } from "@szum-tech/design-system";

export default function MyComponent() {
  return <Button variant="primary">Click me!</Button>;
}
```

Icons are available from the design system's re-exports:

```tsx
import { GithubIcon, SparklesIcon } from "lucide-react";
```

**[View Design System Documentation →](https://szum-tech-design-system.vercel.app/?path=/docs/components--docs)**

---

## 💻 Environment Variables

[T3 Env](https://env.t3.gg/) provides type-safe environment variable management with build-time validation. Missing or
invalid variables cause a clear error at build time rather than a runtime surprise.

### Configuration

Variables are split into two files in `data/env/`:

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    // Server-side variables
    SECRET_KEY: z.string(),
  },
  client: {
    // Client-side variables (must be prefixed with NEXT_PUBLIC_)
    API_URL: z.string().url(),
  },
  runtimeEnv: {
    SECRET_KEY: process.env.SECRET_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
```

- Server variables: `data/env/server.ts`
- Client variables: `data/env/client.ts` (must be prefixed with `NEXT_PUBLIC_`)
- Skip validation: `SKIP_ENV_VALIDATION=true` (useful for Docker builds)

If required variables are missing at build time:

```
❌ Invalid environment variables: { SECRET_KEY: [ 'Required' ] }
```

---

## 📝 Logging

This template uses [Pino](https://getpino.io/), one of the fastest logging libraries for Node.js, with structured JSON
output optimized for Next.js App Router and Turbopack.

### Features

- ✅ **High Performance** — Minimal overhead with fast JSON serialization
- ✅ **Structured Logging** — JSON-formatted logs ready for log aggregation tools (Datadog, ELK, CloudWatch, Grafana
  Loki)
- ✅ **Request Tracking** — Automatic request ID (UUID) via middleware with `X-Request-ID` response header
- ✅ **Universal** — Server-side (Node.js JSON output) and client-side (browser console fallback)
- ✅ **Error Boundaries** — Integrated with `app/error.tsx` and `app/global-error.tsx`
- ✅ **Type-safe** — `LOG_LEVEL` environment variable validated with TypeScript

### Usage

```typescript
import logger, { createLogger } from "~/lib/logger";

// Basic logging
logger.info("User logged in successfully");
logger.warn("API rate limit approaching");
logger.error({ userId: "123", error: err }, "Failed to fetch user data");

// Context logger — persists context in every log line
const apiLogger = createLogger({ module: "api", service: "user-service" });
apiLogger.info("Processing request");
```

### Log Levels

Control verbosity via the `LOG_LEVEL` environment variable (add to `.env.local`):

```env
LOG_LEVEL=debug
```

Available levels (highest to lowest priority): `fatal` | `error` | `warn` | `info` (default) | `debug` | `trace`

### Built-in Logging

The template automatically logs in these areas:

- **Request middleware** (`proxy.ts`) — every HTTP request logs method, URL, user agent, status, and duration
- **Health check API** (`app/api/health/route.ts`) — logs each health probe
- **Error boundaries** (`app/error.tsx`, `app/global-error.tsx`) — logs caught errors with full stack traces

### Production Best Practices

```typescript
// Include context objects for searchability
logger.error({ userId, orderId, error }, "Order processing failed");

// Never log sensitive data
logger.info({ userId: user.id }, "User login"); // ✅
logger.info({ password: user.password }, "User login"); // ❌

// Always pass error objects for full stack traces
try {
  // ...
} catch (error) {
  logger.error({ error }, "Operation failed");
}
```

---

## 🤖 GitHub Actions

Three pre-configured workflows automate quality checks and releases:

### ✅ PR Check (`pr-check.yml`)

[![CI](https://github.com/JanSzewczyk/nextjs-szumplate/actions/workflows/pr-check.yml/badge.svg)](https://github.com/JanSzewczyk/nextjs-szumplate/actions/workflows/pr-check.yml)

Runs on every pull request and validates:

- Build — ensures the project compiles successfully
- Storybook build — validates Storybook compilation
- Biome — linting and formatting check with GitHub inline annotations
- TypeScript — type checking
- Vitest unit tests with coverage
- Storybook interaction tests with coverage
- Merged coverage comment on PR
- Playwright E2E tests
- Dependency review — security audit of dependency changes

### 🔒 CodeQL (`codeql.yml`)

[![CodeQL](https://github.com/JanSzewczyk/nextjs-szumplate/actions/workflows/codeql.yml/badge.svg)](https://github.com/JanSzewczyk/nextjs-szumplate/actions/workflows/codeql.yml)

Automated security scanning powered by GitHub CodeQL, running on push and schedule.

### 🚀 Release (`release.yml`)

Triggers automatically when changes are merged to `main`:

- Determines the next version using [Semantic Release](https://github.com/semantic-release/semantic-release)
- Updates `CHANGELOG.md`
- Creates a GitHub Release with release notes
- Bumps version in `package.json`

Based on [Conventional Commits](https://www.conventionalcommits.org/) via `@szum-tech/semantic-release-config`.

---

## 🔒 Keeping Server-only Code out of the Client Environment

JavaScript modules can be shared between Server and Client Components, making it possible for server-only code to
accidentally end up in the client bundle.

### Solution: `server-only` Package

Use the [server-only](https://www.npmjs.com/package/server-only) package to get a build-time error if server code is
ever imported in a Client Component:

```bash
npm install server-only
```

Import it at the top of any module that must stay on the server:

```typescript
import "server-only";

export async function getData() {
  // This function can only be used on the server
}
```

Any Client Component that imports this module will fail the build — catching the mistake before it reaches production.

---

## 📁 Project Structure

```
nextjs-szumplate/
├── .claude/              # Claude Code configuration (agents, skills, hooks)
├── .github/
│   └── workflows/        # GitHub Actions workflows (CI/CD)
├── .storybook/           # Storybook configuration and themes
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Reusable React components with co-located stories
├── constants/            # Static data and configuration constants
├── data/
│   └── env/              # T3 Env type-safe environment variable definitions
├── features/             # Feature-based modules (components, schemas, server)
├── lib/                  # Utility functions and configurations (logger)
├── public/               # Static assets (images, icons, SVGs)
├── stories/              # Standalone Storybook stories
├── tests/
│   ├── e2e/              # Playwright end-to-end tests
│   ├── integration/      # Storybook integration test setup
│   └── unit/             # Vitest unit tests
├── types/                # Global TypeScript type declarations
├── utils/                # Shared utility functions
├── biome.json            # Biome linter and formatter configuration
├── next.config.ts        # Next.js configuration
├── playwright.config.ts  # Playwright E2E test configuration
├── postcss.config.js     # PostCSS and Tailwind CSS configuration
├── proxy.ts              # Request logging middleware
├── release.config.js     # Semantic Release configuration
├── tsconfig.json         # TypeScript compiler options and path aliases
└── vitest.config.ts      # Vitest test configuration
```

### Key Directories

- **`.claude/`** — Claude Code configuration (agents, skills, hooks, project context)
- **`.github/workflows/`** — CI/CD automation (PR checks, CodeQL, releases)
- **`.storybook/`** — Storybook setup for component development and documentation
- **`app/`** — Next.js App Router with Server/Client Components, layouts, and API routes
- **`components/`** — Shared, reusable UI components with co-located Storybook stories
- **`data/env/`** — T3 Env type-safe environment variable definitions (server + client)
- **`features/`** — Feature-based modules with related components, Zod schemas, and server actions
- **`lib/`** — Utilities, helpers, and third-party library configurations (logger)
- **`tests/`** — Test files organized by type: unit (Vitest), integration (Storybook), and E2E (Playwright)

### Important Configuration Files

- **`biome.json`** — Biome linter and formatter rules (replaces ESLint + Prettier)
- **`next.config.ts`** — Next.js config (React Compiler, bundle analyzer, health rewrites)
- **`playwright.config.ts`** — Playwright E2E test configuration
- **`postcss.config.js`** — PostCSS plugins and Tailwind CSS processing
- **`tsconfig.json`** — TypeScript compiler options including `~/` path alias
- **`vitest.config.ts`** — Vitest configuration with `unit` and `storybook` project modes

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code passes all tests and follows the project's coding standards.

---

## 📜 License

This project is licensed under the **MIT License**. For more information, see the [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

This template is built with amazing tools and libraries from the open-source community:

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vitest](https://vitest.dev/) - Next generation testing framework
- [Playwright](https://playwright.dev/) - E2E testing framework
- [Storybook](https://storybook.js.org/) - UI component explorer
- And many more amazing libraries!

---

## 📧 Contact & Support

If you have any questions, suggestions, or issues:

- 🐛 [Open an issue](https://github.com/JanSzewczyk/nextjs-szumplate/issues)
- ⭐ [Star this repository](https://github.com/JanSzewczyk/nextjs-szumplate)
- 👨‍💻 Check out my [GitHub profile](https://github.com/JanSzewczyk)

---

<div align="center">

**Made with ❤️ by [Szum-Tech](https://github.com/szum-tech)**

If this template helped you, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-nextjs-szumplate)

</div>
