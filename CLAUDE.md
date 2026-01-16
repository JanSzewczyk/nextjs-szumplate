# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js Szumplate is an enterprise-ready Next.js 16 template with TypeScript, Tailwind CSS, React Compiler, and
comprehensive testing infrastructure.

## Commands

### Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # ESLint check
npm run lint:fix     # ESLint with auto-fix
npm run prettier:check   # Prettier check
npm run prettier:write   # Prettier with auto-fix
npm run type-check   # TypeScript type checking
```

### Testing

```bash
npm run test                  # Run all Vitest tests
npm run test:unit             # Unit tests only (with coverage)
npm run test:storybook        # Storybook component tests (with coverage)
npm run test:watch            # Watch mode
npm run test:ui               # Vitest UI

# Run a single test file
npx vitest run path/to/file.test.ts
npx vitest run --project=unit path/to/file.test.ts

# E2E tests (Playwright) - requires build first
npm run build && npm run test:e2e
npm run test:e2e:ui           # Playwright UI mode
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

Vitest is configured with two project modes:

- **unit**: Node environment for unit tests (`*.test.ts` files)
- **storybook**: Browser environment (Playwright) for Storybook component tests

Storybook tests use play functions for interaction testing with accessibility checks via @storybook/addon-a11y.
Use `test-only` tag for stories that should be excluded from docs but run in tests.

### Design System

Uses `@szum-tech/design-system` package. Import components directly:

```typescript
import { Button } from "@szum-tech/design-system";
```

### Health Checks

Built-in health endpoint at `/api/health` with multiple URL aliases: `/healthz`, `/api/healthz`, `/health`, `/ping`

### Next.js Configuration

- React Compiler enabled (`reactCompiler: true`)
- Pino externalized for server-side logging
- Bundle analyzer available via `ANALYZE=true`

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) for semantic release
- ESLint: Uses `@szum-tech/eslint-config`
- Prettier: Uses `@szum-tech/prettier-config`
- Semantic Release: Uses `@szum-tech/semantic-release-config`
