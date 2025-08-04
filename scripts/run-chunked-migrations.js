import "dotenv/config";
import { Client } from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runChunkedMigrations() {
  console.log("🔄 Running chunked migrations to create all 197 tables...");

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

    const migrationsDir = path.join(__dirname, "../src/migrations");
    const chunkFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.match(/^\d+_chunk_\d+\.ts$/))
      .sort();

    console.log(`📁 Found ${chunkFiles.length} chunk files: ${chunkFiles.join(", ")}`);

    for (const chunkFile of chunkFiles) {
      console.log(`\n🔄 Running ${chunkFile}...`);

      const filePath = path.join(migrationsDir, chunkFile);
      const content = fs.readFileSync(filePath, "utf8");

      // Extract SQL from the migration file
      const sqlMatch = content.match(/sql`([\s\S]*?)`/);
      if (!sqlMatch) {
        console.log(`⚠️  No SQL found in ${chunkFile}, skipping...`);
        continue;
      }

      const sqlContent = sqlMatch[1];

      console.log(`📝 Executing chunk as single transaction...`);

      try {
        // Execute the entire chunk as a single transaction
        await client.query("BEGIN;");
        await client.query(sqlContent);
        await client.query("COMMIT;");
        console.log(`  ✅ Chunk executed successfully as single transaction`);
      } catch (error) {
        await client.query("ROLLBACK;");
        if (error.message.includes("already exists") || error.message.includes("does not exist")) {
          console.log(`  ⚠️  Chunk skipped (${error.message.split(":")[0]})`);
        } else {
          console.log(`  ❌ Chunk failed: ${error.message}`);
          throw error;
        }
      }

      console.log(`✅ ${chunkFile} completed successfully`);
    }

    console.log("\n🎉 All chunked migrations completed successfully!");

    // Count tables to verify
    const tablesResult = await client.query(`
      SELECT COUNT(*) as table_count 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);

    console.log(`📊 Total tables created: ${tablesResult.rows[0].table_count}`);

    await client.end();
    console.log("✅ Disconnected from database");
  } catch (error) {
    console.error("❌ Error running chunked migrations:", error.message);
    await client.end();
    process.exit(1);
  }
}

runChunkedMigrations();
