import { type MigrateUpArgs, type MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ 
    BEGIN
      -- Add GCC countries to delivery zone enums
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'sa' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_pickup_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'sa';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'ae' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_pickup_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'ae';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'kw' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_pickup_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'kw';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'qa' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_pickup_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'qa';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'bh' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_pickup_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'bh';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'om' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_pickup_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'om';
      END IF;

      -- Add to courier delivery zones
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'sa' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_courier_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'sa';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'ae' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_courier_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'ae';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'kw' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_courier_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'kw';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'qa' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_courier_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'qa';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'bh' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_courier_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'bh';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'om' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_inpost_courier_delivery_zones_countries')) THEN
        ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'om';
      END IF;

      -- Add to other country enums
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'sa' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_customers_shippings_country')) THEN
        ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'sa';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'ae' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_customers_shippings_country')) THEN
        ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'ae';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'kw' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_customers_shippings_country')) THEN
        ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'kw';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'qa' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_customers_shippings_country')) THEN
        ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'qa';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'bh' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_customers_shippings_country')) THEN
        ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'bh';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'om' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_customers_shippings_country')) THEN
        ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'om';
      END IF;
    END $$;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Removing enum values is complex, so we'll leave this empty for now
  // In production, you would need to remove any data using these values first
}
