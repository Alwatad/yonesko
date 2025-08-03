import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing enable_o_auth column to shop_settings
    ALTER TABLE "shop_settings" 
    ADD COLUMN IF NOT EXISTS "enable_o_auth" boolean DEFAULT false;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added enable_o_auth column
    ALTER TABLE "shop_settings" 
    DROP COLUMN IF EXISTS "enable_o_auth";
  `);
} 