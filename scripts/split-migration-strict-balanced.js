#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function splitMigrationBalanced(inputFile, minLines = 550, maxLines = 600) {
  console.log(`Splitting migration file: ${inputFile}`);
  console.log(`Target lines per chunk: ${minLines}-${maxLines}`);

  // Read the input file
  const content = fs.readFileSync(inputFile, "utf8");
  const lines = content.split("\n");

  console.log(`Total lines: ${lines.length}`);

  // Extract the SQL content from the template literal
  let sqlContent;
  const sqlMatch = content.match(/await db\.execute\(sql\`([\s\S]*?)\`\);/);
  if (!sqlMatch) {
    const altMatch = content.match(/sql\`([\s\S]*?)\`/);
    if (!altMatch) {
      throw new Error("Could not find SQL content in migration file");
    }
    sqlContent = altMatch[1];
  } else {
    sqlContent = sqlMatch[1];
  }

  const sqlLines = sqlContent.split("\n");
  console.log(`SQL lines: ${sqlLines.length}`);

  // Calculate optimal number of chunks
  const totalLines = sqlLines.length;
  const optimalChunks = Math.ceil(totalLines / minLines);
  console.log(`Optimal number of chunks: ${optimalChunks}`);

  // Create chunks with smart SQL boundary detection
  const chunks = [];
  let currentChunk = [];
  let currentLineCount = 0;
  let parenCount = 0;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < sqlLines.length; i++) {
    const line = sqlLines[i];
    const nextLine = sqlLines[i + 1] || "";

    // Count parentheses and track string literals
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const nextChar = line[j + 1] || "";

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
    }

    currentChunk.push(line);
    currentLineCount++;

    // Check if we should end this chunk
    const isEndOfStatement = line.trim().endsWith(";") && parenCount === 0 && !inString;
    const isChunkFull = currentLineCount >= minLines;
    const isLastLine = i === sqlLines.length - 1;
    const remainingLines = sqlLines.length - (i + 1);
    const wouldLeaveSmallLastChunk = remainingLines > 0 && remainingLines < minLines;

    // End chunk if:
    // 1. We're at a statement end AND chunk is full enough OR
    // 2. We're at the last line OR
    // 3. Current chunk is getting too big
    if (
      (isEndOfStatement && isChunkFull && !wouldLeaveSmallLastChunk) ||
      isLastLine ||
      currentLineCount >= maxLines
    ) {
      chunks.push(currentChunk.join("\n"));
      currentChunk = [];
      currentLineCount = 0;
      parenCount = 0;
      inString = false;
      stringChar = "";
    }
  }

  // Add any remaining content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join("\n"));
  }

  console.log(`Created ${chunks.length} chunks`);

  // Generate chunk files
  const chunksDir = path.dirname(inputFile);

  // Delete existing chunk files
  const existingFiles = fs.readdirSync(chunksDir);
  const chunkFiles = existingFiles.filter((file) => file.match(/^\d+_chunk_\d+\.ts$/));
  for (const file of chunkFiles) {
    fs.unlinkSync(path.join(chunksDir, file));
    console.log(`Deleted existing chunk file: ${file}`);
  }

  // Create new chunk files
  chunks.forEach((chunk, index) => {
    const chunkNumber = (index + 1).toString().padStart(3, "0");
    const chunkFileName = `${chunkNumber}_chunk_${index + 1}.ts`;
    const chunkPath = path.join(chunksDir, chunkFileName);

    const chunkContent = `import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql\`
${chunk}
  \`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // This chunk's down migration would drop the tables created in this chunk
  // For now, we'll leave it as a placeholder since this is a partial migration
  console.log('Down migration for chunk ${index + 1} - would drop tables created in this chunk');
}
`;

    fs.writeFileSync(chunkPath, chunkContent);
    console.log(`Created chunk ${chunkNumber}: ${chunkFileName} (${chunk.split("\n").length} lines)`);
  });

  // Generate index file
  const indexContent = generateIndexFile(chunks.length);
  const indexPath = path.join(chunksDir, "index.ts");
  fs.writeFileSync(indexPath, indexContent);
  console.log(`Created index file: ${indexPath}`);

  console.log(`\nTotal chunks created: ${chunks.length}`);
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
  const minLines = parseInt(process.argv[3]) || 550;
  const maxLines = parseInt(process.argv[4]) || 600;

  if (!inputFile) {
    console.error("Usage: node split-migration-strict-balanced.js <input-file> [min-lines] [max-lines]");
    process.exit(1);
  }

  splitMigrationBalanced(inputFile, minLines, maxLines);
}

export { splitMigrationBalanced };
