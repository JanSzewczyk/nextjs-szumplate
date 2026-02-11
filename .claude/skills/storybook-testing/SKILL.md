---
name: storybook-testing
version: 3.0.0
lastUpdated: 2026-01-18
description:
  Create comprehensive Storybook stories with interactive tests for React components using CSF Next format and .test()
  method. Use when writing component tests, interaction tests, or documenting component behavior.
tags: [testing, storybook, react, component-testing, integration-testing, test-method, csf-next]
author: Szum Tech Team
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
user-invocable: true
examples:
  - Write Storybook tests for UserProfileCard component
  - Create story tests for my LoginForm
  - Add Storybook testing to the ProductCard component
  - Generate comprehensive Storybook stories with tests for NavBar
---

# Storybook Testing Skill

Generate comprehensive Storybook stories with interactive tests using CSF Next format and `.test()` method for React
components.

> **Reference Files:**
>
> - [test-method-optimization.md](./test-method-optimization.md) - **NEW:** `.test()` method guide and optimization
>   patterns
> - [patterns.md](./patterns.md) - Testing patterns and examples
> - [best-practices.md](./best-practices.md) - Best practices and common pitfalls
> - [examples.md](./examples.md) - Practical code examples
> - [templates.md](./templates.md) - Component test templates
> - [design-system.md](./design-system.md) - Testing @szum-tech/design-system components
> - [api-reference.md](./api-reference.md) - Complete API documentation

## Context

This project uses **Storybook 10+ with CSF Next format** - the latest Component Story Format with factory functions for
full type safety.

Stories are used for:

- **Component testing** - Test components in isolation
- **Interaction testing** - Verify user interactions (clicks, typing)
- **Validation testing** - Test form validation and error states
- **Accessibility testing** - Verify a11y with addon

## Workflow

1. **Analyze component** - Props, interactions, states, callbacks
2. **Create story file** - Same directory as component: `component.stories.tsx`
3. **Write minimal stories** - 1-2 stories for different component states
4. **Add multiple tests** - Use `.test()` method for each test case
5. **Run tests** - `npm run test:storybook`

## ⭐ Preferred Pattern: `.test()` Method

**IMPORTANT:** Use `.test()` method to add multiple tests to a single story instead of creating separate test stories.

### Why `.test()` Over Multiple Stories?

- ✅ **Fewer stories** - 80% reduction in story count
- ✅ **Better isolation** - Each test is independent
- ✅ **Clearer intent** - Test names describe behavior
- ✅ **Better reporting** - Individual test results in Storybook UI
- ✅ **Less boilerplate** - No repeated `meta.story()` calls

## CSF Next Format

CSF Next uses factory functions that provide full type safety:

```
definePreview → preview.meta → meta.story
```

### Story File Structure (Using `.test()` Method)

```typescript
import { expect, fn, waitFor } from "storybook/test";

import preview from "~/.storybook/preview";

import { SubmitButton } from "./submit-button";

const meta = preview.meta({
  title: "Components/SubmitButton",
  component: SubmitButton,
  args: {
    onClick: fn()
  }
});

// Story named after component (single story)
export const SubmitButton = meta.story({});

// Test 1: Rendering
SubmitButton.test("Renders button with correct text", async ({ canvas }) => {
  const button = canvas.getByRole("button", { name: /submit/i });
  await expect(button).toBeVisible();
});

// Test 2: Interaction
SubmitButton.test("Clicking button triggers onClick", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalled();
});

// Test 3: Accessibility
SubmitButton.test("Button has correct ARIA label", async ({ canvas }) => {
  const button = canvas.getByRole("button", { name: /submit/i });
  await expect(button).toHaveAccessibleName();
});
```

> **Note:** Story is named `SubmitButton` (same as component) because this is the only story for the component.

### When to Use `play` Instead of `.test()`

Use `play` function **only** for:

- Complex multi-step user flows that should be viewed as ONE cohesive test
- Integration test scenarios
- Demos for Storybook UI

```typescript
// Example: Use play for complete user journey
export const CompleteCheckoutFlow = meta.story({
  name: "Complete Checkout Journey",
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Add to cart", async () => {
      /* ... */
    });
    await step("Proceed to checkout", async () => {
      /* ... */
    });
    await step("Complete payment", async () => {
      /* ... */
    });
  }
});
```

### Key Differences from CSF 3.0

| CSF 3.0                                     | CSF Next                                     |
| ------------------------------------------- | -------------------------------------------- |
| `import type { Meta, StoryObj }`            | `import preview from "~/.storybook/preview"` |
| `const meta = { } satisfies Meta<typeof C>` | `const meta = preview.meta({ })`             |
| `export default meta`                       | No default export needed                     |
| `type Story = StoryObj<typeof meta>`        | Types inferred automatically                 |
| `export const Story: Story = { }`           | `export const Story = meta.story({ })`       |

## Story Naming Conventions

**Stories** represent component states - use descriptive, specific names:

### Single Story Components

If component has only ONE story, name it after the **component itself**:

- `LoginForm` - For LoginForm component (not "Default")
- `UserCard` - For UserCard component (not "Default")
- `SearchInput` - For SearchInput component (not "Default")

### Multiple Story Components

If component has multiple stories, use **descriptive state names**:

- `EmptyForm` / `FilledForm` - Empty vs populated states
- `LoadingButton` / `IdleButton` - Loading vs idle states
- `ErrorState` / `SuccessState` - Different result states
- `DisabledInput` / `EnabledInput` - Disabled vs enabled states

### Visual Variant Stories

For visual documentation (styles, themes):

- `Primary` / `Secondary` / `Destructive` - Button variants
- `Small` / `Medium` / `Large` - Size variants
- `Light` / `Dark` - Theme variants

**❌ Avoid:** Generic names like `Default`, `Basic`, `Example` **✅ Prefer:** Specific names that describe the component
or state

---

**Tests** describe specific behaviors (use `.test()` method):

- `"Renders heading and description"` - What renders
- `"Shows validation error on empty submit"` - Validation behavior
- `"Clicking button triggers callback"` - Interaction behavior
- `"Keyboard navigation works with arrow keys"` - Accessibility behavior

### Examples

#### Single Story Component

```typescript
// Component: UserCard
// Story: Named after component
export const UserCard = meta.story({});

// Tests: Specific behaviors
UserCard.test("Renders user name and avatar", async ({ canvas }) => { ... });
UserCard.test("Clicking card triggers onSelect", async ({ canvas }) => { ... });
UserCard.test("Shows verified badge for verified users", async ({ canvas }) => { ... });
```

#### Multiple Story Component

```typescript
// Component: LoginForm
// Story 1: Empty form state
export const EmptyForm = meta.story({});

EmptyForm.test("Renders email and password fields", async ({ canvas }) => { ... });
EmptyForm.test("Shows validation on empty submit", async ({ canvas }) => { ... });

// Story 2: Pre-filled form state
export const FilledForm = meta.story({
  args: { defaultValues: { email: "user@example.com" } }
});

FilledForm.test("Displays pre-filled email", async ({ canvas }) => { ... });
FilledForm.test("Can modify pre-filled values", async ({ canvas }) => { ... });
```

## Play Function Parameters

- `canvas` - Testing Library queries scoped to component
- `canvasElement` - Raw DOM element (for portal queries)
- `userEvent` - Pre-configured interaction methods
- `args` - Story args (props)
- `step` - Group assertions into named steps

## Using Test Builders

**Always prefer builders over inline mock data:**

```typescript
import { expect, fn } from "storybook/test";

import preview from "~/.storybook/preview";

import { userBuilder } from "~/features/*/test/builders";

import { UserCard } from "./user-card";

const meta = preview.meta({
  component: UserCard,
  args: {
    onSubmit: fn()
  }
});

// Story named after component (single story with data)
export const UserCard = meta.story({
  args: {
    user: userBuilder.one()
  }
});

// Multiple tests for that story
UserCard.test("Renders user name correctly", async ({ canvas, args }) => {
  const name = canvas.getByText(args.user.name);
  await expect(name).toBeVisible();
});

UserCard.test("Displays user avatar", async ({ canvas }) => {
  const avatar = canvas.getByRole("img", { name: /avatar/i });
  await expect(avatar).toBeVisible();
});

UserCard.test("Clicking card triggers callback", async ({ canvas, userEvent, args }) => {
  const card = canvas.getByRole("article");
  await userEvent.click(card);
  await expect(args.onSubmit).toHaveBeenCalled();
});
```

If builder doesn't exist, invoke `/builder-factory` skill first.

## Running Tests

```bash
npm run test:storybook  # Run component tests
npm run storybook:dev   # View in Storybook UI
```

## Questions to Ask

- What user interactions should be tested?
- Are there specific edge cases to cover?
- What validation rules should be tested?
- Are there server actions that need mocking?
