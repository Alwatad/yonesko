import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing fields to products table
    ALTER TABLE "products" 
    ADD COLUMN IF NOT EXISTS "enable_variants" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "enable_variant_prices" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "enable_variant_weights" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "variants_type" text DEFAULT 'sizes',
    ADD COLUMN IF NOT EXISTS "stock" integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "weight" integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "bought" integer DEFAULT 0;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added fields
    ALTER TABLE "products" 
    DROP COLUMN IF EXISTS "enable_variants",
    DROP COLUMN IF EXISTS "enable_variant_prices",
    DROP COLUMN IF EXISTS "enable_variant_weights",
    DROP COLUMN IF EXISTS "variants_type",
    DROP COLUMN IF EXISTS "stock",
    DROP COLUMN IF EXISTS "weight",
    DROP COLUMN IF EXISTS "bought";
  `);
} 