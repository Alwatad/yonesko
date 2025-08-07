import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_paywalls_paywall" ADD VALUE 'cash';`);
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
