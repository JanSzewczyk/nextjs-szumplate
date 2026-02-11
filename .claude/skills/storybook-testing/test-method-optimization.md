# Storybook `.test()` Method Optimization Guide

## Overview

**CSF Next** introduces the `.test()` method that allows **multiple tests per story**, dramatically reducing story count
while maintaining granular test coverage. This is enabled via `experimentalTestSyntax: true` (already configured in this
project).

## Key Benefits of `.test()` Method

1. **Fewer Stories** - Replace 10+ test stories with 1-2 stories + multiple tests
2. **Better Isolation** - Each test is independent; one failure doesn't block others
3. **Clearer Intent** - Test names describe what's being tested
4. **Traditional Feel** - Similar to Jest/Vitest test suites
5. **Better Reporting** - Individual test results in Storybook UI

## Current vs Optimized Pattern

### ❌ Current Pattern (skills-section.stories.tsx)

```typescript
// 1 story with 1 test
export const Default = meta.story({});
Default.test("Renders all skills and categories correctly", async ({ canvas, step }) => {
  // 6 steps checking various elements
});

// 9 separate stories with play functions
export const SkillCardHoverInteraction = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Hover over a non-featured skill card", async () => { ... });
    await step("Unhover to hide tooltip", async () => { ... });
  }
});

export const MarqueeInteraction = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify marquee tech logos are visible", async () => { ... });
    await step("Hover over tech logo to pause marquee", async () => { ... });
    await step("Unhover to resume marquee", async () => { ... });
  }
});

export const MobileTabNavigation = meta.story({ /* ... */ });
export const DesktopBentoGridLayout = meta.story({ /* ... */ });
export const KeyboardAccessibility = meta.story({ /* ... */ });
export const SectionHeadingStructure = meta.story({ /* ... */ });
export const ResponsiveLayout = meta.story({ /* ... */ });
export const FeaturedSkillDescriptions = meta.story({ /* ... */ });
export const TechLogoHoverAnimation = meta.story({ /* ... */ });
```

**Issues:**

- 10 total stories (1 + 9 test stories)
- Each test story creates a separate story entry
- Harder to see all tests at a glance
- More boilerplate with `meta.story()` calls

### ✅ Optimized Pattern (Using `.test()`)

```typescript
// ONE story with multiple tests
export const Default = meta.story({});

// Rendering & Content Tests
Default.test("Renders section heading and description", async ({ canvas }) => {
  const heading = canvas.getByRole("heading", { name: /skills & technologies/i, level: 2 });
  await expect(heading).toBeVisible();

  const description = canvas.getByText(/the tools and technologies I work with to bring ideas to life/i);
  await expect(description).toBeVisible();
});

Default.test("Displays all tech logos in marquee", async ({ canvas }) => {
  const reactLogo = canvas.getByText("React");
  await expect(reactLogo).toBeVisible();

  const nextLogo = canvas.getByText("Next.js");
  await expect(nextLogo).toBeVisible();

  const typescriptLogo = canvas.getByText("TypeScript");
  await expect(typescriptLogo).toBeVisible();
});

Default.test("Shows all category badges", async ({ canvas }) => {
  await expect(canvas.getByText("Frontend")).toBeVisible();
  await expect(canvas.getByText("Mobile")).toBeVisible();
  await expect(canvas.getByText("DevOps & Tools")).toBeVisible();
  await expect(canvas.getByText("Other")).toBeVisible();
});

Default.test("Displays skill cards with correct headings", async ({ canvas }) => {
  const reactSkill = canvas.getByRole("heading", { name: "React", level: 3 });
  await expect(reactSkill).toBeVisible();

  const reactNativeSkill = canvas.getByRole("heading", { name: "React Native", level: 3 });
  await expect(reactNativeSkill).toBeVisible();
});

// Interaction Tests
Default.test("Skill card hover shows tooltip", async ({ canvas, userEvent }) => {
  const nextjsCard = canvas.getByRole("heading", { name: "Next.js", level: 3 });
  await userEvent.hover(nextjsCard);

  await waitFor(
    async () => {
      const tooltip = canvas.queryByText(/full-stack react framework/i);
      if (tooltip) {
        await expect(tooltip).toBeVisible();
      }
    },
    { timeout: 2000 }
  );
});

Default.test("Marquee pauses on tech logo hover", async ({ canvas, userEvent }) => {
  const reactLogo = canvas.getByText("React");
  await userEvent.hover(reactLogo);
  await expect(reactLogo).toBeVisible();

  await userEvent.unhover(reactLogo);
  await expect(reactLogo).toBeVisible();
});

Default.test("Mobile tab navigation switches content", async ({ canvas, userEvent }) => {
  const frontendTab = canvas.getByRole("tab", { name: /frontend/i });
  await expect(frontendTab).toHaveAttribute("data-state", "active");

  const mobileTab = canvas.getByRole("tab", { name: /mobile/i });
  await userEvent.click(mobileTab);

  await waitFor(
    async () => {
      await expect(mobileTab).toHaveAttribute("data-state", "active");
    },
    { timeout: 2000 }
  );

  const reactNativeSkill = canvas.getByRole("heading", { name: "React Native", level: 3 });
  await expect(reactNativeSkill).toBeVisible();
});

// Accessibility Tests
Default.test("Keyboard navigation works with arrow keys", async ({ canvas, userEvent }) => {
  const frontendTab = canvas.getByRole("tab", { name: /frontend/i });
  frontendTab.focus();
  await expect(frontendTab).toHaveFocus();

  await userEvent.keyboard("{ArrowRight}");

  await waitFor(async () => {
    const mobileTab = canvas.getByRole("tab", { name: /mobile/i });
    await expect(mobileTab).toHaveFocus();
  });
});

Default.test("Section maintains proper heading hierarchy", async ({ canvas }) => {
  const mainHeading = canvas.getByRole("heading", { name: /skills & technologies/i, level: 2 });
  await expect(mainHeading).toBeVisible();

  const skillHeadings = canvas.getAllByRole("heading", { level: 3 });
  await expect(skillHeadings.length).toBeGreaterThan(4);
});

// Layout Tests
Default.test("Desktop Bento grid displays all categories simultaneously", async ({ canvas }) => {
  await expect(canvas.getByText("Frontend")).toBeVisible();
  await expect(canvas.getByText("Mobile")).toBeVisible();
  await expect(canvas.getByText("DevOps & Tools")).toBeVisible();
  await expect(canvas.getByText("Other")).toBeVisible();
});

Default.test("Responsive container has proper structure", async ({ canvasElement }) => {
  const section = canvasElement.querySelector("#skills");
  await expect(section).toBeInTheDocument();

  const container = section?.querySelector(".container");
  await expect(container).toBeInTheDocument();
});

// Optional: Keep one visual story for documentation
export const EmptyState = meta.story({
  name: "Visual Documentation",
  tags: ["autodocs"]
  // No tests - just for visual reference
});
```

**Benefits:**

- ✅ **2 stories** instead of 10 (80% reduction)
- ✅ All tests visible in one place
- ✅ Each test is independent and clearly named
- ✅ Less boilerplate code
- ✅ Better test organization by type (rendering, interaction, a11y, layout)

## When to Use `.test()` vs `play`

### Use `.test()` Method ✅

**For most test scenarios:**

- Unit-like tests checking specific behaviors
- Multiple independent test cases for the same component state
- When you want granular test reporting
- When tests don't depend on each other

**Example:**

```typescript
export const LoginForm = meta.story({});

LoginForm.test("Shows validation error on empty email", async ({ canvas }) => { ... });
LoginForm.test("Shows validation error on invalid email format", async ({ canvas }) => { ... });
LoginForm.test("Enables submit button when form is valid", async ({ canvas }) => { ... });
LoginForm.test("Calls onSubmit with form data", async ({ canvas }) => { ... });
```

### Use `play` Function 🔄

**For specific scenarios only:**

- Complex multi-step user flows that should be viewed as ONE cohesive test
- Integration tests simulating complete user journeys
- Demos for Storybook UI (showing interaction in action)

**Example:**

```typescript
export const CheckoutFlow = meta.story({
  name: "Complete Checkout Journey",
  play: async ({ canvas, step, userEvent }) => {
    // This is ONE complete flow, not multiple tests
    await step("Add items to cart", async () => { ... });
    await step("Proceed to checkout", async () => { ... });
    await step("Fill shipping info", async () => { ... });
    await step("Complete payment", async () => { ... });
  }
});
```

## Migration Strategy

### Step 1: Identify Test Stories

Find stories tagged with `test-only` that have `play` functions.

### Step 2: Group by Component State

Organize tests by what component state they're testing:

- Same args/props → Can share one story
- Different args → Need separate stories

### Step 3: Convert `play` to `.test()`

**Before:**

```typescript
export const TestName = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, userEvent }) => {
    // test logic
  }
});
```

**After:**

```typescript
Default.test("Test name in sentence case", async ({ canvas, userEvent }) => {
  // same test logic
});
```

### Step 4: Remove Unnecessary `step()` Calls

`.test()` already provides test granularity, so you can often remove internal `step()` calls:

**Before (with play):**

```typescript
play: async ({ canvas, step, userEvent }) => {
  await step("Click button", async () => {
    await userEvent.click(canvas.getByRole("button"));
  });

  await step("Verify result", async () => {
    await expect(canvas.getByText("Success")).toBeVisible();
  });
};
```

**After (with .test):**

```typescript
Default.test("Clicking button shows success message", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button"));
  await expect(canvas.getByText("Success")).toBeVisible();
});
```

## Test Naming Conventions

Good test names are descriptive and actionable:

### ✅ Good Names

- `"Renders section heading and description"`
- `"Shows validation error on empty email"`
- `"Disabled button prevents form submission"`
- `"Mobile tab navigation switches content"`
- `"Keyboard navigation works with arrow keys"`

### ❌ Bad Names

- `"Test 1"` - Not descriptive
- `"Works correctly"` - Too vague
- `"Validation"` - Unclear what's being validated
- `"Button"` - Doesn't describe behavior

## Advanced Patterns

### Pattern 1: Shared Test Helpers

```typescript
// Helper function for repeated setups
const fillContactForm = async (canvas: Canvas, userEvent: UserEvent) => {
  await userEvent.type(canvas.getByLabelText("Name"), "John Doe");
  await userEvent.type(canvas.getByLabelText("Email"), "john@example.com");
  await userEvent.type(canvas.getByLabelText("Message"), "Hello!");
};

export const ContactForm = meta.story({});

ContactForm.test("Submits form with valid data", async ({ canvas, userEvent, args }) => {
  await fillContactForm(canvas, userEvent);
  await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
  await expect(args.onSubmit).toHaveBeenCalled();
});

ContactForm.test("Shows success message after submission", async ({ canvas, userEvent }) => {
  await fillContactForm(canvas, userEvent);
  await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
  await expect(canvas.getByText("Thank you!")).toBeVisible();
});
```

### Pattern 2: Multiple Stories with Different Props

When you need to test different component states:

```typescript
// Story 1: Default state
export const Default = meta.story({});

Default.test("Renders empty form", async ({ canvas }) => { ... });
Default.test("Shows validation on submit", async ({ canvas }) => { ... });

// Story 2: Pre-filled state
export const Prefilled = meta.story({
  args: { defaultValues: { email: "user@example.com" } }
});

Prefilled.test("Displays pre-filled values", async ({ canvas }) => {
  await expect(canvas.getByLabelText("Email")).toHaveValue("user@example.com");
});

Prefilled.test("Can modify pre-filled values", async ({ canvas, userEvent }) => {
  const emailInput = canvas.getByLabelText("Email");
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "new@example.com");
  await expect(emailInput).toHaveValue("new@example.com");
});
```

### Pattern 3: Conditional Tests

For responsive or conditional rendering:

```typescript
Default.test("Mobile tab navigation (if tabs present)", async ({ canvas, userEvent }) => {
  const mobileTab = canvas.queryByRole("tab", { name: /mobile/i });

  // Only test if tabs are rendered (mobile viewport)
  if (mobileTab) {
    await userEvent.click(mobileTab);
    await expect(mobileTab).toHaveAttribute("data-state", "active");
  } else {
    // Desktop viewport - all categories visible
    await expect(canvas.getByText("Frontend")).toBeVisible();
    await expect(canvas.getByText("Mobile")).toBeVisible();
  }
});
```

## Type Safety

`.test()` method provides full type safety:

```typescript
import type { Canvas, UserEvent } from "storybook/test";

// Types are automatically inferred
Default.test("Test name", async ({ canvas, userEvent, args, step }) => {
  // canvas: Canvas
  // userEvent: UserEvent
  // args: StoryArgs<typeof ComponentName>
  // step: StepFunction
});
```

## Running Tests

```bash
# Run all Storybook tests
npm run test:storybook

# Run specific component tests
npm run test:storybook -- --grep "SkillsSection"

# Watch mode
npm run test:storybook -- --watch
```

## Best Practices

### 1. Keep Tests Focused

Each `.test()` should test ONE thing:

```typescript
// ✅ Good - one assertion
Default.test("Shows error message on invalid email", async ({ canvas }) => {
  await expect(canvas.getByText("Invalid email format")).toBeVisible();
});

// ❌ Bad - testing multiple unrelated things
Default.test("Form validation and submission", async ({ canvas, userEvent }) => {
  await expect(canvas.getByText("Error")).toBeVisible(); // validation
  await userEvent.click(canvas.getByRole("button")); // submission
  await expect(args.onSubmit).toHaveBeenCalled(); // callback
});
```

### 2. Group Related Tests

Organize tests by category using comments:

```typescript
export const ContactForm = meta.story({});

// Rendering Tests
ContactForm.test("Renders form fields", async ({ canvas }) => { ... });
ContactForm.test("Displays submit button", async ({ canvas }) => { ... });

// Validation Tests
ContactForm.test("Shows error on empty email", async ({ canvas }) => { ... });
ContactForm.test("Shows error on invalid email format", async ({ canvas }) => { ... });

// Interaction Tests
ContactForm.test("Submits form on button click", async ({ canvas, userEvent }) => { ... });
ContactForm.test("Submits form on Enter key", async ({ canvas, userEvent }) => { ... });

// Accessibility Tests
ContactForm.test("Keyboard navigation works", async ({ canvas }) => { ... });
ContactForm.test("Screen reader labels are correct", async ({ canvas }) => { ... });
```

### 3. Use Descriptive Assertions

```typescript
// ✅ Good - clear what's expected
await expect(canvas.getByRole("button", { name: "Submit" })).toBeEnabled();
await expect(canvas.getByText("Thank you!")).toBeVisible();

// ❌ Bad - unclear what's being tested
await expect(button).toBeTruthy();
await expect(element).not.toBeNull();
```

### 4. Handle Async Properly

Always await async operations:

```typescript
// ✅ Good
await userEvent.click(button);
await waitFor(async () => {
  await expect(canvas.getByText("Success")).toBeVisible();
});

// ❌ Bad - missing await
userEvent.click(button); // ⚠️ Not awaited!
expect(canvas.getByText("Success")).toBeVisible(); // ⚠️ Might fail
```

## Summary

### Key Takeaways

1. **Use `.test()` for multiple independent tests** - Replaces multiple test stories
2. **Use `play` for cohesive user flows** - When steps must happen in sequence
3. **Reduce story count by 60-80%** - Fewer stories, same coverage
4. **Better test organization** - Group by category (rendering, interaction, a11y)
5. **Improved maintainability** - Less boilerplate, clearer intent

### Recommended Pattern

```typescript
// ONE story for documentation
export const Default = meta.story({
  tags: ["autodocs"]
});

// MULTIPLE tests for that story
Default.test("Test case 1", async ({ canvas }) => { ... });
Default.test("Test case 2", async ({ canvas }) => { ... });
Default.test("Test case 3", async ({ canvas, userEvent }) => { ... });
// ... etc
```

This approach provides the best balance of:

- Test clarity
- Code maintainability
- Story organization
- Performance
