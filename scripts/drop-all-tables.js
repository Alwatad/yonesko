import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Client } from "pg";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function dropAllTables() {
  console.log("🔄 Connecting to database and dropping all tables...");

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

    // Disable foreign key checks temporarily
    await client.query("SET session_replication_role = replica;");

    // Get all table names
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename != '__drizzle_migrations'
    `);

    const tables = tablesResult.rows.map((row) => row.tablename);
    console.log(`📋 Found ${tables.length} tables to drop`);

    // Drop all tables
    for (const table of tables) {
      console.log(`🗑️  Dropping table: ${table}`);
      await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
    }

    // Get all type names
    const typesResult = await client.query(`
      SELECT typname FROM pg_type 
      WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      AND typname NOT LIKE 'pg_%'
    `);

    const types = typesResult.rows.map((row) => row.typname);
    console.log(`📋 Found ${types.length} types to drop`);

    // Drop all types (handle dependencies)
    for (const type of types) {
      try {
        console.log(`🗑️  Dropping type: ${type}`);
        await client.query(`DROP TYPE IF EXISTS "${type}" CASCADE;`);
      } catch (error) {
        console.log(`⚠️  Could not drop type ${type}: ${error.message}`);
      }
    }

    // Re-enable foreign key checks
    await client.query("SET session_replication_role = DEFAULT;");

    // Clear migration tracking table
    await client.query('DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE;');

    console.log("✅ Successfully dropped all tables and types!");
    console.log(`🗑️  Dropped ${tables.length} tables and ${types.length} types`);
  } catch (error) {
    console.error("❌ Error dropping tables:", error.message);
    throw error;
  } finally {
    await client.end();
    console.log("🔌 Database connection closed");
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  dropAllTables()
    .then(() => {
      console.log("🎉 All tables dropped successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Failed to drop tables:", error);
      process.exit(1);
    });
}

export { dropAllTables };
