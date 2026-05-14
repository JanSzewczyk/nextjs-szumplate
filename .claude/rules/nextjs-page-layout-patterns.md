---
paths:
  - "app/**/*.tsx"
  - "app/**/*.ts"
---

# Next.js App Router — Page and Layout Patterns

Rules for creating `page.tsx` and `layout.tsx` files using the App Router with React Server Components.

---

## page.tsx structure

### 1. Static metadata (list pages)

```ts
export const metadata: Metadata = {
  title: "Page Title"
};
```

### 2. Dynamic metadata (detail pages with `[param]`)

```ts
export async function generateMetadata({ params }: PageProps<"/route/[id]">): Promise<Metadata> {
  const { id } = await params;
  const [, resource] = await getResource({ id }); // silent — no error handling here
  return { title: resource?.name ?? "Fallback Title" };
}
```

- Call the same data function as `loadData` — `React.cache()` deduplicates the fetch.
- Never throw or redirect inside `generateMetadata` — return a fallback title instead.

### 3. `loadData` function

Every page that fetches data must use a `loadData` helper. Never call data functions directly in the component body.

```ts
const logger = createLogger({ module: "resource-detail-page" });

async function loadData({ id }: { id: string }) {
  // 1. Auth guard (protected pages only)
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    logger.error("User not authenticated");
    redirect("/sign-in");
  }

  // 2. Fetch data
  const [error, resource] = await getResource({ ownerId: userId, resourceId: id });

  // 3. Error handling
  if (error) {
    logger.error({ userId, id, errorCode: error.code }, "Failed to load resource detail");
    notFound(); // or: redirect("/...") or: throw error
  }

  // 4. Success log
  logger.info({ userId, id }, "Successfully loaded resource detail");
  return { resource };
}
```

**Error response by case:**

| Situation | Response |
|-----------|----------|
| Resource not found | `notFound()` |
| User not authenticated | `redirect("/sign-in")` |
| Permission denied | `notFound()` (never expose the reason) |
| Unexpected server error | `throw error` (caught by error boundary) |

### 4. Page component

```ts
export default async function ResourceDetailPage({ params }: PageProps<"/app/resources/[id]">) {
  const { id } = await params;
  const { resource } = await loadData({ id });

  return (
    <div>
      {/* UI — compose from feature components, no inline business logic */}
    </div>
  );
}
```

Rules:
- Always `async` — never mark a page as `"use client"`.
- Destructure `params` / `searchParams` with `await` (Next.js 15+).
- Keep JSX thin — delegate rendering to feature components.
- Pass server actions as props to client components (do not import them inside client components directly when the page can control the wiring).
- Do not create `*PageContent` wrapper components — compose UI directly in the page.

### 5. Search params handling

Parse and validate before use. Never read raw search params inside components — do it in `loadData`.

```ts
async function loadData(searchParams: PageProps<"/app/resources">["searchParams"]) {
  // ...auth...
  const params = await searchParams;
  const { search, page } = parseSearchParams(params); // project utility
  // ...fetch with parsed params...
}
```

### 6. Logging conventions

- Module-level logger: `const logger = createLogger({ module: "resource-page" })`
- Always include `userId` and `errorCode` on error logs.
- Always include `userId` and the loaded resource identifier on success logs.
- Log only at the layer where the error originates — do not re-log higher up.

---

## layout.tsx structure

Layouts follow the same standards as pages: `LayoutProps<"...">` type, `loadData` always present, module-level logger, and consistent error handling.

### 1. `LayoutProps` type

Use `LayoutProps<"/route">` for typing. Always destructure `children`. Add `params` only when the layout has a dynamic segment.

```tsx
// No dynamic segment
export default async function GroupLayout({ children }: LayoutProps<"/app">) {
  await loadData();
  return <div>{children}</div>;
}

// Dynamic segment — destructure params with await
export default async function GroupLayout({ children, params }: LayoutProps<"/app/workspaces/[workspaceId]">) {
  const { workspaceId } = await params;
  const { workspace } = await loadData({ workspaceId });
  return <div data-workspace={workspace.id}>{children}</div>;
}
```

### 2. `loadData` — always required

Every layout must have a `loadData` function. It fetches only the data needed for **chrome** (navigation, header badges, sidebar state). Page-specific data always stays in `page.tsx`. Same rules as page `loadData` — auth guard, error handling, logging.

```ts
const logger = createLogger({ module: "workspace-layout" });

async function loadData({ workspaceId }: { workspaceId: string }) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    logger.error("User not authenticated");
    redirect("/sign-in");
  }

  const [error, workspace] = await getWorkspace({ ownerId: userId, workspaceId });
  if (error) {
    logger.error({ userId, workspaceId, errorCode: error.code }, "Failed to load layout chrome data");
    notFound();
  }

  logger.info({ userId, workspaceId }, "Successfully loaded layout chrome data");
  return { workspace };
}
```

### 3. Layout with auth guard but no resource data

When the layout only verifies auth without loading a resource, `loadData` handles the guard and returns nothing.

```ts
const logger = createLogger({ module: "app-layout" });

async function loadData() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    logger.error("User not authenticated");
    redirect("/sign-in");
  }

  logger.info({ userId }, "Layout auth guard passed");
}
```

### 4. Layout with optional / non-critical data

When some chrome data is non-critical (failure degrades gracefully), fetch it silently inside `loadData` — no separate error handling for that specific call.

```ts
const logger = createLogger({ module: "app-layout" });

async function loadData() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    logger.error("User not authenticated");
    redirect("/sign-in");
  }

  const [, plan] = await getUserPlan({ userId }); // silent — nav badge degrades gracefully

  logger.info({ userId }, "Successfully loaded layout chrome data");
  return { plan };
}
```

### 5. When to skip layout.tsx and put chrome inline in page.tsx

Skip `layout.tsx` when:
- There is only one route in the group and a shared layout adds no value.
- The chrome is per-resource (e.g. depends on data loaded by the page's own `loadData`).
- The page needs dynamic CSS variable overrides that depend on fetched data.

In this case apply `loadData` and logging directly in `page.tsx` as usual, and render chrome (header, footer) inline:

```tsx
export default async function Page({ params }: PageProps<"/public/[token]">) {
  const { token } = await params;
  const { resource } = await loadData({ token });

  return (
    <div
      className="flex min-h-screen flex-col"
      style={resource.brandColor ? ({ "--primary": resource.brandColor } as React.CSSProperties) : undefined}
    >
      <Header />
      <main className="flex-1">{/* content */}</main>
      <Footer />
    </div>
  );
}
```

---

## Choosing a layout strategy

| Situation | Strategy |
|-----------|----------|
| Multiple routes share the same chrome | `layout.tsx` in the route group |
| Chrome requires data from route params | `async` layout with `loadData` |
| Chrome requires non-critical data | `async` layout, silent fetch (no error handling) |
| Chrome requires no data | Synchronous layout, no `loadData` |
| Single route with per-resource chrome | Skip `layout.tsx`, render chrome inline in `page.tsx` |
| Route is public and middleware allowlists it | No auth guard in layout — guard in `loadData` only if data requires it |

---

## Quick checklist before creating a new page or layout

**Page (`page.tsx`):**
- [ ] `loadData()` function declared — no data fetching in the component body
- [ ] `createLogger({ module: "..." })` at module level
- [ ] Auth guard at the top of `loadData` (protected routes)
- [ ] Errors handled with the correct response: `notFound()` / `redirect()` / `throw`
- [ ] Success and error logs with correct context fields
- [ ] `generateMetadata` uses the same data function (silent, no throw)
- [ ] Params and search params destructured with `await`
- [ ] No `*PageContent` wrapper component — UI composed directly in the page
- [ ] New components placed in `features/{domain}/components/`, not in the route folder

**Layout (`layout.tsx`):**
- [ ] `LayoutProps<"/route">` used for typing (with `await params` for dynamic segments)
- [ ] `loadData()` fetches only chrome data — no page-specific data
- [ ] Same logging and error handling conventions as pages
- [ ] Auth guard present if the route group is protected
- [ ] No page-specific business logic — layout is chrome only
