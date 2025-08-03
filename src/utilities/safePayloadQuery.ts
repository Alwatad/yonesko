import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Safe wrapper for PayloadCMS queries that handles errors gracefully
 * Returns empty results instead of throwing errors
 */
export async function safePayloadQuery<T = any>(
  queryFn: (payload: any) => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    const payload = await getPayload({ config });
    return await queryFn(payload);
  } catch (error) {
    console.log("⚠️  Database query failed, using fallback:", error);
    return fallback;
  }
}

/**
 * Safe wrapper for PayloadCMS find queries
 */
export async function safeFind(collection: string, options: any = {}) {
  return safePayloadQuery(
    async (payload) => {
      return await payload.find({
        collection,
        ...options,
      });
    },
    {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    }
  );
}

/**
 * Safe wrapper for PayloadCMS findByID queries
 */
export async function safeFindByID(collection: string, id: string) {
  return safePayloadQuery(
    async (payload) => {
      return await payload.findByID({
        collection,
        id,
      });
    },
    null
  );
} 