import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Check if enum exists first, if not create it with cash included
  await db.execute(sql`
    DO $$ 
    BEGIN
      -- Check if the enum exists
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_paywalls_paywall') THEN
        -- Create enum with all values including cash
        CREATE TYPE "public"."enum_paywalls_paywall" AS ENUM('stripe', 'autopay', 'p24', 'cash');
      ELSE
        -- Add cash to existing enum if not already present
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'cash' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_paywalls_paywall')) THEN
          ALTER TYPE "public"."enum_paywalls_paywall" ADD VALUE 'cash';
        END IF;
      END IF;
    END $$;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "paywalls" ALTER COLUMN "paywall" SET DATA TYPE text;
  ALTER TABLE "paywalls" ALTER COLUMN "paywall" SET DEFAULT 'stripe'::text;
  DROP TYPE "public"."enum_paywalls_paywall";
  CREATE TYPE "public"."enum_paywalls_paywall" AS ENUM('stripe', 'autopay', 'p24');
  ALTER TABLE "paywalls" ALTER COLUMN "paywall" SET DEFAULT 'stripe'::"public"."enum_paywalls_paywall";
  ALTER TABLE "paywalls" ALTER COLUMN "paywall" SET DATA TYPE "public"."enum_paywalls_paywall" USING "paywall"::"public"."enum_paywalls_paywall";`);
}
