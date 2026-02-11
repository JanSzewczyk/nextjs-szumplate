# Storybook Testing API Reference (CSF Next)

## CSF Next Factory Functions

CSF Next uses a chain of factory functions for full type safety:

```typescript
definePreview → preview.meta → meta.story
```

### definePreview (in .storybook/preview.tsx)

```typescript
import { definePreview } from "@storybook/nextjs-vite";
import addonA11y from "@storybook/addon-a11y";

export default definePreview({
  parameters: {
    /* global parameters */
  },
  decorators: [
    /* global decorators */
  ],
  addons: [addonA11y()]
});
```

### preview.meta (in story files)

```typescript
import preview from "~/.storybook/preview";
import { ComponentName } from "./component-name";

const meta = preview.meta({
  title: "Features/MyFeature/ComponentName",
  component: ComponentName,
  args: {
    /* default args */
  },
  parameters: {
    /* story-level parameters */
  }
});
```

### meta.story (individual stories)

```typescript
export const StoryName = meta.story({
  name: "Custom Display Name", // Optional display name
  args: {
    /* story args */
  },
  parameters: {
    /* story parameters */
  },
  tags: ["test-only"], // Optional tags
  play: async (context) => {
    /* optional: for complex multi-step flows */
  }
});
```

**Story Naming Convention:**

- Single story: Use component name (`UserCard`, `SearchInput`)
- Multiple stories: Use descriptive states (`EmptyForm`, `FilledForm`)
- Avoid generic names: ~~`Default`~~, ~~`Basic`~~, ~~`Example`~~

## Story.test() Method ⭐

**RECOMMENDED:** Attach multiple independent tests to a single story.

### Syntax

```typescript
StoryName.test(testName: string, testFunction: TestFunction): void
```

### Example

```typescript
// ONE story for component
export const LoginForm = meta.story({});

// MULTIPLE tests using .test() method
LoginForm.test("Shows validation error on empty submit", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await expect(canvas.getByText(/email is required/i)).toBeVisible();
});

LoginForm.test("Submits form with valid data", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "password123");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await expect(args.onSubmit).toHaveBeenCalled();
});

LoginForm.test("Keyboard navigation works correctly", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  emailInput.focus();
  await userEvent.tab();
  await expect(canvas.getByLabelText(/password/i)).toHaveFocus();
});
```

### Parameters

- **testName** (string): Descriptive test name in sentence case
  - ✅ Good: `"Shows validation error on empty submit"`
  - ❌ Bad: `"Test 1"`, `"Validation"`, `"Works"`

- **testFunction** (TestFunction): Async function with same context as `play` function

### Context Object

Same context as `play` function:

```typescript
interface TestContext {
  canvas: Canvas; // Testing Library queries scoped to component
  canvasElement: HTMLElement; // Raw DOM element for portal queries
  userEvent: UserEvent; // Pre-configured user interaction methods
  args: StoryArgs; // Story arguments (including mock functions)
  step?: StepFunction; // Optional: group assertions (rarely needed with .test())
}
```

### When to Use `.test()` vs `play`

| Use `.test()` Method ✅    | Use `play` Function ⚠️       |
| -------------------------- | ---------------------------- |
| Multiple independent tests | Complex multi-step user flow |
| Testing specific behaviors | Integration test scenarios   |
| Granular test reporting    | Demos for Storybook UI       |
| **Most common scenarios**  | Rare, specific use cases     |

**Example Comparison:**

```typescript
// ✅ Use .test() for independent tests
export const Button = meta.story({});

Button.test("Calls onClick when clicked", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button"));
  await expect(args.onClick).toHaveBeenCalled();
});

Button.test("Shows loading state when isLoading=true", async ({ canvas }) => {
  await expect(canvas.getByRole("progressbar")).toBeVisible();
});

Button.test("Keyboard activation with Enter works", async ({ canvas, userEvent, args }) => {
  canvas.getByRole("button").focus();
  await userEvent.keyboard("{Enter}");
  await expect(args.onClick).toHaveBeenCalled();
});

// ✅ Use play for complete user journey
export const CheckoutFlow = meta.story({
  name: "Complete Checkout Journey",
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Add items to cart", async () => {
      /* ... */
    });
    await step("Fill shipping address", async () => {
      /* ... */
    });
    await step("Complete payment", async () => {
      /* ... */
    });
  }
});
```

### Benefits of `.test()` Method

- **80% fewer stories** - One story with 10 tests vs 10 separate test stories
- **Better isolation** - Each test is independent
- **Clearer intent** - Test names describe specific behaviors
- **Better reporting** - Individual test results in Storybook UI
- **Less boilerplate** - No repeated `meta.story()` calls

## Query Methods

Use semantic queries from Testing Library:

```typescript
// Preferred queries (by user-visible content)
canvas.getByRole("button", { name: /submit/i })
canvas.getByLabelText(/email/i)
canvas.getByText(/welcome/i)
canvas.getByPlaceholderText(/enter name/i)

// Query variants
canvas.getBy*      // Throws if not found (use for assertions)
canvas.queryBy*    // Returns null if not found (use for negative assertions)
canvas.findBy*     // Async, waits for element (use for dynamic content)
canvas.getAllBy*   // Returns array of matches
```

## Assertions

```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeInTheDocument();
await expect(element).not.toBeInTheDocument();

// State
await expect(checkbox).toBeChecked();
await expect(button).toBeDisabled();
await expect(button).toBeEnabled();
await expect(element).toHaveFocus();

// Content
await expect(element).toHaveTextContent("text");
await expect(element).toHaveValue("value");
await expect(element).toHaveAttribute("data-state", "loading");
await expect(element).toHaveClass(/w-full/);

// Counts
await expect(elements.length).toBe(3);
await expect(elements.length).toBeGreaterThanOrEqual(1);

// Function calls
await expect(args.onSubmit).toHaveBeenCalled();
await expect(args.onSubmit).toHaveBeenCalledOnce();
await expect(args.onSubmit).toHaveBeenCalledWith({ data: "value" });
await expect(args.onSubmit).not.toHaveBeenCalled();

// String matching
await expect(element).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
```

## User Interactions

```typescript
// Click
await userEvent.click(button);
await userEvent.dblClick(element);

// Typing
await userEvent.type(input, "text to type");
await userEvent.clear(input);

// Keyboard
await userEvent.tab();
await userEvent.keyboard("{Enter}");
await userEvent.keyboard("{Escape}");
await userEvent.keyboard("{Shift}");

// Hover
await userEvent.hover(element);
await userEvent.unhover(element);

// Select
await userEvent.selectOptions(select, "optionValue");
await userEvent.selectOptions(select, ["1", "2"]);
await userEvent.deselectOptions(select, "1");
```

## Waiting for Changes

```typescript
import { waitFor } from "storybook/test";

// Wait for condition
await waitFor(async () => {
  const element = canvas.getByText(/success/i);
  await expect(element).toBeVisible();
});

// Wait for element to appear
const element = await canvas.findByText(/success/i);

// Wait with custom timeout
await waitFor(
  async () => {
    await expect(condition).toBe(true);
  },
  { timeout: 5000 }
);
```

## Mocking Functions

```typescript
import { fn } from "storybook/test";

const meta = preview.meta({
  component: MyComponent,
  args: {
    // Simple mock
    onSubmit: fn(),

    // Mock with return value
    onSubmit: fn(async () => ({ success: true })),

    // Mock with typed return (for server actions)
    onSubmit: fn(() => ({ success: true }) as unknown as RedirectAction),

    // Mock that throws
    onError: fn(() => {
      throw new Error("Test error");
    })
  }
});
```

## Play Function Context

```typescript
export const MyStory = meta.story({
  play: async ({
    canvas, // Testing Library queries scoped to story
    canvasElement, // Raw DOM element (HTMLElement)
    userEvent, // Pre-configured user event instance
    args, // Story args (component props)
    step // Function to group assertions
    // Additional context properties:
    // - globals
    // - parameters
    // - viewMode
  }) => {
    // Test implementation
  }
});
```

## canvas vs screen

```typescript
import { screen } from "storybook/test";

// 1. canvas - Testing Library queries scoped to story root (PREFERRED)
//    Use for all elements within the story canvas
const button = canvas.getByRole("button");
const input = canvas.getByLabelText(/email/i);

// 2. screen - Queries entire document (USE for portals)
//    Use for modals, dropdowns, tooltips that render outside story root
const dialog = screen.getByRole("dialog");
const tooltip = await screen.findByRole("tooltip");
const option = screen.getByRole("option", { name: /option 1/i });

// 3. canvasElement - Raw DOM element (rarely needed)
//    Use when you need direct DOM access
const element = canvasElement.querySelector(".some-class");
```

### When to use each:

| Query Method                    | Use When                              | Example                            |
| ------------------------------- | ------------------------------------- | ---------------------------------- |
| `canvas.getByRole()`            | Element is inside story canvas        | Buttons, inputs, text in component |
| `screen.getByRole()`            | Element is in portal (outside canvas) | Modals, tooltips, dropdown options |
| `canvasElement.querySelector()` | Need raw DOM access                   | Direct DOM manipulation (rare)     |

### Why `screen` for portals?

**Advantages:**

- ✅ Simpler API - `screen.getByRole()` vs `within(canvasElement.parentElement).getByRole()`
- ✅ More readable code
- ✅ Standard Testing Library pattern
- ✅ Works with document.body portals (common pattern)

**Example:**

```typescript
// Portal content (modal, tooltip, dropdown)
export const ModalTest = meta.story({
  play: async ({ canvas, userEvent }) => {
    // Trigger inside canvas
    await userEvent.click(canvas.getByRole("button", { name: /open/i }));

    // Modal renders to document.body - use screen
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toBeInTheDocument();

    // Close button inside portal - still use screen
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
  }
});
```

## Step Function

Group related assertions for better test organization:

```typescript
export const CompleteFlow = meta.story({
  play: async ({ canvas, userEvent, step }) => {
    await step("Fill form fields", async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(canvas.getByLabelText(/password/i), "secret");
    });

    await step("Submit and verify", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
      await expect(canvas.getByText(/success/i)).toBeVisible();
    });
  }
});
```

## Story Tags

Control story visibility and behavior:

```typescript
export const TestOnlyStory = meta.story({
  tags: ["test-only"], // Hidden from Storybook sidebar, runs in tests
  play: async ({ canvas }) => {
    // Test assertions
  }
});

export const DocsStory = meta.story({
  tags: ["autodocs"] // Include in auto-generated docs
});
```

## Imports Summary

```typescript
// From storybook/test (most common)
import { expect, fn, waitFor } from "storybook/test";

// Preview import
import preview from "~/.storybook/preview";
```
