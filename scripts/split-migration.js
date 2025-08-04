#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function splitMigration(inputFile, chunkSize = 300) {
  console.log(`Splitting migration file: ${inputFile}`);
  console.log(`Chunk size: ${chunkSize} lines`);

  // Read the input file
  const content = fs.readFileSync(inputFile, "utf8");

  // Extract the SQL content from the template literal
  let sqlContent;
  const sqlMatch = content.match(/await db\.execute\(sql`([\s\S]*?)`\);/);
  if (!sqlMatch) {
    // Try alternative pattern
    const altMatch = content.match(/sql`([\s\S]*?)`/);
    if (!altMatch) {
      throw new Error("Could not find SQL content in migration file");
    }
    sqlContent = altMatch[1];
  } else {
    sqlContent = sqlMatch[1];
  }

  // Split SQL into individual statements
  const statements = [];
  let currentStatement = "";
  let parenCount = 0;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < sqlContent.length; i++) {
    const char = sqlContent[i];
    const nextChar = sqlContent[i + 1] || "";

    // Handle string literals
    if ((char === "'" || char === '"') && !inString) {
      inString = true;
      stringChar = char;
    } else if (char === stringChar && inString) {
      // Check for escaped quotes
      if (nextChar !== stringChar) {
        inString = false;
        stringChar = "";
      }
    }

    // Count parentheses only when not in a string
    if (!inString) {
      if (char === "(") parenCount++;
      if (char === ")") parenCount--;
    }

    currentStatement += char;

    // End of statement: semicolon with balanced parentheses
    if (char === ";" && parenCount === 0 && !inString) {
      statements.push(currentStatement.trim());
      currentStatement = "";
    }
  }

  // Add any remaining content
  if (currentStatement.trim()) {
    statements.push(currentStatement.trim());
  }

  console.log(`Found ${statements.length} SQL statements`);

  // Group statements into chunks based on line count
  const chunks = [];
  let currentChunk = [];
  let currentLineCount = 0;

  for (const statement of statements) {
    const statementLines = statement.split("\n").length;

    // If adding this statement would exceed chunk size, start a new chunk
    if (currentLineCount + statementLines > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentLineCount = 0;
    }

    currentChunk.push(statement);
    currentLineCount += statementLines;
  }

  // Add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  // Ensure we don't have chunks that are too large
  const maxChunkSize = chunkSize * 2; // Allow some flexibility
  const finalChunks = [];

  for (const chunk of chunks) {
    const chunkLines = chunk.join("\n").split("\n").length;

    if (chunkLines > maxChunkSize) {
      // Split this chunk further
      const subChunks = [];
      let subChunk = [];
      let subChunkLines = 0;

      for (const statement of chunk) {
        const statementLines = statement.split("\n").length;

        if (subChunkLines + statementLines > chunkSize && subChunk.length > 0) {
          subChunks.push(subChunk);
          subChunk = [];
          subChunkLines = 0;
        }

        subChunk.push(statement);
        subChunkLines += statementLines;
      }

      if (subChunk.length > 0) {
        subChunks.push(subChunk);
      }

      finalChunks.push(...subChunks);
    } else {
      finalChunks.push(chunk);
    }
  }

  console.log(`Created ${finalChunks.length} chunks`);

  // Generate chunk files
  const chunksDir = path.dirname(inputFile);
  const baseName = path.basename(inputFile, ".ts");

  finalChunks.forEach((chunk, index) => {
    const chunkNumber = (index + 1).toString().padStart(3, "0");
    const chunkFileName = `${chunkNumber}_chunk_${index + 1}.ts`;
    const chunkPath = path.join(chunksDir, chunkFileName);

    const chunkContent = `import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql\`
${chunk.join("\n\n")}
  \`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // This chunk's down migration would drop the tables created in this chunk
  // For now, we'll leave it as a placeholder since this is a partial migration
  console.log('Down migration for chunk ${index + 1} - would drop tables created in this chunk');
}
`;

    fs.writeFileSync(chunkPath, chunkContent);
    console.log(`Created chunk ${chunkNumber}: ${chunkFileName}`);
  });

  // Generate index file
  const indexContent = generateIndexFile(finalChunks.length);
  const indexPath = path.join(chunksDir, "index.ts");
  fs.writeFileSync(indexPath, indexContent);
  console.log(`Created index file: ${indexPath}`);

  console.log(`\nTotal chunks created: ${finalChunks.length}`);
}

function generateIndexFile(chunkCount) {
  const imports = [];
  const migrations = [];

  for (let i = 1; i <= chunkCount; i++) {
    const chunkNumber = i.toString().padStart(3, "0");
    imports.push(
      `import { up as up${chunkNumber}, down as down${chunkNumber} } from "./${chunkNumber}_chunk_${i}";`,
    );
    migrations.push(`  {
    name: "chunk_${chunkNumber}",
    up: up${chunkNumber},
    down: down${chunkNumber},
  },`);
  }

  return `${imports.join("\n")}

export const migrations = [
${migrations.join("\n")}
];
`;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const inputFile = process.argv[2];
  const chunkSize = parseInt(process.argv[3]) || 300;

  if (!inputFile) {
    console.error("Usage: node split-migration.js <input-file> [chunk-size]");
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
  }

  splitMigration(inputFile, chunkSize);
}

export { splitMigration };
