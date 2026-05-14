---
paths:
  - "**/server/**/*.ts"
---

# Database Patterns

Canonical implementations for Drizzle ORM + PostgreSQL (Supabase) in this project.
Reference these files and patterns exactly — do not invent alternatives.

## Layer responsibilities

```
DB layer    → single SQL operation per function, no orchestration
Service     → orchestration, guard chain, transactions, cache()
```

DB functions never call other DB functions. If two SQL operations must be atomic, the service uses `withTransaction` — not the DB layer.

---

## Imports (copy exactly)

```ts
// DB layer
import { db, type DbClient } from "~/lib/supabase/db";
import { categorizeSupabaseError, SupabaseServiceError, type SupabaseServiceResult } from "~/lib/supabase/errors";

// Service layer (mutations)
import { withTransaction } from "~/lib/supabase/db";
import { categorizeSupabaseError } from "~/lib/supabase/errors";
import { type BaseServiceError, type ServiceResult } from "~/lib/services/errors";

// Service layer (reads)
import { cache } from "react";
```

Sources: `lib/supabase/db.ts:16–22`, `lib/supabase/errors.ts:170`

---

## Schema

Every table: `$inferSelect` for the read type, no separate type definitions.

```ts
// features/templates/server/db/schema.ts
export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  contractorId: varchar("contractor_id", { length: 255 })
    .notNull()
    .references(() => contractorProfile.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  steps: jsonb("steps").$type<Array<TemplateStep>>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export type TemplateStep = { title: string; description: string | null; orderIndex: number };
export type Template = typeof templates.$inferSelect;
```

Embedded jsonb types are defined **before** the table so `.$type<Array<TemplateStep>>()` can reference them. Export the type alongside the table — never duplicate it in mutations or queries.

Register every new table in `lib/supabase/schema.ts`.

Relations (for `with:` queries) go in a separate `relations()` call in the same file:

```ts
// features/contractor/server/db/contractor-profile/schema.ts:25–30
export const contractorProfileRelations = relations(contractorProfile, ({ one }) => ({
  address: one(addresses, {
    fields: [contractorProfile.addressId],
    references: [addresses.id]
  })
}));
```

---

## DB function signature

Every function takes **one object argument** containing `dbClient?: DbClient = db`. This lets the same function run standalone or inside a transaction without any change at the call site.

```ts
export async function updateTemplate({
  id,
  updateInput,
  dbClient = db
}: {
  id: string;
  updateInput: Pick<Template, "name" | "description" | "steps">;
  dbClient?: DbClient;
}): Promise<SupabaseServiceResult<Template>>
```

Source: `features/templates/server/db/mutations.ts:47–55`

Parameter types are **derived from the Drizzle type**, never hand-written:
- `Pick<Table, "col1" | "col2">` for a subset
- `Partial<Pick<Table, ...>>` for optional updates
- `Pick<Table, "col">` alone when the embedded type is needed (e.g. `TemplateStep`)

See `features/contractor/server/db/contractor-profile/mutations.ts:12–13` for a `Partial` union example.

---

## Mutations (single SQL, no transaction)

Standard shape — every function logs at origin, returns `[error, null] | [null, result]`:

```ts
export async function createTemplate({
  contractorId,
  createTemplateData,
  dbClient = db
}: {
  contractorId: string;
  createTemplateData: Pick<Template, "name" | "description" | "steps">;
  dbClient?: DbClient;
}): Promise<SupabaseServiceResult<Template>> {
  try {
    const [row] = await dbClient.insert(templates).values({ contractorId, ...createTemplateData }).returning();

    if (!row) {
      const error = SupabaseServiceError.unknown("Failed to insert template — no row returned");
      logger.error({ contractorId, errorCode: error.code }, "Insert returned no rows");
      return [error, null];
    }

    logger.info({ contractorId, templateId: row.id }, "Created template");
    return [null, row];
  } catch (error) {
    const serviceError = categorizeSupabaseError(error, RESOURCE_NAME);
    logger.error({ contractorId, errorCode: serviceError.code }, "Failed to create template");
    return [serviceError, null];
  }
}
```

Source: `features/templates/server/db/mutations.ts:12–44`

Always end with `RESOURCE_NAME` constant at the top of the file (`const RESOURCE_NAME = "Template"`). Use `categorizeSupabaseError` in every `catch` — never throw across layer boundaries.

### Upsert pattern

```ts
// features/contractor/server/db/contractor-profile/mutations.ts:25–32
await dbClient
  .insert(contractorProfile)
  .values({ id: contractorId, ...data, updatedAt: new Date() })
  .onConflictDoUpdate({ target: contractorProfile.id, set: { ...data, updatedAt: new Date() } })
  .returning();
```

---

## Queries

### getById

```ts
export async function getTemplateById({
  templateId,
  dbClient = db
}: {
  templateId: string;
  dbClient?: DbClient;
}): Promise<SupabaseServiceResult<Template>> {
  try {
    const [template] = await dbClient.select().from(templates).where(eq(templates.id, templateId));
    if (!template) return [SupabaseServiceError.notFound("Template"), null];
    return [null, template];
  } catch (error) {
    const serviceError = categorizeSupabaseError(error, "Template");
    logger.error({ templateId, errorCode: serviceError.code }, "Failed to get template");
    return [serviceError, null];
  }
}
```

Source: `features/templates/server/db/queries.ts:29–51`

### Query with relations (`with:`)

Use `dbClient.query.<table>.findFirst()` when the schema has a `relations()` definition:

```ts
// features/contractor/server/db/contractor-profile/queries.ts:25–28
const row = await dbClient.query.contractorProfile.findFirst({
  where: eq(contractorProfile.id, contractorId),
  with: { address: true }
});
```

Return type via `BuildQueryResult`:

```ts
// features/contractor/server/db/contractor-profile/queries.ts:15
export type ContractorProfile = BuildQueryResult<TSchema, TSchema["contractorProfile"], { with: { address: true } }>;
```

Where `TSchema` comes from `~/lib/supabase/types`. Use this pattern when a query includes relations — do not manually compose the type.

### Paginated list

Fetch rows + count in `Promise.all`. Compute derived fields from fetched data, not SQL:

```ts
// features/templates/server/db/queries.ts:86–114
const [rows, countResult] = await Promise.all([
  dbClient.select().from(templates).where(whereClause).orderBy(desc(templates.updatedAt)).limit(perPage).offset(offset),
  dbClient.select({ value: count() }).from(templates).where(whereClause)
]);

const items = rows.map((row) => ({
  stepsCount: row.steps.length,          // computed from jsonb, not a subquery
  previewSteps: row.steps.slice(0, 3).map((s) => s.title),
  ...
}));
```

### Cached reads

Wrap with React `cache()` at the **query function level** for request deduplication:

```ts
// features/contractor/server/db/contractor-profile/queries.ts:44
export const getCachedContractorProfile = cache(getContractorProfile);
```

---

## Transactions (service layer only)

Use `withTransaction` from `~/lib/supabase/db`. Pass `tx` as `dbClient` to each DB function. Throw on error to trigger rollback — `categorizeSupabaseError` in the outer `catch` handles both Postgres errors and re-thrown `SupabaseServiceError` instances.

```ts
// features/contractor/server/services/company-profile.service.ts:87–130
try {
  await withTransaction(async (tx) => {
    if (address === null) {
      const [profErr] = await updateContractorProfile({ contractorId, data: { ...fields, addressId: null }, dbClient: tx });
      if (profErr) throw profErr;

      if (existingAddressId) {
        const [delErr] = await deleteAddress({ addressId: existingAddressId, dbClient: tx });
        if (delErr) throw delErr;
      }
    } else if (!existingAddressId) {
      const [addrErr, addr] = await insertAddress({ data: address, dbClient: tx });
      if (addrErr) throw addrErr;

      const [profErr] = await updateContractorProfile({ contractorId, data: { ...fields, addressId: addr.id }, dbClient: tx });
      if (profErr) throw profErr;
    } else {
      const [addrErr] = await updateAddress({ addressId: existingAddressId, data: address, dbClient: tx });
      if (addrErr) throw addrErr;

      const [profErr] = await updateContractorProfile({ contractorId, data: fields, dbClient: tx });
      if (profErr) throw profErr;
    }
  });
} catch (error) {
  const serviceError = categorizeSupabaseError(error, "CompanyProfile");
  logger.error({ userId, operation: "updateCompanyProfile", errorCode: serviceError.code }, "Transaction failed");
  return [serviceError, null];
}
```

After a successful transaction, **re-fetch** to return fresh data (not the pre-transaction snapshot):

```ts
// features/contractor/server/services/company-profile.service.ts:132
const [fetchErr, updated] = await getContractorProfile({ contractorId: userId });
```

---

## Cross-feature DB operations

DB functions that touch an entity owned by another feature live in `features/shared/server/db/{entity}/mutations.ts`. Never copy SQL into the calling feature.

```ts
// features/shared/server/db/addresses/mutations.ts
export async function insertAddress({ data, dbClient = db }: { data: AddressData; dbClient?: DbClient })
export async function updateAddress({ addressId, data, dbClient = db }: ...)
export async function deleteAddress({ addressId, dbClient = db }: ...)
```

Imported in the service as:

```ts
// features/contractor/server/services/company-profile.service.ts:12
import { deleteAddress, insertAddress, updateAddress } from "~/features/shared/server/db/addresses";
```

---

## Multi-step mutations without transaction

When the second operation cannot leave partial state on failure (e.g. read-then-insert for duplication), no transaction is needed. Logic belongs in the **service**, not the DB layer:

```ts
// features/templates/server/services/templates.service.ts — duplicateTemplate
// existing comes from checkOwnership (already fetched — no extra SELECT)
const [createErr, template] = await createTemplateDb({
  contractorId: existing.contractorId,
  createTemplateData: {
    name: `[Kopia] ${existing.name}`,
    description: existing.description,
    steps: existing.steps         // jsonb copied as-is
  }
});
```

---

## Return type summary

| Layer | Return type | Import |
|-------|------------|--------|
| DB queries / mutations | `SupabaseServiceResult<T>` = `[SupabaseServiceError, null] \| [null, T]` | `~/lib/supabase/errors` |
| Service reads | `SupabaseServiceResult<T>` wrapped in `cache()` | same |
| Service mutations | `ServiceResult<BaseServiceError, T>` | `~/lib/services/errors` |

`ServiceResult` is the same tuple shape. The distinction is that mutations use the wider `BaseServiceError` (service layer can surface non-DB errors like permission failures).
