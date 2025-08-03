import { sql, type MigrateUpArgs, type MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create the missing inpost_courier_delivery_zones table
    CREATE TABLE IF NOT EXISTS "inpost_courier_delivery_zones" (
      "id" varchar PRIMARY KEY,
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "created_at" timestamp(3) DEFAULT now(),
      "updated_at" timestamp(3) DEFAULT now()
    );

    -- Create indexes
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_order_idx" ON "inpost_courier_delivery_zones" ("_order");
    CREATE INDEX IF NOT EXISTS "inpost_courier_delivery_zones_parent_idx" ON "inpost_courier_delivery_zones" ("_parent_id");

    -- Create foreign key constraint
    DO $$ BEGIN
      ALTER TABLE "inpost_courier_delivery_zones"
      ADD CONSTRAINT "inpost_courier_delivery_zones_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "inpost_courier"("id") ON DELETE CASCADE;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop foreign key constraint
    ALTER TABLE "inpost_courier_delivery_zones"
    DROP CONSTRAINT IF EXISTS "inpost_courier_delivery_zones_parent_id_fk";

    -- Drop indexes
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_order_idx";
    DROP INDEX IF EXISTS "inpost_courier_delivery_zones_parent_idx";

    -- Drop table
    DROP TABLE IF EXISTS "inpost_courier_delivery_zones";
  `);
} 