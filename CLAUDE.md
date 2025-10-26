# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack enabled
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prettier:check` - Check code formatting
- `npm run prettier:write` - Auto-format code
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm run test` - Run unit tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:unit` - Run unit tests only
- `npm run test:coverage` - Generate coverage report
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI
- `npm run test:storybook` - Run Storybook component tests

### Storybook
- `npm run storybook:dev` - Start Storybook dev server on port 6006
- `npm run storybook:build` - Build Storybook for production

### Analysis
- `npm run analyze` - Analyze bundle sizes (sets ANALYZE=true)

## Architecture

### Path Aliases
Uses `~/*` alias mapping to project root. Import any file with `~/path/to/file`.

### Environment Variables
Located in `data/env/`:
- `server.ts` - Server-side env validation with T3 Env and Zod
- Variables: `NODE_ENV`, `ANALYZE`, `CI`, `VERCEL_URL`, `LOG_LEVEL`
- All server env vars auto-validated at build time

### Logging (Pino)
- Logger: `~/lib/logger`
- Import: `import logger from "~/lib/logger"`
- Child loggers: `createLogger({ context: 'value' })`
- Log level controlled via `LOG_LEVEL` env var
- Structured JSON logging in production
- Pretty printing in development (pino-pretty with colorize)
- Package marked as external: `serverExternalPackages: ["pino", "pino-pretty"]` in next.config.ts

### Middleware
- Location: `middleware.ts` (root)
- Proxy pattern: adds `X-Request-ID` and `X-Request-Start` headers
- Runs on all routes except Next.js internals and static files

### Testing Setup
**Vitest** (unit/integration):
- Config: `vitest.config.ts`
- Two projects: `unit` (Node env) and `storybook` (browser with Playwright)
- Setup files: `tests/unit/vitest.setup.ts` and `tests/integration/vitest.setup.ts`
- Globals enabled, uses `@testing-library/react`

**Playwright** (E2E):
- Config: `playwright.config.ts`
- Run with `npm run test:e2e`

**Storybook**:
- Runs on port 6006
- Uses Vitest addon for component testing
- Acceptance tests via play functions

### Design System
- Uses `@szum-tech/design-system` for pre-built components
- Tailwind CSS with PostCSS v4 (`@tailwindcss/postcss`)
- Global styles: `app/globals.css`

### TypeScript
- Extremely strict config with `noUncheckedIndexedAccess: true`
- Uses `@total-typescript/ts-reset` for enhanced type safety
- JSX pragma: `react-jsx`
- Module resolution: `Bundler`

### Next.js Configuration
- Turbopack enabled by default in dev and build
- Bundle analyzer plugin (enabled via `ANALYZE` env var)
- Health check rewrites: `/healthz`, `/health`, `/ping` → `/api/health`
- Config uses `next-compose-plugins` for plugin composition

### Project Structure
- `app/` - Next.js App Router (pages, layouts, API routes)
- `components/` - Shared reusable components
- `features/` - Feature-based modules with related logic (modular architecture)
- `data/` - Static data and env configuration
- `lib/` - Utility functions and library configs (e.g., logger)
- `utils/` - General utility functions
- `types/` - Global TypeScript type definitions
- `tests/` - Test files (`e2e/`, `unit/`, setup files)
- `stories/` - Storybook stories
- `public/` - Static assets

### Key Files
- `middleware.ts` - Request proxy with ID tracking
- `lib/logger.ts` - Pino logger configuration
- `data/env/server.ts` - Server environment variable validation
- `next.config.ts` - Next.js config with Turbopack and rewrites
- `eslint.config.mjs` - ESLint configuration
- `vitest.config.ts` - Vitest test configuration with dual projects

### CI/CD
- GitHub Actions workflows in `.github/workflows/`
- `pr-check.yml` - Runs build, lint, type-check, tests, E2E on PRs
- `publish.yml` - Semantic Release for automated versioning
- `code-review.yml` - ChatGPT-powered code reviews (requires `OPENAI_API_KEY`)

### Semantic Release
- Config: `release.config.js`
- Uses `@szum-tech/semantic-release-config`
- Follows Conventional Commits for automated changelog and versioning
- Triggered on merge to `main` branch

### Server-only Code
- Use `server-only` package to prevent server code in client bundles
- Import `"server-only"` at top of server-only modules
