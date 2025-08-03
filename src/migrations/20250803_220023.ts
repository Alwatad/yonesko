import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing label field to products_colors_locales
    ALTER TABLE "products_colors_locales" 
    ADD COLUMN IF NOT EXISTS "label" text;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added label field
    ALTER TABLE "products_colors_locales" 
    DROP COLUMN IF EXISTS "label";
  `);
} 