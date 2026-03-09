# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js Szumplate is an enterprise-ready Next.js 16.1.4 template with React 19.2.0, TypeScript, Tailwind CSS 4.1.11,
React Compiler, and comprehensive testing infrastructure (Vitest 4.0, Playwright 1.56).

## Commands (Bun)

### Development

```bash
bun run dev          # Start dev server with Bun
bun run build        # Production build with Bun
bun run start        # Start production server with Bun
```

### Package Management

```bash
bun install          # Install dependencies
bun add <package>    # Add dependency
bun add -d <package> # Add dev dependency
bun update           # Update dependencies
```

### Code Quality

```bash
bun run lint         # ESLint check
bun run lint:fix     # ESLint with auto-fix
bun run prettier:check   # Prettier check
bun run prettier:write   # Prettier with auto-fix
bun run type-check   # TypeScript type checking
```

### Testing

```bash
bun run test                  # Run all Vitest tests
bun run test:unit             # Unit tests only (with coverage)
bun run test:storybook        # Storybook component tests (with coverage)
bun run test:watch            # Watch mode
bun run test:ui               # Vitest UI

# Run a single test file
bun run vitest run path/to/file.test.ts
bun run vitest run --project=unit path/to/file.test.ts

# E2E tests (Playwright) - requires build first
bun run build && bun run test:e2e
bun run test:e2e:ui           # Playwright UI mode
```

### Storybook

```bash
bun run storybook:dev         # Start Storybook (port 6006)
bun run storybook:build       # Build static Storybook
```

### Analysis

```bash
bun run analyze               # Bundle analyzer
```

## Bun Runtime Notes

This project is configured to run with Bun runtime:
- Uses `bun --bun` flag for Next.js commands to force Bun runtime
- Bun's package manager is npm-compatible and uses node_modules
- Environment variables work via `process.env` and Bun.env automatically
- Pino logging is externalized via `serverExternalPackages` configuration

### Alternative: Node.js/npm

This project still supports Node.js 24.x and npm if needed:

```bash
npm install
npm run dev
```

Bun is recommended for improved performance (10-100x faster installs, 2-3x faster dev server startup).

## Architecture

### Tech Stack

- **Next.js**: 16.1.4 (App Router, Turbopack, React Compiler)
- **React**: 19.2.0 with React Compiler enabled
- **TypeScript**: 5.9.3 (strict mode)
- **Tailwind CSS**: 4.1.11 (CSS-first config)
- **@szum-tech/design-system**: 3.11.1
- **Vitest**: 4.0.16 (unit & integration tests)
- **Playwright**: 1.56 (E2E tests)
- **Storybook**: 10.1.11 (component development)
- **Zod**: 4.3.6 (validation)
- **Pino**: 10.3.0 (logging)
- **next-themes**: 0.4.6 (theming)

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
- **data/env/**: T3 Env type-safe environment variables (server.ts, client.ts)
- **constants/**: Static data and configuration constants
- **tests/e2e/**: Playwright E2E tests (\*.e2e.ts pattern)
- **tests/unit/**: Vitest unit tests (\*.test.ts pattern)
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

Uses Pino logger (`lib/logger.ts`). Create child loggers with context:

```typescript
import logger, { createLogger } from "~/lib/logger";
const apiLogger = createLogger({ module: "api" });
```

Request logging is handled automatically via `proxy.ts` with request ID tracking.

### Testing Configuration

Vitest 4.0 is configured with two project modes:

- **unit**: Node environment for unit tests (`*.test.ts` files)
- **storybook**: Browser environment (Playwright) for Storybook component tests

Storybook tests use play functions for interaction testing with accessibility checks via @storybook/addon-a11y.
Use `test-only` tag for stories that should be excluded from docs but run in tests.

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

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) for semantic release
- ESLint: Uses `@szum-tech/eslint-config`
- Prettier: Uses `@szum-tech/prettier-config`
- Semantic Release: Uses `@szum-tech/semantic-release-config`

## Common Pitfalls

| Area | Don't | Do |
|------|-------|----|
| Components | Add `'use client'` unnecessarily | Default to Server Components |
| Memoization | Use `useMemo`/`useCallback`/`memo` with React Compiler | Let compiler optimize automatically |
| Imports | Use relative paths (`../../../lib/utils`) | Use path aliases (`~/lib/utils`) |
| Logging | Use `console.log` in production code | Use structured Pino logging (`logger.info(...)`) |
| `useFormStatus` | Use in same component as `<form>` | Use in a child component inside the form |
| Server Actions | Return untyped objects | Use standardized response types with Zod validation |
