// Note: fs, https, path imports removed since we're not uploading files

import { logger } from "../utils/logger";

import type { Payload } from "payload";

// Helper function to verify Supabase Storage configuration
async function verifySupabaseStorageConfig(_payload: Payload): Promise<boolean> {
  try {
    logger.info("🔍 Verifying Supabase Storage configuration...");
    
    // Check required environment variables
    const requiredEnvVars = [
      'S3_ENDPOINT',
      'S3_BUCKET', 
      'S3_ACCESS_KEY_ID',
      'S3_SECRET_ACCESS_KEY'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      logger.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
      return false;
    }
    
    logger.success("✅ All required Supabase Storage environment variables are set");
    logger.info(`   🪣 Bucket: ${process.env.S3_BUCKET}`);
    logger.info(`   🔗 Endpoint: ${process.env.S3_ENDPOINT}`);
    
    return true;
  } catch (error) {
    logger.error("❌ Error verifying Supabase Storage configuration:", error);
    return false;
  }
}

type Asset = {
  filename: string;
  alt: string;
  url?: string; // For remote images
  localPath?: string; // For local images
};

const _ASSETS_DATA: Asset[] = [
  {
    filename: "logo.png",
    alt: "Company Logo",
    url: "https://via.placeholder.com/300x100/000000/FFFFFF?text=LOGO",
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
    logger.info("📸 Creating media database entries for Supabase Storage files...");
    
    // Verify Supabase Storage configuration first
    const configValid = await verifySupabaseStorageConfig(payload);
    if (!configValid) {
      throw new Error("Supabase Storage configuration is invalid. Please check your environment variables.");
    }
    
    logger.info("🔗 Connecting to Supabase Storage via S3 plugin...");
    
    const mediaAssets: Record<string, { id: string }> = {};

    // Create database entries for each media asset
    // These files should be uploaded to your Supabase Storage bucket first
    for (const asset of _ASSETS_DATA) {
      try {
        logger.info(`📄 Creating database entry for: ${asset.filename}`);
        
        const media = await payload.create({
          collection: "media",
          context: { disableRevalidate: true },
          data: {
            alt: asset.alt,
            filename: asset.filename, // Must match the filename in your Supabase Storage bucket
            // PayloadCMS S3 plugin will automatically:
            // 1. Generate the full Supabase Storage URL
            // 2. Set width/height if it's an image
            // 3. Create thumbnails and different sizes
          },
        });
        
        mediaAssets[asset.filename] = { id: media.id };
        logger.success(`✅ Created media entry: ${asset.filename} → ID: ${media.id}`);
        
        // Log the generated URL for verification
        if (media.url) {
          logger.info(`   🔗 Generated URL: ${media.url}`);
        }
        
      } catch (error) {
        logger.error(`❌ Failed to create media entry for ${asset.filename}:`);
        logger.error(`   Error: ${String(error)}`);
        logger.warn(`   💡 Make sure ${asset.filename} is uploaded to your Supabase Storage bucket!`);
        // Continue with other assets even if one fails
      }
    }

    const successCount = Object.keys(mediaAssets).length;
    const totalCount = _ASSETS_DATA.length;
    
    if (successCount === totalCount) {
      logger.success(`🎉 All media entries created successfully! (${successCount}/${totalCount})`);
    } else {
      logger.warn(`⚠️  Partial success: ${successCount}/${totalCount} media entries created`);
      logger.warn(`   Upload missing files to Supabase Storage and re-run seeding`);
    }
    
    return mediaAssets;
  } catch (error) {
    logger.error("💥 Critical error in media seeding:", error);
    throw error;
  }
}

// downloadImage function removed - not needed for mock media entries
