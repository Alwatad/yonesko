// Note: fs, https, path imports removed since we're not uploading files

import { logger } from "../utils/logger";

import type { Payload } from "payload";

type Asset = {
  filename: string;
  alt: string;
};

const ASSETS_DATA: Asset[] = [
  {
    filename: "logo.png",
    alt: "Company Logo",
  },
  {
    filename: "athletic-running-pro.jpg",
    alt: "Athletic Running Pro Shoes",
  },
  {
    filename: "athletic-training-flex.jpg",
    alt: "Athletic Training Flex Shoes",
  },
  {
    filename: "featured-bestseller.jpg",
    alt: "Featured Bestseller Shoes",
  },
  {
    filename: "hero-lifestyle.png",
    alt: "Hero Lifestyle Image",
  },
  {
    filename: "hero-running-shoes.png",
    alt: "Hero Running Shoes",
  },
  {
    filename: "mens-dress-oxford.jpg",
    alt: "Men's Dress Oxford Shoes",
  },
  {
    filename: "mens-sneaker-urban.jpg",
    alt: "Men's Urban Sneakers",
  },
  {
    filename: "womens-flat-comfort.jpg",
    alt: "Women's Comfort Flats",
  },
  {
    filename: "womens-heel-elegant.jpg",
    alt: "Women's Elegant Heels",
  },
];

export async function seedMedia(payload: Payload): Promise<Record<string, { id: string }>> {
  try {
    logger.info("📸 Creating media database entries for existing Supabase Storage files...");

    const mediaAssets: Record<string, { id: string }> = {};

    for (const asset of ASSETS_DATA) {
      try {
        logger.info(`📄 Creating database entry for: ${asset.filename}`);

        // Create media entry - PayloadCMS will reference the existing file in Supabase
        const media = await payload.create({
          collection: "media",
          context: { disableRevalidate: true },
          data: {
            alt: asset.alt,
            filename: asset.filename, // Must match exactly with Supabase Storage
          },
        });

        mediaAssets[asset.filename] = { id: media.id };
        logger.success(`✅ Created media entry: ${asset.filename} → ID: ${media.id}`);

        // Log the generated URL for verification
        if (media.url) {
          logger.info(`   🔗 Storage URL: ${media.url}`);
        }
      } catch (error) {
        logger.error(`❌ Failed to create media entry for ${asset.filename}:`);
        logger.error(`   Error: ${String(error)}`);
      }
    }

    const successCount = Object.keys(mediaAssets).length;
    const totalCount = ASSETS_DATA.length;

    if (successCount === totalCount) {
      logger.success(`🎉 All media entries created successfully! (${successCount}/${totalCount})`);
    } else {
      logger.warn(`⚠️  Partial success: ${successCount}/${totalCount} media entries created`);
    }

    return mediaAssets;
  } catch (error) {
    logger.error("💥 Critical error in media seeding:", error);
    throw error;
  }
}
