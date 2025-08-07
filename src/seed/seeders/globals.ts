// seed/seeders/globals.ts
import { type Payload } from "payload";

import { logger } from "../utils/logger";

// Helper function to create proper Lexical text nodes (same as pages.ts)
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

// Helper function to create proper Lexical paragraph nodes (same as pages.ts)
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

// Helper function to create proper Lexical root structure (same as pages.ts)
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

export async function seedGlobalSettings(
  payload: Payload,
  mediaAssets: Record<string, { id: string }>,
): Promise<void> {
  try {
    // Header Settings
    await seedHeader(payload, mediaAssets);

    // Footer Settings
    await seedFooter(payload, mediaAssets);

    // Shop Settings
    await seedShopSettings(payload);

    // Shop Layout
    await seedShopLayout(payload);

    // Email Settings
    await seedEmailSettings(payload, mediaAssets);

    // Shipping Methods
    await seedShippingMethods(payload, mediaAssets);

    // Payment Settings
    await seedPaymentSettings(payload);

    // Fulfillment Settings
    await seedFulfillmentSettings(payload);

    logger.success("✓ All global settings configured");
  } catch (error) {
    logger.error("Failed to seed global settings:", error);
    throw error;
  }
}

async function seedHeader(payload: Payload, mediaAssets: Record<string, { id: string }>) {
  try {
    await payload.updateGlobal({
      slug: "header",
      context: { disableRevalidate: true },
      data: {
        type: "default",
        hideOnScroll: false,
        background: "#000000",
        logo: mediaAssets["logo.png"]?.id,
        navItems: [
          {
            link: {
              type: "custom",
              label: "Home",
              url: "/",
              newTab: false,
            },
          },
          {
            link: {
              type: "custom",
              label: "Shop",
              url: "/products",
              newTab: false,
            },
          },
          {
            link: {
              type: "custom",
              label: "Men's",
              url: "/category/mens-shoes",
              newTab: false,
            },
          },
          {
            link: {
              type: "custom",
              label: "Women's",
              url: "/category/womens-shoes",
              newTab: false,
            },
          },
          {
            link: {
              type: "custom",
              label: "Athletic",
              url: "/category/sports-athletic",
              newTab: false,
            },
          },
          {
            link: {
              type: "custom",
              label: "About",
              url: "/about",
              newTab: false,
            },
          },
        ],
      },
    });
  } catch (error: unknown) {
    logger.error("DETAILED HEADER VALIDATION ERROR:");
    if (error && typeof error === "object" && "data" in error) {
      logger.error("Error data:", JSON.stringify((error as { data: unknown }).data, null, 2));
      const errorData = (error as { data?: { errors?: unknown } }).data;
      if (errorData?.errors) {
        logger.error("Validation errors:", JSON.stringify(errorData.errors, null, 2));
      }
    }
    throw error;
  }

  logger.info("✓ Header configured");
}

async function seedFooter(payload: Payload, _mediaAssets: Record<string, { id: string }>) {
  await payload.updateGlobal({
    slug: "footer",
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: {
            type: "custom",
            label: "Privacy Policy",
            url: "/privacy",
          },
        },
        {
          link: {
            type: "custom",
            label: "Terms & Conditions",
            url: "/terms",
          },
        },
        {
          link: {
            type: "custom",
            label: "Shipping Info",
            url: "/shipping",
          },
        },
        {
          link: {
            type: "custom",
            label: "Returns",
            url: "/returns",
          },
        },
        {
          link: {
            type: "custom",
            label: "FAQ",
            url: "/faq",
          },
        },
      ],
      attribution: {
        en: createRichTextRoot([
          createParagraphNode([
            createTextNode("© 2024 Stride Footwear. All rights reserved. Made with ❤️ and PayloadCMS"),
          ]),
        ]),
        pl: createRichTextRoot([
          createParagraphNode([
            createTextNode(
              "© 2024 Stride Footwear. Wszelkie prawa zastrzeżone. Stworzone z ❤️ i PayloadCMS",
            ),
          ]),
        ]),
      },
    },
  });

  logger.info("✓ Footer configured");
}

async function seedShopSettings(payload: Payload) {
  await payload.updateGlobal({
    slug: "shopSettings",
    context: { disableRevalidate: true },
    data: {
      availableCurrencies: ["USD", "EUR", "SAR"],
      currencyValues: [
        {
          currency: "USD",
          value: 1,
        },
        {
          currency: "EUR",
          value: 0.92,
        },
        {
          currency: "SAR",
          value: 3.75,
        },
      ],
    },
  });

  logger.info("✓ Shop settings configured");
}

async function seedShopLayout(payload: Payload) {
  await payload.updateGlobal({
    slug: "shopLayout",
    context: { disableRevalidate: true },
    data: {
      productDetails: {
        type: "WithImageGalleryExpandableDetails",
        reviewsEnabled: true,
      },
      productList: {
        filters: "withSidebar",
      },
      cartAndWishlist: {
        type: "slideOver",
      },
      checkout: {
        type: "OneStepWithSummary",
      },
      clientPanel: {
        type: "withSidebar",
        help: {
          title: "Need Help?",
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: "Contact our customer service team for assistance with your orders, returns, or any questions.",
                    },
                  ],
                  type: "p",
                  version: 1,
                },
                {
                  children: [
                    {
                      text: "Email: support@stridefootwear.com",
                    },
                  ],
                  type: "p",
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
              ],
              type: "root",
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
      },
    },
  });

  logger.info("✓ Shop layout configured");
}

async function seedEmailSettings(payload: Payload, mediaAssets: Record<string, { id: string }>) {
  await payload.updateGlobal({
    slug: "emailMessages",
    context: { disableRevalidate: true },
    data: {
      smtp: {
        host: "smtp.example.com",
        port: 587,
        secure: false,
        user: "noreply@stridefootwear.com",
        password: "your-smtp-password", // In production, use environment variables
        fromEmail: "noreply@stridefootwear.com",
      },
      messages: {
        logo: mediaAssets["logo.png"]?.id,
        additionalText: "Thank you for shopping with Stride Footwear!",
        template: "default",
      },
    },
  });

  logger.info("✓ Email settings configured");
}

async function seedShippingMethods(payload: Payload, mediaAssets: Record<string, { id: string }>) {
  // InPost Pickup Points
  await payload.updateGlobal({
    slug: "inpost-pickup",
    context: { disableRevalidate: true },
    data: {
      enabled: true,
      icon: mediaAssets["logo.png"]?.id, // Use a shipping icon in production
      settings: {
        label: "InPost Pickup Point",
        description: "Convenient pickup from InPost lockers",
      },
      clientId: "demo-client-id",
      APIUrl: "https://sandbox-api-shipx-pl.easypack24.net",
      shipXAPIKey: "demo-api-key",
      geowidgetToken: "demo-geowidget-token",
      deliveryZones: [
        {
          countries: ["sa", "ae"],
          freeShipping: [
            {
              value: 100,
              currency: "USD",
            },
            {
              value: 400,
              currency: "SAR",
            },
          ],
          range: [
            {
              weightFrom: 0,
              weightTo: 5,
              pricing: [
                {
                  value: 12,
                  currency: "USD",
                },
                {
                  value: 45,
                  currency: "SAR",
                },
              ],
            },
            {
              weightFrom: 5,
              weightTo: 20,
              pricing: [
                {
                  value: 18,
                  currency: "USD",
                },
                {
                  value: 67,
                  currency: "SAR",
                },
              ],
            },
          ],
        },
      ],
    },
  });

  // InPost Courier
  await payload.updateGlobal({
    slug: "inpost-courier",
    context: { disableRevalidate: true },
    data: {
      enabled: true,
      icon: mediaAssets["logo.png"]?.id,
      settings: {
        label: "InPost Courier Delivery",
        description: "Door-to-door delivery by InPost courier",
      },
      clientId: "demo-client-id",
      APIUrl: "https://sandbox-api-shipx-pl.easypack24.net",
      shipXAPIKey: "demo-api-key",
      deliveryZones: [
        {
          countries: ["sa", "ae"],
          freeShipping: [
            {
              value: 150,
              currency: "USD",
            },
            {
              value: 600,
              currency: "SAR",
            },
          ],
          range: [
            {
              weightFrom: 0,
              weightTo: 5,
              pricing: [
                {
                  value: 15,
                  currency: "USD",
                },
                {
                  value: 56,
                  currency: "SAR",
                },
              ],
            },
            {
              weightFrom: 5,
              weightTo: 30,
              pricing: [
                {
                  value: 25,
                  currency: "USD",
                },
                {
                  value: 94,
                  currency: "SAR",
                },
              ],
            },
          ],
        },
      ],
    },
  });

  logger.info("✓ Shipping methods configured");
}

async function seedPaymentSettings(payload: Payload) {
  await payload.updateGlobal({
    slug: "paywalls",
    context: { disableRevalidate: true },
    data: {
      paywall: "cash",
      stripe: {
        secret: "sk_test_demo",
        public: "pk_test_demo",
        webhookSecret: "whsec_demo",
      },
      // Leave other payment methods unconfigured for now
    },
  });

  logger.info("✓ Payment settings configured");
}

async function seedFulfillmentSettings(payload: Payload) {
  await payload.updateGlobal({
    slug: "fulfilment",
    context: { disableRevalidate: true },
    data: {
      shopAddress: {
        name: "Stride Footwear Warehouse",
        address: "123 Fashion Avenue",
        city: "New York",
        country: "pl", // Use supported country code
        region: "NY",
        postalCode: "10001",
        email: "warehouse@stridefootwear.com",
        phone: "+1 (555) 123-4567",
      },
    },
  });

  logger.info("✓ Fulfillment settings configured");
}
