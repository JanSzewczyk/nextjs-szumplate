# Storybook Test Architect - Workflow Protocol

## Phase 1: Component Analysis

1. Read and deeply analyze the target component's source code
2. Identify all props, their types, and default values
3. Map out all interactive elements (buttons, inputs, links, etc.)
4. Identify state management patterns and side effects
5. Note any conditional rendering logic
6. Understand component composition and child component interactions
7. Review existing stories if they exist

## Phase 2: Test Proposal (REQUIRES USER APPROVAL)

Present a comprehensive, numbered list of proposed tests in this format:

```markdown
## Proposed Test Scenarios for [ComponentName]

Based on my analysis, I recommend the following tests:

### Rendering Tests
1. [ ] Renders with default props
2. [ ] Renders with all optional props provided
3. [ ] Displays correct content based on [specific prop]

### Interaction Tests
4. [ ] Click handler fires on button click
5. [ ] Form submission triggers onSubmit callback
6. [ ] Keyboard navigation works correctly (Tab, Enter, Escape)

### State Tests
7. [ ] Loading state displays spinner
8. [ ] Error state shows error message
9. [ ] Disabled state prevents interactions

### Edge Cases
10. [ ] Handles empty data gracefully
11. [ ] Long text content truncates properly
12. [ ] Handles rapid consecutive clicks

### Accessibility Tests
13. [ ] Has correct ARIA labels
14. [ ] Focus management is correct
15. [ ] Screen reader announcements work

Please review this list and let me know:
- Which tests to implement (e.g., "1, 2, 4, 7, 13")
- Any tests to add
- Any tests to remove or modify
```

**CRITICAL**: You MUST wait for explicit user approval before implementing ANY tests. Do not proceed to Phase 3 until the user confirms which tests to implement.

## Phase 3: Implementation (After Approval Only)

Once approved, implement tests using **CSF Next format**. See the `storybook-testing` skill for detailed implementation patterns:

- [CSF Next Patterns](../../skills/storybook-testing/patterns.md)
- [Component Templates](../../skills/storybook-testing/templates.md)
- [Best Practices](../../skills/storybook-testing/best-practices.md)
- [API Reference](../../skills/storybook-testing/api-reference.md)

Quick example:
```typescript
import { expect, fn, userEvent, within } from "storybook/test";
import preview from "~/.storybook/preview";
import { ComponentName } from "./ComponentName";

const meta = preview.meta({
  title: "Features/FeatureName/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  args: {
    onAction: fn()
  }
});

export const WithInteraction = meta.story({
  args: {},
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(button);
    await expect(args.onAction).toHaveBeenCalledTimes(1);
  }
});
```

## Phase 4: Debugging (When Needed)

If tests fail or behavior needs verification, use Playwright MCP to:
1. Launch Storybook dev server if not running (`npm run storybook:dev`)
2. Navigate to the specific story in the browser
3. Inspect component state and DOM structure
4. Debug interaction sequences step by step
5. Capture screenshots for documentation

## Phase 5: Test Execution and Verification (After Implementation)

**IMPORTANT: Always run tests after implementing them to verify they pass.**

### 1. Run Storybook Tests
```bash
npm run test:storybook
```
Execute all Storybook interaction tests in headless browser.

### 2. Run Specific Story Tests
```bash
npm run test:storybook -- --grep "ComponentName"
```
Run tests for a specific component.

### 3. Analyze Results
- If all tests pass → Report success with summary
- If tests fail → Use Playwright MCP to debug
- Identify flaky tests and stabilize them

### 4. Report to User
```markdown
## Test Execution Results

**Status:** ✅ All tests passed / ❌ X tests failed

**Summary:**
- Total stories tested: X
- Passed: X
- Failed: X

**Failed Tests (if any):**
- StoryName: Error description
```

### 5. If Tests Fail
- Read error messages carefully
- Use `mcp__playwright__browser_navigate` to open Storybook UI
- Use `mcp__playwright__browser_snapshot` to inspect component state
- Fix the test or component as needed
- Re-run tests to verify fix

## Automatic Test Run Triggers

Always run tests:
- After implementing ANY new story with play function
- After modifying existing stories
- Before marking the task as complete
