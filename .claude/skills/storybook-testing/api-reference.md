# Storybook Testing API Reference

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

// Content
await expect(element).toHaveTextContent("text");
await expect(element).toHaveValue("value");
await expect(element).toHaveAttribute("data-state", "loading");
await expect(element).toHaveClass(/w-full/);

// Counts
await expect(elements.length).toBe(3);

// Function calls
await expect(args.onSubmit).toHaveBeenCalled();
await expect(args.onSubmit).toHaveBeenCalledOnce();
await expect(args.onSubmit).toHaveBeenCalledWith({ data: "value" });
await expect(args.onSubmit).not.toHaveBeenCalled();
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

// Hover
await userEvent.hover(element);
await userEvent.unhover(element);

// Select
await userEvent.selectOptions(select, "optionValue");
```

## Waiting for Changes

```typescript
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
const meta = {
  args: {
    // Simple mock
    onSubmit: fn(),

    // Mock with return value
    onSubmit: fn(async () => ({ success: true })),

    // Mock with RedirectAction type
    onSubmit: fn(() => ({ success: true }) as unknown as RedirectAction),

    // Mock that throws
    onError: fn(() => { throw new Error("Test error"); })
  }
};
```

## canvas vs screen

- `canvas` - Queries scoped to the component's root (default, preferred)
- `screen` - Queries the entire document (use for portals, modals, dropdowns)

```typescript
import { screen } from "storybook/test";

// For portal content
const option = screen.getByRole("option", { name: /option/i });
```

## Using .test() Method (Storybook 10+)

```typescript
export const Disabled: Story = {
  args: { disabled: true }
};

Disabled.test("should be disabled", async ({ canvas }) => {
  await expect(canvas.getByRole("button")).toBeDisabled();
});
```

**When to use:**
- `play` - Interactions visible in Storybook UI
- `.test()` - Additional assertions not needed in UI
