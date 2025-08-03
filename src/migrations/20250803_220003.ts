import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 4: Remaining Tables (~53 tables)
  await db.execute(sql`
    -- Ecommerce tables
    CREATE TABLE IF NOT EXISTS "product_reviews" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "product" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "rating" integer,
      "comment" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "orders_products" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "orders"("id") ON DELETE CASCADE,
      "_order" integer,
      "product" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "quantity" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "customers_shippings" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "customers"("id") ON DELETE CASCADE,
      "_order" integer,
      "address" text,
      "city" text,
      "state" text,
      "zip" text,
      "country" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "customers_sessions" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "customers"("id") ON DELETE CASCADE,
      "_order" integer,
      "session_id" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "administrators_sessions" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "administrators"("id") ON DELETE CASCADE,
      "_order" integer,
      "session_id" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Shop settings tables
    CREATE TABLE IF NOT EXISTS "shop_settings_available_currencies" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "shop_settings"("id") ON DELETE CASCADE,
      "_order" integer,
      "currency" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "shop_settings_currency_values" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "shop_settings"("id") ON DELETE CASCADE,
      "_order" integer,
      "currency" text,
      "value" decimal(10,2),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "shop_layout_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "shop_layout"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- PayloadCMS system tables
    CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "collection" text,
      "document_id" uuid,
      "user_id" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "payload_preferences"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "payload_jobs" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text,
      "data" jsonb,
      "status" text DEFAULT 'pending',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "job_id" uuid REFERENCES "payload_jobs"("id") ON DELETE CASCADE,
      "message" text,
      "level" text,
      "created_at" timestamp with time zone DEFAULT now()
    );

    -- Version tables for PayloadCMS
    CREATE TABLE IF NOT EXISTS "_pages_v" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "version" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_posts_v" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "version" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_posts_v"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "_posts_v"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "version" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Page blocks tables
    CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'hero',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'content',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_content"("id") ON DELETE CASCADE,
      "_order" integer,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_content_columns"("id") ON DELETE CASCADE,
      "_locale" text,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'cta',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cta_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_cta"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_cta"("id") ON DELETE CASCADE,
      "_order" integer,
      "link_type" text,
      "link_new_tab" boolean DEFAULT false,
      "link_url" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_cta_links"("id") ON DELETE CASCADE,
      "_locale" text,
      "link_label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'mediaBlock',
      "media" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_media_block_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_media_block"("id") ON DELETE CASCADE,
      "_locale" text,
      "caption" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_carousel" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'carousel',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_carousel"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_slides" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_carousel"("id") ON DELETE CASCADE,
      "_order" integer,
      "media" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_slides_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_carousel_slides"("id") ON DELETE CASCADE,
      "_locale" text,
      "caption" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_archive" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'archive',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_archive_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_archive"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_accordion" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'accordion',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_accordion_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_accordion"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_accordion_items" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_accordion"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_accordion_items_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_accordion_items"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'formBlock',
      "form" uuid REFERENCES "forms"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_form_block_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_form_block"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_hotspot_zone" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'hotspot',
      "media" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_hotspot_zone_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_hotspot_zone"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Version tables for blocks
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'content',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_content"("id") ON DELETE CASCADE,
      "_order" integer,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_content_columns"("id") ON DELETE CASCADE,
      "_locale" text,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'cta',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_cta"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_cta"("id") ON DELETE CASCADE,
      "_order" integer,
      "link_type" text,
      "link_new_tab" boolean DEFAULT false,
      "link_url" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_cta_links"("id") ON DELETE CASCADE,
      "_locale" text,
      "link_label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'mediaBlock',
      "media" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'archive',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_archive"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'carousel',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_carousel"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_slides" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_carousel"("id") ON DELETE CASCADE,
      "_order" integer,
      "media" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_slides_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_carousel_slides"("id") ON DELETE CASCADE,
      "_locale" text,
      "caption" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_accordion" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'accordion',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_accordion_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_accordion"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_accordion_items" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_accordion"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_accordion_items_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_accordion_items"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "content" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'formBlock',
      "form" uuid REFERENCES "forms"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_form_block"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hotspot_zone" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'hotspot',
      "media" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hotspot_zone_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_hotspot_zone"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "link_type" text,
      "link_new_tab" boolean DEFAULT false,
      "link_url" text,
      "link_appearance" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_version_hero_links"("id") ON DELETE CASCADE,
      "_locale" text,
      "link_label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "meta_title" text,
      "meta_description" text,
      "meta_image_id" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_posts_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "relationTo" text,
      "value" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_details" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_details_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v_version_details"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_colors" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_colors_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v_version_colors"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_sizes" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_sizes_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v_version_sizes"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_variants" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_variants_pricing" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v_version_variants"("id") ON DELETE CASCADE,
      "value" decimal(10,2),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_categories_arr" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "category" uuid REFERENCES "product_categories"("id") ON DELETE CASCADE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_products_v_version_pricing" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_products_v"("id") ON DELETE CASCADE,
      "value" decimal(10,2),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop remaining tables in reverse order
  await db.execute(sql`
    DROP TABLE IF EXISTS "_products_v_version_pricing";
    DROP TABLE IF EXISTS "_products_v_version_categories_arr";
    DROP TABLE IF EXISTS "_products_v_version_variants_pricing";
    DROP TABLE IF EXISTS "_products_v_version_variants";
    DROP TABLE IF EXISTS "_products_v_version_sizes_locales";
    DROP TABLE IF EXISTS "_products_v_version_sizes";
    DROP TABLE IF EXISTS "_products_v_version_colors_locales";
    DROP TABLE IF EXISTS "_products_v_version_colors";
    DROP TABLE IF EXISTS "_products_v_version_details_locales";
    DROP TABLE IF EXISTS "_products_v_version_details";
    DROP TABLE IF EXISTS "_posts_v_version_populated_authors";
    DROP TABLE IF EXISTS "_pages_v_locales";
    DROP TABLE IF EXISTS "_pages_v_version_hero_links_locales";
    DROP TABLE IF EXISTS "_pages_v_version_hero_links";
    DROP TABLE IF EXISTS "_pages_v_blocks_hotspot_zone_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_hotspot_zone";
    DROP TABLE IF EXISTS "_pages_v_blocks_form_block_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_form_block";
    DROP TABLE IF EXISTS "_pages_v_blocks_accordion_items_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_accordion_items";
    DROP TABLE IF EXISTS "_pages_v_blocks_accordion_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_accordion";
    DROP TABLE IF EXISTS "_pages_v_blocks_carousel_slides_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_carousel_slides";
    DROP TABLE IF EXISTS "_pages_v_blocks_carousel_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_carousel";
    DROP TABLE IF EXISTS "_pages_v_blocks_archive_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_archive";
    DROP TABLE IF EXISTS "_pages_v_blocks_media_block";
    DROP TABLE IF EXISTS "_pages_v_blocks_cta_links_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_cta_links";
    DROP TABLE IF EXISTS "_pages_v_blocks_cta_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_cta";
    DROP TABLE IF EXISTS "_pages_v_blocks_content_columns_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_content_columns";
    DROP TABLE IF EXISTS "_pages_v_blocks_content";
    DROP TABLE IF EXISTS "pages_blocks_hotspot_zone_locales";
    DROP TABLE IF EXISTS "pages_blocks_hotspot_zone";
    DROP TABLE IF EXISTS "pages_blocks_form_block_locales";
    DROP TABLE IF EXISTS "pages_blocks_form_block";
    DROP TABLE IF EXISTS "pages_blocks_accordion_items_locales";
    DROP TABLE IF EXISTS "pages_blocks_accordion_items";
    DROP TABLE IF EXISTS "pages_blocks_accordion_locales";
    DROP TABLE IF EXISTS "pages_blocks_accordion";
    DROP TABLE IF EXISTS "pages_blocks_archive_locales";
    DROP TABLE IF EXISTS "pages_blocks_archive";
    DROP TABLE IF EXISTS "pages_blocks_carousel_slides_locales";
    DROP TABLE IF EXISTS "pages_blocks_carousel_slides";
    DROP TABLE IF EXISTS "pages_blocks_carousel_locales";
    DROP TABLE IF EXISTS "pages_blocks_carousel";
    DROP TABLE IF EXISTS "pages_blocks_form_block_locales";
    DROP TABLE IF EXISTS "pages_blocks_form_block";
    DROP TABLE IF EXISTS "pages_blocks_media_block_locales";
    DROP TABLE IF EXISTS "pages_blocks_media_block";
    DROP TABLE IF EXISTS "pages_blocks_cta_links_locales";
    DROP TABLE IF EXISTS "pages_blocks_cta_links";
    DROP TABLE IF EXISTS "pages_blocks_cta_locales";
    DROP TABLE IF EXISTS "pages_blocks_cta";
    DROP TABLE IF EXISTS "pages_blocks_content_columns_locales";
    DROP TABLE IF EXISTS "pages_blocks_content_columns";
    DROP TABLE IF EXISTS "pages_blocks_content";
    DROP TABLE IF EXISTS "pages_blocks_hero";
    DROP TABLE IF EXISTS "_products_v_rels";
    DROP TABLE IF EXISTS "_products_v_locales";
    DROP TABLE IF EXISTS "_products_v";
    DROP TABLE IF EXISTS "_posts_v_rels";
    DROP TABLE IF EXISTS "_posts_v_locales";
    DROP TABLE IF EXISTS "_posts_v";
    DROP TABLE IF EXISTS "_pages_v_rels";
    DROP TABLE IF EXISTS "_pages_v_locales";
    DROP TABLE IF EXISTS "_pages_v";
    DROP TABLE IF EXISTS "payload_jobs_log";
    DROP TABLE IF EXISTS "payload_jobs";
    DROP TABLE IF EXISTS "payload_preferences_rels";
    DROP TABLE IF EXISTS "payload_locked_documents_rels";
    DROP TABLE IF EXISTS "payload_locked_documents";
    DROP TABLE IF EXISTS "shop_layout_locales";
    DROP TABLE IF EXISTS "shop_settings_currency_values";
    DROP TABLE IF EXISTS "shop_settings_available_currencies";
    DROP TABLE IF EXISTS "administrators_sessions";
    DROP TABLE IF EXISTS "customers_sessions";
    DROP TABLE IF EXISTS "customers_shippings";
    DROP TABLE IF EXISTS "orders_products";
    DROP TABLE IF EXISTS "product_reviews";
  `);
}
