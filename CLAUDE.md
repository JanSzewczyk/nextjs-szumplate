# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js Szumplate is an enterprise-ready Next.js template with React Compiler and comprehensive testing
infrastructure. Exact versions live in `package.json` — don't duplicate them here.

## Commands

### Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
```

### Code Quality

```bash
npm run biome:check      # Biome check (lint + format)
npm run biome:ci         # Biome check with GitHub reporter (CI mode)
npm run biome:fix        # Auto-fix all lint and format issues
npm run biome:lint       # Biome lint only
npm run biome:lint:fix   # Auto-fix lint issues
npm run biome:format     # Check formatting only
npm run biome:format:fix # Auto-fix formatting
npm run type-check       # TypeScript type checking (next typegen + tsc)
npm run knip             # Find unused files, dependencies, and exports
npm run knip:ci          # Knip with GitHub Actions reporter (CI mode)
```

### Testing

```bash
npm run test                    # Run all Vitest tests
npm run test:unit               # Unit tests only
npm run test:unit:coverage      # Unit tests with coverage report
npm run test:storybook          # Storybook component tests with coverage
npm run test:storybook:coverage # Storybook tests with separate coverage report
npm run test:coverage           # Full coverage report
npm run test:ci                 # All tests with coverage (CI mode)
npm run test:watch              # Watch mode
npm run test:ui                 # Vitest UI

# Run a single test file
npx vitest run path/to/file.test.ts
npx vitest run --project=unit path/to/file.test.ts

# E2E tests (Playwright) - requires build first
npm run build && npm run test:e2e
npm run test:e2e:ui             # Playwright UI mode
npm run test:e2e:ci             # E2E tests in CI mode
```

### Storybook

```bash
npm run storybook:dev         # Start Storybook (port 6006)
npm run storybook:build       # Build static Storybook
```

### Analysis

```bash
npm run analyze               # Bundle analyzer
```

## Architecture

### Tech Stack

- **Next.js** (App Router, Turbopack, React Compiler) with **React** and **TypeScript** (strict mode)
- **Tailwind CSS** (CSS-first config)
- **Biome** (lint + format), **Knip** (dead code / unused dependency detection)
- **@szum-tech/design-system** (UI components)
- **Vitest** (unit & integration tests), **Playwright** (E2E), **Storybook** (component development)
- **Zod** (validation), **LogLayer + Pino** (logging), **next-themes** (theming)

### Path Aliases

Use `~/` prefix for absolute imports (configured in tsconfig.json):

```typescript
import logger from "~/lib/logger";
import { env } from "~/data/env/server";
```

### Key Directories

- **app/**: Next.js App Router pages, layouts, and API routes
- **features/**: Feature-based modules (see structure below)
- **components/**: Shared reusable components (ui/, layout/, providers/)
- **lib/**: Utilities and configurations (logger)
- **utils/**, **types/**: Shared helpers and global types (`types/reset.d.ts` loads ts-reset)
- **proxy.ts**: Request middleware (request ID + request logging)
- **data/env/**: T3 Env type-safe environment variables (server.ts, client.ts)
- **constants/**: Static data and configuration constants
- **tests/e2e/**: Playwright E2E tests (\*.e2e.ts pattern)
- **tests/unit/**: Vitest unit tests (\*.test.ts pattern); colocated tests (e.g. `lib/logger.test.ts`) also run in
  the `unit` project
- **tests/integration/**: Storybook integration tests

### Feature Module Structure

Features follow a modular architecture pattern:

```
features/
└── example-feature/
    ├── components/    # Feature-specific components
    ├── schemas/       # Zod validation schemas
    └── server/        # Server-side logic (actions, data fetching)
```

### Environment Variables

Environment variables are validated at build-time using T3 Env:

- Server variables: `data/env/server.ts`
- Client variables: `data/env/client.ts` (must be prefixed with `NEXT_PUBLIC_`)
- Skip validation with `SKIP_ENV_VALIDATION=true`

### Logging

Uses LogLayer on top of Pino (`lib/logger.ts`); logs are also written to `tmp/app.log` and `tmp/audit.json`
(gitignored). Create child loggers with context:

```typescript
import logger, { createLogger } from "~/lib/logger";
const apiLogger = createLogger({ module: "api" });
```

Request logging is handled automatically via `proxy.ts` with request ID tracking.

### Testing Configuration

Vitest 4.1 is configured with two project modes:

- **unit**: Node environment for unit tests (`*.test.ts` files)
- **storybook**: Browser environment (Playwright) for Storybook component tests

Storybook tests use play functions for interaction testing with accessibility checks via @storybook/addon-a11y.
Use `test-only` tag for stories that should be excluded from docs but run in tests.

**Known temporary workaround:** `.storybook/main.ts`'s `viteFinal` includes a `layout-router-parent-render-tree-compat`
Vite plugin that patches `@storybook/nextjs-vite`'s compiled `LayoutRouterContext` mock at build time. It's needed
because `next@16.4.0` changed `useRouter()` to read `layout.parentRenderTree.data.bfcacheId`, but
`@storybook/nextjs-vite@10.6.2` only provides the older `parentTree` field, so `useRouter()` throws inside
`RedirectBoundary` for every App Router story without this patch. **When next updating `next` and/or
`@storybook/nextjs-vite` as part of a dependency update pass, check whether this is still needed**: remove the
`layoutRouterCompat` plugin from `viteFinal`, run `npm run test:storybook`, and if it still passes, delete the
workaround and its comment.

### Design System

Uses `@szum-tech/design-system` package. Import components directly:

```typescript
import { Button, Card, Tooltip } from "@szum-tech/design-system";
```

Icons are re-exported via the design system:

```typescript
import { GithubIcon, SparklesIcon } from "lucide-react";
```

### Health Checks

Built-in health endpoint at `/api/health` with multiple URL aliases: `/healthz`, `/api/healthz`, `/health`, `/ping`

### Theme Support

The app uses `next-themes` for dark/light/system theme switching:

- `ThemeProvider` wraps the app in `app/layout.tsx`
- `ThemeToggle` component for user switching
- Theme is persisted in localStorage

### Next.js Configuration

- React Compiler enabled (`reactCompiler: true`)
- Pino externalized for server-side logging
- Bundle analyzer available via `ANALYZE=true`

## Rules

Detailed conventions live in `.claude/rules/` (code-style, ui-szum-tech-design-system, feature-architecture,
db-patterns, nextjs-page-layout-patterns). Read the relevant file before touching that area.

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) for semantic release
- Linting & formatting: Biome (`biome.json`)
- Dead code / unused dependency detection: Knip (`knip.json`)
- Semantic Release: Uses `@szum-tech/semantic-release-config`

## Common Pitfalls

| Area            | Don't                                                  | Do                                                  |
| --------------- | ------------------------------------------------------ | --------------------------------------------------- |
| Components      | Add `'use client'` unnecessarily                       | Default to Server Components                        |
| Memoization     | Use `useMemo`/`useCallback`/`memo` with React Compiler | Let compiler optimize automatically                 |
| Imports         | Use relative paths (`../../../lib/utils`)              | Use path aliases (`~/lib/utils`)                    |
| Logging         | Use `console.log` in production code                   | Use structured Pino logging (`logger.info(...)`)    |
| `useFormStatus` | Use in same component as `<form>`                      | Use in a child component inside the form            |
| Server Actions  | Return untyped objects                                 | Use standardized response types with Zod validation |
