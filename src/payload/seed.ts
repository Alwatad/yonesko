// src/payload/seed.ts

import payload from "payload";
import type { Payload } from "payload";
import path from "path";
import "dotenv/config";
import config from "../payload.config";

// Load environment variables
const { PAYLOAD_SECRET, DATABASE_URI } = process.env;

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

    // Extract the project name from an environment variable if possible,
    // or use a fallback. This assumes you set PROJECT_NAME during deployment.
    const projectName = process.env.PROJECT_NAME || "My Awesome Store";

    // --- Seed Globals (Header & Footer) ---
    console.log("Seeding Globals...");
    await payload.updateGlobal({
      slug: "header",
      data: {
        // Add any nav links you want to pre-populate
        navItems: [],
      },
    });

    await payload.updateGlobal({
      slug: "footer",
      data: {
        // Add only fields that exist in your Footer global config
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
        layout: [
          {
            blockType: "hero", // Example block
            richText: [
              {
                children: [{ text: `Welcome to ${projectName}!` }],
                type: "h1",
              },
              {
                children: [{ text: "Your new e-commerce site is ready to go. Start exploring!" }],
              },
            ],
            links: [],
          },
        ],
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
seed();
