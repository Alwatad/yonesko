import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // FINAL MIGRATION: Add Missing Alignment Column to Block Tables
  await db.execute(sql`
    -- Add missing alignment column to block tables
    ALTER TABLE "pages_blocks_content" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_cta" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_media_block" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_carousel" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_accordion" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_form_block" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_hotspot_zone" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_hero" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_code" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "pages_blocks_related_posts" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    -- Add alignment to version block tables
    ALTER TABLE "_pages_v_blocks_content" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_cta" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_media_block" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_carousel" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_accordion" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_form_block" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_hotspot_zone" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_code" 
    ADD COLUMN IF NOT EXISTS "alignment" text;

    ALTER TABLE "_pages_v_blocks_related_posts" 
    ADD COLUMN IF NOT EXISTS "alignment" text;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: This migration only adds columns, so the down migration would need to drop them
  // For safety, we'll leave this empty as dropping columns can be dangerous
  console.log("⚠️  Down migration not implemented for safety - columns would need to be dropped manually");
}
