import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

// Minimal migration: allow 'sa' for Orders invoice/shipping country enums
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      -- Add 'sa' to orders invoice country enum if missing
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'sa' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_invoice_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'sa';
      END IF;

      -- Add 'sa' to orders shipping address country enum if missing
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'sa' 
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_orders_shipping_address_country')
      ) THEN
        ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'sa';
      END IF;
    END $$;
  `);
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // No-op: removing enum values is destructive; keep forward-only
}
