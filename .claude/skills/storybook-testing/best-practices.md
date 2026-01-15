# Storybook Testing Best Practices

## Best Practices

1. **Use Semantic Queries**
   - Prefer `getByRole`, `getByLabelText` over `getByTestId`
   - Use case-insensitive regex: `/text/i`

2. **Await Async Operations**
   - Always `await` user interactions
   - Use `waitFor` for dynamic content
   - Use `findBy*` for async elements

3. **Test User-Visible Behavior**
   - Don't test implementation details
   - Verify outcomes, not internal state

4. **Mock External Dependencies**
   - Use `fn()` to mock callbacks
   - Use builders for test data

5. **Organize with Steps**
   - Use `step()` to group related assertions

6. **Handle Portals Correctly**
   - Use `screen` for modals/dropdowns
   - Wait for portal content with `waitFor`

7. **Include Edge Cases**
   - Empty forms, invalid inputs
   - Server errors, loading states

8. **Keep Stories Focused**
   - One scenario per story

## Common Pitfalls

### 1. Not awaiting async operations

```typescript
// BAD
userEvent.click(button);
expect(args.onSubmit).toHaveBeenCalled();

// GOOD
await userEvent.click(button);
await expect(args.onSubmit).toHaveBeenCalled();
```

### 2. Not using waitFor for dynamic content

```typescript
// BAD
const message = canvas.getByText(/success/i);

// GOOD
await waitFor(async () => {
  const message = canvas.getByText(/success/i);
  await expect(message).toBeVisible();
});
```

### 3. Using getBy* for elements that might not exist

```typescript
// BAD (throws if not found)
const error = canvas.getByText(/error/i);
await expect(error).toBeNull();

// GOOD (returns null if not found)
const error = canvas.queryByText(/error/i);
await expect(error).toBeNull();
```

### 4. Not handling portals correctly

```typescript
// BAD
const option = canvas.getByRole("option"); // Won't find portal content

// GOOD
import { screen } from "storybook/test";
const option = screen.getByRole("option");
```

### 5. Not mocking functions properly

```typescript
// BAD (not trackable)
args: { onSubmit: async () => {} }

// GOOD (with fn())
args: { onSubmit: fn(async () => ({ success: true })) }
```

## Story Categories Checklist

For each component, consider:

- [ ] Initial/Default State
- [ ] Prefilled State
- [ ] Loading State
- [ ] Error State (validation, server)
- [ ] Success State
- [ ] Edge Cases
- [ ] User Interactions
- [ ] Complete Flows
- [ ] Accessibility (keyboard nav)
