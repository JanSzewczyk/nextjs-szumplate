# Project Context

This file contains project-specific configuration that agents and skills reference.
When using this configuration in other projects, update this file with your project's specifics.

## Tech Stack

| Category | Technology | Version | Status |
|----------|------------|---------|--------|
| Framework | Next.js | 16.1 (App Router, Turbopack) | ✅ Installed |
| UI Library | React | 19.2 (with React Compiler) | ✅ Installed |
| Styling | Tailwind CSS | 4.1 | ✅ Installed |
| Design System | @szum-tech/design-system | 3.9 (shadcn/ui based) | ✅ Installed |
| Type Safety | TypeScript | 5.9 (strict mode) | ✅ Installed |
| Env Validation | T3 Env | @t3-oss/env-nextjs 0.13 | ✅ Installed |
| Logging | Pino | 10.1 (pretty-printing in dev) | ✅ Installed |
| Forms | React Hook Form | 7.71 | ✅ Installed |
| Validation | Zod | 4.3 | ✅ Installed |

### Optional Integrations (Not Yet Installed)

These are recommended patterns documented in skills but require installation:

| Category | Technology | Skill Documentation |
|----------|------------|---------------------|
| Authentication | Clerk | `clerk-auth-proxy` skill |
| Database | Firebase Firestore | `firebase-firestore` skill |
| Toast System | Cookie-based toasts | `toast-notifications` skill |

> **Note:** When you add these integrations, update this table and uncomment relevant sections below.

## Testing Stack

| Type | Tool | Location | Command |
|------|------|----------|---------|
| Unit | Vitest | `tests/unit/`, `*.test.ts` | `npm run test:unit` |
| Component | Storybook 10 + Vitest | `*.stories.tsx` | `npm run test:storybook` |
| E2E | Playwright | `tests/e2e/` | `npm run test:e2e` |
| All | Vitest | - | `npm run test` |

## Key Files

| Purpose | File |
|---------|------|
| Next.js config | `next.config.ts` |
| Request logging | `proxy.ts` |
| Dependencies | `package.json` |
| TypeScript | `tsconfig.json` |
| Tailwind | `app/styles/globals.css` (CSS-first config) |
| Environment vars | `data/env/server.ts`, `data/env/client.ts` |
| Vitest config | `vitest.config.ts` |
| Storybook | `.storybook/` |

## Import Conventions

```typescript
// Path alias (use ~/ for all project imports)
import { createLogger } from "~/lib/logger";
import { env } from "~/data/env/server";

// Design system
import { Button, Card } from "@szum-tech/design-system";

// Server-only code
import "server-only";
```

## Component Location

- **Shared components**: `components/`
- **Feature components**: `features/[feature]/components/`
- **Stories**: Same directory as component (`component.stories.tsx`)

## Feature Module Structure

Features follow a modular architecture pattern:

```
features/
└── [feature-name]/
    ├── components/       # Feature-specific components
    ├── schemas/          # Zod validation schemas
    └── server/
        ├── actions/      # Server Actions
        └── db/           # Database queries (when DB added)
```

## Logging

Use Pino via `createLogger({ module: "feature-name" })`. See `structured-logging` skill for full patterns.

## React 19 & Compiler

React Compiler enabled in `next.config.ts` — removes need for manual memoization. Keep `useMemo`/`useCallback` only for: external library callbacks, complex context values, >100ms computations. Server Components by default; add `"use client"` only when interactivity is needed. See `react-19-compiler` skill for complete patterns (useActionState, useFormStatus, etc.).

## Forms

- Complex forms: React Hook Form + Zod
- Simple forms: `useActionState` (from `react-19-compiler` skill)
- Server Actions: See `server-actions` skill for types, validation, error handling

**Server Action location:** `features/[feature]/server/actions/[action-name].ts`

## Common Pitfalls

| Area | Don't | Do |
|------|-------|----|
| Components | Add `'use client'` unnecessarily | Default to Server Components |
| Memoization | Use `useMemo`/`useCallback`/`memo` with React Compiler | Let compiler optimize automatically |
| Imports | Use relative paths (`../../../lib/utils`) | Use path aliases (`~/lib/utils`) |
| Logging | Use `console.log` in production code | Use structured Pino logging (`logger.info(...)`) |
| `useFormStatus` | Use in same component as `<form>` | Use in a child component inside the form |
| Server Actions | Return untyped objects | Use standardized response types with Zod validation |

<!-- Database (Firebase) and Authentication (Clerk) patterns are in their respective skills:
     firebase-firestore, db-migration, error-handling, clerk-auth-proxy.
     Uncomment and add sections here when these integrations are installed. -->

## Available Skills

Skills provide detailed documentation and patterns. Located in `.claude/skills/`.

| Skill                 | Description                                                  | Use When                                       |
|-----------------------|--------------------------------------------------------------|------------------------------------------------|
| `react-19-compiler`   | React 19 hooks, React Compiler optimization guidance         | Forms with useActionState, memoization decisions |
| `server-actions`      | Server Actions patterns, types, validation, React integration | Creating/updating server actions, form handling |
| `storybook-testing`   | Component testing with Storybook play functions (CSF Next)   | Writing component interaction tests            |
| `tailwind-css-4`      | Tailwind v4 CSS-first config, design system integration      | Styling components, responsive design, theming |
| `t3-env-validation`   | Type-safe env vars with @t3-oss/env-nextjs and Zod           | Environment configuration, validation          |
| `structured-logging`  | Pino logging with context enrichment and log levels          | Server-side logging, debugging, monitoring     |
| `builder-factory`     | Test data builders with test-data-bot                        | Creating mock data for tests/stories           |
| `api-test`            | API endpoint testing with Playwright                         | Testing route handlers, API endpoints          |
| `accessibility-audit` | WCAG accessibility audits                                    | Auditing components for a11y                   |
| `performance-optimization` | Bundle analysis, React rendering, DB query optimization | Performance issues, slow pages, large bundles  |

### Skills for Optional Integrations

These skills document patterns for technologies not yet installed:

| Skill                 | Technology Required | Description                                    |
|-----------------------|---------------------|------------------------------------------------|
| `clerk-auth-proxy`    | @clerk/nextjs       | Clerk auth with Next.js 16 proxy pattern       |
| `firebase-firestore`  | firebase-admin      | Firebase queries, types, error handling        |
| `db-migration`        | firebase-admin      | Database migration scripts                     |
| `toast-notifications` | Custom setup        | Cookie-based toast system                      |
| `error-handling`      | Custom setup        | DbError patterns, error boundaries             |

**Invoking Skills:**
- User: `/skill-name` (e.g., `/server-actions`)
- Agent: Listed in agent's `skills` array in frontmatter
