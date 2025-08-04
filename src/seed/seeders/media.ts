// Note: fs, https, path imports removed since we're not uploading files

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
    logger.info("📸 Skipping media uploads - assuming files will be added to storage separately...");

    // Return empty media assets - products and pages will work without images
    const mediaAssets: Record<string, { id: string }> = {};

    logger.success("✓ Media seeding skipped (files should be uploaded to storage separately)");
    return mediaAssets;
  } catch (error) {
    logger.error("Failed to seed media:", error);
    throw error;
  }
}

// downloadImage function removed - not needed for mock media entries
