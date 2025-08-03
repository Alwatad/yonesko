import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 7: Fix Missing Hero Type Column
  await db.execute(sql`
    -- Add missing hero_type column to pages table
    ALTER TABLE "pages" 
    ADD COLUMN IF NOT EXISTS "hero_type" text;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: This migration only adds a column, so the down migration would need to drop it
  // For safety, we'll leave this empty as dropping columns can be dangerous
  console.log("⚠️  Down migration not implemented for safety - column would need to be dropped manually");
}
