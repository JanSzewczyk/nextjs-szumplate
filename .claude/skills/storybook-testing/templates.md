# Common Component Test Templates

> **All templates use `.test()` method for multiple tests per story**

## Template 1: Form Component

```typescript
// ✅ CORRECT: Only import expect, fn, waitFor - NOT userEvent or canvas
import { expect, fn, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { ContactForm } from "./contact-form";

const meta = preview.meta({
  title: "Components/ContactForm",
  component: ContactForm,
  args: {
    onSubmit: fn()
  }
});

// Story 1: Empty form (main test story)
export const EmptyForm = meta.story({
  args: { defaultValues: {} }
});

// Rendering tests
EmptyForm.test("Renders all form fields", async ({ canvas }) => {
  await expect(canvas.getByLabelText(/name/i)).toBeVisible();
  await expect(canvas.getByLabelText(/email/i)).toBeVisible();
  await expect(canvas.getByLabelText(/message/i)).toBeVisible();
  await expect(canvas.getByRole("button", { name: /submit/i })).toBeVisible();
});

// Validation tests
EmptyForm.test("Shows validation error on empty submit", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await waitFor(async () => {
    await expect(canvas.getByText(/email is required/i)).toBeInTheDocument();
  });
});

EmptyForm.test("Shows error on invalid email format", async ({ canvas, userEvent }) => {
  await userEvent.type(canvas.getByLabelText(/email/i), "invalid-email");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await waitFor(async () => {
    await expect(canvas.getByText(/invalid email/i)).toBeInTheDocument();
  });
});

EmptyForm.test("Does not submit with validation errors", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await waitFor(async () => {
    await expect(canvas.getByText(/required/i)).toBeInTheDocument();
  });
  await expect(args.onSubmit).not.toHaveBeenCalled();
});

// Interaction tests
EmptyForm.test("Submits form successfully with valid data", async ({ canvas, userEvent, args }) => {
  await userEvent.type(canvas.getByLabelText(/name/i), "John Doe");
  await userEvent.type(canvas.getByLabelText(/email/i), "john@example.com");
  await userEvent.type(canvas.getByLabelText(/message/i), "Hello!");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));

  await expect(args.onSubmit).toHaveBeenCalledWith({
    name: "John Doe",
    email: "john@example.com",
    message: "Hello!"
  });
});

EmptyForm.test("Can clear field values", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await userEvent.type(emailInput, "test@example.com");
  await userEvent.clear(emailInput);
  await expect(emailInput).toHaveValue("");
});

// Story 2: Pre-filled form
export const FilledForm = meta.story({
  args: {
    defaultValues: {
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Pre-filled message"
    }
  }
});

FilledForm.test("Displays pre-filled values", async ({ canvas, args }) => {
  await expect(canvas.getByLabelText(/name/i)).toHaveValue(args.defaultValues.name);
  await expect(canvas.getByLabelText(/email/i)).toHaveValue(args.defaultValues.email);
  await expect(canvas.getByLabelText(/message/i)).toHaveValue(args.defaultValues.message);
});

FilledForm.test("Can modify pre-filled values", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "new@example.com");
  await expect(emailInput).toHaveValue("new@example.com");
});

// Story 3: Loading state
export const SubmittingForm = meta.story({
  args: { isSubmitting: true }
});

SubmittingForm.test("Submit button is disabled during submission", async ({ canvas }) => {
  const submitBtn = canvas.getByRole("button", { name: /submit/i });
  await expect(submitBtn).toBeDisabled();
});

SubmittingForm.test("Shows loading indicator", async ({ canvas }) => {
  await expect(canvas.getByRole("progressbar")).toBeVisible();
});
```

## Template 2: List/Table Component

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";
import { itemBuilder } from "~/features/item/test/builders";
import { ItemList } from "./item-list";

const meta = preview.meta({
  title: "Components/ItemList",
  component: ItemList,
  args: {
    onItemClick: fn()
  }
});

// Story 1: Empty state
export const EmptyList = meta.story({
  args: { items: [] }
});

EmptyList.test("Shows empty state message", async ({ canvas }) => {
  await expect(canvas.getByText(/no items found/i)).toBeVisible();
});

EmptyList.test("Does not render table when empty", async ({ canvas }) => {
  await expect(canvas.queryByRole("table")).not.toBeInTheDocument();
});

// Story 2: With data
export const PopulatedList = meta.story({
  args: { items: Array.from({ length: 5 }, () => itemBuilder.one()) }
});

PopulatedList.test("Renders all items in table", async ({ canvas, args }) => {
  const rows = canvas.getAllByRole("row");
  // +1 for header row
  await expect(rows.length).toBe(args.items.length + 1);
});

PopulatedList.test("Clicking item triggers callback", async ({ canvas, userEvent, args }) => {
  const firstRow = canvas.getAllByRole("row")[1]; // Skip header
  await userEvent.click(firstRow);
  await expect(args.onItemClick).toHaveBeenCalledWith(args.items[0]);
});

PopulatedList.test("Table has correct column headers", async ({ canvas }) => {
  await expect(canvas.getByRole("columnheader", { name: /name/i })).toBeVisible();
  await expect(canvas.getByRole("columnheader", { name: /status/i })).toBeVisible();
  await expect(canvas.getByRole("columnheader", { name: /actions/i })).toBeVisible();
});

// Story 3: Loading state
export const LoadingList = meta.story({
  args: { isLoading: true }
});

LoadingList.test("Shows loading skeleton", async ({ canvas }) => {
  await expect(canvas.getByRole("progressbar")).toBeVisible();
});

LoadingList.test("Does not show items during loading", async ({ canvas }) => {
  await expect(canvas.queryAllByRole("row").length).toBe(0);
});
```

## Template 3: Modal/Dialog Component

```typescript
import { expect, fn } from "storybook/test";
import { screen } from "storybook/test";
import preview from "~/.storybook/preview";
import { ConfirmDialog } from "./confirm-dialog";

const meta = preview.meta({
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  args: {
    onConfirm: fn(),
    onCancel: fn()
  }
});

// Story 1: Closed state (for visual docs)
export const ClosedDialog = meta.story({
  args: { isOpen: false }
});

// Story 2: Open state (main test story)
export const OpenDialog = meta.story({
  args: {
    isOpen: true,
    title: "Confirm Action",
    message: "Are you sure you want to proceed?"
  }
});

// Rendering tests
OpenDialog.test("Renders modal with title and message", async ({ canvas, args }) => {
  const dialog = canvas.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(canvas.getByText(args.title)).toBeVisible();
  await expect(canvas.getByText(args.message)).toBeVisible();
});

OpenDialog.test("Shows confirm and cancel buttons", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /confirm/i })).toBeVisible();
  await expect(canvas.getByRole("button", { name: /cancel/i })).toBeVisible();
});

// Interaction tests
OpenDialog.test("Clicking confirm triggers onConfirm", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: /confirm/i }));
  await expect(args.onConfirm).toHaveBeenCalledTimes(1);
  await expect(args.onCancel).not.toHaveBeenCalled();
});

OpenDialog.test("Clicking cancel triggers onCancel", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button", { name: /cancel/i }));
  await expect(args.onCancel).toHaveBeenCalledTimes(1);
  await expect(args.onConfirm).not.toHaveBeenCalled();
});

OpenDialog.test("Pressing Escape triggers onCancel", async ({ userEvent, args }) => {
  await userEvent.keyboard("{Escape}");
  await expect(args.onCancel).toHaveBeenCalled();
});

OpenDialog.test("Clicking backdrop closes modal", async ({ canvasElement, userEvent, args }) => {
  const backdrop = canvasElement.parentElement?.querySelector("[data-backdrop]");
  if (backdrop) {
    await userEvent.click(backdrop);
    await expect(args.onCancel).toHaveBeenCalled();
  }
});

// Accessibility tests
OpenDialog.test("Traps focus within modal", async ({ canvas, userEvent }) => {
  const buttons = canvas.getAllByRole("button");
  const firstButton = buttons[0];
  const lastButton = buttons[buttons.length - 1];

  firstButton.focus();
  await expect(firstButton).toHaveFocus();

  // Tab through all focusable elements
  await userEvent.tab();
  await userEvent.tab();

  // Should stay within modal
  const focusedElement = document.activeElement;
  await expect(canvas.getByRole("dialog")).toContainElement(focusedElement);
});

OpenDialog.test("Has correct ARIA attributes", async ({ canvas }) => {
  const dialog = canvas.getByRole("dialog");
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveAttribute("aria-labelledby");
});
```

## Template 4: Button Component

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";
import { SubmitButton } from "./submit-button";

const meta = preview.meta({
  title: "Components/SubmitButton",
  component: SubmitButton,
  args: {
    onClick: fn()
  }
});

// Visual documentation stories (for Storybook UI)
export const Primary = meta.story({
  args: { variant: "primary", children: "Primary Button" }
});

export const Secondary = meta.story({
  args: { variant: "secondary", children: "Secondary Button" }
});

export const Destructive = meta.story({
  args: { variant: "destructive", children: "Delete" }
});

// Main test story (if only one state, name after component)
export const IdleButton = meta.story({
  args: { children: "Click Me" }
});

// Rendering tests
IdleButton.test("Renders button with correct text", async ({ canvas, args }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeVisible();
  await expect(button).toHaveTextContent(args.children);
});

IdleButton.test("Has correct default variant styles", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveClass(/bg-blue-600/); // primary variant default
});

// Interaction tests
IdleButton.test("Calls onClick when clicked", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(1);
});

IdleButton.test("Can be clicked multiple times", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await userEvent.click(button);
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(3);
});

// Accessibility tests
IdleButton.test("Can be activated with Enter key", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  button.focus();
  await expect(button).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  await expect(args.onClick).toHaveBeenCalled();
});

IdleButton.test("Can be activated with Space key", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  button.focus();
  await userEvent.keyboard(" ");
  await expect(args.onClick).toHaveBeenCalled();
});

IdleButton.test("Has accessible name", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveAccessibleName();
});

// Loading state story
export const LoadingButton = meta.story({
  args: { isLoading: true, children: "Loading..." }
});

LoadingButton.test("Shows loading indicator", async ({ canvas }) => {
  await expect(canvas.getByRole("progressbar")).toBeVisible();
});

LoadingButton.test("Is disabled during loading", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeDisabled();
});

LoadingButton.test("Has aria-busy attribute", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveAttribute("aria-busy", "true");
});

LoadingButton.test("Does not trigger onClick when clicked", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button"));
  await expect(args.onClick).not.toHaveBeenCalled();
});

// Disabled state story
export const DisabledButton = meta.story({
  args: { disabled: true, children: "Disabled" }
});

DisabledButton.test("Shows disabled state visually", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeDisabled();
  await expect(button).toHaveClass(/opacity-50/);
});

DisabledButton.test("Does not trigger onClick when clicked", async ({ canvas, userEvent, args }) => {
  await userEvent.click(canvas.getByRole("button"));
  await expect(args.onClick).not.toHaveBeenCalled();
});
```

## Template 5: Input/TextField Component

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";
import { EmailInput } from "./email-input";

const meta = preview.meta({
  title: "Components/EmailInput",
  component: EmailInput,
  args: {
    onChange: fn()
  }
});

// Story 1: Empty input (main test story)
export const EmptyInput = meta.story({
  args: { label: "Email", placeholder: "Enter your email" }
});

// Rendering tests
EmptyInput.test("Renders label and input field", async ({ canvas, args }) => {
  await expect(canvas.getByLabelText(args.label)).toBeVisible();
  await expect(canvas.getByPlaceholderText(args.placeholder)).toBeVisible();
});

EmptyInput.test("Input starts with empty value", async ({ canvas }) => {
  const input = canvas.getByRole("textbox");
  await expect(input).toHaveValue("");
});

// Interaction tests
EmptyInput.test("Typing updates input value", async ({ canvas, userEvent }) => {
  const input = canvas.getByRole("textbox");
  await userEvent.type(input, "test@example.com");
  await expect(input).toHaveValue("test@example.com");
});

EmptyInput.test("Triggers onChange on input", async ({ canvas, userEvent, args }) => {
  const input = canvas.getByRole("textbox");
  await userEvent.type(input, "test@example.com");
  await expect(args.onChange).toHaveBeenCalled();
});

EmptyInput.test("Can clear input value", async ({ canvas, userEvent }) => {
  const input = canvas.getByRole("textbox");
  await userEvent.type(input, "test@example.com");
  await userEvent.clear(input);
  await expect(input).toHaveValue("");
});

// Story 2: With value
export const FilledInput = meta.story({
  args: { label: "Email", value: "user@example.com" }
});

FilledInput.test("Displays provided value", async ({ canvas, args }) => {
  const input = canvas.getByRole("textbox");
  await expect(input).toHaveValue(args.value);
});

FilledInput.test("Can modify existing value", async ({ canvas, userEvent }) => {
  const input = canvas.getByRole("textbox");
  await userEvent.clear(input);
  await userEvent.type(input, "new@example.com");
  await expect(input).toHaveValue("new@example.com");
});

// Story 3: Error state
export const ErrorInput = meta.story({
  args: {
    label: "Email",
    value: "invalid",
    error: "Invalid email address"
  }
});

ErrorInput.test("Displays error message", async ({ canvas, args }) => {
  await expect(canvas.getByText(args.error)).toBeVisible();
});

ErrorInput.test("Has aria-invalid attribute", async ({ canvas }) => {
  const input = canvas.getByRole("textbox");
  await expect(input).toHaveAttribute("aria-invalid", "true");
});

ErrorInput.test("Has error styling", async ({ canvas }) => {
  const input = canvas.getByRole("textbox");
  await expect(input).toHaveClass(/border-red/);
});

// Story 4: Disabled state
export const DisabledInput = meta.story({
  args: { label: "Email", disabled: true }
});

DisabledInput.test("Input is disabled", async ({ canvas }) => {
  const input = canvas.getByRole("textbox");
  await expect(input).toBeDisabled();
});

DisabledInput.test("Cannot type in disabled input", async ({ canvas, userEvent, args }) => {
  const input = canvas.getByRole("textbox");
  await userEvent.type(input, "test");
  await expect(input).toHaveValue("");
  await expect(args.onChange).not.toHaveBeenCalled();
});
```

## Template: Select/Dropdown Component

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";
import { Select } from "./Select";

const meta = preview.meta({
  component: Select,
  args: {
    onChange: fn(),
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" }
    ]
  }
});

export const Default = meta.story({
  args: { label: "Choose an option" }
});

export const WithDefaultValue = meta.story({
  args: { label: "Choose an option", value: "2" }
});

export const Disabled = meta.story({
  args: { label: "Choose an option", disabled: true }
});

export const SelectOption = meta.story({
  args: { label: "Choose an option" },
  play: async ({ canvas, userEvent, args }) => {
    const select = canvas.getByRole("combobox");
    await userEvent.click(select);

    // Find option in portal (renders to document.body)
    const option = await screen.findByRole("option", { name: /option 2/i });
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledWith("2");
  }
});
```

## Template: Card Component

```typescript
import preview from "~/.storybook/preview";
import { Card } from "./Card";

const meta = preview.meta({
  component: Card
});

export const WithTitle = meta.story({
  args: {
    title: "Card Title",
    children: "Card content goes here"
  }
});

export const WithFooter = meta.story({
  args: {
    title: "Card Title",
    children: "Card content",
    footer: <button>Action</button>
  }
});

export const Interactive = meta.story({
  args: {
    title: "Card Title",
    onClick: fn()
  }
});

export const Loading = meta.story({
  args: {
    isLoading: true
  }
});
```

## Template: Tabs Component

```typescript
import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { Tabs } from "./Tabs";

const meta = preview.meta({
  component: Tabs,
  args: {
    tabs: [
      { id: "tab1", label: "Tab 1", content: "Content 1" },
      { id: "tab2", label: "Tab 2", content: "Content 2" },
      { id: "tab3", label: "Tab 3", content: "Content 3" }
    ]
  }
});

export const Default = meta.story({});

export const WithDefaultTab = meta.story({
  args: { defaultTab: "tab2" }
});

export const TabNavigation = meta.story({
  play: async ({ canvas, userEvent, step }) => {
    await step("Verify first tab is selected", async () => {
      const firstTab = canvas.getByRole("tab", { name: /tab 1/i });
      await expect(firstTab).toHaveAttribute("aria-selected", "true");
    });

    await step("Click second tab", async () => {
      const secondTab = canvas.getByRole("tab", { name: /tab 2/i });
      await userEvent.click(secondTab);
      await expect(secondTab).toHaveAttribute("aria-selected", "true");
    });

    await step("Verify content changed", async () => {
      await expect(canvas.getByText("Content 2")).toBeInTheDocument();
    });
  }
});
```

## Using These Templates

1. Copy the appropriate template for your component type
2. Customize props, args, and test scenarios
3. Add component-specific edge cases
4. Ensure all essential stories are covered
5. Run tests to verify they pass
