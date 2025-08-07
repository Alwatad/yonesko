import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// Extend orders-related country enums to include GCC countries used by checkout
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      -- enum_orders_invoice_country
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'sa' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'sa';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'ae' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'ae';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'kw' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'kw';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'qa' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'qa';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'bh' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'bh';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'om' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'om';
      END IF;

      -- enum_orders_shipping_address_country
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'sa' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'sa';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'ae' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'ae';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'kw' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'kw';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'qa' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'qa';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'bh' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'bh';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'om' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'om';
      END IF;
    END $$;
  `);
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // No-op. Removing enum values requires complex operations and data cleanup.
}
