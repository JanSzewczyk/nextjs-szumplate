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

## Logging Pattern

```typescript
import logger, { createLogger } from "~/lib/logger";

// Create feature-specific logger
const featureLogger = createLogger({ module: "feature-name" });

// Success
featureLogger.info({ userId, resourceId }, "Operation completed");

// Warning
featureLogger.warn({ userId }, "Resource not found");

// Error
featureLogger.error({ userId, error: err.message }, "Operation failed");
```

## React 19 Patterns

> **Full documentation**: See `.claude/skills/react-19-compiler/` skill for complete patterns.

### React Compiler

The project has React Compiler enabled in `next.config.ts`:
- **Remove unnecessary memoization** - Compiler handles `useMemo`, `useCallback`, `React.memo`
- **Keep memoization only for** - External library callbacks, complex context values, >100ms computations

### Server Components (Default)

```typescript
// ✅ Server Component by default - no directive needed
export function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}
```

### Client Components (When Needed)

```typescript
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Form Handling with useActionState

```typescript
"use client";
import { useActionState } from "react";

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitForm, null);

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <SubmitButton />
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

// useFormStatus MUST be in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Sending..." : "Send"}</button>;
}
```

**Related Skills:**
- `react-19-compiler` - Complete React 19 patterns, hooks, Server/Client Components

## Form Pattern

- Use React Hook Form for complex forms, useActionState for simple forms
- Use Zod schemas for validation
- See `server-actions` skill for Server Actions patterns

## Server Action Pattern (Template)

> **Full documentation**: See `.claude/skills/server-actions/` skill.

**File Location:** `features/[feature]/server/actions/[action-name].ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { createLogger } from "~/lib/logger";

const logger = createLogger({ module: "feature-actions" });

// Simple action returning success/error
export async function createResource(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name?.trim()) {
    return { success: false, error: "Name is required" };
  }

  try {
    // Your logic here
    logger.info({ name }, "Resource created");
    revalidatePath("/resources");
    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to create resource");
    return { success: false, error: "Failed to create resource" };
  }
}
```

## Common Pitfalls

These are frequent mistakes to avoid when working with this stack:

### React Components

❌ **Don't:** Add 'use client' unnecessarily
```typescript
// ❌ WRONG - No interactivity needed
'use client'
export function UserProfile({ user }) {
  return <div>{user.name}</div>;
}
```

✅ **Do:** Default to Server Components
```typescript
// ✅ CORRECT - Server Component by default
export function UserProfile({ user }) {
  return <div>{user.name}</div>;
}
```

### Memoization

❌ **Don't:** Use unnecessary memoization with React Compiler
```typescript
// ❌ WRONG - Compiler handles this automatically
const sorted = useMemo(() => items.sort(), [items]);
```

✅ **Do:** Let compiler optimize
```typescript
// ✅ CORRECT - Compiler handles memoization
const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
```

### Imports

❌ **Don't:** Use relative imports for project files
```typescript
// ❌ WRONG
import { something } from "../../../lib/utils";
```

✅ **Do:** Use path aliases
```typescript
// ✅ CORRECT
import { something } from "~/lib/utils";
```

### Logging

❌ **Don't:** Use console.log in production code
```typescript
// ❌ WRONG
console.log("User created:", userId);
```

✅ **Do:** Use structured logging with Pino
```typescript
// ✅ CORRECT
logger.info({ userId, operation: "create" }, "User created");
```

### useFormStatus

❌ **Don't:** Use useFormStatus in the same component as form
```typescript
// ❌ WRONG - useFormStatus won't work
function Form() {
  const { pending } = useFormStatus();
  return <form>...</form>;
}
```

✅ **Do:** Use useFormStatus in a child component
```typescript
// ✅ CORRECT
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

<!--
## Database Patterns (Firebase)

> Uncomment this section when Firebase is installed.
> See `.claude/skills/firebase-firestore/` skill for complete patterns.

### Type Lifecycle

```typescript
// 1. Base type - Business fields only
export type ResourceBase = {
  name: string;
  status: "active" | "inactive";
};

// 2. Firestore type - With Timestamp objects
export type ResourceFirestore = WithFirestoreTimestamps<ResourceBase>;

// 3. Application type - With id and Date objects
export type Resource = WithDates<ResourceBase>;

// 4. Create DTO - For creating documents
export type CreateResourceDto = CreateDto<ResourceBase>;

// 5. Update DTO - For updating documents
export type UpdateResourceDto = UpdateDto<ResourceBase>;
```

### Error Handling Pattern (DbError)

```typescript
import { categorizeDbError, DbError } from "~/lib/firebase/errors";

export async function getResourceById(id: string): Promise<[null, Resource] | [DbError, null]> {
  if (!id?.trim()) {
    return [DbError.validation("Invalid id provided"), null];
  }

  try {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) {
      return [DbError.notFound(RESOURCE_NAME), null];
    }
    return [null, transformFirestoreToResource(doc.id, doc.data()!)];
  } catch (error) {
    return [categorizeDbError(error, RESOURCE_NAME), null];
  }
}
```
-->

<!--
## Authentication (Clerk)

> Uncomment this section when Clerk is installed.
> See `.claude/skills/clerk-auth-proxy/` skill for complete patterns.

**Important:** Use `proxy.ts` not `middleware.ts` for Clerk in Next.js 16.

```typescript
// proxy.ts
import { clerkProxy } from "@clerk/nextjs/server";
export default clerkProxy();
```

**Server-side auth check:**
```typescript
import { auth } from "@clerk/nextjs/server";

export async function protectedAction() {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }
  // ... rest of logic
}
```
-->

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
