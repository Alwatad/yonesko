import * as fs from "fs";
import * as https from "https";
import * as path from "path";

import { logger } from "../utils/logger";

import type { Payload } from "payload";

type Asset = {
  filename: string;
  alt: string;
  url?: string; // For remote images
  localPath?: string; // For local images
};

const ASSETS_DATA: Asset[] = [
  {
    filename: "stride-logo.png",
    alt: "Stride Logo",
    url: "https://via.placeholder.com/300x100/000000/FFFFFF?text=STRIDE",
  },
  {
    filename: "hero-running-shoes.jpg",
    alt: "Premium Running Shoes",
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=800&fit=crop",
  },
  {
    filename: "mens-dress-shoe.jpg",
    alt: "Men's Dress Shoe",
    url: "https://images.unsplash.com/photo-1571701893393-1974b7de4b79?w=800&h=800&fit=crop",
  },
  {
    filename: "womens-heel.jpg",
    alt: "Women's High Heel",
    url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop",
  },
  {
    filename: "athletic-sneaker.jpg",
    alt: "Athletic Sneaker",
    url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
  },
  {
    filename: "casual-loafer.jpg",
    alt: "Casual Loafer",
    url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop",
  },
  {
    filename: "womens-boots.jpg",
    alt: "Women's Boots",
    url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800&h=800&fit=crop",
  },
  {
    filename: "running-shoes.jpg",
    alt: "Running Shoes",
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
  },
  {
    filename: "basketball-shoes.jpg",
    alt: "Basketball Shoes",
    url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
  },
  {
    filename: "womens-flats.jpg",
    alt: "Women's Flat Shoes",
    url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop",
  },
  {
    filename: "hero-lifestyle.jpg",
    alt: "Lifestyle Hero Image",
    url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop",
  },
];

export async function seedMedia(payload: Payload): Promise<Record<string, { id: string }>> {
  try {
    logger.info("Downloading and uploading media assets...");

    const mediaAssets: Record<string, { id: string }> = {};
    const tempDir = path.join(process.cwd(), "temp");

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    for (const asset of ASSETS_DATA) {
      try {
        let filePath: string;

        if (asset.url) {
          // Download remote image
          filePath = path.join(tempDir, asset.filename);
          await downloadImage(asset.url, filePath);
          logger.info(`  ✓ Downloaded: ${asset.filename}`);
        } else if (asset.localPath) {
          // Use local image
          filePath = asset.localPath;
        } else {
          logger.warn(`  ⚠️  No URL or local path for ${asset.filename}, skipping`);
          continue;
        }

        // Upload to Payload
        const media = await payload.create({
          collection: "media",
          data: {
            alt: asset.alt,
          },
          filePath,
        });

        mediaAssets[asset.filename] = { id: media.id };
        logger.info(`  ✓ Uploaded: ${asset.filename}`);

        // Clean up temp file if it was downloaded
        if (asset.url && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        logger.error(`Failed to process ${asset.filename}:`, error);
        // Continue with other assets
      }
    }

    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    logger.success(`✓ Media seeded successfully (${Object.keys(mediaAssets).length} assets)`);
    return mediaAssets;
  } catch (error) {
    logger.error("Failed to seed media:", error);
    throw error;
  }
}

function downloadImage(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });

        file.on("error", (error) => {
          fs.unlink(filePath, () => {}); // Delete partial file
          reject(error);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
