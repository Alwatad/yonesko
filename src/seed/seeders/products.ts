// seed/seeders/products.ts
import { type Payload } from "payload";

import { randomPrice, generateSizes } from "../utils/helpers";
import { logger } from "../utils/logger";

type ProductData = {
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  sizes: string[];
  colors?: { slug: string; label: string; value: string }[];
  featured?: boolean;
  stock?: number;
};

const PRODUCTS_DATA: ProductData[] = [
  {
    title: "Urban Street Sneaker",
    slug: "urban-street-sneaker",
    description:
      "Modern streetwear meets classic comfort. These versatile sneakers feature a clean design with premium materials, perfect for everyday wear.",
    category: "mens-shoes",
    subcategory: "sneakers",
    price: 89.99,
    image: "mens-sneaker-urban.jpg",
    sizes: generateSizes("mens"),
    colors: [
      { slug: "white", label: "White", value: "#FFFFFF" },
      { slug: "black", label: "Black", value: "#000000" },
    ],
    stock: 150,
  },
  {
    title: "Classic Oxford Dress Shoe",
    slug: "classic-oxford-dress-shoe",
    description:
      "Timeless elegance for the modern gentleman. Crafted from genuine leather with traditional brogue detailing.",
    category: "mens-shoes",
    subcategory: "dress-shoes",
    price: 149.99,
    image: "mens-dress-oxford.jpg",
    sizes: generateSizes("mens"),
    stock: 75,
  },
  {
    title: "Elegant Evening Heel",
    slug: "elegant-evening-heel",
    description:
      'Sophisticated and stunning. These heels feature a comfortable 3.5" height with cushioned insoles for all-night comfort.',
    category: "womens-shoes",
    subcategory: "heels",
    price: 129.99,
    image: "womens-heel-elegant.jpg",
    sizes: generateSizes("womens"),
    colors: [
      { slug: "black", label: "Black", value: "#000000" },
      { slug: "nude", label: "Nude", value: "#F5DEB3" },
    ],
    stock: 90,
  },
  {
    title: "Comfort Ballet Flat",
    slug: "comfort-ballet-flat",
    description:
      "All-day comfort meets timeless style. Soft leather upper with flexible sole and memory foam insole.",
    category: "womens-shoes",
    subcategory: "flats",
    price: 79.99,
    image: "womens-flat-comfort.jpg",
    sizes: generateSizes("womens"),
    stock: 120,
  },
  {
    title: "Pro Runner 3000",
    slug: "pro-runner-3000",
    description:
      "Engineered for performance. Advanced cushioning technology and breathable mesh upper for serious runners.",
    category: "sports-athletic",
    subcategory: "running-shoes",
    price: 159.99,
    image: "athletic-running-pro.jpg",
    sizes: generateSizes("unisex"),
    featured: true,
    stock: 200,
  },
  {
    title: "FlexTrain Cross Trainer",
    slug: "flextrain-cross-trainer",
    description:
      "Versatile training shoe for gym and outdoor workouts. Stable base with flexible forefoot for dynamic movements.",
    category: "sports-athletic",
    subcategory: "training-shoes",
    price: 119.99,
    image: "athletic-training-flex.jpg",
    sizes: generateSizes("unisex"),
    stock: 110,
  },
  {
    title: "CloudWalk Comfort Sneaker",
    slug: "cloudwalk-comfort-sneaker",
    description:
      "Our bestseller! Ultra-lightweight with cloud-like cushioning. Perfect for long walks and all-day wear.",
    category: "sports-athletic",
    subcategory: "running-shoes",
    price: 99.99,
    image: "featured-bestseller.jpg",
    sizes: generateSizes("unisex"),
    colors: [
      { slug: "all-black", label: "All Black", value: "#000000" },
      { slug: "white-grey", label: "White/Grey", value: "#F0F0F0" },
    ],
    featured: true,
    stock: 250,
  },
];

export async function seedProducts(
  payload: Payload,
  mediaAssets: Record<string, unknown>,
  categories: Record<string, unknown>,
): Promise<unknown[]> {
  const products: unknown[] = [];

  try {
    for (const productData of PRODUCTS_DATA) {
      // Find the category and subcategory IDs
      const category = categories[productData.category] as {
        subcategories?: { slug: string; id: string }[];
        id: string;
      };
      const subcategory = category?.subcategories?.find((sub) => sub.slug === productData.subcategory);

      if (!category || !subcategory) {
        logger.warn(`Category not found for product: ${productData.title}`);
        continue;
      }

      // Get media ID
      const mediaId = (mediaAssets[productData.image] as { id: string })?.id;

      if (!mediaId) {
        logger.warn(`Media not found for product: ${productData.image}`);
        continue;
      }

      // Prepare product data
      const product = await payload.create({
        collection: "products",
        data: {
          title: productData.title,
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: productData.description,
                    },
                  ],
                  type: "p",
                  version: 1,
                },
              ],
              type: "root",
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
          slug: productData.slug,
          slugLock: true,
          categoriesArr: [
            {
              category: category.id,
              subcategories: [subcategory.id],
            },
          ],
          images: [mediaId], // Required field for product images
          enableVariants: true,
          variantsType: productData.colors ? "colorsAndSizes" : "sizes",
          // Add sizes
          sizes: productData.sizes.map((size) => ({
            slug: `size-${size}`,
            label: `Size ${size}`,
          })),
          // Add colors if available
          ...(productData.colors && {
            colors: productData.colors.map((color) => ({
              slug: color.slug,
              label: color.label,
              colorValue: color.value,
            })),
          }),
          // Create variants
          variants: _createVariants(productData),
          // Pricing
          pricing: [
            {
              value: productData.price,
              currency: "USD",
            },
          ],
          stock: productData.stock ?? 100,
          bought: productData.featured ? randomPrice(50, 200) : randomPrice(5, 50),
          _status: "published",
        },
      });

      products.push(product);
      logger.info(`✓ Created product: ${productData.title}`);
    }

    return products;
  } catch (error) {
    logger.error("Failed to seed products:", error);
    throw error;
  }
}

type VariantData = {
  size?: string | null;
  color?: string | null;
  variantSlug?: string | null;
  image?: string | null;
  stock: number;
  weight?: number | null;
  pricing?:
    | {
        value: number;
        currency: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
};

function _createVariants(productData: ProductData): VariantData[] {
  const variants: VariantData[] = [];

  if (productData.colors) {
    // Create color and size combinations
    for (const color of productData.colors) {
      for (const size of productData.sizes) {
        variants.push({
          size: `size-${size}`,
          color: color.slug,
          variantSlug: `${color.slug}-size-${size}`,
          stock: Math.floor(
            (productData.stock ?? 100) / (productData.colors.length * productData.sizes.length),
          ),
          weight: 0,
          pricing: [
            {
              value: productData.price,
              currency: "USD",
            },
          ],
        });
      }
    }
  } else {
    // Just sizes
    for (const size of productData.sizes) {
      variants.push({
        size: `size-${size}`,
        variantSlug: `size-${size}`,
        stock: Math.floor((productData.stock ?? 100) / productData.sizes.length),
        weight: 0,
        pricing: [
          {
            value: productData.price,
            currency: "USD",
          },
        ],
      });
    }
  }

  return variants;
}
