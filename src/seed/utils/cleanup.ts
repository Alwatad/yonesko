import { logger } from "./logger";

import type { Payload } from "payload";

export async function cleanDatabase(payload: Payload): Promise<void> {
  try {
    logger.info("🧹 Starting database cleanup...");

    // List of collections to clean (in order to avoid foreign key issues)
    const collectionsToClean = [
      "form-submissions",
      "search",
      "posts",
      "pages",
      "productReviews",
      "products",

      "productCategories",
      "orders",
      "customers",
      "media",
      "redirects",
      "forms",
    ];

    let totalDeleted = 0;

    for (const collection of collectionsToClean) {
      try {
        // Get all documents from collection
        const { docs } = await payload.find({
          collection: collection as keyof typeof payload.collections,
          limit: 1000,
          pagination: false,
        });

        if (docs.length > 0) {
          // Delete all documents
          for (const doc of docs) {
            await payload.delete({
              collection: collection as keyof typeof payload.collections,
              id: doc.id,
            });
          }

          totalDeleted += docs.length;
          logger.info(`  ✓ Cleaned ${docs.length} documents from ${collection}`);
        }
      } catch (error) {
        // Collection might not exist, that's ok
        logger.warn(
          `  ⚠️  Could not clean collection ${collection}: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }

    logger.success(`✓ Database cleanup completed! Removed ${totalDeleted} documents total.`);
  } catch (error) {
    logger.error("Failed to clean database:", error);
    throw error;
  }
}
