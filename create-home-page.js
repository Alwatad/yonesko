import { getPayload } from "payload";
import config from "./src/payload.config.ts";

const DATABASE_URI =
  "postgresql://postgres.qlbmivkyeijvlktgitvk:KM33nh3mwatd@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=no-verify";

async function createHomePage() {
  const payload = await getPayload({
    config,
    options: {
      databaseURL: DATABASE_URI,
    },
  });

  try {
    // Check if home page already exists
    const existingPage = await payload.find({
      collection: "pages",
      where: {
        slug: { equals: "home" },
      },
    });

    if (existingPage.docs.length === 0) {
      // Create home page
      await payload.create({
        collection: "pages",
        data: {
          title: "Home",
          slug: "home",
          meta: {
            title: "Home",
          },
          layout: [],
        },
      });
      console.log("✅ Home page created successfully!");
    } else {
      console.log("✅ Home page already exists!");
    }
  } catch (error) {
    console.error("❌ Error creating home page:", error);
  } finally {
    await payload.destroy();
  }
}

createHomePage();
