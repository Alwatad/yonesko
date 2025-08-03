// src/payload/seed.ts

import payload from "payload";

import "dotenv/config";
import config from "../payload.config";

/**
 * This function seeds the database with initial data.
 * It's designed to be run after migrations are complete.
 */
const seed = async () => {
  console.log("🌱 Starting database seed...");

  try {
    // Initialize Payload with the config
    await payload.init({
      config,
    });

    // Wait for database to be fully ready
    console.log("⏳ Ensuring database is fully ready...");
    let attempts = 0;
    const maxAttempts = 30;
    
    while (attempts < maxAttempts) {
      try {
        // Test if we can actually query the database
        await payload.find({
          collection: "pages",
          limit: 1,
          overrideAccess: true,
        });
        
        console.log("✅ Database is ready for queries");
        break;
      } catch {
        console.log(`⏳ Database not ready yet... (${attempts + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
        
        if (attempts >= maxAttempts) {
          console.log("⚠️  Database may not be fully ready, but continuing...");
        }
      }
    }

    // Extract the project name from an environment variable if possible,
    // or use a fallback. This assumes you set PROJECT_NAME during deployment.
    const projectName = process.env.PROJECT_NAME ?? "My Awesome Store";

    // --- Seed Globals (Header & Footer) ---
    console.log("Seeding Globals...");
    await payload.updateGlobal({
      slug: "header",
      data: {
        // Add any nav links you want to pre-populate
        navItems: [],
      },
      context: {
        disableRevalidate: true,
      },
    });

    await payload.updateGlobal({
      slug: "footer",
      data: {
        // Add only fields that exist in your Footer global config
      },
      context: {
        disableRevalidate: true,
      },
    });

    // --- Seed Homepage ---
    console.log("Seeding Homepage...");
    await payload.create({
      collection: "pages",
      data: {
        title: "Home",
        slug: "home", // The slug your frontend looks for
        _status: "published",
        hero: {
          type: "lowImpact",
          richText: {
            root: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [{ text: "Placeholder hero content." }],
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
        },
        layout: [
          {
            blockType: "content", // Use content block instead of hero
            columns: [
              {
                size: "full",
                richText: {
                  root: {
                    type: "root",
                    children: [
                      {
                        type: "paragraph",
                        children: [{ text: `Welcome to ${projectName}!` }],
                        version: 1,
                      },
                    ],
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
      },
      context: {
        disableRevalidate: true,
      },
    });

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    // Ensure the process exits
    process.exit();
  }
};

// Run the seed function
void seed();
