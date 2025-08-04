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
    data: {
      title: "Home",
      slug: "home",
      slugLock: true,
      hero: {
        type: "highImpact",
        media: (mediaAssets["hero-running-shoes.jpg"] as { id: string })?.id || null,
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
                type: "h1",
                tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "Discover our latest collection of premium footwear designed for comfort and style.",
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
                  type: "h2",
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
                  type: "h2",
                  tag: "h2",
                  version: 1,
                },
                {
                  children: [
                    {
                      text: "Subscribe to our newsletter and get 15% off your first order.",
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
                          text: "Men's Collection",
                          bold: true,
                        },
                      ],
                      type: "h3",
                      tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "From casual sneakers to formal dress shoes.",
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
                          text: "Women's Collection",
                          bold: true,
                        },
                      ],
                      type: "h3",
                      tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Elegant heels to comfortable flats.",
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
                          text: "Athletic Collection",
                          bold: true,
                        },
                      ],
                      type: "h3",
                      tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Performance footwear for every sport.",
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

async function createAboutPage(payload: Payload, mediaAssets: Record<string, unknown>) {
  await payload.create({
    collection: "pages",
    data: {
      title: "About Us",
      slug: "about",
      slugLock: true,
      hero: {
        type: "mediumImpact",
        media: (mediaAssets["hero-lifestyle.jpg"] as { id: string })?.id || null,
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
                type: "h1",
                tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "Crafting quality footwear since 2020",
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
                          text: "Welcome to Stride Footwear",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "At Stride, we believe that great shoes are the foundation of every journey. Founded in 2020, we set out with a simple mission: to create footwear that combines exceptional comfort with timeless style.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Our commitment to quality starts with carefully selected materials and extends through every stitch and sole. We work with skilled craftspeople who share our passion for creating shoes that not only look great but feel amazing from the first wear.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Our Values",
                          bold: true,
                        },
                      ],
                      type: "h3",
                      tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "• Quality: We never compromise on materials or craftsmanship",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "• Comfort: Every shoe is designed with your comfort in mind",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "• Style: Timeless designs that transcend seasonal trends",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "• Sustainability: Committed to reducing our environmental footprint",
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
                type: "h1",
                tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "We'd love to hear from you",
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
                          text: "Visit Our Store",
                          bold: true,
                        },
                      ],
                      type: "h3",
                      tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "123 Fashion Avenue",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "New York, NY 10001",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Monday - Friday: 10AM - 8PM",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Saturday - Sunday: 11AM - 7PM",
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
            },
            {
              size: "half",
              richText: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          text: "Contact Information",
                          bold: true,
                        },
                      ],
                      type: "h3",
                      tag: "h3",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Phone: +1 (555) 123-4567",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Email: info@stridefootwear.com",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Customer Service: support@stridefootwear.com",
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
                  type: "h2",
                  tag: "h2",
                  version: 1,
                },
                {
                  children: [
                    {
                      text: "Have a question or feedback? We're here to help!",
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
                type: "h1",
                tag: "h1",
                version: 1,
              },
              {
                children: [
                  {
                    text: "Last updated: January 1, 2024",
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
                          text: "1. Acceptance of Terms",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "2. Use License",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Permission is granted to temporarily download one copy of the materials (information or software) on Stride Footwear's website for personal, non-commercial transitory viewing only.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "3. Disclaimer",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "The materials on Stride Footwear's website are provided on an 'as is' basis. Stride Footwear makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "4. Limitations",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "In no event shall Stride Footwear or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stride Footwear's website.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "5. Privacy Policy",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your personal information.",
                        },
                      ],
                      type: "p",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "6. Returns and Refunds",
                          bold: true,
                        },
                      ],
                      type: "h2",
                      tag: "h2",
                      version: 1,
                    },
                    {
                      children: [
                        {
                          text: "We offer a 30-day return policy for unworn items in original packaging. Refunds will be processed within 5-7 business days of receiving the returned item.",
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
            },
          ],
        },
      ],
      _status: "published",
    },
  });

  logger.info("✓ Created Terms & Conditions page");
}
