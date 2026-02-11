# Storybook Testing Optimization: `.test()` vs `play`

## ⭐ Executive Summary

**PRIMARY PATTERN (90% of cases):** Use `.test()` method for independent tests
**SECONDARY PATTERN (10% of cases):** Use `play` function for complete user flows

This document explains when to use each pattern and provides migration guide from old approaches.

---

## `.test()` Method vs `play` Function

### 🟢 `.test()` Method (PRIMARY - 90% of cases)

**Best for:** Multiple independent test scenarios

```typescript
// ✅ CORRECT - Use .test() for independent tests
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/LoginForm",
  component: LoginForm,
  args: { onSubmit: fn() }
});

// One story with multiple independent tests
export const FormInteractions = meta.story({});

// Test 1: Initial render
FormInteractions.test("Renders empty form", async ({ canvas }) => {
  await expect(canvas.getByRole("form")).toBeInTheDocument();
  await expect(canvas.getByLabelText(/email/i)).toHaveValue("");
});

// Test 2: Validation - independent scenario
FormInteractions.test("Shows validation errors on empty submit", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await expect(canvas.getByText(/email is required/i)).toBeInTheDocument();
});

// Test 3: Success - independent scenario
FormInteractions.test("Successfully submits valid data", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "test@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "secret123");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await expect(args.onSubmit).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "secret123"
  });
});
```

**Benefits:**

- ✅ Each test runs independently
- ✅ Failure in Test 1 doesn't block Test 2 and 3
- ✅ Each test appears separately in Storybook UI
- ✅ Better for debugging individual scenarios
- ✅ Cleaner code - one assertion per test
- ✅ Reflects actual user testing workflows

**When to Use:**

- Multiple unrelated test scenarios
- Form validation, button clicks, rendering
- Edge cases and error conditions
- Any tests that don't depend on each other

---

### 🟡 `play` Function (SECONDARY - 10% of cases)

**Best for:** One cohesive multi-step user flow where steps are dependent

```typescript
// ⚠️ Use play ONLY for complete user journeys
import { expect, fn } from "storybook/test";

export const CheckoutJourney = meta.story({
  name: "Complete Checkout Flow",
  tags: ["test-only"], // Hidden from docs
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args, step }) => {
    // Each step DEPENDS on previous steps

    await step("Add items to cart", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /add to cart/i }));
      // Step 2 needs items in cart
    });

    await step("Proceed to checkout", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /checkout/i }));
      // Step 3 needs checkout page
    });

    await step("Enter shipping address", async () => {
      await userEvent.type(canvas.getByLabelText(/address/i), "123 Main St");
      // Step 4 needs address
    });

    await step("Complete payment", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /pay/i }));
      await expect(canvas.getByText(/order confirmed/i)).toBeInTheDocument();
    });
  }
});
```

**Benefits:**

- ✅ Visualize complete user journey in Storybook
- ✅ Sequential steps show in UI as story progresses
- ✅ Good for documentation of flows

**Drawbacks:**

- ❌ If Step 1 fails → Step 2 won't run
- ❌ Can't run individual steps separately
- ❌ Harder to debug single step
- ❌ Story becomes very long

**When to Use:**

- Complete checkout flows
- Multi-step wizards
- Onboarding sequences
- Any flow where Step N depends on Step N-1

---

## Decision Matrix: `.test()` vs `play`

| Criteria | `.test()` (Primary) | `play` (Secondary) |
|----------|-------------------|-------------------|
| **Independent tests** | ✅ Perfect | ❌ Overkill |
| **Dependent steps** | ❌ Wrong | ✅ Perfect |
| **Number of tests** | Many (5-10) | One (1 flow) |
| **Each test isolation** | ✅ Yes | ❌ No |
| **Debugging** | ✅ Easy | ⚠️ Hard |
| **Code reuse** | ✅ Good | ⚠️ Difficult |
| **UI presentation** | 📋 List of tests | 📖 Story steps |

---

## Real Examples: How to Refactor

### ❌ OLD: 4 separate stories with `play`

```typescript
// Story 1
export const EmptyForm = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("form")).toBeInTheDocument();
  }
});

// Story 2
export const WithValidation = meta.story({
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByText(/error/i)).toBeInTheDocument();
  }
});

// Story 3
export const SuccessfulSubmit = meta.story({
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(...);
    await expect(args.onSubmit).toHaveBeenCalled();
  }
});
```

**Problems:** 3 separate stories, duplicated setup

---

### ✅ NEW: One story with multiple `.test()` calls

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/LoginForm",
  component: LoginForm,
  args: { onSubmit: fn() }
});

export const FormInteractions = meta.story({});

// Test 1: Rendering
FormInteractions.test("Renders empty form", async ({ canvas }) => {
  await expect(canvas.getByRole("form")).toBeInTheDocument();
});

// Test 2: Validation - independent
FormInteractions.test("Shows validation error on empty submit", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await expect(canvas.getByText(/error/i)).toBeInTheDocument();
});

// Test 3: Success - independent
FormInteractions.test("Submits successfully with valid data", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "test@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "secret123");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await expect(args.onSubmit).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "secret123"
  });
});
```

**Benefits:** 1 story, 3 independent tests, 50% fewer stories

---

## Hybrid Approach (RECOMMENDED for complex components)

**Combine documentation stories with interaction tests:**

```typescript
// ✅ RECOMMENDED: Hybrid approach for forms

// 1. Visual documentation stories (no tests)
export const Empty = meta.story({
  tags: ["autodocs"]
  // Just visual - no play or test
});

export const Prefilled = meta.story({
  tags: ["autodocs"],
  args: { defaultValues: { email: "user@example.com" } }
});

// 2. Complete interaction tests using .test()
export const FormInteractions = meta.story({
  tags: ["test-only"]
});

FormInteractions.test("Renders empty form", async ({ canvas }) => {
  await expect(canvas.getByRole("form")).toBeInTheDocument();
});

FormInteractions.test("Validates required fields", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await expect(canvas.getByText(/required/i)).toBeInTheDocument();
});

FormInteractions.test("Submits successfully", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "test@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "secret123");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await expect(args.onSubmit).toHaveBeenCalled();
});

// 3. Optional: Complex multi-step flow (use play ONLY if truly dependent)
export const MultiStepFlow = meta.story({
  name: "Complete Signup Flow",
  tags: ["test-only"],
  play: async ({ canvas, userEvent, step }) => {
    await step("Fill email", async () => {
      // Prerequisites: none
      await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
    });

    await step("Fill password", async () => {
      // Prerequisites: email filled
      await userEvent.type(canvas.getByLabelText(/password/i), "secret123");
    });

    await step("Accept terms", async () => {
      // Prerequisites: password filled
      await userEvent.click(canvas.getByRole("checkbox"));
    });

    await step("Submit form", async () => {
      // Prerequisites: all fields filled
      await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
    });
  }
});
```

---

## Guidelines by Component Type

### Simple Components (Button, Badge, Icon)
- Use `.test()` method
- Keep it minimal

### Forms and Input Components
- **Primary:** Use `.test()` for validation, submission, etc.
- **Optional:** Use `play` only if flow is truly multi-step and dependent

### Complex Interactive Components
- Use `.test()` for individual features
- Use `play` ONLY for complete workflows (checkouts, wizards)

---

## Migration Checklist

When converting old `play` stories to `.test()`:

- [ ] Identify which tests are independent
- [ ] Convert each to `.test()` call
- [ ] Remove `play` function
- [ ] Destructure `userEvent` from function parameter (don't import)
- [ ] Verify each test runs independently
- [ ] Check that failed test doesn't block others

---

## Key Takeaways

| Pattern | Use When | Example |
|---------|----------|---------|
| **`.test()`** | Multiple independent test scenarios | Form validation, button clicks, edge cases |
| **`play`** | One complete multi-step flow | Checkout, wizard, onboarding |
| **Hybrid** | Mix of documentation + tests | Complex forms with visual variants |

**Default to `.test()`. Use `play` only when steps are truly dependent.**
