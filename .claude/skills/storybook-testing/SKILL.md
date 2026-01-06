---
name: storybook-testing
version: 1.1.0
description: Create comprehensive Storybook stories with interactive tests for React components using play functions
tags: [testing, storybook, react, component-testing, integration-testing, play-function, userEvent]
author: Szum Tech Team
examples:
  - Write Storybook tests for UserProfileCard component
  - Create story tests for my LoginForm
  - Add Storybook testing to the ProductCard component
  - Generate comprehensive Storybook stories with tests for NavBar
---

# Storybook Testing Skill

Generate comprehensive Storybook stories with interactive tests using `play` functions for React components. This skill
helps create browser-based integration tests that verify component behavior, user interactions, and accessibility.

## Context

This skill helps you write Storybook stories that include interactive tests. Stories are used for:

- **Component testing** - Test components in isolation with realistic props
- **Interaction testing** - Verify user interactions (clicks, typing, form submissions)
- **Validation testing** - Test form validation and error states
- **Integration testing** - Test component flows and state changes
- **Visual testing** - Document different component states
- **Accessibility testing** - Verify component accessibility with a11y addon

**Storybook 9+ userEvent Changes:**

In Storybook 9 and later, `userEvent` is provided directly via the play function parameter. This is the recommended approach:

```typescript
play: async ({ canvas, userEvent }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "test@example.com");
  await userEvent.click(canvas.getByRole("button"));
}
```

You no longer need to call `userEvent.setup()` for most cases - Storybook handles the setup automatically.

## Key Concepts

**Storybook Stories Structure:**

- Each story represents a specific component state or scenario
- Stories use TypeScript for type safety
- Meta configuration sets up component defaults and decorators
- Play functions contain test assertions and interactions

**Testing Philosophy:**

- Test user-visible behavior, not implementation details
- Use semantic queries (getByRole, getByLabelText) over test IDs
- Test complete user flows, not just isolated actions
- Include edge cases and error scenarios

## Instructions

When the user asks to create Storybook tests for a component:

### 1. **Analyze the Component**

Examine the component to identify:

- Props and their types
- User interactions (clicks, form inputs, selections)
- Form validation rules and error states
- Loading states and async behavior
- Conditional rendering logic
- Callbacks/actions (onSubmit, onClick, etc.)

### 2. **Create Story File Structure**

File location: Same directory as the component, with `.stories.tsx` extension

```typescript
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { ComponentName } from "./component-name";
// Import any builders or test utilities needed
import { builderName } from "~/features/*/test/builders";

const meta = {
  title: "Features/[FeatureName]/Component Name",
  component: ComponentName,
  decorators: [
    (story) => <div className="w-full max-w-xl">{story()}</div>
  ],
  args: {
    // Default args for all stories
    onAction: fn(),
    // Mock any required props
  }
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### 3. **Story Naming Conventions**

Use descriptive story names that indicate the scenario being tested:

**Common Story Types:**

- `InitialForm` / `NoDefaultValues` - Empty/initial state
- `Prefilled` / `PrefilledValues` - Component with data
- `ErrorValidation` / `ValidationEmptyForm` - Validation error states
- `Interaction` / `UserInteraction` - User interaction flows
- `LoadingState` - Async/loading states
- `CompleteUserFlow` - End-to-end scenarios
- `BackNavigation` / `BackButtonAction` - Navigation tests
- `ServerErrorHandling` - Error handling from server actions
- `EdgeCaseName` - Specific edge cases

### 4. **Writing Play Functions**

Play functions are the core of Storybook testing. They contain assertions and interactions.

**Basic Structure:**

```typescript
export const StoryName: Story = {
  args: {
    // Story-specific args that override meta.args
  },
  play: async ({ canvas, args, step, canvasElement, userEvent }) => {
    // Test code here - userEvent is provided by Storybook!
  }
};
```

**Play Function Parameters:**

- `canvas` - Testing Library queries scoped to the component (`within(canvasElement)`)
- `args` - Story args (props passed to component)
- `step` - Group assertions into named steps (optional but recommended)
- `canvasElement` - Raw DOM element (use for portals)
- `userEvent` - **Storybook's built-in userEvent instance** (recommended for most interactions)

**Query Methods (canvas/within):**

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

**Common Assertions:**

```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeInTheDocument();
await expect(element).not.toBeInTheDocument();
await expect(element).toBeNull();

// State
await expect(checkbox).toBeChecked();
await expect(checkbox).not.toBeChecked();
await expect(button).toBeDisabled();
await expect(button).toBeEnabled();

// Content
await expect(element).toHaveTextContent("text");
await expect(element).toHaveValue("value");
await expect(element).toHaveAttribute("data-state", "loading");
await expect(element).toHaveClass(/w-full/);

// Counts
await expect(elements.length).toBeGreaterThan(0);
await expect(elements.length).toBe(3);

// Function calls (for mocked functions)
await expect(args.onSubmit).toHaveBeenCalled();
await expect(args.onSubmit).toHaveBeenCalledOnce();
await expect(args.onSubmit).toHaveBeenCalledWith({ data: "value" });
await expect(args.onSubmit).not.toHaveBeenCalled();
```

**User Interactions:**

```typescript
// Click
await userEvent.click(button);
await userEvent.dblClick(element);

// Typing (basic)
await userEvent.type(input, "text to type");

// Typing with delay (recommended for realistic interactions)
await userEvent.type(input, "text to type", { delay: 100 });

// Clear and type
await userEvent.clear(input);
await userEvent.type(input, "new text");

// Keyboard
await userEvent.tab();
await userEvent.keyboard("{Enter}");
await userEvent.keyboard("{Escape}");

// Hover
await userEvent.hover(element);
await userEvent.unhover(element);

// Select (for native select elements)
await userEvent.selectOptions(select, "optionValue");
```

**IMPORTANT: userEvent from Play Function Parameter vs userEvent.setup()**

**In Storybook 9+, userEvent is provided directly via the play function parameter.**
This is the **recommended approach** as it's pre-configured by Storybook:

```typescript
// ✅ RECOMMENDED - Use userEvent from play function parameter
export const DirectInteraction: Story = {
  play: async ({ canvas, userEvent, step }) => {
    // userEvent is already set up by Storybook - just use it!
    await step("Fill form", async () => {
      const input = canvas.getByLabelText(/name/i);
      await userEvent.type(input, "John", { delay: 100 });
      await userEvent.tab();

      const button = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(button);
    });
  }
};
```

**Alternative: Import from `storybook/test`** when you need userEvent outside play function:

```typescript
import { userEvent } from "storybook/test";

// ✅ Also valid - imported userEvent for use anywhere
export const ImportedUserEvent: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText(/email/i), "test@example.com");
    await userEvent.click(canvas.getByRole("button"));
  }
};
```

**Use `userEvent.setup()` only for advanced configuration:**

```typescript
// ⚠️ Use setup() ONLY when you need custom configuration
export const ComplexInteraction: Story = {
  play: async ({ canvas, step }) => {
    // setup() when you need custom options like skipHover, delay, etc.
    const user = userEvent.setup({
      delay: 50,           // Custom delay between events
      skipHover: true,     // Skip hover in click()
    });

    await step("Complex multi-step interaction", async () => {
      const input = canvas.getByLabelText(/name/i);
      await user.clear(input);
      await user.type(input, "John Doe");
      await user.tab();

      const checkbox = canvas.getByRole("checkbox");
      await user.click(checkbox);
    });
  }
};
```

**When to use which approach:**

- **`userEvent` from play parameter** (recommended):
  - Default choice for all Storybook tests
  - Pre-configured by Storybook
  - Cleaner, more readable code
  - Works for most use cases

- **Imported `userEvent` from `storybook/test`**:
  - When you need userEvent outside play function context
  - For helper functions or utilities

- **`userEvent.setup()`** (use sparingly):
  - When you need custom configuration (delay, skipHover, etc.)
  - Advanced scenarios requiring shared keyboard/pointer state
  - Performance-critical scenarios with many interactions

**Waiting for Changes:**

```typescript
// Wait for condition to be true
await waitFor(async () => {
  const element = canvas.getByText(/success/i);
  await expect(element).toBeVisible();
});

// Wait for element to appear (alternative)
const element = await canvas.findByText(/success/i);
await expect(element).toBeVisible();

// Wait with custom timeout
await waitFor(
  async () => {
    await expect(condition).toBe(true);
  },
  { timeout: 5000 }
);
```

### 5. **Testing Patterns**

#### **Initial State Testing**

Test the component's default state:

```typescript
export const InitialForm: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify initial field visibility", async () => {
      const input = canvas.getByLabelText(/email/i);
      await expect(input).toBeVisible();
      await expect(input).toHaveValue("");
    });

    await step("Verify default button state", async () => {
      const button = canvas.getByRole("button", { name: /submit/i });
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });
  }
};
```

#### **Prefilled/Default Values Testing**

Test component with data:

```typescript
export const Prefilled: Story = {
  args: {
    defaultValues: {
      email: "user@example.com",
      name: "John Doe"
    }
  },
  play: async ({ canvas, args }) => {
    const emailInput = canvas.getByLabelText(/email/i);
    await expect(emailInput).toHaveValue(args.defaultValues?.email);

    const nameInput = canvas.getByLabelText(/name/i);
    await expect(nameInput).toHaveValue(args.defaultValues?.name);
  }
};
```

#### **Validation Error Testing**

Test form validation:

```typescript
export const ValidationEmptyForm: Story = {
  args: {
    onSubmit: fn()
  },
  play: async ({ canvas, args, userEvent }) => {
    // Submit without filling fields
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Verify error messages appear
    await waitFor(async () => {
      const errorMessage = canvas.getByText(/required/i);
      await expect(errorMessage).toBeInTheDocument();
    });

    // Verify onSubmit was NOT called
    await expect(args.onSubmit).not.toHaveBeenCalled();
  }
};
```

#### **User Interaction Flow Testing**

Test complete user flows:

```typescript
export const Interaction: Story = {
  args: {
    onSubmit: fn()
  },
  play: async ({ canvas, args, userEvent }) => {
    // Step 1: Fill in form (using delay for realistic typing)
    const emailInput = canvas.getByLabelText(/email/i);
    await userEvent.type(emailInput, "user@example.com", { delay: 100 });

    const passwordInput = canvas.getByLabelText(/password/i);
    await userEvent.type(passwordInput, "password123", { delay: 100 });

    // Step 2: Submit form
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Step 3: Verify submission
    await waitFor(async () => {
      await expect(args.onSubmit).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123"
      });
    });
  }
};
```

#### **Loading State Testing**

Test async behavior:

```typescript
export const LoadingState: Story = {
  args: {
    onSubmit: async () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(null as never), 2000);
      })
  },
  play: async ({ canvas, userEvent }) => {
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Verify loading state
    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toHaveAttribute("data-state", "loading");
  }
};
```

#### **Portal/Dropdown Testing**

Test elements rendered in portals (modals, dropdowns):

```typescript
export const DropdownInteraction: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    // Click trigger to open dropdown
    const trigger = canvas.getByLabelText("Select option");
    await userEvent.click(trigger);

    // Portal elements are outside canvas, use parent element
    const portalElement = canvasElement.parentElement as HTMLElement;
    const portal = within(portalElement);

    // Wait for portal content and interact
    await waitFor(async () => {
      const option = portal.getByRole("option", { name: /option 1/i });
      await expect(option).toBeVisible();
      await userEvent.click(option);
    });

    // Verify selection
    await expect(trigger).toHaveTextContent("Option 1");
  }
};
```

#### **Navigation/Action Testing**

Test callbacks and navigation:

```typescript
export const BackNavigation: Story = {
  args: {
    onBack: fn()
  },
  play: async ({ canvas, args, userEvent }) => {
    const backButton = canvas.getByRole("button", { name: /back/i });
    await userEvent.click(backButton);

    await expect(args.onBack).toHaveBeenCalledOnce();
  }
};
```

#### **Error Handling Testing**

Test server error scenarios:

```typescript
export const ServerErrorHandling: Story = {
  args: {
    onSubmit: fn(async () => ({
      success: false as const,
      error: "Failed to save. Please try again."
    }))
  },
  play: async ({ canvas, args, userEvent }) => {
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Verify action was called
    await waitFor(async () => {
      await expect(args.onSubmit).toHaveBeenCalled();
    });

    // Note: Toast/alert verification requires additional setup
    // The component should display error in UI or toast
  }
};
```

#### **Complete User Flow Testing**

Test end-to-end scenarios:

```typescript
export const CompleteUserFlow: Story = {
  args: {
    onSubmit: fn()
  },
  play: async ({ canvas, args, userEvent, step }) => {
    await step("Verify initial state", async () => {
      await expect(canvas.getByText("Welcome")).toBeInTheDocument();
    });

    await step("Fill form fields", async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com", { delay: 100 });
      await userEvent.type(canvas.getByLabelText(/password/i), "securePass123", { delay: 100 });
    });

    await step("Accept terms", async () => {
      await userEvent.click(canvas.getByRole("checkbox", { name: /accept terms/i }));
    });

    await step("Submit", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /sign up/i }));
    });

    await step("Verify success", async () => {
      await waitFor(async () => {
        await expect(args.onSubmit).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "securePass123",
          acceptedTerms: true
        });
      });
    });
  }
};
```

### 6. **Using Steps for Organization**

Group related assertions into named steps for better test reporting:

```typescript
export const Interaction: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step("Fill in user information", async () => {
      const nameInput = canvas.getByLabelText(/name/i);
      await userEvent.type(nameInput, "John Doe", { delay: 100 });
      await expect(nameInput).toHaveValue("John Doe");
    });

    await step("Select preferences", async () => {
      const checkbox = canvas.getByRole("checkbox", { name: /newsletter/i });
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    });

    await step("Submit form", async () => {
      const button = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(button);
    });
  }
};
```

### 7. **Mocking Functions with fn()**

Mock component callbacks and actions:

```typescript
const meta = {
  component: MyForm,
  args: {
    // Mock with default return value
    onSubmit: fn(),

    // Mock with specific return value
    onSubmit: fn(async () => ({ success: true })),

    // Mock with RedirectAction type
    onSubmit: fn(
      () =>
        ({
          success: true
        }) as unknown as RedirectAction
    ),

    // Mock that throws error
    onError: fn(() => {
      throw new Error("Test error");
    })
  }
} satisfies Meta<typeof MyForm>;
```

### 8. **Using Test Builders**

Use test-data-bot builders for consistent test data:

```typescript
import { userBuilder, productBuilder } from "~/features/*/test/builders";

export const WithTestData: Story = {
  args: {
    user: userBuilder.one(),
    products: productBuilder.many(4),
    onSubmit: fn()
  }
};
```

### 9. **Story Documentation**

Add JSDoc comments to explain each story:

```typescript
/**
 * Initial state of the form with no data filled in.
 * Shows empty fields with placeholders.
 * Tests that required fields show validation errors on submit.
 */
export const InitialForm: Story = {
  // ...
};

/**
 * Form prefilled with valid user data.
 * Tests successful submission with default values.
 */
export const Prefilled: Story = {
  // ...
};
```

### 10. **Common Story Categories to Create**

For each component, consider creating stories for:

1. **Initial/Default State** - Empty component, no data
2. **Prefilled State** - Component with data
3. **Loading State** - Async operations in progress
4. **Error State** - Validation errors, server errors
5. **Success State** - Successful operations
6. **Edge Cases** - Empty lists, max values, special characters
7. **User Interactions** - Clicks, typing, selections
8. **Complete Flows** - End-to-end user scenarios
9. **Accessibility** - Keyboard navigation, screen reader support
10. **Responsive** - Different viewport sizes (if applicable)

## Best Practices

1. **Use Semantic Queries**
   - Prefer `getByRole`, `getByLabelText` over `getByTestId`
   - Query by user-visible text with regex: `getByText(/welcome/i)`
   - Use case-insensitive matching: `/text/i`

2. **Await Async Operations**
   - Always `await` user interactions
   - Use `waitFor` for dynamic content
   - Use `findBy*` queries for elements that appear asynchronously

3. **Test User-Visible Behavior**
   - Don't test implementation details
   - Test what users see and do
   - Verify outcomes, not internal state

4. **Mock External Dependencies**
   - Use `fn()` to mock callbacks
   - Mock server actions with return values
   - Use builders for test data

5. **Organize Tests with Steps**
   - Use `step()` to group related assertions
   - Makes test reports more readable
   - Documents test flow

6. **Handle Portals Correctly**
   - Use `canvasElement.parentElement` for portal content
   - Create new `within()` context for portal
   - Wait for portal content with `waitFor`

7. **Verify Function Calls**
   - Always verify mocked functions were (or weren't) called
   - Check call arguments for correctness
   - Use `.toHaveBeenCalledOnce()`, `.toHaveBeenCalledWith()`

8. **Include Edge Cases**
   - Empty forms
   - Invalid inputs
   - Server errors
   - Loading states
   - Disabled states

9. **Document Stories**
   - Add JSDoc comments explaining scenarios
   - Use descriptive story names
   - Group related stories together

10. **Keep Stories Focused**
    - One scenario per story
    - Avoid testing multiple unrelated things
    - Create separate stories for different states

## Common Pitfalls to Avoid

1. **Not awaiting async operations**

   ```typescript
   // ❌ Wrong
   userEvent.click(button);
   expect(args.onSubmit).toHaveBeenCalled();

   // ✅ Correct
   await userEvent.click(button);
   await expect(args.onSubmit).toHaveBeenCalled();
   ```

2. **Not using waitFor for dynamic content**

   ```typescript
   // ❌ Wrong
   const message = canvas.getByText(/success/i);
   await expect(message).toBeVisible();

   // ✅ Correct
   await waitFor(async () => {
     const message = canvas.getByText(/success/i);
     await expect(message).toBeVisible();
   });
   ```

3. **Using getBy\* for elements that might not exist**

   ```typescript
   // ❌ Wrong (throws error if not found)
   const error = canvas.getByText(/error/i);
   await expect(error).toBeNull(); // This will never execute

   // ✅ Correct (returns null if not found)
   const error = canvas.queryByText(/error/i);
   await expect(error).toBeNull();
   ```

4. **Not handling portals correctly**

   ```typescript
   // ❌ Wrong (portal content not in canvas)
   await userEvent.click(dropdownTrigger);
   const option = canvas.getByRole("option", { name: /option/i }); // Won't find it

   // ✅ Correct
   await userEvent.click(dropdownTrigger);
   const portal = within(canvasElement.parentElement as HTMLElement);
   const option = portal.getByRole("option", { name: /option/i });
   ```

5. **Not mocking functions properly**

   ```typescript
   // ❌ Wrong (no mock)
   args: {
     onSubmit: async () => {}; // Not trackable
   }

   // ✅ Correct (with fn())
   args: {
     onSubmit: fn(async () => ({ success: true }));
   }
   ```

## Integration with Project

**File Structure:**

```text
features/
  feature-name/
    components/
      forms/
        my-form.tsx
        my-form.stories.tsx  ← Stories here
    test/
      builders/
        my-form-data.builder.ts  ← Test data builders
```

**Running Tests:**

```bash
npm run test:storybook  # Run Storybook component tests
npm run storybook:dev   # View stories in Storybook UI
```

**Test Environment:**

- Tests run in Chromium browser via Playwright
- Setup: `tests/integration/vitest.setup.ts`
- Uses @storybook/test for testing utilities
- Includes accessibility addon (@storybook/addon-a11y)

## Example Template

```typescript
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor, within } from "storybook/test";

import { MyComponent } from "./my-component";

const meta = {
  title: "Features/[Feature]/My Component",
  component: MyComponent,
  decorators: [(story) => <div className="w-full max-w-xl">{story()}</div>],
  args: {
    onAction: fn()
  }
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Initial state of the component.
 */
export const InitialState: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify initial render", async () => {
      const element = canvas.getByRole("button", { name: /click me/i });
      await expect(element).toBeVisible();
    });
  }
};

/**
 * User interaction flow.
 * Uses userEvent from play function parameter (recommended approach in Storybook 9+).
 */
export const Interaction: Story = {
  args: {
    onAction: fn()
  },
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole("button", { name: /click me/i });
    await userEvent.click(button);

    await expect(args.onAction).toHaveBeenCalledOnce();
  }
};
```

## Workflow

1. **User requests Storybook tests** for a component
2. **Analyze component** - Identify props, interactions, states
3. **Create story file** - Set up meta configuration
4. **Write stories** - Cover different scenarios
5. **Add play functions** - Write test assertions
6. **Document stories** - Add JSDoc comments
7. **Run tests** - Verify stories pass: `npm run test:storybook`

## Questions to Ask

When unclear about implementation, ask:

- What user interactions should be tested?
- Are there specific edge cases to cover?
- What validation rules should be tested?
- Are there server actions that need mocking?
- Should we test loading/error states?
- Are there accessibility requirements?
- What are the expected outcomes for each interaction?
