---
name: builder-factory
version: 2.0.0
description: Generate test-data-bot factory builders for TypeScript types to create mock data for tests and Storybook
tags: [testing, factories, mock-data, test-data-bot, faker, typescript]
author: Szum Tech Team
examples:
  - Create a builder for User type
  - Generate builder for my Budget model
  - Build a builder for the Onboarding type with all relationships
  - Create builders for Product and Order types
---

# Builder Factory Generator

Generate test-data-bot factory builders for TypeScript types to create mock data for tests and Storybook stories.

## Context

This skill helps you create builders using @jackfranklin/test-data-bot and @faker-js/faker/locale/pl for generating
realistic Polish-localized mock data. Builders are used for:

- Unit tests (Vitest)
- Storybook stories
- E2E test data
- Development seeding

## Instructions

When the user provides a TypeScript type/interface or asks to create a factory for a model:

1. **Analyze the Type Structure**
   - Identify all fields, their types, and relationships
   - Check for nested types, arrays, optional fields
   - Look for Date fields, enum types, and union types
   - Identify any relationships to other models

2. **Determine Builder Location**
   - For feature-specific types: `features/[feature-name]/test/builders/`
   - For shared types: `tests/builders/`
   - Create directory if it doesn't exist

3. **Builder Naming Convention**

   **CRITICAL: Builder names MUST exactly match the type name they build.**

   Follow these naming rules:
   - **Rule 1**: Builder name = camelCase(TypeName) + "Builder"
   - **Rule 2**: Use the EXACT type name, not the base type or intermediate type
   - **Rule 3**: File name = kebab-case of the type name + ".builder.ts"

   Examples:

   ```typescript
   // ✅ CORRECT - matches exact type name
   export type OnboardingProducts = ProductsFormData;
   export const onboardingProductsBuilder = build<OnboardingProducts>({ ... });
   // File: onboarding-products.builder.ts

   export type OnboardingPreferences = PreferencesFormData;
   export const onboardingPreferencesBuilder = build<OnboardingPreferences>({ ... });
   // File: onboarding-preferences.builder.ts

   export type BudgetTemplate = WithDates<BudgetTemplateBase>;
   export const budgetTemplateBuilder = build<BudgetTemplate>({ ... });
   // File: budget-template.builder.ts

   export type UserProfile = WithDates<UserProfileBase>;
   export const userProfileBuilder = build<UserProfile>({ ... });
   // File: user-profile.builder.ts

   // ❌ INCORRECT - uses base type name
   export type OnboardingProducts = ProductsFormData;
   export const productsBuilder = build<OnboardingProducts>({ ... }); // WRONG!

   export type OnboardingPreferences = PreferencesFormData;
   export const preferencesBuilder = build<OnboardingPreferences>({ ... }); // WRONG!
   ```

   **Special cases:**
   - For Firebase Base types (without timestamps), use the base type name:

     ```typescript
     export const onboardingBaseBuilder = build<OnboardingBase>({ ... });
     export const budgetTemplateBaseBuilder = build<BudgetTemplateBase>({ ... });
     ```

   - For main application types (with timestamps), use the exact type name:
     ```typescript
     export const onboardingBuilder = build<Onboarding>({ ... });
     export const budgetTemplateBuilder = build<BudgetTemplate>({ ... });
     ```

4. **Generate Builder Code**

   Follow this template structure:

   ```typescript
   import { build, sequence, perBuild } from "@jackfranklin/test-data-bot";
   import { faker } from "@faker-js/faker/locale/pl";

   // Import the type definition
   import type { YourType } from "~/features/[feature]/types/your-type";

   // Import any related builders for associations
   import { relatedBuilder } from "./related.builder";

   /**
    * Builder for generating YourType test data.
    *
    * @example
    * // Basic usage (using .one())
    * const item = yourTypeBuilder.one();
    *
    * @example
    * // Alternative usage (direct call)
    * const item = yourTypeBuilder();
    *
    * @example
    * // Override specific fields
    * const customItem = yourTypeBuilder.one({
    *   overrides: {
    *     fieldName: "custom value"
    *   }
    * });
    *
    * @example
    * // Generate multiple items
    * const items = Array.from({ length: 5 }, () => yourTypeBuilder.one());
    *
    * @example
    * // Using traits
    * const activeItem = yourTypeBuilder.one({ traits: ["active"] });
    */
   export const yourTypeBuilder = build<YourType>({
     fields: {
       // sequence() - auto-incremented number
       id: sequence(),
       // perBuild() - function called each time
       name: perBuild(() => faker.person.fullName()),
       // Static values
       status: "active"
       // ... other fields
     }
   });
   ```

5. **Field Mapping Guidelines**

   Use appropriate methods for each field type:

   **Identifiers:**
   - `id: sequence()` - Auto-incremented number (1, 2, 3, ...)
   - `id: sequence((n) => \`user-\${n}\`)` - Custom sequence with prefix
   - `uuid: perBuild(() => faker.string.uuid())` - Random UUID
   - `slug: perBuild(() => faker.helpers.slugify(faker.lorem.words(3)))`

   **Personal Data:**
   - `firstName: perBuild(() => faker.person.firstName())`
   - `lastName: perBuild(() => faker.person.lastName())`
   - `email: perBuild(() => faker.internet.email())`
   - `email: sequence((n) => \`user\${n}@test.com\`)` - Unique sequential emails
   - `phone: perBuild(() => faker.phone.number())`
   - `avatar: perBuild(() => faker.image.avatar())`

   **Addresses:**
   - `street: perBuild(() => faker.location.streetAddress())`
   - `city: perBuild(() => faker.location.city())`
   - `zipCode: perBuild(() => faker.location.zipCode())`
   - `country: "Polska"` - Static value (no perBuild needed)

   **Commerce:**
   - `productName: perBuild(() => faker.commerce.productName())`
   - `price: perBuild(() => parseFloat(faker.commerce.price({ min: 10, max: 1000 })))`
   - `currency: "PLN"` - Static value
   - `category: perBuild(() => faker.commerce.department())`

   **Text Content:**
   - `title: perBuild(() => faker.lorem.sentence())`
   - `description: perBuild(() => faker.lorem.paragraph())`
   - `text: perBuild(() => faker.lorem.text())`

   **Numbers:**
   - `amount: perBuild(() => faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }))`
   - `count: perBuild(() => faker.number.int({ min: 0, max: 100 }))`
   - `percentage: perBuild(() => faker.number.int({ min: 0, max: 100 }))`

   **Dates:**
   - `createdAt: perBuild(() => faker.date.past())`
   - `updatedAt: perBuild(() => faker.date.recent())`
   - `scheduledAt: perBuild(() => faker.date.future())`
   - `birthDate: perBuild(() => faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))`

   **Booleans:**
   - `isActive: perBuild(() => faker.datatype.boolean())`
   - `isPredefined: true` - Static value (no perBuild needed)

   **Enums/Unions:**
   - `status: perBuild(() => faker.helpers.arrayElement(["active", "inactive", "pending"]))`
   - `role: perBuild(() => faker.helpers.arrayElement(["admin", "user", "guest"] as const))`

   **Arrays:**
   - `tags: perBuild(() => faker.helpers.arrayElements(["tag1", "tag2", "tag3"], { min: 1, max: 3 }))`
   - `items: perBuild(() => Array.from({ length: 3 }, () => itemBuilder.one()))`
   - `images: perBuild(() => Array.from({ length: 3 }, () => faker.image.url()))`

   **Objects/Relations:**
   - `address: perBuild(() => addressBuilder.one())`
   - For optional relations, use traits or overrides

6. **Handle Complex Patterns**

   **Traits** (for variants):

   ```typescript
   export const userBuilder = build<User>({
     fields: {
       id: sequence(),
       email: perBuild(() => faker.internet.email()),
       firstName: perBuild(() => faker.person.firstName()),
       lastName: perBuild(() => faker.person.lastName()),
       role: "user",
       isActive: true
     },
     // OFFICIAL test-data-bot traits API
     traits: {
       admin: {
         overrides: {
           role: "admin",
           email: perBuild(() => faker.internet.email({ provider: "company.com" }))
         }
       },
       inactive: {
         overrides: {
           isActive: false
         }
       },
       guest: {
         overrides: {
           role: "guest",
           firstName: "Guest",
           lastName: perBuild(() => faker.string.numeric(4))
         }
       }
     }
   });

   // Usage: userBuilder.one({ traits: ["admin"] })
   // Multiple traits: userBuilder.one({ traits: ["admin", "inactive"] })
   ```

   **postBuild Hook** (for computed fields and post-processing):

   ```typescript
   export const orderBuilder = build<Order>({
     fields: {
       id: sequence(),
       userId: sequence(),
       products: perBuild(() => Array.from({ length: 3 }, () => productBuilder.one())),
       totalAmount: 0, // Will be computed in postBuild
       status: perBuild(() => faker.helpers.arrayElement(["pending", "processing"])),
       createdAt: perBuild(() => faker.date.recent()),
       shippingAddress: perBuild(() => addressBuilder.one())
     },
     // postBuild - hook called AFTER building object
     postBuild: (order) => {
       // Compute totalAmount from products
       order.totalAmount = order.products.reduce((sum, p) => sum + p.price, 0);
       // Lowercase email
       order.email = order.email.toLowerCase();
       return order;
     },
     traits: {
       bigOrder: {
         overrides: {
           products: perBuild(() => Array.from({ length: 10 }, () => productBuilder.one()))
         }
       }
     }
   });
   ```

   **Nested Builders** (relationships):

   ```typescript
   // Address builder
   export const addressBuilder = build<Address>({
     fields: {
       street: perBuild(() => faker.location.streetAddress()),
       city: perBuild(() => faker.location.city()),
       zipCode: perBuild(() => faker.location.zipCode()),
       country: "Polska"
     }
   });

   // User builder with address relationship
   export const userBuilder = build<User>({
     fields: {
       id: sequence(),
       name: perBuild(() => faker.person.fullName()),
       // Use nested builder
       address: perBuild(() => addressBuilder.one())
     }
   });

   // Can override nested objects
   const user = userBuilder.one({
     overrides: {
       address: addressBuilder.one({ overrides: { city: "Warszawa" } })
     }
   });
   ```

7. **Create Test Examples**

   Always include usage examples in comments or a separate test file:

   ```typescript
   /**
    * @example
    * // Basic usage with .one()
    * const user = userBuilder.one();
    *
    * @example
    * // Alternative usage (direct call)
    * const user = userBuilder();
    *
    * @example
    * // Override fields
    * const admin = userBuilder.one({
    *   overrides: { role: "admin" }
    * });
    *
    * @example
    * // Multiple instances
    * const users = Array.from({ length: 10 }, () => userBuilder.one());
    *
    * @example
    * // Using traits
    * const admin = userBuilder.one({ traits: ["admin"] });
    * const inactiveAdmin = userBuilder.one({ traits: ["admin", "inactive"] });
    *
    * @example
    * // Combining traits and overrides
    * const customAdmin = userBuilder.one({
    *   traits: ["admin"],
    *   overrides: { firstName: "Super" }
    * });
    */
   ```

8. **Export Pattern**

   ```typescript
   // Individual export (preferred)
   export const yourTypeBuilder = build<YourType>({...});

   // Or grouped export for multiple related builders
   export const builders = {
     user: userBuilder,
     address: addressBuilder,
     order: orderBuilder
   };

   // Helper functions for common scenarios
   export const createTestUsers = {
     admin: () => userBuilder.one({ traits: ["admin"] }),
     guest: () => userBuilder.one({ traits: ["guest"] }),
     inactive: () => userBuilder.one({ traits: ["inactive"] }),
     withCustomEmail: (email: string) => userBuilder.one({ overrides: { email } }),
     list: (count: number) => Array.from({ length: count }, () => userBuilder.one())
   };
   ```

9. **Integration with Project Patterns**

   For types that match Firebase patterns (see CLAUDE.md):
   - Use `*Base` type for builder (without `id`, `createdAt`, `updatedAt`)
   - Add timestamps in builder: `createdAt: perBuild(() => faker.date.past())`
   - Export separate builders if needed for different type variants

   ```typescript
   import { build, sequence, perBuild } from "@jackfranklin/test-data-bot";
   import { faker } from "@faker-js/faker/locale/pl";
   import type { OnboardingBase, Onboarding } from "~/features/onboarding/types/onboarding";
   import { OnboardingSteps } from "~/features/onboarding/types/onboarding";

   // Builder for base type (without metadata)
   export const onboardingBaseBuilder = build<OnboardingBase>({
     fields: {
       completed: false,
       completedAt: null,
       currentStep: OnboardingSteps.PREFERENCES,
       products: perBuild(() => productsBuilder.one())
     },
     traits: {
       initial: {
         overrides: {
           completed: false,
           currentStep: OnboardingSteps.WELCOME
         }
       },
       completed: {
         overrides: {
           completed: true,
           completedAt: perBuild(() => faker.date.recent()),
           currentStep: OnboardingSteps.CATEGORIES
         }
       }
     }
   });

   // Builder for application type (with id and timestamps)
   export const onboardingBuilder = build<Onboarding>({
     fields: {
       id: perBuild(() => faker.string.uuid()),
       completed: false,
       completedAt: null,
       currentStep: OnboardingSteps.PREFERENCES,
       products: perBuild(() => productsBuilder.one()),
       createdAt: perBuild(() => faker.date.past()),
       updatedAt: perBuild(() => faker.date.recent())
     },
     traits: {
       initial: {
         overrides: {
           completed: false,
           currentStep: OnboardingSteps.WELCOME
         }
       },
       completed: {
         overrides: {
           completed: true,
           completedAt: perBuild(() => faker.date.recent()),
           currentStep: OnboardingSteps.CATEGORIES
         }
       }
     }
   });
   ```

## Workflow

1. User provides a TypeScript type or asks to create a builder
2. Analyze the type structure and dependencies
3. Check if related builders already exist
4. Create builder file in appropriate location
5. Generate builder code with proper test-data-bot and Faker methods
6. Add JSDoc comments with usage examples
7. Export builder for use in tests

## Important Notes

- Always use `@jackfranklin/test-data-bot` for builders (NOT Fishery)
- Always use `@faker-js/faker/locale/pl` for Polish localization
- Follow project's test structure: `features/*/test/builders/` or `tests/builders/`
- Use `sequence()` for auto-incremented IDs
- Use `perBuild(() => ...)` for values that should be generated fresh each time
- Static values don't need `perBuild()` wrapper
- Use realistic data that matches production patterns
- Include JSDoc comments with examples
- Consider creating helper functions for common test scenarios
- Ensure builders are type-safe and match TypeScript definitions exactly
- Use `traits` for different variants of the same type
- Use `postBuild` hook for computed fields and transformations

## Common Patterns

**Percentage/Allocation Fields:**

```typescript
allocation: perBuild(() => faker.number.int({ min: 0, max: 100 }));
```

**Currency Amounts:**

```typescript
amount: perBuild(() => faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }));
```

**Icons (from project's design system):**

```typescript
icon: perBuild(() => faker.helpers.arrayElement(["home", "car", "food", "health", "education"]));
```

**Colors (Tailwind classes):**

```typescript
color: perBuild(() => faker.helpers.arrayElement(["red", "blue", "green", "yellow", "purple"]));
```

**Unique Emails (using sequence):**

```typescript
export const userBuilder = build<User>({
  fields: {
    email: sequence((n) => `user${n}@example.com`)
    // ...
  }
});
```

**Computed Fields (using postBuild):**

```typescript
export const accountBuilder = build<Account>({
  fields: {
    id: sequence(),
    balance: perBuild(() => faker.number.int({ min: 0, max: 10000 })),
    type: "basic",
    creditLimit: 0 // Will be computed in postBuild
  },
  postBuild: (account) => {
    // Set credit limit based on account type
    switch (account.type) {
      case "premium":
        account.creditLimit = 5000;
        break;
      case "vip":
        account.creditLimit = 20000;
        break;
      default:
        account.creditLimit = 0;
    }
    return account;
  },
  traits: {
    premium: {
      overrides: { type: "premium" }
    },
    vip: {
      overrides: { type: "vip" }
    }
  }
});
```

## Expected Output

For each builder creation:

1. Builder file in correct location (`features/*/test/builders/` or `tests/builders/`)
2. Type-safe builder with @jackfranklin/test-data-bot
3. Realistic Faker data generation with Polish localization
4. Usage examples in JSDoc comments
5. Exports for easy importing in tests
6. Traits for common variants
7. Helper functions if appropriate

Ask clarifying questions if:

- Type structure is ambiguous
- Need to know specific business rules for data generation
- Unclear whether to create traits for different variants
- Multiple possible locations for the builder file
- Need clarification on relationships between types
