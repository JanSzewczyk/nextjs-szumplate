# Project Context

This file contains project-specific configuration that agents and skills reference.
When using this configuration in other projects, update this file with your project's specifics.

## Tech Stack

| Category         | Technology                 | Version/Notes                       |
| ---------------- | -------------------------- | ----------------------------------- |
| Framework        | Next.js                    | 16 (App Router)                     |
| UI Library       | React                      | 19.2 (with React Compiler)          |
| Styling          | Tailwind CSS               | 4 (CSS-first config in globals.css) |
| Design System    | @szum-tech/design-system   | (shadcn/ui based)                   |
| Type Safety      | TypeScript                 | strict mode                         |
| Env Validation   | T3 Env                     | @t3-oss/env-nextjs                  |
| Logging          | Pino                       | JSON structured logging             |
| Forms            | React Hook Form            | with Zod validation                 |
| Schema Validation| Zod                        | v4                                  |

## Testing Stack

| Type      | Tool             | Location              | Command                |
| --------- | ---------------- | --------------------- | ---------------------- |
| Unit      | Vitest           | `tests/unit/`, `*.test.ts` | `npm run test:unit`    |
| Component | Storybook + Vitest | `*.stories.tsx`       | `npm run test:storybook` |
| E2E       | Playwright       | `tests/e2e/`          | `npm run test:e2e`     |
| All       | Vitest           | -                     | `npm run test`         |

## Key Files

| Purpose           | File                                    |
| ----------------- | --------------------------------------- |
| Next.js config    | `next.config.ts`                        |
| Request logging   | `proxy.ts` (middleware helper)          |
| Dependencies      | `package.json`                          |
| TypeScript        | `tsconfig.json`                         |
| Tailwind styles   | `app/globals.css` (Tailwind v4 config)  |
| Environment vars  | `data/env/server.ts`, `data/env/client.ts` |
| Logger            | `lib/logger.ts`                         |
| Vitest config     | `vitest.config.ts`                      |
| Playwright config | `playwright.config.ts`                  |
| Storybook config  | `.storybook/main.ts`                    |

## Import Conventions

```typescript
// Path alias (use ~/ for all absolute imports)
import logger, { createLogger } from "~/lib/logger";
import { env } from "~/data/env/server";

// Design system components
import { Button, Card } from "@szum-tech/design-system";

// Server-only code (prevents client bundle inclusion)
import "server-only";
```

## Component Location

- **Shared components**: `components/` (ui/, layout/, providers/)
- **Feature components**: `features/[feature]/components/`
- **Stories**: Same directory as component (`component.stories.tsx`)
- **Constants/data**: `constants/`

## Feature Module Structure

```
features/
└── example-feature/
    ├── components/    # Feature-specific React components
    ├── schemas/       # Zod validation schemas
    └── server/        # Server-side logic (actions, data fetching)
```

## Logging Pattern

```typescript
import logger, { createLogger } from "~/lib/logger";

// Create module-specific logger
const featureLogger = createLogger({ module: "feature-name" });

// Log with context
featureLogger.info({ userId, action: "create" }, "Resource created");
featureLogger.warn({ resourceId }, "Resource not found");
featureLogger.error({ error, userId }, "Operation failed");
```

Request logging is automatic via `proxy.ts` with `X-Request-ID` header tracking.

## Storybook Patterns

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story with interaction test
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByText("Clicked")).toBeInTheDocument();
  },
};

// Test-only story (excluded from docs)
export const TestOnly: Story = {
  tags: ["test-only"],
};
```

## Environment Variables

- Server: `data/env/server.ts` (NODE_ENV, LOG_LEVEL, ANALYZE, CI, VERCEL_URL)
- Client: `data/env/client.ts` (must use `NEXT_PUBLIC_` prefix)
- Skip validation: `SKIP_ENV_VALIDATION=true`

## Form Pattern

- Use React Hook Form for form state management
- Use Zod schemas for validation
- Design system provides form components

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
- ESLint: `@szum-tech/eslint-config`
- Prettier: `@szum-tech/prettier-config`
- Semantic Release: `@szum-tech/semantic-release-config`
