import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 6: Fix Missing Attribution Column
  await db.execute(sql`
    -- Add missing attribution column to footer_locales
    ALTER TABLE "footer_locales" 
    ADD COLUMN IF NOT EXISTS "attribution" text;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: This migration only adds a column, so the down migration would need to drop it
  // For safety, we'll leave this empty as dropping columns can be dangerous
  console.log("⚠️  Down migration not implemented for safety - column would need to be dropped manually");
}
