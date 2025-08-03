import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing description field to products_locales
    ALTER TABLE "products_locales" 
    ADD COLUMN IF NOT EXISTS "description" jsonb;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added description field
    ALTER TABLE "products_locales" 
    DROP COLUMN IF EXISTS "description";
  `);
} 