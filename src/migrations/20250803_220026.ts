import { sql, type MigrateUpArgs, type MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create missing enum types for shop_layout
    DO $$ BEGIN
      CREATE TYPE "enum_shop_layout_product_details_type" AS ENUM ('WithImageGalleryExpandableDetails');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "enum_shop_layout_product_list_filters" AS ENUM ('none', 'withSidebar', 'sortOnly');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "enum_shop_layout_cart_and_wishlist_type" AS ENUM ('slideOver');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "enum_shop_layout_checkout_type" AS ENUM ('OneStepWithSummary');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "enum_shop_layout_client_panel_type" AS ENUM ('withSidebar');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Fix shop_layout table - add missing columns
    ALTER TABLE "shop_layout" 
    ADD COLUMN IF NOT EXISTS "product_details_type" "enum_shop_layout_product_details_type" NOT NULL DEFAULT 'WithImageGalleryExpandableDetails',
    ADD COLUMN IF NOT EXISTS "product_details_reviews_enabled" boolean NOT NULL DEFAULT true,
    ADD COLUMN IF NOT EXISTS "product_list_filters" "enum_shop_layout_product_list_filters" NOT NULL DEFAULT 'none',
    ADD COLUMN IF NOT EXISTS "cart_and_wishlist_type" "enum_shop_layout_cart_and_wishlist_type" NOT NULL DEFAULT 'slideOver',
    ADD COLUMN IF NOT EXISTS "checkout_type" "enum_shop_layout_checkout_type" NOT NULL DEFAULT 'OneStepWithSummary',
    ADD COLUMN IF NOT EXISTS "client_panel_type" "enum_shop_layout_client_panel_type" NOT NULL DEFAULT 'withSidebar';

    -- Fix shop_layout_locales table structure
    -- First, create a new table with correct structure
    CREATE TABLE IF NOT EXISTS "shop_layout_locales_new" (
      "id" serial PRIMARY KEY,
      "client_panel_help_title" varchar NOT NULL,
      "client_panel_help_content" jsonb NOT NULL,
      "_locale" text NOT NULL,
      "_parent_id" uuid NOT NULL REFERENCES "shop_layout"("id") ON DELETE CASCADE,
      UNIQUE("_locale", "_parent_id")
    );

    -- Copy data from old table to new table if it exists
    INSERT INTO "shop_layout_locales_new" ("client_panel_help_title", "client_panel_help_content", "_locale", "_parent_id")
    SELECT 
      COALESCE("client_panel_help_title", 'Help') as "client_panel_help_title",
      COALESCE("client_panel_help_content", '[]'::jsonb) as "client_panel_help_content",
      COALESCE("_locale", 'en') as "_locale",
      "_parent_id"
    FROM "shop_layout_locales"
    ON CONFLICT ("_locale", "_parent_id") DO NOTHING;

    -- Drop the old table and rename the new one
    DROP TABLE IF EXISTS "shop_layout_locales";
    ALTER TABLE "shop_layout_locales_new" RENAME TO "shop_layout_locales";

    -- Create indexes for shop_layout_locales
    CREATE INDEX IF NOT EXISTS "shop_layout_locales_locale_parent_id_unique" 
    ON "shop_layout_locales" ("_locale", "_parent_id");

    -- Create foreign key constraint
    ALTER TABLE "shop_layout_locales" 
    ADD CONSTRAINT IF NOT EXISTS "shop_layout_locales_parent_id_fk" 
    FOREIGN KEY ("_parent_id") REFERENCES "shop_layout"("id") ON DELETE CASCADE;

    -- Ensure shop_layout has at least one record
    INSERT INTO "shop_layout" ("id", "product_details_type", "product_details_reviews_enabled", "product_list_filters", "cart_and_wishlist_type", "checkout_type", "client_panel_type")
    VALUES (
      gen_random_uuid(),
      'WithImageGalleryExpandableDetails',
      true,
      'none',
      'slideOver',
      'OneStepWithSummary',
      'withSidebar'
    )
    ON CONFLICT DO NOTHING;

    -- Ensure shop_layout_locales has at least one record for each locale
    INSERT INTO "shop_layout_locales" ("client_panel_help_title", "client_panel_help_content", "_locale", "_parent_id")
    SELECT 
      'Help Center' as "client_panel_help_title",
      '[]'::jsonb as "client_panel_help_content",
      locale_code,
      (SELECT "id" FROM "shop_layout" LIMIT 1)
    FROM (VALUES ('en'), ('pl')) AS locales(locale_code)
    ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove the added columns from shop_layout
    ALTER TABLE "shop_layout" 
    DROP COLUMN IF EXISTS "product_details_type",
    DROP COLUMN IF EXISTS "product_details_reviews_enabled",
    DROP COLUMN IF EXISTS "product_list_filters",
    DROP COLUMN IF EXISTS "cart_and_wishlist_type",
    DROP COLUMN IF EXISTS "checkout_type",
    DROP COLUMN IF EXISTS "client_panel_type";

    -- Drop the enum types
    DROP TYPE IF EXISTS "enum_shop_layout_product_details_type";
    DROP TYPE IF EXISTS "enum_shop_layout_product_list_filters";
    DROP TYPE IF EXISTS "enum_shop_layout_cart_and_wishlist_type";
    DROP TYPE IF EXISTS "enum_shop_layout_checkout_type";
    DROP TYPE IF EXISTS "enum_shop_layout_client_panel_type";

    -- Recreate shop_layout_locales with original structure
    DROP TABLE IF EXISTS "shop_layout_locales";
    CREATE TABLE "shop_layout_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "shop_layout"("id") ON DELETE CASCADE,
      "_locale" text,
      "client_panel_help_title" text,
      "client_panel_help_content" jsonb,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );
  `);
}
