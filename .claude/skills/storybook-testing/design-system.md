# Testing @szum-tech/design-system Components

When testing components that use the design system, follow these patterns using `.test()` method.

> **All examples use `.test()` method for multiple tests per story**

## Testing DS Form Components

```typescript
import { expect, fn, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { UserProfileForm } from "./user-profile-form";

const meta = preview.meta({
  title: "Features/Profile/UserProfileForm",
  component: UserProfileForm,
  args: {
    onSubmit: fn()
  }
});

// Main story for form testing
export const EmptyForm = meta.story({});

// Rendering tests
EmptyForm.test("Renders all form fields with DS Input components", async ({ canvas }) => {
  // DS Input components use specific ARIA patterns
  const emailInput = canvas.getByRole("textbox", { name: /email/i });
  const nameInput = canvas.getByRole("textbox", { name: /name/i });
  await expect(emailInput).toBeVisible();
  await expect(nameInput).toBeVisible();
});

// Validation tests
EmptyForm.test("Shows DS error message on empty submit", async ({ canvas, userEvent }) => {
  const submitBtn = canvas.getByRole("button", { name: /submit/i });
  await userEvent.click(submitBtn);

  await waitFor(async () => {
    // DS error messages have specific role
    await expect(canvas.getByText(/email is required/i)).toBeInTheDocument();
  });
});

// Interaction tests
EmptyForm.test("Submits successfully with valid data", async ({ canvas, userEvent, args }) => {
  const emailInput = canvas.getByRole("textbox", { name: /email/i });
  await userEvent.type(emailInput, "user@example.com");
  await userEvent.click(canvas.getByRole("button", { name: /submit/i }));
  await expect(args.onSubmit).toHaveBeenCalled();
});
```

## Testing DS Modal/Dialog Components

```typescript
import { expect, fn } from "storybook/test";
import { screen } from "storybook/test";
import preview from "~/.storybook/preview";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";

const meta = preview.meta({
  title: "Components/DeleteConfirmDialog",
  component: DeleteConfirmDialog,
  args: {
    onConfirm: fn(),
    onCancel: fn()
  }
});

// Story: Open modal
export const OpenDialog = meta.story({
  args: { isOpen: true }
});

// Rendering tests
OpenDialog.test("Renders dialog with DS dialog component", async () => {
  // DS modals use dialog role - use screen for portals
  const dialog = await screen.findByRole("dialog");
  await expect(dialog).toBeInTheDocument();
});

OpenDialog.test("Shows confirm and cancel buttons", async () => {
  const confirmBtn = screen.getByRole("button", { name: /confirm/i });
  const cancelBtn = screen.getByRole("button", { name: /cancel/i });
  await expect(confirmBtn).toBeVisible();
  await expect(cancelBtn).toBeVisible();
});

// Interaction tests
OpenDialog.test("Closes on Escape key", async ({ userEvent, args }) => {
  await userEvent.keyboard("{Escape}");
  await expect(args.onCancel).toHaveBeenCalled();
});

OpenDialog.test("Clicking cancel closes dialog", async ({ userEvent, args }) => {
  const cancelBtn = screen.getByRole("button", { name: /cancel/i });
  await userEvent.click(cancelBtn);
  await expect(args.onCancel).toHaveBeenCalled();
});

OpenDialog.test("Clicking confirm triggers action", async ({ userEvent, args }) => {
  const confirmBtn = screen.getByRole("button", { name: /confirm/i });
  await userEvent.click(confirmBtn);
  await expect(args.onConfirm).toHaveBeenCalled();
});

// Accessibility tests
OpenDialog.test("Traps focus within dialog", async ({ userEvent }) => {
  const dialog = screen.getByRole("dialog");
  const focusableElements = dialog.querySelectorAll("button");

  focusableElements[0].focus();
  await userEvent.tab();

  // Focus should stay within dialog
  const activeElement = document.activeElement;
  await expect(dialog).toContainElement(activeElement);
});
```

## Testing DS Select/Dropdown Components

```typescript
import { expect, fn } from "storybook/test";
import { screen } from "storybook/test";
import preview from "~/.storybook/preview";
import { CountrySelect } from "./country-select";

const meta = preview.meta({
  title: "Components/CountrySelect",
  component: CountrySelect,
  args: {
    onValueChange: fn()
  }
});

// Main story
export const CountrySelect = meta.story({});

// Rendering tests
CountrySelect.test("Renders combobox trigger", async ({ canvas }) => {
  // DS Select uses combobox role
  const select = canvas.getByRole("combobox");
  await expect(select).toBeVisible();
});

// Interaction tests
CountrySelect.test("Opens dropdown on trigger click", async ({ canvas, userEvent }) => {
  const select = canvas.getByRole("combobox");
  await userEvent.click(select);

  // Options appear in portal (document.body) - use screen
  const option = await screen.findByRole("option", { name: /united states/i });
  await expect(option).toBeVisible();
});

CountrySelect.test("Selects option and updates trigger text", async ({ canvas, userEvent, args }) => {
  const select = canvas.getByRole("combobox");
  await userEvent.click(select);

  const option = await screen.findByRole("option", { name: /poland/i });
  await userEvent.click(option);

  await expect(select).toHaveTextContent("Poland");
  await expect(args.onValueChange).toHaveBeenCalledWith("PL");
});

CountrySelect.test("Closes dropdown after selection", async ({ canvas, userEvent }) => {
  const select = canvas.getByRole("combobox");
  await userEvent.click(select);

  const option = await screen.findByRole("option", { name: /poland/i });
  await userEvent.click(option);

  await waitFor(async () => {
    await expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
});
```

## Testing DS Tooltip Components

```typescript
import { expect, waitFor } from "storybook/test";
import { screen } from "storybook/test";
import preview from "~/.storybook/preview";
import { InfoTooltip } from "./info-tooltip";

const meta = preview.meta({
  title: "Components/InfoTooltip",
  component: InfoTooltip
});

// Main story
export const InfoTooltip = meta.story({});

// Interaction tests
InfoTooltip.test("Shows tooltip on hover", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /info/i });
  await userEvent.hover(trigger);

  // DS tooltips render to portal - use screen
  const tooltip = await screen.findByRole("tooltip");
  await expect(tooltip).toHaveTextContent(/helpful information/i);
});

InfoTooltip.test("Hides tooltip on unhover", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /info/i });
  await userEvent.hover(trigger);

  const tooltip = await screen.findByRole("tooltip");
  await expect(tooltip).toBeVisible();

  await userEvent.unhover(trigger);
  await waitFor(async () => {
    await expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

InfoTooltip.test("Shows tooltip on focus (keyboard)", async ({ canvas }) => {
  const trigger = canvas.getByRole("button", { name: /info/i });
  trigger.focus();

  const tooltip = await screen.findByRole("tooltip");
  await expect(tooltip).toBeVisible();
});
```

## Testing DS Button Components

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";
import { ActionButton } from "./action-button";

const meta = preview.meta({
  title: "Components/ActionButton",
  component: ActionButton,
  args: {
    onClick: fn()
  }
});

// Visual variant stories (for docs)
export const Primary = meta.story({
  args: { variant: "primary", children: "Primary" }
});

export const Secondary = meta.story({
  args: { variant: "secondary", children: "Secondary" }
});

export const Destructive = meta.story({
  args: { variant: "destructive", children: "Delete" }
});

// Main test story
export const IdleButton = meta.story({
  args: { children: "Action Button" }
});

// State tests
IdleButton.test("Is enabled by default", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeEnabled();
  await expect(button).toHaveAttribute("aria-busy", "false");
});

// Interaction tests
IdleButton.test("Calls onClick when clicked", async ({ canvas, userEvent, args }) => {
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(1);
});

// Loading state story
export const LoadingButton = meta.story({
  args: { isLoading: true, children: "Loading..." }
});

LoadingButton.test("Is disabled when loading", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toBeDisabled();
});

LoadingButton.test("Has aria-busy=true when loading", async ({ canvas }) => {
  const button = canvas.getByRole("button");
  await expect(button).toHaveAttribute("aria-busy", "true");
});

LoadingButton.test("Shows loading indicator", async ({ canvas }) => {
  // DS loading indicator (spinner, progressbar, etc.)
  await expect(canvas.getByRole("progressbar")).toBeVisible();
});
```

## Testing DS Toast/Notification Components

```typescript
import { expect, fn, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { ToastDemo } from "./toast-demo";

const meta = preview.meta({
  title: "Components/ToastDemo",
  component: ToastDemo,
  args: {
    onShowToast: fn()
  }
});

// Main story
export const ToastDemo = meta.story({});

// Interaction tests
ToastDemo.test("Shows toast on trigger click", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /show toast/i }));

  // Toast should appear with role="status" or role="alert"
  const toast = await canvas.findByRole("status");
  await expect(toast).toHaveTextContent(/success/i);
});

ToastDemo.test("Auto-dismisses after timeout", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /show toast/i }));

  const toast = await canvas.findByRole("status");
  await expect(toast).toBeVisible();

  // Wait for auto-dismiss (default 5 seconds for DS)
  await waitFor(
    async () => {
      await expect(canvas.queryByRole("status")).not.toBeInTheDocument();
    },
    { timeout: 6000 }
  );
});

ToastDemo.test("Can be dismissed manually", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /show toast/i }));

  const toast = await canvas.findByRole("status");
  const closeBtn = toast.querySelector("button[aria-label='Close']");

  if (closeBtn) {
    await userEvent.click(closeBtn);
    await waitFor(async () => {
      await expect(canvas.queryByRole("status")).not.toBeInTheDocument();
    });
  }
});
```

## Testing DS Tabs Components

```typescript
import { expect, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { SettingsTabs } from "./settings-tabs";

const meta = preview.meta({
  title: "Components/SettingsTabs",
  component: SettingsTabs
});

// Main story
export const SettingsTabs = meta.story({});

// Rendering tests
SettingsTabs.test("Renders all tab triggers", async ({ canvas }) => {
  await expect(canvas.getByRole("tab", { name: /profile/i })).toBeVisible();
  await expect(canvas.getByRole("tab", { name: /security/i })).toBeVisible();
  await expect(canvas.getByRole("tab", { name: /notifications/i })).toBeVisible();
});

SettingsTabs.test("First tab is selected by default", async ({ canvas }) => {
  const firstTab = canvas.getByRole("tab", { name: /profile/i });
  await expect(firstTab).toHaveAttribute("aria-selected", "true");
});

// Interaction tests
SettingsTabs.test("Clicking tab switches content", async ({ canvas, userEvent }) => {
  const securityTab = canvas.getByRole("tab", { name: /security/i });
  await userEvent.click(securityTab);

  await waitFor(async () => {
    await expect(securityTab).toHaveAttribute("aria-selected", "true");
  });

  const panel = canvas.getByRole("tabpanel");
  await expect(panel).toHaveTextContent(/security settings/i);
});

SettingsTabs.test("Deselects previous tab when switching", async ({ canvas, userEvent }) => {
  const profileTab = canvas.getByRole("tab", { name: /profile/i });
  const securityTab = canvas.getByRole("tab", { name: /security/i });

  await expect(profileTab).toHaveAttribute("aria-selected", "true");

  await userEvent.click(securityTab);

  await waitFor(async () => {
    await expect(profileTab).toHaveAttribute("aria-selected", "false");
    await expect(securityTab).toHaveAttribute("aria-selected", "true");
  });
});

// Keyboard navigation tests
SettingsTabs.test("Arrow keys navigate between tabs", async ({ canvas, userEvent }) => {
  const profileTab = canvas.getByRole("tab", { name: /profile/i });
  const securityTab = canvas.getByRole("tab", { name: /security/i });

  profileTab.focus();
  await userEvent.keyboard("{ArrowRight}");

  await expect(securityTab).toHaveFocus();
});
```

## Testing DS Checkbox/Switch Components

```typescript
import { expect, fn } from "storybook/test";
import preview from "~/.storybook/preview";
import { NewsletterCheckbox } from "./newsletter-checkbox";

const meta = preview.meta({
  title: "Components/NewsletterCheckbox",
  component: NewsletterCheckbox,
  args: {
    onCheckedChange: fn()
  }
});

// Story 1: Unchecked
export const UncheckedCheckbox = meta.story({
  args: { checked: false }
});

UncheckedCheckbox.test("Renders unchecked checkbox", async ({ canvas }) => {
  const checkbox = canvas.getByRole("checkbox");
  await expect(checkbox).not.toBeChecked();
});

UncheckedCheckbox.test("Checks on click", async ({ canvas, userEvent, args }) => {
  const checkbox = canvas.getByRole("checkbox");
  await userEvent.click(checkbox);
  await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
});

// Story 2: Checked
export const CheckedCheckbox = meta.story({
  args: { checked: true }
});

CheckedCheckbox.test("Renders checked checkbox", async ({ canvas }) => {
  const checkbox = canvas.getByRole("checkbox");
  await expect(checkbox).toBeChecked();
});

CheckedCheckbox.test("Unchecks on click", async ({ canvas, userEvent, args }) => {
  const checkbox = canvas.getByRole("checkbox");
  await userEvent.click(checkbox);
  await expect(args.onCheckedChange).toHaveBeenCalledWith(false);
});
```

## Common DS Patterns

### Portal Queries

Many DS components render in portals (modals, dropdowns, tooltips) to document.body. **Always use `screen` for portal
content:**

```typescript
import { screen } from "storybook/test";

export const DropdownMenu = meta.story({});

DropdownMenu.test("Opens dropdown in portal", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button");
  await userEvent.click(trigger);

  // Portal content renders to document.body - use screen
  const option = await screen.findByRole("option", { name: /option 1/i });
  await expect(option).toBeVisible();
});

DropdownMenu.test("Selects option from portal", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button");
  await userEvent.click(trigger);

  const option = await screen.findByRole("option", { name: /option 1/i });
  await userEvent.click(option);

  await expect(trigger).toHaveTextContent("Option 1");
});
```

### ARIA Patterns

DS components follow strict ARIA patterns. Use appropriate roles:

```typescript
// Buttons
canvas.getByRole("button", { name: /label/i });

// Inputs
canvas.getByRole("textbox", { name: /email/i });

// Checkboxes
canvas.getByRole("checkbox", { name: /agree/i });

// Radio buttons
canvas.getByRole("radio", { name: /option/i });

// Comboboxes (Select/Autocomplete)
canvas.getByRole("combobox");

// Dialogs (in portal - use screen)
screen.getByRole("dialog");

// Tooltips (in portal - use screen)
screen.getByRole("tooltip");

// Tabs
canvas.getByRole("tab", { name: /tab name/i });
canvas.getByRole("tabpanel");

// Alerts/Toasts
canvas.getByRole("status"); // For success messages
canvas.getByRole("alert"); // For errors
```

### Async Components

DS components may have animations/transitions. Use `findBy*` queries:

```typescript
export const AnimatedDialog = meta.story({});

AnimatedDialog.test("Dialog appears after animation", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open/i }));

  // Wait for dialog to appear (with animation)
  const dialog = await screen.findByRole("dialog");
  await expect(dialog).toBeVisible();
});

AnimatedDialog.test("Dialog disappears after close animation", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open/i }));
  await screen.findByRole("dialog");

  await userEvent.keyboard("{Escape}");

  // Wait for dialog to disappear (with animation)
  await waitFor(async () => {
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
```

### Focus Management

DS modals and dialogs manage focus automatically:

```typescript
export const FocusManagedDialog = meta.story({
  args: { isOpen: true }
});

FocusManagedDialog.test("Focuses first focusable element on open", async () => {
  const dialog = screen.getByRole("dialog");
  const focusedElement = dialog.querySelector(":focus");
  await expect(focusedElement).toBeInTheDocument();
  await expect(focusedElement).toHaveAttribute("role", "button");
});

FocusManagedDialog.test("Returns focus to trigger after close", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /open/i });

  // Open dialog
  await userEvent.click(trigger);
  await screen.findByRole("dialog");

  // Close dialog
  await userEvent.keyboard("{Escape}");

  // Focus should return to trigger
  await waitFor(async () => {
    await expect(trigger).toHaveFocus();
  });
});
```

## DS-Specific Best Practices

### 1. Portal Components Always Use `screen`

```typescript
// ✅ GOOD - Use screen for DS portals
export const Select = meta.story({});

Select.test("Opens dropdown in portal", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("combobox"));
  const option = await screen.findByRole("option");
  await expect(option).toBeVisible();
});

// ❌ BAD - Canvas won't find portal content
Select.test("Opens dropdown", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("combobox"));
  const option = await canvas.findByRole("option"); // ❌ Won't work!
  await expect(option).toBeVisible();
});
```

### 2. Test Accessibility First

DS components are built with accessibility. Always verify ARIA patterns:

```typescript
DialogComponent.test("Has correct ARIA attributes", async () => {
  const dialog = screen.getByRole("dialog");
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveAttribute("aria-labelledby");
  await expect(dialog).toHaveAttribute("aria-describedby");
});
```

### 3. Respect Animation Timing

DS components use Tailwind animations. Use `findBy*` or `waitFor`:

```typescript
// ✅ GOOD - Wait for animation
Modal.test("Modal appears with animation", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open/i }));

  // findBy waits for element
  const dialog = await screen.findByRole("dialog");
  await expect(dialog).toBeVisible();
});

// ❌ BAD - May fail due to animation timing
Modal.test("Modal appears", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open/i }));

  // getBy throws immediately if not found
  const dialog = screen.getByRole("dialog"); // ❌ May fail during animation
  await expect(dialog).toBeVisible();
});
```

### 4. Use Correct Roles for DS Components

| DS Component | Role              | Query Example                  | Portal?                   |
| ------------ | ----------------- | ------------------------------ | ------------------------- |
| Button       | `button`          | `canvas.getByRole("button")`   | No                        |
| Input        | `textbox`         | `canvas.getByRole("textbox")`  | No                        |
| Select       | `combobox`        | `canvas.getByRole("combobox")` | Trigger: No, Options: Yes |
| Dialog       | `dialog`          | `screen.getByRole("dialog")`   | Yes                       |
| Checkbox     | `checkbox`        | `canvas.getByRole("checkbox")` | No                        |
| Radio        | `radio`           | `canvas.getByRole("radio")`    | No                        |
| Tabs         | `tab`, `tabpanel` | `canvas.getByRole("tab")`      | No                        |
| Tooltip      | `tooltip`         | `screen.getByRole("tooltip")`  | Yes                       |
| Alert/Toast  | `status`, `alert` | `canvas.getByRole("status")`   | Depends                   |

### 5. Common DS Query Patterns

```typescript
// Form inputs (use canvas)
const email = canvas.getByRole("textbox", { name: /email/i });
const password = canvas.getByRole("textbox", { name: /password/i });

// Checkboxes (use canvas)
const terms = canvas.getByRole("checkbox", { name: /accept terms/i });

// Buttons (use canvas)
const submit = canvas.getByRole("button", { name: /submit/i });

// Dialogs (use screen - portal)
const dialog = await screen.findByRole("dialog");

// Dropdown options (use screen - portal)
const option = await screen.findByRole("option", { name: /value/i });

// Tooltips (use screen - portal)
const tooltip = await screen.findByRole("tooltip");
```

## Design System Documentation

For complete DS component APIs and patterns, see the
[design system documentation](https://szum-tech-design-system.vercel.app/?path=/docs/components--docs).
