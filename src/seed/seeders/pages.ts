// seed/seeders/pages.ts
import { type Payload } from "payload";

import { logger } from "../utils/logger";

export async function seedPages(
  payload: Payload,
  mediaAssets: Record<string, unknown>,
  products: {
    bought: number;
    title: { en?: string; pl?: string } | string;
    media: unknown[];
    slug: string;
  }[],
): Promise<void> {
  try {
    // Home Page
    await createHomePage(payload, mediaAssets, products);

    // About Us Page
    await createAboutPage(payload, mediaAssets);

    // Contact Page
    await createContactPage(payload);

    // Terms & Conditions Page
    await createTermsPage(payload);

    logger.success("✓ All pages created successfully");
  } catch (error) {
    logger.error("Failed to seed pages:", error);
    throw error;
  }
}

async function createHomePage(
  payload: Payload,
  mediaAssets: Record<string, unknown>,
  products: {
    bought: number;
    title: { en?: string; pl?: string } | string;
    media: unknown[];
    slug: string;
  }[],
) {
  const featuredProducts = products.filter((p) => p.bought > 50).slice(0, 4);

  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
    data: {
      title: "Home",
      slug: "home",
      slugLock: true,
      hero: {
        type: "lowImpact", // Changed from highImpact to avoid media requirement
        richText: {
          root: {
            children: [
              {
                children: [
                  {
                    text: "Step into Style",
                    bold: true,
                  },
                ],
                          type: "heading",
          tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "Discover our latest collection of premium footwear designed for comfort and style.",
                  },
                ],
                type: "paragraph",
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
        links: [
          {
            link: {
              type: "custom",
              label: "Shop Now",
              url: "/shop",
              appearance: "default",
            },
          },
          {
            link: {
              type: "custom",
              label: "View Collection",
              url: "/products",
              appearance: "outline",
            },
          },
        ],
      },
      layout: [
        // Featured Products Carousel
        {
          blockType: "carousel",
          blockName: "Featured Products",
          title: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: "Best Sellers",
                      bold: true,
                    },
                  ],
                            type: "heading",
          tag: "h2",
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
          type: "default",
          autoplay: 5000,
          slides: featuredProducts.map((product) => ({
            image: product.media[0] as string,
            enableLink: true,
            link: {
              type: "custom",
              label: typeof product.title === "string" ? product.title : (product.title.en ?? "Product"),
              url: `/products/${product.slug}`,
              appearance: "default",
            },
          })),
        },
        // CTA Section
        {
          blockType: "cta",
          blockName: "Newsletter CTA",
          richText: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: "Stay in Step",
                      bold: true,
                    },
                  ],
                            type: "heading",
          tag: "h2",
                  version: 1,
                },
                {
                  children: [
                    {
                      text: "Subscribe to our newsletter and get 15% off your first order.",
                    },
                  ],
                  type: "paragraph",
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
          links: [
            {
              link: {
                type: "custom",
                label: "Subscribe Now",
                url: "/newsletter",
                appearance: "default",
              },
            },
          ],
        },
        // Content Columns - Categories
        {
          blockType: "content",
          blockName: "Shop by Category",
          alignment: "center",
          columns: [
            {
              size: "oneThird",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "Men's Collection",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "From casual sneakers to formal dress shoes.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
              enableLink: true,
              link: {
                type: "custom",
                label: "Shop Men",
                url: "/category/mens-shoes",
                appearance: "default",
              },
            },
            {
              size: "oneThird",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "Women's Collection",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Elegant heels to comfortable flats.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
              enableLink: true,
              link: {
                type: "custom",
                label: "Shop Women",
                url: "/category/womens-shoes",
                appearance: "default",
              },
            },
            {
              size: "oneThird",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "Athletic Collection",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Performance footwear for every sport.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
              enableLink: true,
              link: {
                type: "custom",
                label: "Shop Athletic",
                url: "/category/sports-athletic",
                appearance: "default",
              },
            },
          ],
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Home page");
}

async function createAboutPage(payload: Payload, _mediaAssets: Record<string, unknown>) {
  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
    data: {
      title: "About Us",
      slug: "about",
      slugLock: true,
      hero: {
        type: "lowImpact", // Changed from mediumImpact to avoid media requirement
        richText: {
          root: {
            children: [
              {
                children: [
                  {
                    text: "Our Story",
                    bold: true,
                  },
                ],
                          type: "heading",
          tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "Crafting quality footwear since 2020",
                  },
                ],
                type: "paragraph",
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
      },
      layout: [
        {
          blockType: "content",
          blockName: "About Content",
          alignment: "left",
          columns: [
            {
              size: "full",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "Welcome to Stride Footwear",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "At Stride, we believe that great shoes are the foundation of every journey. Founded in 2020, we set out with a simple mission: to create footwear that combines exceptional comfort with timeless style.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Our commitment to quality starts with carefully selected materials and extends through every stitch and sole. We work with skilled craftspeople who share our passion for creating shoes that not only look great but feel amazing from the first wear.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Our Values",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "• Quality: We never compromise on materials or craftsmanship",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "• Comfort: Every shoe is designed with your comfort in mind",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "• Style: Timeless designs that transcend seasonal trends",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "• Sustainability: Committed to reducing our environmental footprint",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
            },
          ],
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created About page");
}

async function createContactPage(payload: Payload) {
  // First create a contact form
  const contactForm = await payload.create({
    collection: "forms",
    data: {
      title: "Contact Form",
      submitButtonLabel: "Send Message",
      confirmationType: "message",
      confirmationMessage: {
        root: {
          children: [
            {
              children: [
                {
                  text: "Thank you for your message! We'll get back to you within 24 hours.",
                },
              ],
              type: "paragraph",
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
      fields: [
        {
          blockType: "text",
          name: "name",
          label: "Your Name",
          required: true,
          width: 50,
        },
        {
          blockType: "email",
          name: "email",
          label: "Email Address",
          required: true,
          width: 50,
        },
        {
          blockType: "text",
          name: "subject",
          label: "Subject",
          required: true,
          width: 100,
        },
        {
          blockType: "textarea",
          name: "message",
          label: "Message",
          required: true,
          width: 100,
        },
      ],
      emails: [
        {
          emailTo: "info@stridefootwear.com",
          emailFrom: "noreply@stridefootwear.com",
          subject: "New Contact Form Submission",
        },
      ],
    },
  });

  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
    data: {
      title: "Contact",
      slug: "contact",
      slugLock: true,
      hero: {
        type: "lowImpact",
        richText: {
          root: {
            children: [
              {
                children: [
                  {
                    text: "Get in Touch",
                    bold: true,
                  },
                ],
                          type: "heading",
          tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "We'd love to hear from you",
                  },
                ],
                type: "paragraph",
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
      },
      layout: [
        {
          blockType: "content",
          blockName: "Contact Info",
          alignment: "center",
          columns: [
            {
              size: "half",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "Visit Our Store",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "123 Fashion Avenue",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "New York, NY 10001",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Monday - Friday: 10AM - 8PM",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Saturday - Sunday: 11AM - 7PM",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
            },
            {
              size: "half",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "Contact Information",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Phone: +1 (555) 123-4567",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Email: info@stridefootwear.com",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Customer Service: support@stridefootwear.com",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
            },
          ],
        },
        {
          blockType: "formBlock",
          form: contactForm.id,
          enableIntro: true,
          introContent: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: "Send us a message",
                      bold: true,
                    },
                  ],
                            type: "heading",
          tag: "h2",
                  version: 1,
                },
                {
                  children: [
                    {
                      text: "Have a question or feedback? We're here to help!",
                    },
                  ],
                  type: "paragraph",
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
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Contact page");
}

async function createTermsPage(payload: Payload) {
  await payload.create({
    collection: "pages",
    context: { disableRevalidate: true }, // Disable Next.js revalidation during seeding
    data: {
      title: "Terms & Conditions",
      slug: "terms",
      slugLock: true,
      hero: {
        type: "lowImpact",
        richText: {
          root: {
            children: [
              {
                children: [
                  {
                    text: "Terms & Conditions",
                    bold: true,
                  },
                ],
                          type: "heading",
          tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "Last updated: January 1, 2024",
                  },
                ],
                type: "paragraph",
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
      },
      layout: [
        {
          blockType: "content",
          blockName: "Terms Content",
          alignment: "left",
          columns: [
            {
              size: "full",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          type: "text",
                          text: "1. Acceptance of Terms",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "2. Use License",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Permission is granted to temporarily download one copy of the materials (information or software) on Stride Footwear's website for personal, non-commercial transitory viewing only.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "3. Disclaimer",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "The materials on Stride Footwear's website are provided on an 'as is' basis. Stride Footwear makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "4. Limitations",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "In no event shall Stride Footwear or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stride Footwear's website.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "5. Privacy Policy",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your personal information.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "6. Returns and Refunds",
                          type: "text",
                          format: 1,
                          version: 1,
                          version: 1,
                        },
                      ],
                                type: "heading",
          tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          type: "text",
                          text: "We offer a 30-day return policy for unworn items in original packaging. Refunds will be processed within 5-7 business days of receiving the returned item.",
                          version: 1,
                        },
                      ],
                      type: "paragraph",
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
            },
          ],
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Terms & Conditions page");
}
