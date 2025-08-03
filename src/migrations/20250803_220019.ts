import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing hero_image_id column to posts
    ALTER TABLE "posts" 
    ADD COLUMN IF NOT EXISTS "hero_image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added hero_image_id column
    ALTER TABLE "posts" 
    DROP COLUMN IF EXISTS "hero_image_id";
  `);
} 