import { logger } from "../utils/logger";

import type { Payload } from "payload";

type Category = {
  title: string;
  slug: string;
  description?: string;
  subcategories?: SubCategory[];
};

type SubCategory = {
  title: string;
  slug: string;
  description?: string;
};

const CATEGORIES_DATA: Category[] = [
  {
    title: "Men's Shoes",
    slug: "mens-shoes",
    description: "Premium footwear for men",
    subcategories: [
      {
        title: "Dress Shoes",
        slug: "dress-shoes",
        description: "Formal and business shoes",
      },
      {
        title: "Casual Shoes",
        slug: "casual-shoes",
        description: "Everyday comfortable shoes",
      },
      {
        title: "Sneakers",
        slug: "sneakers",
        description: "Athletic and lifestyle sneakers",
      },
    ],
  },
  {
    title: "Women's Shoes",
    slug: "womens-shoes",
    description: "Elegant footwear for women",
    subcategories: [
      {
        title: "Heels",
        slug: "heels",
        description: "High heels and pumps",
      },
      {
        title: "Flats",
        slug: "flats",
        description: "Comfortable flat shoes",
      },
      {
        title: "Boots",
        slug: "boots",
        description: "Ankle boots and tall boots",
      },
    ],
  },
  {
    title: "Sports & Athletic",
    slug: "sports-athletic",
    description: "Performance athletic footwear",
    subcategories: [
      {
        title: "Running Shoes",
        slug: "running-shoes",
        description: "Professional running footwear",
      },
      {
        title: "Training Shoes",
        slug: "training-shoes",
        description: "Cross-training and gym shoes",
      },
      {
        title: "Basketball Shoes",
        slug: "basketball-shoes",
        description: "High-performance basketball shoes",
      },
    ],
  },
];

const CONTENT_CATEGORIES_DATA = [
  {
    title: "News",
    slug: "news",
    description: "Latest company and industry news",
  },
  {
    title: "Style Guide",
    slug: "style-guide",
    description: "Fashion tips and styling advice",
  },
  {
    title: "Product Care",
    slug: "product-care",
    description: "How to maintain your footwear",
  },
];

export async function seedCategories(payload: Payload): Promise<Record<string, unknown>> {
  try {
    logger.info("Creating product categories...");

    const categories: Record<string, { id: string; subcategories?: { slug: string; id: string }[] }> = {};

    for (const categoryData of CATEGORIES_DATA) {
      // Create main category
      const category = await payload.create({
        collection: "productCategories",
        data: {
          title: categoryData.title,
          slug: categoryData.slug,
        },
      });

      logger.info(`  ✓ Created category: ${categoryData.title}`);

      // Create subcategories if they exist
      const subcategories: { slug: string; id: string }[] = [];
      if (categoryData.subcategories) {
        for (const subCategoryData of categoryData.subcategories) {
          const subCategory = await payload.create({
            collection: "productSubCategories",
            data: {
              title: subCategoryData.title,
              slug: subCategoryData.slug,
              category: category.id,
            },
          });

          subcategories.push({
            slug: subCategoryData.slug,
            id: subCategory.id as string,
          });

          logger.info(`    ✓ Created subcategory: ${subCategoryData.title}`);
        }
      }

      categories[categoryData.slug] = {
        id: category.id as string,
        subcategories: subcategories.length > 0 ? subcategories : undefined,
      };
    }

    // Create content categories
    logger.info("Creating content categories...");
    for (const categoryData of CONTENT_CATEGORIES_DATA) {
      await payload.create({
        collection: "categories",
        data: {
          title: categoryData.title,
        },
      });

      logger.info(`  ✓ Created content category: ${categoryData.title}`);
    }

    logger.success("✓ Categories seeded successfully");
    return categories;
  } catch (error) {
    logger.error("Failed to seed categories:", error);
    throw error;
  }
}
