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
    logger.info("📸 Creating media entries for existing Supabase Storage files...");

    const mediaAssets: Record<string, { id: string }> = {};

    for (const asset of ASSETS_DATA) {
      try {
        logger.info(`📄 Creating database entry for: ${asset.filename}`);

        // Direct Supabase Storage URL (the correct format you showed me)
        const fileUrl = `https://qlbmivkyeijvlktgitvk.supabase.co/storage/v1/object/public/media/${asset.filename}`;

        // Get file extension for MIME type
        const extension = asset.filename.split(".").pop()?.toLowerCase();
        const mimeType = extension === "png" ? "image/png" : "image/jpeg";

        // Try the regular payload.create method first with proper data structure
        const media = (await payload.create({
          collection: "media",
          context: {
            disableRevalidate: true,
          },
          data: {
            alt: asset.alt,
            filename: asset.filename,
            mimeType: mimeType,
            filesize: 100000,
            width: 800,
            height: 600,
            url: fileUrl,
            thumbnailURL: fileUrl,
            sizes: {
              thumbnail: {
                width: 400,
                height: 300,
                mimeType: mimeType,
                filesize: 50000,
                filename: `thumb_${asset.filename}`,
                url: fileUrl,
              },
              card: {
                width: 768,
                height: 576,
                mimeType: mimeType,
                filesize: 80000,
                filename: `card_${asset.filename}`,
                url: fileUrl,
              },
            },
          },
        })) as { id: string };

        mediaAssets[asset.filename] = { id: media.id };
        logger.success(`✅ Created media entry: ${asset.filename} → ID: ${media.id}`);
        logger.info(`   🔗 File URL: ${fileUrl}`);
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
