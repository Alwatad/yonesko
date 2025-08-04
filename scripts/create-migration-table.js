import "dotenv/config";
import { Client } from "pg";

async function createMigrationTable() {
  console.log("🔄 Creating payload_migrations table...");

  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

  try {
    await client.connect();
    console.log("✅ Connected to database");

    // Create the payload_migrations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "payload_migrations" (
        "id" serial PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        "batch" integer NOT NULL,
        "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Created payload_migrations table");

    await client.end();
    console.log("✅ Disconnected from database");
  } catch (error) {
    console.error("❌ Error creating migration table:", error.message);
    await client.end();
    process.exit(1);
  }
}

createMigrationTable();
