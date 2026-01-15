# Server Actions Examples

Examples of server action patterns for different use cases.

## Basic Action Returning Data

```typescript
import type { ActionResponse } from "~/lib/action-types";
import { schema } from "./schema";

export async function createResource(formData: FormData): ActionResponse<Resource> {
  // 1. Validate input
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  // 2. Perform database operation
  const [error, resource] = await createResourceInDb(parsed.data);
  if (error) {
    await setToastCookie(error.message, "error");
    return { success: false, error: error.message };
  }

  // 3. Return success
  await setToastCookie("Resource created successfully", "success");
  return { success: true, data: resource };
}
```

## Action With Redirect

```typescript
import type { RedirectAction } from "~/lib/action-types";
import { redirect } from "next/navigation";

export async function submitStep(formData: FormData): RedirectAction {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const [error] = await updateStepInDb(parsed.data);
  if (error) {
    await setToastCookie(error.message, "error");
    return { success: false, error: error.message };
  }

  await setToastCookie("Step completed!", "success");
  redirect("/next-step");
}
```

## Action With File Upload

```typescript
export async function uploadFile(formData: FormData): ActionResponse<{ url: string }> {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { success: false, error: "No file provided" };
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: "Invalid file type" };
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "File too large (max 5MB)" };
  }

  const [error, url] = await uploadToStorage(file);
  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: { url } };
}
```

## Action With Authentication

```typescript
import { auth } from "your-auth-lib/server";

export async function updateProfile(formData: FormData): ActionResponse<User> {
  // 1. Verify authentication
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  // 2. Validate input
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  // 3. Update profile
  const [error, user] = await updateUserProfile(userId, parsed.data);
  if (error) {
    return { success: false, error: error.message };
  }

  await setToastCookie("Profile updated", "success");
  return { success: true, data: user };
}
```

## Action With Optimistic Update Support

```typescript
export async function toggleFavorite(resourceId: string): ActionResponse<{ isFavorite: boolean }> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const [error, result] = await toggleFavoriteInDb(userId, resourceId);
  if (error) {
    // Important: Return error so client can revert optimistic update
    return { success: false, error: error.message };
  }

  return { success: true, data: { isFavorite: result.isFavorite } };
}
```
