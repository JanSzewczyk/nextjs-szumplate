# Storybook Testing Patterns

Reference patterns for different testing scenarios.

## Initial State Testing

```typescript
export const InitialForm: Story = {
  play: async ({ canvas, step }) => {
    await step("Verify initial field visibility", async () => {
      const input = canvas.getByLabelText(/email/i);
      await expect(input).toBeVisible();
      await expect(input).toHaveValue("");
    });

    await step("Verify default button state", async () => {
      const button = canvas.getByRole("button", { name: /submit/i });
      await expect(button).toBeEnabled();
    });
  }
};
```

## Prefilled Values Testing

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
  }
};
```

## Validation Error Testing

```typescript
export const ValidationEmptyForm: Story = {
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args }) => {
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(async () => {
      const errorMessage = canvas.getByText(/required/i);
      await expect(errorMessage).toBeInTheDocument();
    });

    await expect(args.onSubmit).not.toHaveBeenCalled();
  }
};
```

## User Interaction Flow Testing

```typescript
export const Interaction: Story = {
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(canvas.getByLabelText(/password/i), "password123");
    await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

    await waitFor(async () => {
      await expect(args.onSubmit).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123"
      });
    });
  }
};
```

## Loading State Testing

```typescript
export const LoadingState: Story = {
  args: {
    onSubmit: async () => new Promise((resolve) => setTimeout(resolve, 2000))
  },
  play: async ({ canvas, userEvent }) => {
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toHaveAttribute("data-state", "loading");
  }
};
```

## Portal/Dropdown Testing

Use `screen` for elements rendered outside story root (modals, dropdowns):

```typescript
import { screen } from "storybook/test";

export const DropdownInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByLabelText("Select option");
    await userEvent.click(trigger);

    await waitFor(async () => {
      const option = screen.getByRole("option", { name: /option 1/i });
      await expect(option).toBeVisible();
      await userEvent.click(option);
    });

    await expect(trigger).toHaveTextContent("Option 1");
  }
};
```

## Navigation/Callback Testing

```typescript
export const BackNavigation: Story = {
  args: { onBack: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /back/i }));
    await expect(args.onBack).toHaveBeenCalledOnce();
  }
};
```

## Server Error Handling Testing

```typescript
export const ServerErrorHandling: Story = {
  args: {
    onSubmit: fn(async () => ({
      success: false as const,
      error: "Failed to save. Please try again."
    }))
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

    await waitFor(async () => {
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  }
};
```

## Using Steps for Organization

```typescript
export const Interaction: Story = {
  play: async ({ canvas, userEvent, step }) => {
    await step("Fill in user information", async () => {
      await userEvent.type(canvas.getByLabelText(/name/i), "John Doe");
    });

    await step("Select preferences", async () => {
      await userEvent.click(canvas.getByRole("checkbox", { name: /newsletter/i }));
    });

    await step("Submit form", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
    });
  }
};
```

## Complete User Flow Testing

```typescript
export const CompleteUserFlow: Story = {
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await expect(canvas.getByText("Welcome")).toBeInTheDocument();

    await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(canvas.getByLabelText(/password/i), "securePass123");
    await userEvent.click(canvas.getByRole("checkbox", { name: /accept terms/i }));
    await userEvent.click(canvas.getByRole("button", { name: /sign up/i }));

    await waitFor(async () => {
      await expect(args.onSubmit).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "securePass123",
        acceptedTerms: true
      });
    });
  }
};
```
