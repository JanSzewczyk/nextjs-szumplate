# Storybook Testing - Examples

> **All examples use `.test()` method for multiple tests per story**

## Example 1: Basic Button Component Test

**Component:**

```tsx
// components/Button.tsx
import { cn } from "~/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        "rounded font-medium transition-colors",
        "focus:ring-2 focus:ring-offset-2 focus:outline-none",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3 text-lg",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {isLoading && <span className="mr-2">⏳</span>}
      {children}
    </button>
  );
}
```

**Story File with `.test()` method:**

```tsx
// components/Button.stories.tsx
import preview from "~/.storybook/preview";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = preview.meta({
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  args: {
    onClick: fn() // Mock function for tracking clicks
  }
});

// Visual documentation stories (for Storybook UI)
export const Primary = meta.story({
  args: {
    variant: "primary",
    children: "Primary Button"
  }
});

export const Secondary = meta.story({
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
});

export const Destructive = meta.story({
  args: {
    variant: "destructive",
    children: "Delete"
  }
});

// Default story with MULTIPLE tests
export const Default = meta.story({
  args: {
    children: "Button"
  }
});

// Rendering tests
Default.test("Renders button with correct text", async ({ canvas, args }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeInTheDocument();
  await expect(button).toHaveTextContent(args.children);
});

Default.test("Has correct variant styles", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveClass("bg-blue-600"); // primary variant default
});

Default.test("Has correct size styles", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveClass("px-4", "py-2"); // md size default
});

// Interaction tests
Default.test("Calls onClick when clicked", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(1);
});

Default.test("Can be clicked multiple times", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await userEvent.click(button);
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(3);
});

// Keyboard accessibility tests
Default.test("Can be activated with Enter key", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  button.focus();
  await expect(button).toHaveFocus();

  await userEvent.keyboard("{Enter}");
  await expect(args.onClick).toHaveBeenCalledTimes(1);
});

Default.test("Can be activated with Space key", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  button.focus();

  await userEvent.keyboard(" ");
  await expect(args.onClick).toHaveBeenCalledTimes(1);
});

// State tests - Disabled
export const Disabled = meta.story({
  args: {
    children: "Disabled Button",
    disabled: true
  }
});

Disabled.test("Shows disabled state visually", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeDisabled();
  await expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
});

Disabled.test("Does not trigger onClick when clicked", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await expect(args.onClick).not.toHaveBeenCalled();
});

// State tests - Loading
export const Loading = meta.story({
  args: {
    children: "Loading...",
    isLoading: true
  }
});

Loading.test("Shows loading indicator", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveTextContent("⏳");
});

Loading.test("Is disabled during loading", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeDisabled();
});

Loading.test("Has aria-busy attribute", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveAttribute("aria-busy", "true");
});

Loading.test("Does not trigger onClick when clicked", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await expect(args.onClick).not.toHaveBeenCalled();
});
```

**Results:**

- ❌ Old: 10 stories (7 visual + 3 test stories)
- ✅ New: 5 stories (3 visual + 2 with tests)
- **Reduction:** 50% fewer stories, same comprehensive coverage

---

## Example 2: Form Component with Validation

**Component:**

```tsx
// components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="w-full rounded border px-3 py-2"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="w-full rounded border px-3 py-2"
          aria-invalid={!!errors.password}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Log In
      </Button>
    </form>
  );
}
```

**Story File:**

```tsx
// components/LoginForm.stories.tsx
import preview from "~/.storybook/preview";
import { expect, fn } from "@storybook/test";
import { LoginForm } from "./LoginForm";

const meta = preview.meta({
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered"
  },
  args: {
    onSubmit: fn()
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ]
});

// Visual documentation story
export const Default = meta.story({});

export const Loading = meta.story({
  args: {
    isLoading: true
  }
});

// Test story with multiple interaction tests
export const FormInteractions = meta.story({});

FormInteractions.test("Submits form with valid credentials", async ({ canvas, userEvent, args, step }) => {
  await step("Fill in valid credentials", async () => {
    await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(canvas.getByLabelText(/password/i), "password123");
  });

  await step("Submit form", async () => {
    await userEvent.click(canvas.getByRole("button", { name: /log in/i }));
  });

  await step("Verify onSubmit was called with correct data", () => {
    expect(args.onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123"
    });
  });
});

FormInteractions.test("Shows error for invalid email", async ({ canvas, userEvent, args, step }) => {
  await step("Fill in invalid email", async () => {
    await userEvent.type(canvas.getByLabelText(/email/i), "invalid-email");
    await userEvent.type(canvas.getByLabelText(/password/i), "password123");
  });

  await step("Submit form", async () => {
    await userEvent.click(canvas.getByRole("button", { name: /log in/i }));
  });

  await step("Verify error message is shown", async () => {
    const errorMessage = await canvas.findByText(/invalid email address/i);
    expect(errorMessage).toBeInTheDocument();
  });

  await step("Verify onSubmit was NOT called", () => {
    expect(args.onSubmit).not.toHaveBeenCalled();
  });
});

FormInteractions.test("Shows error for short password", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "user@example.com");
  await userEvent.type(canvas.getByLabelText(/password/i), "short");
  await userEvent.click(canvas.getByRole("button", { name: /log in/i }));

  const errorMessage = await canvas.findByText(/password must be at least 8 characters/i);
  expect(errorMessage).toBeInTheDocument();
  expect(args.onSubmit).not.toHaveBeenCalled();
});

FormInteractions.test("Shows errors for empty fields", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: /log in/i }));

  expect(await canvas.findByText(/invalid email address/i)).toBeInTheDocument();
  expect(await canvas.findByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  expect(args.onSubmit).not.toHaveBeenCalled();
});
```

---

## Example 3: Modal Dialog Component

**Component:**

```tsx
// components/ConfirmDialog.tsx
"use client";

import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="w-full max-w-md rounded-lg bg-white p-6"
      >
        <h2 id="dialog-title" className="mb-2 text-xl font-bold">
          {title}
        </h2>
        <p className="mb-6 text-gray-600">{message}</p>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={variant === "destructive" ? "destructive" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Story File:**

```tsx
// components/ConfirmDialog.stories.tsx
import preview from "~/.storybook/preview";
import { expect, fn } from "@storybook/test";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = preview.meta({
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    isOpen: true,
    onConfirm: fn(),
    onCancel: fn()
  }
});

export const Default = meta.story({
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed?"
  }
});

export const Destructive = meta.story({
  args: {
    title: "Delete Item",
    message: "This action cannot be undone. Are you sure?",
    confirmLabel: "Delete",
    cancelLabel: "Keep",
    variant: "destructive"
  }
});

export const Closed = meta.story({
  args: {
    isOpen: false,
    title: "This won't be visible",
    message: "Dialog is closed"
  }
});

// Test story with multiple interaction tests
export const DialogInteractions = meta.story({
  args: {
    title: "Confirm Action",
    message: "Are you sure?"
  }
});

DialogInteractions.test("Calls onConfirm when confirm button clicked", async ({ canvas, userEvent, args, step }) => {
  await step("Verify dialog is visible", () => {
    const dialog = canvas.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(canvas.getByText("Confirm Action")).toBeInTheDocument();
  });

  await step("Click confirm button", async () => {
    const confirmButton = canvas.getByRole("button", { name: /confirm/i });
    await userEvent.click(confirmButton);
  });

  await step("Verify callbacks", () => {
    expect(args.onConfirm).toHaveBeenCalledTimes(1);
    expect(args.onCancel).not.toHaveBeenCalled();
  });
});

DialogInteractions.test("Calls onCancel when cancel button clicked", async ({ canvas, userEvent, args }) => {
  const cancelButton = canvas.getByRole("button", { name: /cancel/i });
  await userEvent.click(cancelButton);

  expect(args.onCancel).toHaveBeenCalledTimes(1);
  expect(args.onConfirm).not.toHaveBeenCalled();
});

DialogInteractions.test("Supports keyboard navigation and Enter to confirm", async ({ canvas, userEvent, args }) => {
  // Tab to first button (Cancel)
  await userEvent.tab();
  const cancelButton = canvas.getByRole("button", { name: /cancel/i });
  expect(cancelButton).toHaveFocus();

  // Tab to second button (Confirm)
  await userEvent.tab();
  const confirmButton = canvas.getByRole("button", { name: /confirm/i });
  expect(confirmButton).toHaveFocus();

  // Press Enter on confirm
  await userEvent.keyboard("{Enter}");
  expect(args.onConfirm).toHaveBeenCalled();
});
```

---

## Example 4: Select/Dropdown Component

**Story File:**

```tsx
// components/Select.stories.tsx
import preview from "~/.storybook/preview";
import { expect, fn } from "@storybook/test";

const meta = preview.meta({
  title: "Components/Select",
  render: (args) => (
    <select
      className="px-3 py-2 border rounded"
      onChange={(e) => args.onChange(e.target.value)}
      defaultValue={args.defaultValue}
    >
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  ),
  args: {
    onChange: fn(),
    defaultValue: ""
  }
} satisfies Meta<{
  onChange: (value: string) => void;
  defaultValue: string;
}>;


// Visual documentation story
export const Default = meta.story({});

export const WithDefaultValue = meta.story({
  args: {
    defaultValue: "option2"
  }
});

// Test story
export const SelectOption = meta.story({});

SelectOption.test("Selects and triggers onChange", async ({ canvas, userEvent, args }) => {
  const select = canvas.getByRole("combobox");

  // Select option
  await userEvent.selectOptions(select, "option2");

  // Verify onChange was called
  expect(args.onChange).toHaveBeenCalledWith("option2");

  // Verify selected value
  expect(select).toHaveValue("option2");
});
```

---

## Best Practices

### 1. Use step() for Better Test Organization

```tsx
play: async ({ canvasElement, step }) => {
  await step("Setup", async () => {
    // Setup code
  });

  await step("Act", async () => {
    // User interactions
  });

  await step("Assert", () => {
    // Assertions
  });
};
```

### 2. Use fn() for Tracking Function Calls

```tsx
args: {
  onClick: fn(),
  onSubmit: fn()
}
```

### 3. Test Accessibility

```tsx
// Find by role (preferred)
canvas.getByRole("button", { name: /submit/i });

// Find by label
canvas.getByLabelText(/email/i);

// Verify ARIA attributes
expect(button).toHaveAttribute("aria-busy", "true");
```

### 4. Wait for Async Updates

```tsx
// Use findBy* for elements that appear after async operations
const successMessage = await canvas.findByText(/success/i);
```

### 5. Separate Visual Stories from Test Stories

```tsx
// Visual story (for docs)
export const Primary = meta.story({
  args: { variant: "primary" }
});

// Test story (with play function)
export const ClickTest = meta.story({
  args: { variant: "primary" },
  play: async () => {
    // Interaction tests
  }
});
```

### 6. Use Decorators for Layout

```tsx
decorators: [
  (Story) => (
    <div className="max-w-md p-4">
      <Story />
    </div>
  )
];
```

---

## Running Storybook Tests

```bash
# Start Storybook
npm run storybook:dev

# Run tests
npm run test:storybook

# Run in CI
npm run test:storybook -- --ci
```
