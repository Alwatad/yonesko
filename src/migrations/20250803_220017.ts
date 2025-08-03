import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing standard columns to shop_settings_available_currencies
    ALTER TABLE "shop_settings_available_currencies" 
    ADD COLUMN IF NOT EXISTS "parent_id" uuid REFERENCES "shop_settings"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "value" text;

    -- Add missing standard columns to shop_settings_currency_values
    ALTER TABLE "shop_settings_currency_values" 
    ADD COLUMN IF NOT EXISTS "parent_id" uuid REFERENCES "shop_settings"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0;

    -- Copy data from internal columns to standard columns
    UPDATE "shop_settings_available_currencies" 
    SET 
      "parent_id" = "_parent_id",
      "order" = "_order",
      "value" = "currency"
    WHERE "parent_id" IS NULL;

    UPDATE "shop_settings_currency_values" 
    SET 
      "parent_id" = "_parent_id",
      "order" = "_order"
    WHERE "parent_id" IS NULL;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added standard columns
    ALTER TABLE "shop_settings_available_currencies" 
    DROP COLUMN IF EXISTS "parent_id",
    DROP COLUMN IF EXISTS "order",
    DROP COLUMN IF EXISTS "value";

    ALTER TABLE "shop_settings_currency_values" 
    DROP COLUMN IF EXISTS "parent_id",
    DROP COLUMN IF EXISTS "order";
  `);
} 