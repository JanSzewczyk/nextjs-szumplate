---
paths:
  - "features/**/*.ts"
  - "features/**/*.tsx"
---

## Directory structure

```
features/{domain}/
├── components/
│   ├── forms/
│   ├── {component}.tsx
│   ├── {component}.stories.tsx
│   └── index.tsx                   # barrel — components only
├── constants/
├── schemas/
│   ├── {domain}-schema.ts          # Zod + exported *FormData types
│   └── {domain}-schema.test.ts
├── server/
│   ├── actions/
│   │   ├── {verb}-{domain}.action.ts
│   │   ├── logger.ts               # createLogger({ module: "domain-actions" })
│   │   ├── map-service-error.ts    # error code → Polish user message
│   │   └── {domain}-actions.test.ts
│   ├── db/
│   │   ├── schema.ts               # Drizzle tables + ORM-bound types
│   │   ├── queries.ts              # SELECT — SupabaseServiceResult<T>
│   │   ├── mutations.ts            # INSERT/UPDATE/DELETE
│   │   └── index.ts               # re-exports schema + queries + mutations
│   ├── services/
│   │   └── {domain}.service.ts     # orchestration only, no raw SQL
│   └── permissions.ts              # canDoX guard functions
├── types/
│   ├── {entity}.ts                 # shared types (see section below)
│   ├── {filter}.ts
│   └── index.ts                    # barrel — re-exports all types/
└── test/
    └── builders/
        ├── {entity}.builder.ts     # mimicry-js + faker
        └── index.ts
```

**No top-level `index.ts`** for the feature. Import from sub-paths directly:
- `import { TemplateCard } from "~/features/templates/components"` ✓
- `import { TemplateCard } from "~/features/templates"` ✗

---

## Server / client boundary

This is the most important architectural rule. Code is split into three zones:

| Zone | Directory | Notes |
|---|---|---|
| Server-only | `server/` | May contain `import "server-only"`. Must not be imported by client components. |
| Shared types | `types/` | No dependencies on `server/`. Safe to import from anywhere. |
| Universal | `components/`, `schemas/`, `constants/` | Used by both server and client code. Contains both server and client components. |

**Rule: client components (`"use client"`) must NEVER import from `server/`.**

Server modules often contain `import "server-only"` (services, permissions). Importing from them in a client component causes a build error. Even without `server-only`, importing Drizzle ORM types or server-side logic from client code is incorrect.

`schemas/` and `constants/` are used on both sides: Zod schemas validate data in server actions and in client-side form libraries; constants are consumed by server services, client components, and pages alike. They are not client-only.

### What to import from where

```ts
// ✓ client component — imports from types/ and components/
import { ProjectStatus, type ClientProjectListItem } from "~/features/projects/types/project";
import { ProjectStatusBadge } from "~/features/projects/components";

// ✓ server component / page — can import from server/ directly
import { getClientProjects } from "~/features/projects/server/services/projects.service";
import { ProjectStatus } from "~/features/projects/types/project";

// ✗ client component — never import from server/
import { ProjectStatus } from "~/features/projects/server/db/schema"; // WRONG
import { getClientProjects } from "~/features/projects/server/services/projects.service"; // WRONG
```

---

## `types/` — shared types between server and client

The `types/` directory is the **only** path from which client components may import domain types. All code (server and client) can freely import from here.

### What belongs in `types/`

| Type category | Example | Why here |
|---|---|---|
| Domain enum const + type | `ProjectStatus` | Used in component props and server queries alike |
| Service result / DTO types | `ClientProjectListItem`, `ClientProjectDetail` | Returned by services, received as component props |
| Public view types | `PublicProjectView` | Used in both server pages and client components |
| Filter / option types | `ProjectStatusFilter`, `ContractorListOptions` | Used in query params passed from server to components |
| Cross-domain list items | `ClientContractorListItem` | Passed from server to client card/table components |

### What stays in `server/db/schema.ts`

Types tightly coupled to Drizzle ORM must stay in `server/`:

| Type | Why it stays |
|---|---|
| `Project` (`BuildQueryResult` with relations) | Drizzle-specific — references ORM internals |
| `ProjectRow` (`$inferSelect`) | Raw DB row — internal to queries and services |
| `ProjectStep` (`$inferSelect`) | Raw DB row — internal to queries |
| `pgEnum` definitions | Required by Drizzle table definitions |

These types are used only inside `server/db/queries.ts` and `server/services/*.service.ts`. They never appear in component props.

### Pattern for domain enum const + type

Define the enum as a `const` object in `types/`, derive the type from it:

```ts
// features/projects/types/project.ts
export const ProjectStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED"
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectStatuses = Object.values(ProjectStatus) as Array<ProjectStatus>;
```

Do **not** annotate the const with `Record<ProjectStatus, ProjectStatus>` — this widens all values to the union and breaks computed-key records and `Extract<>` narrowing. The `as const` alone preserves literal types; `satisfies` can be added when an external constraint must be enforced without widening.

The corresponding `pgEnum` in `server/db/schema.ts` uses string literals directly and does not import from `types/`:

```ts
// features/projects/server/db/schema.ts
export const projectStatusEnum = pgEnum("project_status", [
  "DRAFT", "ACTIVE", "COMPLETED", "ARCHIVED", "DELETED"
]);
```

### `types/index.ts` barrel

Every `types/` directory must have an `index.ts` that re-exports all sub-files:

```ts
// features/projects/types/index.ts
export * from "./project";
export * from "./contractor";
export * from "./project-filter";
```

### Service re-exports

Services re-export the types they use so that callers have a single stable import point:

```ts
// features/projects/server/services/projects.service.ts
export type {
  ClientProjectListItem,
  ClientProjectDetail,
  ClientProjectStep,
  PublicProjectView
} from "~/features/projects/types/project";

export type {
  ClientContractorListItem,
  ContractorListOptions,
  ContractorListResult
} from "~/features/projects/types/contractor";
```

This is optional but useful when the service is the only entry-point callers know. The underlying types still live in `types/`.

---

## Layer dependency rules (one direction only)

```
Action → Service → Permission → DB
             ↓              ↓
           Schema (Zod)   DB schema (Drizzle)

types/ ← imported by all layers, no restriction
```

Each layer imports only downward — never from the layer above.
`types/` is the exception: it has no dependencies of its own (no imports from `server/`) and may be imported by any layer.

---

## Return types per layer

| Layer | Type |
|---|---|
| DB queries / mutations | `SupabaseServiceResult<T>` → `[SupabaseServiceError, null] \| [null, T]` |
| Permissions | `SupabaseServiceResult<void>` |
| Service reads | `SupabaseServiceResult<T>` — wrap with `React.cache()` |
| Service mutations | `ServiceResult<BaseServiceError, T>` |
| Actions | `ActionResponse<T>` from `~/lib/action-types` |

Import sources:
- `~/lib/supabase/errors` — `SupabaseServiceResult`, `SupabaseServiceError`, `categorizeSupabaseError`
- `~/lib/services/errors` — `ServiceResult`, `BaseServiceError`
- `~/lib/action-types` — `ActionResponse`, `RedirectAction`, `isActionSuccess`, `isActionFailed`

---

## Service mutation guard chain (always in this order)

```ts
const [roleErr] = await requireRole(userId, [Role.CONTRACTOR]);
if (roleErr) return [roleErr, null];

const [profileErr, profile] = await getCachedContractorProfile(userId);
if (profileErr) return [profileErr, null];

// feature-specific permission guard (canDoX from permissions.ts)
const [permErr] = await canAddTemplate(profile.id);
if (permErr) return [permErr, null];

// DB mutation
const [dbErr, result] = await ...;
if (dbErr) return [dbErr, null];

return [null, result];
```

---

## Action pattern

```ts
"use server";
export async function createTemplateAction(data: TemplateFormData): ActionResponse<Template> {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) return { success: false, error: "Nie jesteś zalogowany" };

  const [error, template] = await createTemplate(userId, data);
  if (error) return mapTemplateServiceError(error);

  revalidatePath("/app/templates");
  return { success: true, data: template, message: "Szablon został utworzony" };
}
```

- No business logic in actions — delegate entirely to the service.
- `revalidatePath` only on success.
- `map-service-error.ts` translates `BaseServiceError.code` to Polish user strings. Never expose internal codes.

---

## Components

The `components/` directory holds **both server and client components**. There is no hard rule that all components here are one or the other — each file is what it needs to be. Names are domain-driven and descriptive, not constrained to a fixed pattern. Subdirectories (e.g. `forms/`, `portal/`) are used when grouping makes sense.

### Server vs client

Default to **Server Components** — no directive, can be `async`. Add `"use client"` only when the component requires:
- React hooks (`useState`, `useEffect`, `useTransition`, etc.)
- Browser APIs (`window`, `navigator`, `document`)
- Event handlers that can't be passed down as server action props

```ts
// server component — no directive, can be async, can import from server/
export function ProjectProgressBar({ totalSteps, completedSteps }: Props) { ... }

// client component — requires interactivity
"use client";
export function ProjectSidebar({ project, onUpdateStatusAction }: Props) { ... }

// client component — requires useEffect for browser API
"use client";
export function ClientTracker({ token, onTrackAction }: Props) {
  React.useEffect(() => { void onTrackAction(token); }, [token, onTrackAction]);
  return null;
}
```

### Import rules inside components

| Component type | Can import from `server/`? | Can import from `types/`? |
|---|---|---|
| Server component | ✓ Yes | ✓ Yes |
| Client component (`"use client"`) | ✗ Never | ✓ Yes |

Server actions are passed as props to client components from the page or layout — client components do not import actions directly.

```ts
// ✓ page (server) — wires action as prop
<ProjectSidebar onUpdateStatusAction={updateProjectStatusAction} />

// ✓ client component — receives action as prop, types from types/ only
type Props = { onUpdateStatusAction(id: string, status: ProjectStatus): ActionResponse<void> };
```

### Other rules

- Never add `useMemo` / `useCallback` / `memo` — React Compiler handles memoization automatically.
- Button icons: use `startIcon` / `endIcon` props, not children.
- Forms: React Hook Form + Zod resolver for complex forms; `useActionState` for simple ones.
- Co-locate `{component}.stories.tsx` next to every component file.
- The `components/index.tsx` barrel exports named component exports only — no types, no re-exports from `server/`.

---

## DB layer rules

- `categorizeSupabaseError(error, "ResourceName")` in every `catch` block — never throw across layer boundaries.
- Register new tables in `lib/supabase/schema.ts`.
- Logger: `createLogger({ module: "domain-db" })`.
- DTO/view types (the shape returned to callers) live in `types/`, not in `queries.ts`. Query functions import them from `types/` for their return type annotations.

### DB function signature

Every DB function takes a **single object argument** including `dbClient?: DbClient`:

```ts
import { db, type DbClient } from "~/lib/supabase/db";

export async function updateFoo({
  fooId,
  data,
  dbClient = db
}: {
  fooId: string;
  data: FooData;
  dbClient?: DbClient;
}): Promise<SupabaseServiceResult<Foo>> { ... }
```

### Transaction ownership

**Transactions belong to the service layer, not the DB layer.**

```ts
import { withTransaction } from "~/lib/supabase/db";
import { categorizeSupabaseError } from "~/lib/supabase/errors";

try {
  await withTransaction(async (tx) => {
    const [aErr, a] = await insertA({ data, dbClient: tx });
    if (aErr) throw aErr; // rolls back

    const [bErr] = await updateB({ id: a.id, dbClient: tx });
    if (bErr) throw bErr;
  });
} catch (error) {
  const serviceError = categorizeSupabaseError(error, "ResourceName");
  logger.error({ userId, operation: "...", errorCode: serviceError.code }, "Transaction failed");
  return [serviceError, null];
}
```

### Cross-entity DB operations

DB functions that touch an entity owned by another feature live in
`features/shared/server/db/{entity}/mutations.ts` (or `queries.ts`).

```ts
import { insertAddress, updateAddress, deleteAddress } from "~/features/shared/server/db/addresses";
```

---

## Permissions file

```ts
import "server-only";

export async function canAddTemplate(contractorId: string): Promise<SupabaseServiceResult<void>> {
  if (overLimit) return [SupabaseServiceError.limitExceeded(max), null];
  return [null, undefined];
}
```

---

## Test builders

```ts
export const templateBuilder = build<Template>({
  fields: {
    id: () => faker.string.uuid(),
    contractorId: () => faker.string.uuid(),
    name: () => faker.lorem.words(3),
    ...
  },
  traits: { noDescription: { overrides: { description: null } } }
});
```

One builder per entity. Export all from `test/builders/index.ts`.

Builders for types from `types/` import from `types/`, not from `server/`:

```ts
// ✓
import { ProjectStatus, type PublicProjectView } from "~/features/projects/types/project";

// ✗ — builder runs in test environment, must not import from server/
import { ProjectStatus } from "~/features/projects/server/db/schema";
```

---

## Logging

```ts
const logger = createLogger({ module: "templates-service" });
logger.info({ userId, templateId }, "Template created successfully");
logger.error({ userId, operation: "createTemplate", errorCode: err.code }, "DB insert failed");
```

Always include `userId`, `operation`, and `errorCode` on failures. Log at the layer where the error originates — do not re-log the same error higher up.

---

## New feature checklist

- [ ] `types/{entity}.ts` — domain const+type enums, DTO types, filter types
- [ ] `types/index.ts` — barrel re-exporting all type files
- [ ] `schemas/{domain}-schema.ts` — Zod + `*FormData` types
- [ ] `server/db/schema.ts` — Drizzle tables + ORM-bound types, registered in `lib/supabase/schema.ts`
- [ ] `server/db/queries.ts` + `mutations.ts` + `index.ts`
- [ ] `server/permissions.ts` — `canDoX` guards
- [ ] `server/services/{domain}.service.ts` — guard chain, `cache()` on reads, re-export shared types
- [ ] `server/actions/{verb}-{domain}.action.ts` — thin, auth check, revalidate
- [ ] `server/actions/map-service-error.ts` + `logger.ts`
- [ ] `components/` — co-located stories, no imports from `server/` in client components
- [ ] `test/builders/` — builders import from `types/`, not from `server/`
- [ ] Schema unit tests + action unit tests
