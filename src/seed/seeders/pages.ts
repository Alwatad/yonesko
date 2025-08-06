import { type Payload } from "payload";

import { logger } from "../utils/logger";

// Detailed error logging helper
function logDetailedError(error: unknown, context: string) {
  console.error(`\n❌ DETAILED ERROR in ${context}:`);
  console.error("Full error object:", JSON.stringify(error, null, 2));

  if (error && typeof error === "object" && "data" in error) {
    console.error("Error data:", JSON.stringify((error as Record<string, unknown>).data, null, 2));

    const errorData = (error as Record<string, unknown>).data;
    if (errorData && typeof errorData === "object" && "errors" in errorData) {
      console.error("Validation errors:");
      const errors = (errorData as Record<string, unknown>).errors;
      if (Array.isArray(errors)) {
        errors.forEach((err: unknown, index: number) => {
          console.error(`  Error ${index + 1}:`, JSON.stringify(err, null, 2));
        });
      }
    }
  }

  if (error && typeof error === "object" && "cause" in error) {
    console.error("Error cause:", JSON.stringify((error as Record<string, unknown>).cause, null, 2));
  }
}

// Helper function to create proper Lexical text nodes
function createTextNode(text: string, format = 0) {
  return {
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text,
    type: "text",
    version: 1,
  };
}

// Helper function to create proper Lexical paragraph nodes
function createParagraphNode(children: { [k: string]: unknown; type: string; version: number }[]) {
  return {
    children,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    type: "paragraph",
    version: 1,
  };
}

// Helper function to create proper Lexical heading nodes
function createHeadingNode(children: { [k: string]: unknown; type: string; version: number }[], tag: string) {
  return {
    children,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    type: "heading",
    tag,
    version: 1,
  };
}

// Helper function to create proper Lexical root structure
function createRichTextRoot(children: { [k: string]: unknown; type: string; version: number }[]) {
  return {
    root: {
      children,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      type: "root",
      version: 1,
    },
  };
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
  try {
    logger.info("Creating homepage...");

    const featuredProducts = products.filter((p) => p.bought > 50).slice(0, 4);

    const homePage = await payload.create({
      collection: "pages",
      context: { disableRevalidate: true },
      data: {
        title: "Home",
        slug: "home",
        slugLock: true,
        hero: {
          type: "highImpact",
          richText: createRichTextRoot([
            createHeadingNode([createTextNode("Step into Style", 1)], "h1"),
            createParagraphNode([
              createTextNode(
                "Discover our latest collection of premium footwear designed for comfort and style.",
              ),
            ]),
          ]),
          media: (mediaAssets["hero-running-shoes.png"] as { id: string })?.id,
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
            title: createRichTextRoot([createHeadingNode([createTextNode("Best Sellers", 1)], "h2")]),
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
            richText: createRichTextRoot([
              createHeadingNode([createTextNode("Stay in Step", 1)], "h2"),
              createParagraphNode([
                createTextNode("Subscribe to our newsletter and get 15% off your first order."),
              ]),
            ]),
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
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Men's Collection", 1)], "h3"),
                  createParagraphNode([createTextNode("From casual sneakers to formal dress shoes.")]),
                ]),
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
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Women's Collection", 1)], "h3"),
                  createParagraphNode([createTextNode("Elegant heels to comfortable flats.")]),
                ]),
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
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Athletic Collection", 1)], "h3"),
                  createParagraphNode([createTextNode("Performance footwear for every sport.")]),
                ]),
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
          // Additional Content Section
          {
            blockType: "content",
            blockName: "Lifestyle Text",
            alignment: "center",
            columns: [
              {
                size: "full",
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Find the Perfect Shoes for Every Occasion", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "Whether you're looking for comfortable shoes for daily city walks, elegant models for the office that will emphasize your professionalism, or perhaps unique creations for special occasions like weddings, galas, or important business meetings - our extensive collection offers solutions tailored to every lifestyle and need.",
                    ),
                  ]),
                ]),
              },
            ],
          },
          // Lifestyle Hero Image
          {
            blockType: "mediaBlock",
            blockName: "Lifestyle Image",
            media: (mediaAssets["hero-lifestyle.png"] as { id: string })?.id,
          },
        ],
        _status: "published",
      },
    });

    logger.success(`✅ Homepage created: ID ${homePage.id}`);
    return homePage;
  } catch (error) {
    logDetailedError(error, "Homepage Creation");
    throw error;
  }
}

async function createAboutPage(payload: Payload, _mediaAssets: Record<string, unknown>) {
  try {
    logger.info("Creating about page...");

    const aboutPage = await payload.create({
      collection: "pages",
      context: { disableRevalidate: true },
      data: {
        title: "About Us",
        slug: "about",
        slugLock: true,
        hero: {
          type: "lowImpact",
          richText: createRichTextRoot([
            createHeadingNode([createTextNode("Our Story", 1)], "h1"),
            createParagraphNode([createTextNode("Crafting quality footwear since 2020")]),
          ]),
        },
        layout: [
          {
            blockType: "content",
            blockName: "About Content",
            alignment: "left",
            columns: [
              {
                size: "full",
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Welcome to Stride Footwear", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "At Stride, we believe that great shoes are the foundation of every journey. Founded in 2020, we set out with a simple mission: to create footwear that combines exceptional comfort with timeless style.",
                    ),
                  ]),
                  createParagraphNode([
                    createTextNode(
                      "Our commitment to quality starts with carefully selected materials and extends through every stitch and sole. We work with skilled craftspeople who share our passion for creating shoes that not only look great but feel amazing from the first wear.",
                    ),
                  ]),
                  createHeadingNode([createTextNode("Our Values", 1)], "h3"),
                  createParagraphNode([
                    createTextNode("• Quality: We never compromise on materials or craftsmanship"),
                  ]),
                  createParagraphNode([
                    createTextNode("• Comfort: Every shoe is designed with your comfort in mind"),
                  ]),
                  createParagraphNode([
                    createTextNode("• Style: Timeless designs that transcend seasonal trends"),
                  ]),
                  createParagraphNode([
                    createTextNode("• Sustainability: Committed to reducing our environmental footprint"),
                  ]),
                ]),
              },
            ],
          },
        ],
        _status: "published",
      },
    });

    logger.success(`✅ About page created: ID ${aboutPage.id}`);
    return aboutPage;
  } catch (error) {
    logDetailedError(error, "About Page Creation");
    throw error;
  }
}

async function createContactPage(payload: Payload) {
  try {
    logger.info("Creating contact page...");

    // First create a contact form
    const contactForm = await payload.create({
      collection: "forms",
      data: {
        title: "Contact Form",
        submitButtonLabel: "Send Message",
        confirmationType: "message",
        confirmationMessage: createRichTextRoot([
          createParagraphNode([
            createTextNode("Thank you for your message! We'll get back to you within 24 hours."),
          ]),
        ]),
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

    const contactPage = await payload.create({
      collection: "pages",
      context: { disableRevalidate: true },
      data: {
        title: "Contact",
        slug: "contact",
        slugLock: true,
        hero: {
          type: "lowImpact",
          richText: createRichTextRoot([
            createHeadingNode([createTextNode("Get in Touch", 1)], "h1"),
            createParagraphNode([createTextNode("We'd love to hear from you")]),
          ]),
        },
        layout: [
          {
            blockType: "content",
            blockName: "Contact Info",
            alignment: "center",
            columns: [
              {
                size: "half",
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Visit Our Store", 1)], "h3"),
                  createParagraphNode([createTextNode("123 Fashion Avenue")]),
                  createParagraphNode([createTextNode("New York, NY 10001")]),
                  createParagraphNode([createTextNode("Monday - Friday: 10AM - 8PM")]),
                  createParagraphNode([createTextNode("Saturday - Sunday: 11AM - 7PM")]),
                ]),
              },
              {
                size: "half",
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("Contact Information", 1)], "h3"),
                  createParagraphNode([createTextNode("Phone: +1 (555) 123-4567")]),
                  createParagraphNode([createTextNode("Email: info@stridefootwear.com")]),
                  createParagraphNode([createTextNode("Customer Service: support@stridefootwear.com")]),
                ]),
              },
            ],
          },
          {
            blockType: "formBlock",
            form: contactForm.id,
            enableIntro: true,
            introContent: createRichTextRoot([
              createHeadingNode([createTextNode("Send us a message", 1)], "h2"),
              createParagraphNode([createTextNode("Have a question or feedback? We're here to help!")]),
            ]),
          },
        ],
        _status: "published",
      },
    });

    logger.success(`✅ Contact page created: ID ${contactPage.id}`);
    return contactPage;
  } catch (error) {
    logDetailedError(error, "Contact Page Creation");
    throw error;
  }
}

async function createTermsPage(payload: Payload) {
  try {
    logger.info("Creating terms page...");

    const termsPage = await payload.create({
      collection: "pages",
      context: { disableRevalidate: true },
      data: {
        title: "Terms & Conditions",
        slug: "terms",
        slugLock: true,
        hero: {
          type: "lowImpact",
          richText: createRichTextRoot([
            createHeadingNode([createTextNode("Terms & Conditions", 1)], "h1"),
            createParagraphNode([createTextNode("Last updated: January 1, 2024")]),
          ]),
        },
        layout: [
          {
            blockType: "content",
            blockName: "Terms Content",
            alignment: "left",
            columns: [
              {
                size: "full",
                richText: createRichTextRoot([
                  createHeadingNode([createTextNode("1. Acceptance of Terms", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
                    ),
                  ]),
                  createHeadingNode([createTextNode("2. Use License", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "Permission is granted to temporarily download one copy of the materials (information or software) on Stride Footwear's website for personal, non-commercial transitory viewing only.",
                    ),
                  ]),
                  createHeadingNode([createTextNode("3. Disclaimer", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "The materials on Stride Footwear's website are provided on an 'as is' basis. Stride Footwear makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
                    ),
                  ]),
                  createHeadingNode([createTextNode("4. Limitations", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "In no event shall Stride Footwear or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stride Footwear's website.",
                    ),
                  ]),
                  createHeadingNode([createTextNode("5. Privacy Policy", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your personal information.",
                    ),
                  ]),
                  createHeadingNode([createTextNode("6. Returns and Refunds", 1)], "h2"),
                  createParagraphNode([
                    createTextNode(
                      "We offer a 30-day return policy for unworn items in original packaging. Refunds will be processed within 5-7 business days of receiving the returned item.",
                    ),
                  ]),
                ]),
              },
            ],
          },
        ],
        _status: "published",
      },
    });

    logger.success(`✅ Terms page created: ID ${termsPage.id}`);
    return termsPage;
  } catch (error) {
    logDetailedError(error, "Terms Page Creation");
    throw error;
  }
}

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
    logger.info("🏗️ Starting pages seeding...");

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
    logDetailedError(error, "seedPages");
    logger.error("Failed to seed pages:", error);
    throw error;
  }
}
