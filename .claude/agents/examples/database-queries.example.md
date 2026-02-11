# Database Query Examples

Examples of database query patterns with proper error handling.

> **Note:** These examples use a generic pattern. Adapt to your specific database (Firestore, PostgreSQL, MongoDB, etc.)

## Basic Read Operation

```typescript
import { categorizeDbError, DbError } from "~/lib/firebase/errors";
import { createLogger } from "~/lib/logger";

const logger = createLogger({ module: "resource-db" });
const COLLECTION_NAME = "resources";
const RESOURCE_NAME = "Resource";

export async function getResourceById(id: string): Promise<[null, Resource] | [DbError, null]> {
  // Input validation
  if (!id?.trim()) {
    const error = DbError.validation("Invalid id provided");
    logger.warn({ id, errorCode: error.code }, "Invalid id");
    return [error, null];
  }

  try {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();

    if (!doc.exists) {
      const error = DbError.notFound(RESOURCE_NAME);
      logger.warn({ id, errorCode: error.code }, "Document not found");
      return [error, null];
    }

    const data = doc.data();
    if (!data) {
      const error = DbError.dataCorruption(RESOURCE_NAME);
      logger.error({ id, errorCode: error.code }, "Data undefined");
      return [error, null];
    }

    return [null, transformFirestoreToResource(doc.id, data)];
  } catch (error) {
    const dbError = categorizeDbError(error, RESOURCE_NAME);
    logger.error(
      {
        id,
        errorCode: dbError.code,
        isRetryable: dbError.isRetryable
      },
      "Database error"
    );
    return [dbError, null];
  }
}
```

## List Operation With Filters

```typescript
export async function getResourcesByUser(
  userId: string,
  options: { status?: string; limit?: number } = {}
): Promise<[null, Resource[]] | [DbError, null]> {
  if (!userId?.trim()) {
    return [DbError.validation("Invalid userId"), null];
  }

  try {
    let query = db.collection(COLLECTION_NAME).where("userId", "==", userId).orderBy("createdAt", "desc");

    if (options.status) {
      query = query.where("status", "==", options.status);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const snapshot = await query.get();
    const resources = snapshot.docs.map((doc) => transformFirestoreToResource(doc.id, doc.data()));

    logger.info({ userId, count: resources.length }, "Resources fetched");
    return [null, resources];
  } catch (error) {
    const dbError = categorizeDbError(error, RESOURCE_NAME);
    logger.error({ userId, errorCode: dbError.code }, "Failed to fetch resources");
    return [dbError, null];
  }
}
```

## Create Operation

```typescript
export async function createResource(data: CreateResourceDto): Promise<[null, Resource] | [DbError, null]> {
  try {
    const docRef = await db.collection(COLLECTION_NAME).add(data);
    const doc = await docRef.get();

    if (!doc.exists || !doc.data()) {
      return [DbError.dataCorruption(RESOURCE_NAME), null];
    }

    const resource = transformFirestoreToResource(doc.id, doc.data()!);
    logger.info({ resourceId: doc.id }, "Resource created");
    return [null, resource];
  } catch (error) {
    const dbError = categorizeDbError(error, RESOURCE_NAME);
    logger.error({ errorCode: dbError.code }, "Failed to create resource");
    return [dbError, null];
  }
}
```

## Update Operation

```typescript
export async function updateResource(id: string, data: UpdateResourceDto): Promise<[null, Resource] | [DbError, null]> {
  if (!id?.trim()) {
    return [DbError.validation("Invalid id"), null];
  }

  try {
    const docRef = db.collection(COLLECTION_NAME).doc(id);

    // Check existence
    const existing = await docRef.get();
    if (!existing.exists) {
      return [DbError.notFound(RESOURCE_NAME), null];
    }

    // Update
    await docRef.update({
      ...data,
      updatedAt: FieldValue.serverTimestamp()
    });

    // Fetch updated document
    const updated = await docRef.get();
    const resource = transformFirestoreToResource(updated.id, updated.data()!);

    logger.info({ resourceId: id }, "Resource updated");
    return [null, resource];
  } catch (error) {
    const dbError = categorizeDbError(error, RESOURCE_NAME);
    logger.error({ id, errorCode: dbError.code }, "Failed to update resource");
    return [dbError, null];
  }
}
```

## Delete Operation

```typescript
export async function deleteResource(id: string): Promise<[null, void] | [DbError, null]> {
  if (!id?.trim()) {
    return [DbError.validation("Invalid id"), null];
  }

  try {
    const docRef = db.collection(COLLECTION_NAME).doc(id);

    const existing = await docRef.get();
    if (!existing.exists) {
      return [DbError.notFound(RESOURCE_NAME), null];
    }

    await docRef.delete();
    logger.info({ resourceId: id }, "Resource deleted");
    return [null, undefined];
  } catch (error) {
    const dbError = categorizeDbError(error, RESOURCE_NAME);
    logger.error({ id, errorCode: dbError.code }, "Failed to delete resource");
    return [dbError, null];
  }
}
```

## Transform Helper

```typescript
function transformFirestoreToResource(docId: string, data: FirebaseFirestore.DocumentData): Resource {
  return {
    id: docId,
    ...data,
    // Transform Firestore Timestamps to JS Dates
    updatedAt: data.updatedAt?.toDate(),
    createdAt: data.createdAt?.toDate(),
    // Handle custom date fields if any
    scheduledAt: data.scheduledAt?.toDate()
  } as Resource;
}
```

## Batch Operations

```typescript
export async function batchUpdateStatus(ids: string[], status: string): Promise<[null, number] | [DbError, null]> {
  if (ids.length === 0) {
    return [null, 0];
  }

  try {
    const batch = db.batch();
    let count = 0;

    for (const id of ids) {
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      batch.update(docRef, {
        status,
        updatedAt: FieldValue.serverTimestamp()
      });
      count++;
    }

    await batch.commit();
    logger.info({ count }, "Batch update completed");
    return [null, count];
  } catch (error) {
    const dbError = categorizeDbError(error, RESOURCE_NAME);
    logger.error({ errorCode: dbError.code }, "Batch update failed");
    return [dbError, null];
  }
}
```
