import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create essential tables for the build to work
  await db.execute(sql`
                -- Create basic pages table with essential columns
            CREATE TABLE IF NOT EXISTS "pages" (
              "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
              "title" text,
              "slug" text UNIQUE,
              "slug_lock" boolean DEFAULT false,
              "_status" text DEFAULT 'draft',
              "published_at" timestamp with time zone,
              "created_at" timestamp with time zone DEFAULT now(),
              "updated_at" timestamp with time zone DEFAULT now()
            );

                -- Create basic posts table with essential columns
            CREATE TABLE IF NOT EXISTS "posts" (
              "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
              "title" text,
              "slug" text UNIQUE,
              "slug_lock" boolean DEFAULT false,
              "_status" text DEFAULT 'draft',
              "published_at" timestamp with time zone,
              "created_at" timestamp with time zone DEFAULT now(),
              "updated_at" timestamp with time zone DEFAULT now()
            );

    -- Create basic media table
    CREATE TABLE IF NOT EXISTS "media" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "filename" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic categories table
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic administrators table
    CREATE TABLE IF NOT EXISTS "administrators" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "email" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic customers table
    CREATE TABLE IF NOT EXISTS "customers" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "email" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

                -- Create basic products table with essential columns
            CREATE TABLE IF NOT EXISTS "products" (
              "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
              "title" text,
              "slug" text UNIQUE,
              "slug_lock" boolean DEFAULT false,
              "_status" text DEFAULT 'draft',
              "published_at" timestamp with time zone,
              "created_at" timestamp with time zone DEFAULT now(),
              "updated_at" timestamp with time zone DEFAULT now()
            );

    -- Create basic product_categories table
    CREATE TABLE IF NOT EXISTS "product_categories" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" text,
      "slug" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic product_sub_categories table
    CREATE TABLE IF NOT EXISTS "product_sub_categories" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" text,
      "slug" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic orders table
    CREATE TABLE IF NOT EXISTS "orders" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic forms table
    CREATE TABLE IF NOT EXISTS "forms" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic search table
    CREATE TABLE IF NOT EXISTS "search" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" text,
      "slug" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic redirects table
    CREATE TABLE IF NOT EXISTS "redirects" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "from" text UNIQUE,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic header global table
    CREATE TABLE IF NOT EXISTS "header" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic footer global table
    CREATE TABLE IF NOT EXISTS "footer" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic email_messages global table
    CREATE TABLE IF NOT EXISTS "email_messages" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic shop_settings global table
    CREATE TABLE IF NOT EXISTS "shop_settings" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic shop_layout global table
    CREATE TABLE IF NOT EXISTS "shop_layout" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic payload_migrations table
    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text UNIQUE,
      "batch" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Create basic payload_preferences table
    CREATE TABLE IF NOT EXISTS "payload_preferences" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "key" text UNIQUE,
      "value" jsonb,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop all tables in reverse order
  await db.execute(sql`
    DROP TABLE IF EXISTS "payload_preferences";
    DROP TABLE IF EXISTS "payload_migrations";
    DROP TABLE IF EXISTS "shop_layout";
    DROP TABLE IF EXISTS "shop_settings";
    DROP TABLE IF EXISTS "email_messages";
    DROP TABLE IF EXISTS "footer";
    DROP TABLE IF EXISTS "header";
    DROP TABLE IF EXISTS "redirects";
    DROP TABLE IF EXISTS "search";
    DROP TABLE IF EXISTS "forms";
    DROP TABLE IF EXISTS "orders";
    DROP TABLE IF EXISTS "product_sub_categories";
    DROP TABLE IF EXISTS "product_categories";
    DROP TABLE IF EXISTS "products";
    DROP TABLE IF EXISTS "customers";
    DROP TABLE IF EXISTS "administrators";
    DROP TABLE IF EXISTS "categories";
    DROP TABLE IF EXISTS "media";
    DROP TABLE IF EXISTS "posts";
    DROP TABLE IF EXISTS "pages";
  `);
}
