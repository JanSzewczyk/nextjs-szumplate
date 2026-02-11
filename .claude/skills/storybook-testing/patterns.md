# Storybook Testing Patterns (CSF Next)

Reference patterns for different testing scenarios using CSF Next format with `.test()` method.

> **KEY PRINCIPLE:** Use `.test()` method to add multiple tests to a single story instead of creating separate test
> stories.

## Basic Story Structure

```typescript
import { expect, fn, waitFor, within } from "storybook/test";

import preview from "~/.storybook/preview";

import { MyComponent } from "./my-component";

const meta = preview.meta({
  title: "Features/MyFeature/MyComponent",
  component: MyComponent,
  args: {
    onSubmit: fn()
  }
});

// ONE story for default state
export const Default = meta.story({});

// MULTIPLE tests using .test() method
Default.test("Test name 1", async ({ canvas }) => {
  /* ... */
});
Default.test("Test name 2", async ({ canvas, userEvent }) => {
  /* ... */
});
Default.test("Test name 3", async ({ canvas, args }) => {
  /* ... */
});
```

## Pattern 1: Initial State Testing

✅ **Use `.test()` for multiple independent checks:**

```typescript
export const Default = meta.story({});

Default.test("Renders email input field", async ({ canvas }) => {
  const input = canvas.getByLabelText(/email/i);
  await expect(input).toBeVisible();
  await expect(input).toHaveValue("");
});

Default.test("Submit button is enabled by default", async ({ canvas }) => {
  const button = canvas.getByRole("button", { name: /submit/i });
  await expect(button).toBeEnabled();
});

Default.test("Shows form with all required fields", async ({ canvas }) => {
  await expect(canvas.getByLabelText(/email/i)).toBeVisible();
  await expect(canvas.getByLabelText(/password/i)).toBeVisible();
  await expect(canvas.getByRole("button", { name: /submit/i })).toBeVisible();
});
```

## Pattern 2: Prefilled Values Testing

✅ **Separate story for different state, multiple tests for that state:**

```typescript
export const Prefilled = meta.story({
  args: {
    defaultValues: {
      email: "user@example.com",
      name: "John Doe"
    }
  }
});

Prefilled.test("Displays pre-filled email", async ({ canvas, args }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await expect(emailInput).toHaveValue(args.defaultValues?.email);
});

Prefilled.test("Displays pre-filled name", async ({ canvas, args }) => {
  const nameInput = canvas.getByLabelText(/name/i);
  await expect(nameInput).toHaveValue(args.defaultValues?.name);
});

Prefilled.test("Can modify pre-filled values", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "new@example.com");
  await expect(emailInput).toHaveValue("new@example.com");
});
```

## Pattern 3: Validation Testing

✅ **Group validation tests under Default story:**

```typescript
export const Default = meta.story({
  args: { onSubmit: fn() }
});

Default.test("Shows error on empty email", async ({ canvas, userEvent }) => {
  const submitButton = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitButton);

  await waitFor(async () => {
    const errorMessage = canvas.getByText(/email is required/i);
    await expect(errorMessage).toBeInTheDocument();
  });
});

Default.test("Shows error on invalid email format", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await userEvent.type(emailInput, "invalid-email");

  const submitButton = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitButton);

  await waitFor(async () => {
    const errorMessage = canvas.getByText(/invalid email/i);
    await expect(errorMessage).toBeInTheDocument();
  });
});

Default.test("Does not submit with validation errors", async ({ canvas, userEvent, args }) => {
  const submitButton = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitButton);

  await waitFor(async () => {
    await expect(canvas.getByText(/required/i)).toBeInTheDocument();
  });

  await expect(args.onSubmit).not.toHaveBeenCalled();
});
```

## Pattern 4: User Interaction Testing

✅ **Test complete interactions with `.test()`:**

```typescript
export const Default = meta.story({
  args: { onSubmit: fn() }
});

Default.test("Submits form with valid data", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "password123");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await waitFor(async () => {
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123"
    });
  });
});

Default.test("Can clear input fields", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await userEvent.type(emailInput, "test@example.com");
  await userEvent.clear(emailInput);
  await expect(emailInput).toHaveValue("");
});

Default.test("Form submit on Enter key", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "password123");
  await userEvent.keyboard("{Enter}");

  await waitFor(async () => {
    await expect(args.onSubmit).toHaveBeenCalled();
  });
});
```

## Pattern 5: Loading State Testing

✅ **Separate story for loading state:**

```typescript
export const Loading = meta.story({
  args: {
    onSubmit: async () => new Promise((resolve) => setTimeout(resolve, 2000))
  }
});

Loading.test("Disables button during submission", async ({ canvas, userEvent }) => {
  const submitButton = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitButton);

  await expect(submitButton).toBeDisabled();
  await expect(submitButton).toHaveAttribute("data-state", "loading");
});

Loading.test("Shows loading indicator", async ({ canvas, userEvent }) => {
  const submitButton = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitButton);

  await expect(canvas.getByRole("progressbar")).toBeVisible();
});
```

## Pattern 6: Portal/Dropdown Testing

✅ **Use `screen` for portal content:**

```typescript
import { screen } from "storybook/test";

export const Default = meta.story({});

Default.test("Opens dropdown on trigger click", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByLabelText("Select option");
  await userEvent.click(trigger);

  // For portal content (modals, dropdowns, tooltips), use screen
  // Portals typically render to document.body
  await waitFor(async () => {
    const option = screen.getByRole("option", { name: /option 1/i });
    await expect(option).toBeVisible();
  });
});

Default.test("Selects option and updates trigger", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByLabelText("Select option");
  await userEvent.click(trigger);

  const option = await screen.findByRole("option", { name: /option 1/i });
  await userEvent.click(option);

  await expect(trigger).toHaveTextContent("Option 1");
});
```

## Pattern 7: Tooltip Testing

✅ **Separate tests for show/hide:**

```typescript
export const Default = meta.story({});

Default.test("Shows tooltip on hover", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /info/i });
  await userEvent.hover(trigger);

  const tooltip = await screen.findByRole("tooltip");
  await expect(tooltip).toHaveTextContent(/helpful information/i);
});

Default.test("Hides tooltip on unhover", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /info/i });
  await userEvent.hover(trigger);

  const tooltip = await screen.findByRole("tooltip");
  await expect(tooltip).toBeVisible();

  await userEvent.unhover(trigger);
  await waitFor(async () => {
    await expect(tooltip).not.toBeInTheDocument();
  });
});
```

## Pattern 8: Callback Testing

✅ **Test callback invocations:**

```typescript
export const Default = meta.story({
  args: {
    onBack: fn(),
    onNext: fn()
  }
});

Default.test("Back button calls onBack", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: /back/i }));
  await expect(args.onBack).toHaveBeenCalledOnce();
});

Default.test("Next button calls onNext", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: /next/i }));
  await expect(args.onNext).toHaveBeenCalledOnce();
});

Default.test("Prevents double submission", async ({ canvas, userEvent, args }) => {
  const submitBtn = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitBtn);
  await userEvent.click(submitBtn);
  await userEvent.click(submitBtn);

  // Should be debounced/prevented
  await expect(args.onSubmit).toHaveBeenCalledTimes(1);
});
```

## Pattern 9: Error Handling Testing

✅ **Test error states:**

```typescript
export const ErrorState = meta.story({
  args: {
    onSubmit: fn(async () => ({
      success: false as const,
      error: "Failed to save. Please try again."
    }))
  }
});

ErrorState.test("Displays error message on failure", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await waitFor(async () => {
    const error = canvas.getByText(/failed to save/i);
    await expect(error).toBeVisible();
  });
});

ErrorState.test("Retains form data after error", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await userEvent.type(emailInput, "user@example.com");

  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await waitFor(async () => {
    await expect(canvas.getByText(/failed to save/i)).toBeVisible();
  });

  // Form data should still be present
  await expect(emailInput).toHaveValue("user@example.com");
});
```

## Pattern 10: Keyboard Navigation Testing

✅ **Test keyboard interactions:**

```typescript
export const Default = meta.story({});

Default.test("Tab navigates between fields", async ({ canvas, userEvent }) => {
  const firstInput = canvas.getByLabelText(/first name/i);
  firstInput.focus();

  await userEvent.tab();
  await expect(canvas.getByLabelText(/last name/i)).toHaveFocus();

  await userEvent.tab();
  await expect(canvas.getByLabelText(/email/i)).toHaveFocus();
});

Default.test("Enter key submits form", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
  await userEvent.keyboard("{Enter}");

  await expect(args.onSubmit).toHaveBeenCalled();
});

Default.test("Escape key closes modal", async ({ canvas, userEvent, args }) => {
  await userEvent.keyboard("{Escape}");
  await expect(args.onClose).toHaveBeenCalled();
});
```

## Pattern 11: Complete User Flow (Use `play` function)

⚠️ **Use `play` function for complex multi-step flows:**

```typescript
export const CompleteSignUpFlow = meta.story({
  name: "Complete Sign-up Journey",
  tags: ["test-only"],
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args, step }) => {
    await step("User sees welcome message", async () => {
      await expect(canvas.getByText("Welcome")).toBeInTheDocument();
    });

    await step("User fills registration form", async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(canvas.getByLabelText(/password/i), "securePass123");
      await userEvent.click(canvas.getByRole("checkbox", { name: /accept terms/i }));
    });

    await step("User submits form", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /sign up/i }));
    });

    await step("Verify submission", async () => {
      await waitFor(async () => {
        await expect(args.onSubmit).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "securePass123",
          acceptedTerms: true
        });
      });
    });
  }
});
```

> **Note:** Use `play` function with `step()` for complete user journeys that should be viewed as ONE cohesive flow. For
> individual test scenarios, use `.test()` method.
