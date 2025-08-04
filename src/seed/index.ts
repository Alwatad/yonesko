import { getPayload } from "payload";

import { seedCategories } from "./seeders/categories";
import { seedGlobalSettings } from "./seeders/globals";
import { seedMedia } from "./seeders/media";
import { seedPages } from "./seeders/pages";
import { seedProducts } from "./seeders/products";
import { cleanDatabase } from "./utils/cleanup";
import { logger } from "./utils/logger";

import config from "../payload.config.js";

async function seed() {
  try {
    logger.info("🌱 Starting database seeding...");

    // Initialize Payload
    const payload = await getPayload({ config });
    logger.info("✓ Payload initialized");

    // Clean existing data
    await cleanDatabase(payload);

    // Seed media first (required by other collections)
    logger.info("🖼️  Seeding media...");
    const mediaAssets = await seedMedia(payload);

    // Seed categories
    logger.info("🏷️  Seeding categories...");
    const categories = await seedCategories(payload);

    // Seed products
    logger.info("👟 Seeding products...");
    const products = await seedProducts(payload, mediaAssets, categories);

    logger.info("📄 Seeding pages...");
    await seedPages(
      payload,
      mediaAssets,
      products as {
        bought: number;
        title: string | { en?: string; pl?: string };
        media: unknown[];
        slug: string;
      }[],
    );

    logger.info("⚙️  Seeding global settings...");
    await seedGlobalSettings(payload, mediaAssets);

    logger.success("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Don't wait for the promise - let it run
void seed();
