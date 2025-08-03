import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 9: Add Missing Tables (~21 tables to reach 183)
  await db.execute(sql`
    -- Missing global tables for ecommerce
    CREATE TABLE IF NOT EXISTS "inpost_pickup" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_pickup_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "inpost_pickup"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_courier" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_courier_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "inpost_courier"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_courier_cod" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_courier_cod_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "inpost_courier_cod"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "paywalls" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "paywalls_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "paywalls"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "fulfilment" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "fulfilment_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "fulfilment"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Missing block tables for pages
    CREATE TABLE IF NOT EXISTS "pages_blocks_code" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'code',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_code_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_code"("id") ON DELETE CASCADE,
      "_locale" text,
      "code" text,
      "language" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'relatedPosts',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_related_posts"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_related_posts_posts" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_blocks_related_posts"("id") ON DELETE CASCADE,
      "_order" integer,
      "relationTo" text,
      "value" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Missing version tables for blocks
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_code" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'code',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_code_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_code"("id") ON DELETE CASCADE,
      "_locale" text,
      "code" text,
      "language" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v"("id") ON DELETE CASCADE,
      "_order" integer,
      "block_type" text DEFAULT 'relatedPosts',
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_related_posts"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_related_posts_posts" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "_pages_v_blocks_related_posts"("id") ON DELETE CASCADE,
      "_order" integer,
      "relationTo" text,
      "value" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Missing global relation tables
    CREATE TABLE IF NOT EXISTS "inpost_pickup_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "inpost_pickup"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_courier_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "inpost_courier"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "inpost_courier_cod_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "inpost_courier_cod"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "paywalls_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "paywalls"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "fulfilment_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "fulfilment"("id") ON DELETE CASCADE,
      "path" text,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Missing columns for pages table
    ALTER TABLE "pages" 
    ADD COLUMN IF NOT EXISTS "hero_reversed" boolean DEFAULT false;

    -- Missing columns for posts table
    ALTER TABLE "posts" 
    ADD COLUMN IF NOT EXISTS "excerpt" text,
    ADD COLUMN IF NOT EXISTS "featured_image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;

    -- Missing columns for products table
    ALTER TABLE "products" 
    ADD COLUMN IF NOT EXISTS "sku" text UNIQUE,
    ADD COLUMN IF NOT EXISTS "featured_image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;

    -- Missing columns for orders table
    ALTER TABLE "orders" 
    ADD COLUMN IF NOT EXISTS "shipping_address" jsonb,
    ADD COLUMN IF NOT EXISTS "billing_address" jsonb,
    ADD COLUMN IF NOT EXISTS "payment_status" text DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS "shipping_status" text DEFAULT 'pending';

    -- Missing columns for customers table
    ALTER TABLE "customers" 
    ADD COLUMN IF NOT EXISTS "first_name" text,
    ADD COLUMN IF NOT EXISTS "last_name" text,
    ADD COLUMN IF NOT EXISTS "phone" text;

    -- Missing columns for administrators table
    ALTER TABLE "administrators" 
    ADD COLUMN IF NOT EXISTS "first_name" text,
    ADD COLUMN IF NOT EXISTS "last_name" text;

    -- Missing columns for media table
    ALTER TABLE "media" 
    ADD COLUMN IF NOT EXISTS "sizes" jsonb;

    -- Missing columns for forms table
    ALTER TABLE "forms" 
    ADD COLUMN IF NOT EXISTS "fields" jsonb;

    -- Missing columns for search table
    ALTER TABLE "search" 
    ADD COLUMN IF NOT EXISTS "fields" jsonb;

    -- Missing columns for redirects table
    ALTER TABLE "redirects" 
    ADD COLUMN IF NOT EXISTS "fields" jsonb;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop missing tables in reverse order
  await db.execute(sql`
    DROP TABLE IF EXISTS "fulfilment_rels";
    DROP TABLE IF EXISTS "paywalls_rels";
    DROP TABLE IF EXISTS "inpost_courier_cod_rels";
    DROP TABLE IF EXISTS "inpost_courier_rels";
    DROP TABLE IF EXISTS "inpost_pickup_rels";
    DROP TABLE IF EXISTS "_pages_v_blocks_related_posts_posts";
    DROP TABLE IF EXISTS "_pages_v_blocks_related_posts_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_related_posts";
    DROP TABLE IF EXISTS "_pages_v_blocks_code_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_code";
    DROP TABLE IF EXISTS "pages_blocks_related_posts_posts";
    DROP TABLE IF EXISTS "pages_blocks_related_posts_locales";
    DROP TABLE IF EXISTS "pages_blocks_related_posts";
    DROP TABLE IF EXISTS "pages_blocks_code_locales";
    DROP TABLE IF EXISTS "pages_blocks_code";
    DROP TABLE IF EXISTS "fulfilment_locales";
    DROP TABLE IF EXISTS "fulfilment";
    DROP TABLE IF EXISTS "paywalls_locales";
    DROP TABLE IF EXISTS "paywalls";
    DROP TABLE IF EXISTS "inpost_courier_cod_locales";
    DROP TABLE IF EXISTS "inpost_courier_cod";
    DROP TABLE IF EXISTS "inpost_courier_locales";
    DROP TABLE IF EXISTS "inpost_courier";
    DROP TABLE IF EXISTS "inpost_pickup_locales";
    DROP TABLE IF EXISTS "inpost_pickup";
  `);
}
