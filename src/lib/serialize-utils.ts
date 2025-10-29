import { ObjectId } from "mongodb";

/**
 * Serialize MongoDB document để có thể truyền từ Server Component sang Client Component
 * Convert tất cả ObjectId thành string
 */
export function serializeMongoDocument<T extends Record<string, unknown>>(
  doc: T
): T {
  if (!doc) return doc;

  const serialized = { ...doc };

  // Recursively convert ObjectId to string
  for (const key in serialized) {
    if (serialized[key] instanceof ObjectId) {
      serialized[key] = serialized[key].toString() as T[Extract<
        keyof T,
        string
      >];
    } else if (Array.isArray(serialized[key])) {
      serialized[key] = serialized[key].map((item: unknown) =>
        item instanceof ObjectId
          ? item.toString()
          : typeof item === "object" && item !== null
          ? serializeMongoDocument(item)
          : item
      );
    } else if (
      typeof serialized[key] === "object" &&
      serialized[key] !== null
    ) {
      serialized[key] = serializeMongoDocument(serialized[key]) as T[Extract<
        keyof T,
        string
      >];
    }
  }

  return serialized;
}

/**
 * Serialize array of MongoDB documents
 */
export function serializeMongoDocuments<T extends Record<string, unknown>>(
  docs: T[]
): T[] {
  return docs.map((doc) => serializeMongoDocument(doc));
}
