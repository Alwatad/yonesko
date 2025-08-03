import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing title and content fields to products_details_locales
    ALTER TABLE "products_details_locales" 
    ADD COLUMN IF NOT EXISTS "title" text,
    ADD COLUMN IF NOT EXISTS "content" jsonb;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added fields
    ALTER TABLE "products_details_locales" 
    DROP COLUMN IF EXISTS "title",
    DROP COLUMN IF EXISTS "content";
  `);
} 