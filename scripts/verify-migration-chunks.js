#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Verifies that chunked migrations contain all SQL from the original migration
 * @param {string} originalFile - Path to the original large migration file
 * @param {string} chunksDir - Directory containing the chunked migration files
 */
function verifyMigrationChunks(originalFile, chunksDir) {
  if (!fs.existsSync(originalFile)) {
    console.error(`Error: Original file ${originalFile} does not exist`);
    process.exit(1);
  }

  if (!fs.existsSync(chunksDir)) {
    console.error(`Error: Chunks directory ${chunksDir} does not exist`);
    process.exit(1);
  }

  // Extract SQL from original file
  const originalContent = fs.readFileSync(originalFile, "utf8");
  const originalSQL = extractSQLFromMigration(originalContent);

  console.log(`Original migration SQL lines: ${originalSQL.length}`);

  // Get all chunk files (exclude index.ts and the original migration file)
  const originalFileName = path.basename(originalFile);
  const chunkFiles = fs
    .readdirSync(chunksDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts" && file !== originalFileName)
    .sort();

  console.log(`Found ${chunkFiles.length} chunk files:`, chunkFiles);

  // Extract SQL from all chunks
  let allChunkSQL = [];
  chunkFiles.forEach((file) => {
    const filePath = path.join(chunksDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const sql = extractSQLFromMigration(content);
    allChunkSQL = allChunkSQL.concat(sql);
    console.log(`${file}: ${sql.length} SQL lines`);
  });

  console.log(`Total chunk SQL lines: ${allChunkSQL.length}`);

  // Compare
  const originalSQLString = originalSQL.join("\n");
  const chunkSQLString = allChunkSQL.join("\n");

  if (originalSQLString === chunkSQLString) {
    console.log("\n✅ VERIFICATION PASSED: All SQL content matches!");
    console.log("The chunked migrations contain exactly the same SQL as the original.");
  } else {
    console.log("\n❌ VERIFICATION FAILED: SQL content does not match!");

    // Find differences
    const originalLines = originalSQL.length;
    const chunkLines = allChunkSQL.length;

    if (originalLines !== chunkLines) {
      console.log(
        `Line count mismatch: Original has ${originalLines} lines, chunks have ${chunkLines} lines`,
      );
    }

    // Check for missing lines
    const missingLines = originalSQL.filter((line) => !chunkSQLString.includes(line.trim()));
    if (missingLines.length > 0) {
      console.log(`\nMissing lines in chunks (${missingLines.length}):`);
      missingLines.slice(0, 10).forEach((line) => console.log(`  - ${line}`));
      if (missingLines.length > 10) {
        console.log(`  ... and ${missingLines.length - 10} more`);
      }
    }
  }
}

function extractSQLFromMigration(content) {
  const lines = content.split("\n");

  // Find the SQL content between the up function
  const upStart = lines.findIndex((line) => line.includes("export async function up"));
  const upEnd = lines.findIndex(
    (line, index) => index > upStart && line.includes("export async function down"),
  );

  if (upStart === -1 || upEnd === -1) {
    return [];
  }

  // Extract the SQL content
  const sqlContent = lines.slice(upStart + 1, upEnd).join("\n");

  // Find the actual SQL statements (between the sql` and `)
  const sqlMatch = sqlContent.match(/sql`([\s\S]*?)`/);
  if (!sqlMatch) {
    return [];
  }

  const sqlStatements = sqlMatch[1].trim();
  return sqlStatements.split("\n").filter((line) => line.trim() !== "");
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Usage: node verify-migration-chunks.js <original-file> <chunks-dir>");
    console.log("Example: node verify-migration-chunks.js src/migrations/20250804_073226.ts src/migrations");
    process.exit(1);
  }

  const originalFile = args[0];
  const chunksDir = args[1];

  verifyMigrationChunks(originalFile, chunksDir);
}

export { verifyMigrationChunks };
