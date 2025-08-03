import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 2: Relation Tables for Pages, Posts, Products (~60 tables)
  await db.execute(sql`
    -- Pages relation tables
    CREATE TABLE IF NOT EXISTS "pages_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "path" text,
      "pages_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "meta_title" text,
      "meta_description" text,
      "meta_image_id" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_hero_links" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "_order" integer,
      "link_type" text,
      "link_new_tab" boolean DEFAULT false,
      "link_url" text,
      "link_appearance" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "pages_hero_links_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "pages_hero_links"("id") ON DELETE CASCADE,
      "_locale" text,
      "link_label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Posts relation tables
    CREATE TABLE IF NOT EXISTS "posts_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "path" text,
      "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "categories_id" uuid REFERENCES "categories"("id") ON DELETE CASCADE,
      "administrators_id" uuid REFERENCES "administrators"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "posts_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "meta_title" text,
      "meta_description" text,
      "meta_image_id" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "_order" integer,
      "relationTo" text,
      "value" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Products relation tables
    CREATE TABLE IF NOT EXISTS "products_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "path" text,
      "products_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "product_categories_id" uuid REFERENCES "product_categories"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "meta_title" text,
      "meta_description" text,
      "meta_image_id" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_details" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_details_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products_details"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_pricing" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "value" decimal(10,2),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_variants" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_variants_pricing" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products_variants"("id") ON DELETE CASCADE,
      "value" decimal(10,2),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_colors" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_colors_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products_colors"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_sizes" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_sizes_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products_sizes"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "products_categories_arr" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
      "_order" integer,
      "category" uuid REFERENCES "product_categories"("id") ON DELETE CASCADE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Categories relation tables
    CREATE TABLE IF NOT EXISTS "categories_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "categories"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "categories_breadcrumbs" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "categories"("id") ON DELETE CASCADE,
      "_order" integer,
      "relationTo" text,
      "value" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Product categories relation tables
    CREATE TABLE IF NOT EXISTS "product_categories_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "product_categories"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "product_sub_categories_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "product_sub_categories"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Media relation tables
    CREATE TABLE IF NOT EXISTS "media_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "media"("id") ON DELETE CASCADE,
      "_locale" text,
      "alt" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Redirects relation tables
    CREATE TABLE IF NOT EXISTS "redirects_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "redirects"("id") ON DELETE CASCADE,
      "path" text,
      "pages_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop relation tables in reverse order
  await db.execute(sql`
    DROP TABLE IF EXISTS "redirects_rels";
    DROP TABLE IF EXISTS "media_locales";
    DROP TABLE IF EXISTS "product_sub_categories_locales";
    DROP TABLE IF EXISTS "product_categories_locales";
    DROP TABLE IF EXISTS "categories_breadcrumbs";
    DROP TABLE IF EXISTS "categories_locales";
    DROP TABLE IF EXISTS "products_categories_arr";
    DROP TABLE IF EXISTS "products_sizes_locales";
    DROP TABLE IF EXISTS "products_sizes";
    DROP TABLE IF EXISTS "products_colors_locales";
    DROP TABLE IF EXISTS "products_colors";
    DROP TABLE IF EXISTS "products_variants_pricing";
    DROP TABLE IF EXISTS "products_variants";
    DROP TABLE IF EXISTS "products_pricing";
    DROP TABLE IF EXISTS "products_details_locales";
    DROP TABLE IF EXISTS "products_details";
    DROP TABLE IF EXISTS "products_locales";
    DROP TABLE IF EXISTS "products_rels";
    DROP TABLE IF EXISTS "posts_populated_authors";
    DROP TABLE IF EXISTS "posts_locales";
    DROP TABLE IF EXISTS "posts_rels";
    DROP TABLE IF EXISTS "pages_hero_links_locales";
    DROP TABLE IF EXISTS "pages_hero_links";
    DROP TABLE IF EXISTS "pages_locales";
    DROP TABLE IF EXISTS "pages_rels";
  `);
}
