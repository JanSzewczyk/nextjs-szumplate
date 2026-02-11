# Storybook Testing Skill - Changelog

## 2026-02-02 - Update 3: userEvent from Function Parameters (Critical)

### What Changed

Updated ALL documentation to enforce **critical pattern**: `userEvent` must ALWAYS be destructured from test function parameters, NEVER imported from `storybook/test`.

**Old (Wrong) Pattern:**
```typescript
import { expect, fn, userEvent } from "storybook/test";
Story.test("Test", async ({ canvas }) => {
  await userEvent.click(button); // ❌ Missing integration
});
```

**New (Correct) Pattern:**
```typescript
import { expect, fn } from "storybook/test";
Story.test("Test", async ({ canvas, userEvent }) => {
  await userEvent.click(button); // ✅ Properly integrated
});
```

### Key Rules

1. **Imports:** Only `expect`, `fn`, `waitFor`, `screen` if needed
2. **Never Import:** `userEvent`, `within`, `canvas` - always destructure from parameter
3. **Why:** Test framework provides these with proper Storybook integration to handle timing
4. **Pattern:** All parameters (canvas, userEvent, args, step) come from function signature

### Updated Files

- ✅ **best-practices.md** - Added ⭐ CRITICAL section with prominent warning
- ✅ **templates.md** - Updated with import comment and correct patterns
- ✅ **examples.md** - Fixed all 3 examples (LoginForm, ConfirmDialog, Select)
  - Removed `userEvent` from imports
  - Converted old `play` functions to `.test()` method
  - All test functions now destructure `userEvent` properly

### Impact

- **Fixes Timing Issues:** userEvent now properly integrates with Storybook timing
- **Consistency:** All examples follow the same pattern
- **Clarity:** Developers know exactly what to import and what to destructure
- **Future-Proof:** Aligns with Storybook best practices

---

## 2026-01-23 - Update 2: Story Naming Convention

### What Changed

Updated story naming conventions to use **specific, descriptive names** instead of generic "Default".

**Old Convention:**

```typescript
export const Default = meta.story({});
Default.test("Test name", async () => {});
```

**New Convention:**

```typescript
// Single story component - named after component
export const UserCard = meta.story({});
UserCard.test("Test name", async () => {});

// Multiple story component - descriptive state names
export const EmptyForm = meta.story({});
export const FilledForm = meta.story({ args: { ... } });
EmptyForm.test("Test name", async () => {});
FilledForm.test("Test name", async () => {});
```

### Key Rules

1. **Single Story Component** → Name after component (`UserCard`, `SearchInput`, `Badge`)
2. **Multiple Story Component** → Use descriptive states (`EmptyForm` / `FilledForm`, `IdleButton` / `LoadingButton`)
3. **Visual Variants** → Use variant names (`Primary` / `Secondary` / `Destructive`)

### Updated Files

- ✅ **SKILL.md** - Story Naming Conventions section with examples
- ✅ **workflow.md** - Updated all examples and templates
- ✅ **NAMING_CONVENTION_UPDATE.md** - New comprehensive guide

### Benefits

- **Clarity:** Story names immediately convey purpose
- **No Ambiguity:** No confusion about what "Default" means
- **Better Documentation:** Self-documenting story names
- **Consistency:** Clear rules for all scenarios

---

## 2026-01-23 - Update 1: `.test()` Method Optimization

### What Changed

Completely refactored the skill and agent to prioritize the `.test()` method for creating multiple tests per story
instead of creating separate test stories. This optimization reduces story count by 60-80% while maintaining
comprehensive test coverage.

### Key Benefits

- **80% fewer stories** - One story with multiple `.test()` calls instead of many test stories
- **Better test isolation** - Each test is independent; one failure doesn't block others
- **Clearer intent** - Test names describe specific behaviors
- **Better reporting** - Individual test results in Storybook UI
- **Less boilerplate** - No repeated `meta.story()` calls

### Updated Files

#### 1. **SKILL.md** (Main Skill File)

- ✅ Updated description to mention `.test()` method
- ✅ Added new section: "⭐ Preferred Pattern: `.test()` Method"
- ✅ Replaced story examples with `.test()` method examples
- ✅ Added guidance on when to use `play` vs `.test()`
- ✅ Updated workflow to "Write minimal stories" + "Add multiple tests"
- ✅ Updated naming conventions (stories = states, tests = behaviors)
- ✅ Updated test builder example with `.test()` calls
- ✅ Added reference to `test-method-optimization.md`

#### 2. **workflow.md** (Agent Workflow) - MAJOR UPDATE

- ✅ Added KEY PRINCIPLE at top emphasizing `.test()` method
- ✅ Added component complexity assessment (Simple/Moderate/Complex)
- ✅ **NEW:** "Decision Framework: Story vs Test" section
  - Clear criteria for when to create stories vs tests
  - Examples of valid stories vs tests
  - Anti-patterns to avoid (with code examples)
- ✅ **RESTRUCTURED Phase 2:** Two-step proposal process
  - **Step 2.1:** Propose Stories (minimal set, typically 1-3)
  - **Step 2.2:** Propose Tests (comprehensive list using `.test()`)
  - Separate user approval questions for stories and tests
- ✅ Updated Phase 1 to include complexity determination
- ✅ Updated Phase 3 implementation examples with `.test()` method
- ✅ Emphasized PRIMARY REFERENCE to `test-method-optimization.md`

**Key Addition:** Decision Framework helps agent avoid creating unnecessary stories:

```typescript
// ❌ DON'T: Create stories for tests
export const ClickTest = meta.story({ play: ... });
export const HoverTest = meta.story({ play: ... });

// ✅ DO: Use .test() method
export const Default = meta.story({});
Default.test("Calls onClick when clicked", async () => { ... });
Default.test("Shows tooltip on hover", async () => { ... });
```

#### 3. **test-method-optimization.md** (New Guide)

- ✅ Created comprehensive optimization guide
- ✅ Documented `.test()` method benefits and use cases
- ✅ Provided before/after examples (10 stories → 2 stories)
- ✅ Migration strategy from `play` to `.test()`
- ✅ Advanced patterns (shared helpers, multiple stories, conditional tests)
- ✅ Best practices and naming conventions
- ✅ Decision matrix for choosing approach

#### 4. **optimization-proposal.md** (Translated to English)

- ✅ Translated all Polish content to English
- ✅ Documented three approaches: Step-Based, Composition, Hybrid
- ✅ Included decision matrix and recommendations
- ✅ Added implementation strategy and migration guide

### Before vs After

#### ❌ Old Approach (Multiple Stories)

```typescript
export const Default = meta.story({
  play: async ({ canvas }) => {
    /* test 1 */
  }
});

export const TestScenario1 = meta.story({
  tags: ["test-only"],
  play: async ({ canvas }) => {
    /* test 2 */
  }
});

export const TestScenario2 = meta.story({
  tags: ["test-only"],
  play: async ({ canvas }) => {
    /* test 3 */
  }
});

// ... 7 more test stories
// Total: 10 stories
```

**Issues:**

- 10 separate stories
- Each creates a separate story entry
- Harder to see all tests at a glance
- More boilerplate

#### ✅ New Approach (`.test()` Method)

```typescript
export const Default = meta.story({});

Default.test("Test scenario 1", async ({ canvas }) => {
  /* test 1 */
});
Default.test("Test scenario 2", async ({ canvas }) => {
  /* test 2 */
});
Default.test("Test scenario 3", async ({ canvas }) => {
  /* test 3 */
});
// ... 7 more tests

// Total: 1 story with 10 tests
```

**Benefits:**

- 1 story instead of 10 (90% reduction)
- All tests visible in one place
- Each test is independent
- Less boilerplate
- Better organization

### Real-World Example

**skills-section.stories.tsx** (current file):

- **Current:** 1 story + 9 test stories = 10 total stories
- **Optimized:** 1-2 stories with 10 `.test()` calls = 80% reduction

### Migration Path

For existing stories:

1. Keep ONE visual story for docs:

   ```typescript
   export const Default = meta.story({
     tags: ["autodocs"] // Show in docs
   });
   ```

2. Convert test stories to `.test()` calls:

   ```typescript
   // Before: Separate story
   export const HoverInteraction = meta.story({
     tags: ["test-only"],
     play: async ({ canvas, userEvent }) => {
       /* ... */
     }
   });

   // After: .test() call
   Default.test("Hover interaction shows tooltip", async ({ canvas, userEvent }) => {
     /* same logic */
   });
   ```

3. Remove `step()` calls if not needed:
   ```typescript
   // .test() already provides granularity
   Default.test("Button click works", async ({ canvas, userEvent }) => {
     await userEvent.click(canvas.getByRole("button"));
     await expect(canvas.getByText("Success")).toBeVisible();
   });
   ```

### When to Use Each Approach

| Pattern              | Use Case                               | Example                                  |
| -------------------- | -------------------------------------- | ---------------------------------------- |
| **`.test()` method** | Most scenarios - independent tests     | Form validation, interactions, rendering |
| **`play` function**  | Complete user flows, integration tests | Checkout process, multi-step wizard      |
| **Multiple stories** | Different component states/props       | Empty, Filled, Disabled, Loading states  |

### Component Complexity Guidelines

- **Simple** (< 5 props, minimal interaction) → 1 story with 3-5 tests
- **Moderate** (5-10 props, some interactions) → 1-2 stories with 5-10 tests
- **Complex** (> 10 props, heavy interaction) → 2-3 stories with 10+ tests

### Next Steps

1. ✅ **Skill and agent updated** - Ready to use new pattern
2. 🔄 **Optional:** Refactor existing story files using new pattern
3. 📚 **Reference:** Use `test-method-optimization.md` as primary guide

### Breaking Changes

None - this is an additive change. Existing stories with `play` functions continue to work. The update only changes the
recommended pattern going forward.

### Configuration

The `.test()` method is already enabled in this project:

```typescript
// .storybook/main.ts
features: {
  experimentalTestSyntax: true; // ✅ Already enabled (line 18)
}
```

### Documentation Structure

```
.claude/skills/storybook-testing/
├── SKILL.md                          # Main skill (updated)
├── test-method-optimization.md       # NEW: Primary reference
├── optimization-proposal.md          # Strategy document (translated)
├── CHANGELOG.md                      # This file
├── patterns.md                       # Testing patterns
├── best-practices.md                 # Best practices
├── examples.md                       # Code examples
├── templates.md                      # Component templates
├── design-system.md                  # Design system testing
└── api-reference.md                  # API documentation

.claude/agents/storybook-test-architect/
└── workflow.md                       # Agent workflow (updated)
```

### Summary

This update transforms how we write Storybook tests, dramatically reducing story count while maintaining or improving
test quality. The `.test()` method provides better isolation, clearer intent, and superior developer experience.

**Key Takeaway:** Write fewer stories, add more tests using `.test()` method.
