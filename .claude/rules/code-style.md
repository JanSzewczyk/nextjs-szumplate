# Code Style

Conventions for writing code in this project.

## Function declarations

Always use the `function` keyword to define functions. Never use arrow function expressions for named functions.

```typescript
// ✓
function handleSubmit(data: FormData) {
  // ...
}

function formatDate(date: Date): string {
  return date.toISOString();
}

// ✗
const handleSubmit = (data: FormData) => {
  // ...
};

const formatDate = (date: Date): string => date.toISOString();
```

Inline arrow functions are allowed only where a callback is expected (e.g. `array.map`, `array.filter`, event handlers passed as JSX props).

```typescript
// ✓ — inline callback
const sorted = steps.sort((a, b) => a.orderIndex - b.orderIndex);
```

### Function types in object types

Use method signature syntax instead of arrow function property types.

```typescript
// ✓
type ProjectSidebarProps = {
  onUpdateStatusAction(
    projectId: string,
    newStatus: ProjectStatus,
  ): ActionResponse<void>;
  onDeleteAction(projectId: string): RedirectAction;
};

// ✗
type ProjectSidebarProps = {
  onUpdateStatusAction: (
    projectId: string,
    newStatus: ProjectStatus,
  ) => ActionResponse<void>;
  onDeleteAction: (projectId: string) => RedirectAction;
};
```

## React import

Always import React as a namespace: `import * as React from "react"`. Access all React exports through the namespace (e.g. `React.cache`, `React.useState`, `React.useEffect`). Never use default import and never import React members as named imports.

```typescript
// ✓
import * as React from "react";

React.cache(fn);
React.useState(0);
React.useEffect(() => { ... }, []);

// ✗
import React from "react";
import React, { cache, useState } from "react";
import { cache } from "react";
```

## Array types in TypeScript

Always use the generic form `Array<Type>` instead of the shorthand notation `Type[]`.

```typescript
// ✓
Array<string>
Array<ProjectStep>
Array<{ id: string; name: string }>

// ✗
string[]
ProjectStep[]
{ id: string; name: string }[]
```

Applies to all contexts: component props, function signatures, variable types, return types.

## Conditional rendering

Always use the ternary operator for conditional rendering. Never use `&&` short-circuit.

```tsx
// ✓
{
  condition ? <Component /> : null;
}

// ✗
{
  condition && <Component />;
}
```

**Why:** `&&` with falsy non-boolean values (e.g. `0`, `""`) renders the value itself instead of nothing. The ternary is always explicit and safe.

This applies to all conditional expressions in JSX — single elements, fragments, and inline text.

```tsx
// ✓
{
  items.length > 0 ? <List items={items} /> : null;
}
{
  error ? <p className="text-error">{error}</p> : null;
}
{
  isActive ? "Active" : null;
}

// ✗
{
  items.length > 0 && <List items={items} />;
}
{
  error && <p className="text-error">{error}</p>;
}
```

## Enum const objects

When a domain defines a paired `type` + `const` enum object (e.g. `ProjectStatus`), always use the const object's properties for values and `Extract<EnumType, ...>` for narrowed parameter types. Never use raw string literals.

```typescript
// ✓
status: ProjectStatus.DRAFT
if (status === ProjectStatus.ACTIVE) { ... }
const TRANSITIONS: Partial<Record<ProjectStatus, ProjectStatus>> = {
  [ProjectStatus.DRAFT]: ProjectStatus.ACTIVE,
};
newStatus: Extract<ProjectStatus, "ACTIVE" | "COMPLETED">

// ✗
status: "DRAFT"
if (status === "ACTIVE") { ... }
const TRANSITIONS = { DRAFT: "ACTIVE" };
newStatus: "ACTIVE" | "COMPLETED"
```
