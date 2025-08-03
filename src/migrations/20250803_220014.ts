import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Add missing radius columns to all block tables
    ALTER TABLE "pages_blocks_content" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_cta" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_media_block" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_carousel" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_archive" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_accordion" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_form_block" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_hotspot_zone" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_hero" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_code" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';

    ALTER TABLE "pages_blocks_related_posts" 
    ADD COLUMN IF NOT EXISTS "radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "specified_radius" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "radius_all" text DEFAULT 'rounded-none',
    ADD COLUMN IF NOT EXISTS "radius_top_left" text DEFAULT 'rounded-tl-none',
    ADD COLUMN IF NOT EXISTS "radius_top_right" text DEFAULT 'rounded-tr-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_left" text DEFAULT 'rounded-bl-none',
    ADD COLUMN IF NOT EXISTS "radius_bottom_right" text DEFAULT 'rounded-br-none';
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    -- Remove the added radius columns
    ALTER TABLE "pages_blocks_content" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_cta" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_media_block" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_carousel" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_archive" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_accordion" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_form_block" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_hotspot_zone" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_hero" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_code" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";

    ALTER TABLE "pages_blocks_related_posts" 
    DROP COLUMN IF EXISTS "radius",
    DROP COLUMN IF EXISTS "specified_radius",
    DROP COLUMN IF EXISTS "radius_all",
    DROP COLUMN IF EXISTS "radius_top_left",
    DROP COLUMN IF EXISTS "radius_top_right",
    DROP COLUMN IF EXISTS "radius_bottom_left",
    DROP COLUMN IF EXISTS "radius_bottom_right";
  `);
}
