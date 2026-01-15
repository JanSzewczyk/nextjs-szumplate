---
name: storybook-testing
version: 2.0.0
description: Create comprehensive Storybook stories with interactive tests for React components using play functions. Use when writing component tests, interaction tests, or documenting component behavior.
tags: [testing, storybook, react, component-testing, integration-testing, play-function, test-function]
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

Generate comprehensive Storybook stories with interactive tests using `play` functions for React components.

> **Reference Files:**
> - `patterns.md` - Testing patterns and examples
> - `api-reference.md` - Queries, assertions, interactions API
> - `best-practices.md` - Best practices and pitfalls

## Context

Stories are used for:
- **Component testing** - Test components in isolation
- **Interaction testing** - Verify user interactions (clicks, typing)
- **Validation testing** - Test form validation and error states
- **Accessibility testing** - Verify a11y with addon

## Workflow

1. **Analyze component** - Props, interactions, states, callbacks
2. **Create story file** - Same directory as component: `component.stories.tsx`
3. **Write stories** - Cover different scenarios
4. **Add play functions** - Test assertions and interactions
5. **Run tests** - `npm run test:storybook`

## Story File Structure

```typescript
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor } from "storybook/test";

import { ComponentName } from "./component-name";

const meta = {
  title: "Features/[FeatureName]/ComponentName",
  component: ComponentName,
  args: {
    onAction: fn()
  }
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, args, step }) => {
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onAction).toHaveBeenCalled();
  }
};
```

## Story Naming Conventions

- `InitialForm` - Empty/initial state
- `Prefilled` - Component with data
- `ValidationEmptyForm` - Validation errors
- `Interaction` - User interaction flows
- `LoadingState` - Async/loading states
- `CompleteUserFlow` - End-to-end scenarios
- `ServerErrorHandling` - Error handling

## Play Function Parameters

- `canvas` - Testing Library queries scoped to component
- `userEvent` - Pre-configured interaction methods
- `args` - Story args (props)
- `step` - Group assertions into named steps

## Using Test Builders

**Always prefer builders over inline mock data:**

```typescript
import { userBuilder } from "~/features/*/test/builders";

export const WithData: Story = {
  args: {
    user: userBuilder.one(),
    onSubmit: fn()
  }
};
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
