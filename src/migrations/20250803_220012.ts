import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing locale columns to shop_layout_locales
    ALTER TABLE "shop_layout_locales" 
    ADD COLUMN IF NOT EXISTS "client_panel_help_title" text,
    ADD COLUMN IF NOT EXISTS "client_panel_help_content" jsonb;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added columns
    ALTER TABLE "shop_layout_locales" 
    DROP COLUMN IF EXISTS "client_panel_help_title",
    DROP COLUMN IF EXISTS "client_panel_help_content";
  `);
}
