import { sql, type MigrateUpArgs, type MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create missing enum types for courier countries
    DO $$ BEGIN
      CREATE TYPE "enum_inpost_courier_delivery_zones_countries" AS ENUM (
        'ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "enum_inpost_pickup_delivery_zones_countries" AS ENUM (
        'ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Create missing courier delivery zones countries tables
    CREATE TABLE IF NOT EXISTS "inpost_courier_delivery_zones_countries" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "order" integer NOT NULL,
      "parent_id" varchar NOT NULL,
      "value" "enum_inpost_courier_delivery_zones_countries",
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_pickup_delivery_zones_countries" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "order" integer NOT NULL,
      "parent_id" varchar NOT NULL,
      "value" "enum_inpost_pickup_delivery_zones_countries",
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create missing courier delivery zones free shipping tables
    CREATE TABLE IF NOT EXISTS "inpost_courier_delivery_zones_free_shipping" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "value" numeric,
      "currency" varchar,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_pickup_delivery_zones_free_shipping" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "value" numeric,
      "currency" varchar,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create missing courier delivery zones range tables
    CREATE TABLE IF NOT EXISTS "inpost_courier_delivery_zones_range" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "weight_from" numeric,
      "weight_to" numeric,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_pickup_delivery_zones_range" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "weight_from" numeric,
      "weight_to" numeric,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create missing courier delivery zones range pricing tables
    CREATE TABLE IF NOT EXISTS "inpost_courier_delivery_zones_range_pricing" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "value" numeric,
      "currency" varchar,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_pickup_delivery_zones_range_pricing" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "value" numeric,
      "currency" varchar,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_countries_order_idx" ON "inpost_courier_delivery_zones_countries" ("order");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_countries_parent_idx" ON "inpost_courier_delivery_zones_countries" ("parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_countries_order_idx" ON "inpost_pickup_delivery_zones_countries" ("order");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_countries_parent_idx" ON "inpost_pickup_delivery_zones_countries" ("parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_free_shipping_order_idx" ON "inpost_courier_delivery_zones_free_shipping" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_free_shipping_parent_idx" ON "inpost_courier_delivery_zones_free_shipping" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_free_shipping_order_idx" ON "inpost_pickup_delivery_zones_free_shipping" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_free_shipping_parent_idx" ON "inpost_pickup_delivery_zones_free_shipping" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_range_order_idx" ON "inpost_courier_delivery_zones_range" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_range_parent_idx" ON "inpost_courier_delivery_zones_range" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_range_order_idx" ON "inpost_pickup_delivery_zones_range" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_range_parent_idx" ON "inpost_pickup_delivery_zones_range" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_range_pricing_order_idx" ON "inpost_courier_delivery_zones_range_pricing" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_range_pricing_parent_idx" ON "inpost_courier_delivery_zones_range_pricing" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_range_pricing_order_idx" ON "inpost_pickup_delivery_zones_range_pricing" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_pickup_delivery_zones_range_pricing_parent_idx" ON "inpost_pickup_delivery_zones_range_pricing" ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop indexes first
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_countries_order_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_countries_parent_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_countries_order_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_countries_parent_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_free_shipping_order_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_free_shipping_parent_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_free_shipping_order_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_free_shipping_parent_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_range_order_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_range_parent_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_range_order_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_range_parent_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_range_pricing_order_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_range_pricing_parent_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_range_pricing_order_idx";
    DROP INDEX IF EXISTS "inpost_pickup_delivery_zones_range_pricing_parent_idx";

    -- Drop tables
    DROP TABLE IF EXISTS "inpost_courier_delivery_zones_range_pricing";
    DROP TABLE IF EXISTS "inpost_pickup_delivery_zones_range_pricing";
    DROP TABLE IF EXISTS "inpost_courier_delivery_zones_range";
    DROP TABLE IF EXISTS "inpost_pickup_delivery_zones_range";
    DROP TABLE IF EXISTS "inpost_courier_delivery_zones_free_shipping";
    DROP TABLE IF EXISTS "inpost_pickup_delivery_zones_free_shipping";
    DROP TABLE IF EXISTS "inpost_courier_delivery_zones_countries";
    DROP TABLE IF EXISTS "inpost_pickup_delivery_zones_countries";

    -- Drop enum types
    DROP TYPE IF EXISTS "enum_inpost_courier_delivery_zones_countries";
    DROP TYPE IF EXISTS "enum_inpost_pickup_delivery_zones_countries";
  `);
}
