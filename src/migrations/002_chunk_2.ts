import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );

CREATE TABLE "pages_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" uuid,
  	"enable_intro" boolean,
  	"block_name" varchar
  );

CREATE TABLE "pages_blocks_form_block_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

CREATE TABLE "pages_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_carousel_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_carousel_slides_link_appearance" DEFAULT 'default'
  );

CREATE TABLE "pages_blocks_carousel_slides_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

CREATE TABLE "pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_carousel_type" DEFAULT 'default',
  	"autoplay" numeric,
  	"spacing_bottom" "enum_pages_blocks_carousel_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum_pages_blocks_carousel_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum_pages_blocks_carousel_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_carousel_padding_top" DEFAULT 'medium',
  	"block_name" varchar
  );

CREATE TABLE "pages_blocks_carousel_locales" (
  	"title" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

CREATE TABLE "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

CREATE TABLE "pages_blocks_accordion_items_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing_bottom" "enum_pages_blocks_accordion_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum_pages_blocks_accordion_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum_pages_blocks_accordion_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_accordion_padding_top" DEFAULT 'medium',
  	"block_name" varchar
  );

CREATE TABLE "pages_blocks_accordion_locales" (
  	"title" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  `);
}

  // The complete down migration should be handled by the full migration system.
  // You may need to manually implement the down migration for this chunk.
}
--
CREATE TABLE "pages_blocks_hotspot_zone" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_hotspot_zone_type" DEFAULT 'category',
  	"appearance" "enum_pages_blocks_hotspot_zone_appearance" DEFAULT 'default',
  	"category_id" uuid,
  	"subcategory_id" uuid,
  	"sort" "enum_pages_blocks_hotspot_zone_sort",
  	"limit" numeric DEFAULT 4,
  	"spacing_bottom" "enum_pages_blocks_hotspot_zone_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum_pages_blocks_hotspot_zone_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum_pages_blocks_hotspot_zone_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_hotspot_zone_padding_top" DEFAULT 'medium',
  	"block_name" varchar
  );

CREATE TABLE "pages_blocks_hotspot_zone_locales" (
  	"title" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_media_id" uuid,
  	"hero_reversed" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );

CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_rich_text" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" uuid,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"categories_id" uuid,
  	"products_id" uuid
  );

CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );

CREATE TABLE "_pages_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );

CREATE TABLE "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"spacing_bottom" "enum__pages_v_blocks_cta_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum__pages_v_blocks_cta_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum__pages_v_blocks_cta_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum__pages_v_blocks_cta_padding_top" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );

CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"enable_prose" boolean DEFAULT true,
  	"padding_bottom" "enum__pages_v_blocks_content_columns_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum__pages_v_blocks_content_columns_padding_top" DEFAULT 'medium',
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"background" varchar,
  	"_uuid" varchar
  );

CREATE TABLE "_pages_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alignment" "enum__pages_v_blocks_content_alignment" DEFAULT 'center',
  	"spacing_bottom" "enum__pages_v_blocks_content_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum__pages_v_blocks_content_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum__pages_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum__pages_v_blocks_content_padding_top" DEFAULT 'medium',
  	"radius" boolean DEFAULT false,
  	"specified_radius" boolean DEFAULT false,
  	"radius_all" "enum__pages_v_blocks_content_radius_all" DEFAULT 'rounded-none',
  	"radius_top_left" "enum__pages_v_blocks_content_radius_top_left" DEFAULT 'rounded-tl-none',
  	"radius_top_right" "enum__pages_v_blocks_content_radius_top_right" DEFAULT 'rounded-tr-none',
  	"radius_bottom_left" "enum__pages_v_blocks_content_radius_bottom_left" DEFAULT 'rounded-bl-none',
  	"radius_bottom_right" "enum__pages_v_blocks_content_radius_bottom_right" DEFAULT 'rounded-br-none',
  	"background" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"media_id" uuid,
  	"spacing_bottom" "enum__pages_v_blocks_media_block_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum__pages_v_blocks_media_block_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum__pages_v_blocks_media_block_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum__pages_v_blocks_media_block_padding_top" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );

CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );

CREATE TABLE "_pages_v_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"form_id" uuid,
  	"enable_intro" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );

CREATE TABLE "_pages_v_blocks_form_block_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_carousel_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_carousel_slides_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );

CREATE TABLE "_pages_v_blocks_carousel_slides_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum__pages_v_blocks_carousel_type" DEFAULT 'default',
  	"autoplay" numeric,
  	"spacing_bottom" "enum__pages_v_blocks_carousel_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum__pages_v_blocks_carousel_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum__pages_v_blocks_carousel_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum__pages_v_blocks_carousel_padding_top" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );

CREATE TABLE "_pages_v_blocks_carousel_locales" (
  	"title" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

CREATE TABLE "_pages_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );

CREATE TABLE "_pages_v_blocks_accordion_items_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // This chunk's down migration would drop the tables created in this chunk
  // For now, we'll leave it as a placeholder since this is a partial migration
  console.log('Down migration for chunk 2 - would drop tables created in this chunk');
}