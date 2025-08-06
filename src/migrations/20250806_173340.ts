import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_categories" ADD COLUMN "parent_id" uuid;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "product_categories_parent_idx" ON "product_categories" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_parent_id_product_categories_id_fk";
  
  DROP INDEX "product_categories_parent_idx";
  ALTER TABLE "product_categories" DROP COLUMN "parent_id";`)
}
