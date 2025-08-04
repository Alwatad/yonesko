# Migration Splitting Scripts

This directory contains scripts to automatically split large PayloadCMS migration files into smaller, manageable chunks.

## Scripts

### 1. `split-migration.js`
Basic migration splitter that splits a large migration file into chunks based on line count.

**Usage:**
```bash
node scripts/split-migration.js <input-file> [lines-per-chunk] [output-dir]
```

**Example:**
```bash
node scripts/split-migration.js src/migrations/large-migration.ts 500
```

### 2. `verify-migration-chunks.js`
Verification script that checks if chunked migrations contain all SQL from the original migration.

**Usage:**
```bash
node scripts/verify-migration-chunks.js <original-file> <chunks-dir>
```

**Example:**
```bash
node scripts/verify-migration-chunks.js src/migrations/large-migration.ts src/migrations
```

## Features

- **Automatic SQL Extraction**: Extracts SQL content from PayloadCMS migration files
- **Configurable Chunk Size**: Set the number of lines per chunk (default: 500)
- **Verification**: Script to verify chunked migrations contain all original SQL
- **Index Generation**: Automatically generates `index.ts` files for the chunks
- **ES Module Support**: Works with modern Node.js ES modules

## Verification

The verification script checks that all SQL from the original migration is preserved in the chunks:

- Compares line counts between original and chunks
- Identifies any missing SQL statements
- Provides detailed error reporting if discrepancies are found

## Workflow

1. **Generate Migration**: Use PayloadCMS to generate a large migration file
   ```bash
   npx payload migrate:create
   ```

2. **Split Migration**: Use the script to split the large file
   ```bash
   node scripts/split-migration.js src/migrations/large-migration.ts
   ```

3. **Verify Chunks**: Verify that all SQL is preserved
   ```bash
   node scripts/verify-migration-chunks.js src/migrations/large-migration.ts src/migrations
   ```

4. **Clean Up**: Remove the original large migration file
   ```bash
   rm src/migrations/large-migration.ts
   ```

## Benefits

- **Reduced Risk**: No manual copying/pasting of SQL statements
- **Consistency**: All chunks follow the same structure
- **Maintainability**: Smaller files are easier to review and modify
- **Automation**: Repeatable process for future migrations

## Notes

- The scripts preserve the original SQL structure
- Down migrations are left as placeholders (you may need to implement them manually)
- The generated index file registers all chunks with PayloadCMS
- Both scripts are safe to run multiple times (they will overwrite existing files)
- The JSON file is kept for PayloadCMS to track the current database schema state 