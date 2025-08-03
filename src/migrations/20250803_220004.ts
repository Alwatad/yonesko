import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 5: Fix Missing Columns (~21 tables)
  await db.execute(sql`
    -- Fix payload_locked_documents table
    ALTER TABLE "payload_locked_documents" 
    ADD COLUMN IF NOT EXISTS "global_slug" text;

    -- Fix payload_locked_documents_rels table with all required columns
    ALTER TABLE "payload_locked_documents_rels" 
    ADD COLUMN IF NOT EXISTS "pages_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "media_id" uuid REFERENCES "media"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "categories_id" uuid REFERENCES "categories"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "administrators_id" uuid REFERENCES "administrators"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "customers_id" uuid REFERENCES "customers"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "orders_id" uuid REFERENCES "orders"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "products_id" uuid REFERENCES "products"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "product_categories_id" uuid REFERENCES "product_categories"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "product_sub_categories_id" uuid REFERENCES "product_sub_categories"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "product_reviews_id" uuid REFERENCES "product_reviews"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "redirects_id" uuid REFERENCES "redirects"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "forms_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "form_submissions_id" uuid REFERENCES "form_submissions"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "search_id" uuid REFERENCES "search"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "payload_jobs_id" uuid REFERENCES "payload_jobs"("id") ON DELETE CASCADE;

    -- Add missing columns to other tables
    ALTER TABLE "pages" 
    ADD COLUMN IF NOT EXISTS "meta_title" text,
    ADD COLUMN IF NOT EXISTS "meta_description" text,
    ADD COLUMN IF NOT EXISTS "meta_image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;

    ALTER TABLE "posts" 
    ADD COLUMN IF NOT EXISTS "meta_title" text,
    ADD COLUMN IF NOT EXISTS "meta_description" text,
    ADD COLUMN IF NOT EXISTS "meta_image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;

    ALTER TABLE "products" 
    ADD COLUMN IF NOT EXISTS "meta_title" text,
    ADD COLUMN IF NOT EXISTS "meta_description" text,
    ADD COLUMN IF NOT EXISTS "meta_image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;

    -- Add missing columns to administrators
    ALTER TABLE "administrators" 
    ADD COLUMN IF NOT EXISTS "password" text,
    ADD COLUMN IF NOT EXISTS "salt" text,
    ADD COLUMN IF NOT EXISTS "reset_password_token" text,
    ADD COLUMN IF NOT EXISTS "reset_password_expiration" timestamp with time zone,
    ADD COLUMN IF NOT EXISTS "api_key" text,
    ADD COLUMN IF NOT EXISTS "api_key_index" text,
    ADD COLUMN IF NOT EXISTS "enable_api_key" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "login_attempts" integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "lock_until" timestamp with time zone;

    -- Add missing columns to customers
    ALTER TABLE "customers" 
    ADD COLUMN IF NOT EXISTS "password" text,
    ADD COLUMN IF NOT EXISTS "salt" text,
    ADD COLUMN IF NOT EXISTS "reset_password_token" text,
    ADD COLUMN IF NOT EXISTS "reset_password_expiration" timestamp with time zone,
    ADD COLUMN IF NOT EXISTS "api_key" text,
    ADD COLUMN IF NOT EXISTS "api_key_index" text,
    ADD COLUMN IF NOT EXISTS "enable_api_key" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "login_attempts" integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "lock_until" timestamp with time zone;

    -- Add missing columns to orders
    ALTER TABLE "orders" 
    ADD COLUMN IF NOT EXISTS "order_number" text UNIQUE,
    ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS "customer" uuid REFERENCES "customers"("id") ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS "total" decimal(10,2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "currency" text DEFAULT 'USD';

    -- Add missing columns to media
    ALTER TABLE "media" 
    ADD COLUMN IF NOT EXISTS "alt" text,
    ADD COLUMN IF NOT EXISTS "width" integer,
    ADD COLUMN IF NOT EXISTS "height" integer,
    ADD COLUMN IF NOT EXISTS "mime_type" text,
    ADD COLUMN IF NOT EXISTS "filesize" integer,
    ADD COLUMN IF NOT EXISTS "url" text;

    -- Add missing columns to forms
    ALTER TABLE "forms" 
    ADD COLUMN IF NOT EXISTS "submit_button_label" text DEFAULT 'Submit',
    ADD COLUMN IF NOT EXISTS "confirmation_type" text DEFAULT 'message',
    ADD COLUMN IF NOT EXISTS "confirmation_message" text,
    ADD COLUMN IF NOT EXISTS "redirect_url" text,
    ADD COLUMN IF NOT EXISTS "emails" jsonb;

    -- Add missing columns to search
    ALTER TABLE "search" 
    ADD COLUMN IF NOT EXISTS "search_type" text DEFAULT 'pages',
    ADD COLUMN IF NOT EXISTS "categories" jsonb;

    -- Add missing columns to redirects
    ALTER TABLE "redirects" 
    ADD COLUMN IF NOT EXISTS "to_type" text DEFAULT 'url',
    ADD COLUMN IF NOT EXISTS "to_url" text;

    -- Add missing columns to header
    ALTER TABLE "header" 
    ADD COLUMN IF NOT EXISTS "type" text DEFAULT 'default',
    ADD COLUMN IF NOT EXISTS "hide_on_scroll" boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS "background" text;

    -- Add missing columns to footer
    ALTER TABLE "footer" 
    ADD COLUMN IF NOT EXISTS "type" text DEFAULT 'default';

    -- Add missing columns to email_messages
    ALTER TABLE "email_messages" 
    ADD COLUMN IF NOT EXISTS "subject" text,
    ADD COLUMN IF NOT EXISTS "message" text,
    ADD COLUMN IF NOT EXISTS "to" text,
    ADD COLUMN IF NOT EXISTS "from" text,
    ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'pending';

    -- Add missing columns to shop_settings
    ALTER TABLE "shop_settings" 
    ADD COLUMN IF NOT EXISTS "default_currency" text DEFAULT 'USD',
    ADD COLUMN IF NOT EXISTS "available_currencies" jsonb,
    ADD COLUMN IF NOT EXISTS "currency_values" jsonb,
    ADD COLUMN IF NOT EXISTS "tax_rate" decimal(5,2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "shipping_cost" decimal(10,2) DEFAULT 0;

    -- Add missing columns to shop_layout
    ALTER TABLE "shop_layout" 
    ADD COLUMN IF NOT EXISTS "layout_type" text DEFAULT 'default';

    -- Add missing columns to product_categories
    ALTER TABLE "product_categories" 
    ADD COLUMN IF NOT EXISTS "description" text,
    ADD COLUMN IF NOT EXISTS "image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL;

    -- Add missing columns to product_sub_categories
    ALTER TABLE "product_sub_categories" 
    ADD COLUMN IF NOT EXISTS "description" text,
    ADD COLUMN IF NOT EXISTS "image_id" uuid REFERENCES "media"("id") ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS "parent_category" uuid REFERENCES "product_categories"("id") ON DELETE CASCADE;

    -- Add missing columns to product_reviews
    ALTER TABLE "product_reviews" 
    ADD COLUMN IF NOT EXISTS "customer" uuid REFERENCES "customers"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "rating" integer CHECK (rating >= 1 AND rating <= 5),
    ADD COLUMN IF NOT EXISTS "comment" text,
    ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'pending';

    -- Add missing columns to orders_products
    ALTER TABLE "orders_products" 
    ADD COLUMN IF NOT EXISTS "product" uuid REFERENCES "products"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "quantity" integer DEFAULT 1,
    ADD COLUMN IF NOT EXISTS "price" decimal(10,2),
    ADD COLUMN IF NOT EXISTS "total" decimal(10,2);

    -- Add missing columns to customers_shippings
    ALTER TABLE "customers_shippings" 
    ADD COLUMN IF NOT EXISTS "address" text,
    ADD COLUMN IF NOT EXISTS "city" text,
    ADD COLUMN IF NOT EXISTS "state" text,
    ADD COLUMN IF NOT EXISTS "zip" text,
    ADD COLUMN IF NOT EXISTS "country" text,
    ADD COLUMN IF NOT EXISTS "is_default" boolean DEFAULT false;

    -- Add missing columns to customers_sessions
    ALTER TABLE "customers_sessions" 
    ADD COLUMN IF NOT EXISTS "session_id" text UNIQUE,
    ADD COLUMN IF NOT EXISTS "expires_at" timestamp with time zone;

    -- Add missing columns to administrators_sessions
    ALTER TABLE "administrators_sessions" 
    ADD COLUMN IF NOT EXISTS "session_id" text UNIQUE,
    ADD COLUMN IF NOT EXISTS "expires_at" timestamp with time zone;

    -- Add missing columns to shop_settings_available_currencies
    ALTER TABLE "shop_settings_available_currencies" 
    ADD COLUMN IF NOT EXISTS "currency" text,
    ADD COLUMN IF NOT EXISTS "is_default" boolean DEFAULT false;

    -- Add missing columns to shop_settings_currency_values
    ALTER TABLE "shop_settings_currency_values" 
    ADD COLUMN IF NOT EXISTS "currency" text,
    ADD COLUMN IF NOT EXISTS "value" decimal(10,2),
    ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now();

    -- Add missing columns to shop_layout_locales
    ALTER TABLE "shop_layout_locales" 
    ADD COLUMN IF NOT EXISTS "_locale" text,
    ADD COLUMN IF NOT EXISTS "title" text;

    -- Add missing columns to payload_jobs
    ALTER TABLE "payload_jobs" 
    ADD COLUMN IF NOT EXISTS "name" text,
    ADD COLUMN IF NOT EXISTS "data" jsonb,
    ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS "attempts" integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "max_attempts" integer DEFAULT 3,
    ADD COLUMN IF NOT EXISTS "run_at" timestamp with time zone;

    -- Add missing columns to payload_jobs_log
    ALTER TABLE "payload_jobs_log" 
    ADD COLUMN IF NOT EXISTS "job_id" uuid REFERENCES "payload_jobs"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "message" text,
    ADD COLUMN IF NOT EXISTS "level" text DEFAULT 'info';

    -- Add missing columns to payload_preferences_rels
    ALTER TABLE "payload_preferences_rels" 
    ADD COLUMN IF NOT EXISTS "path" text,
    ADD COLUMN IF NOT EXISTS "order" integer;

    -- Add missing columns to form_submissions
    ALTER TABLE "form_submissions" 
    ADD COLUMN IF NOT EXISTS "form" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS "submission_data" jsonb,
    ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'pending';

    -- Add missing columns to form_submissions_submission_data
    ALTER TABLE "form_submissions_submission_data" 
    ADD COLUMN IF NOT EXISTS "field" text,
    ADD COLUMN IF NOT EXISTS "value" text;

    -- Add missing columns to search_categories
    ALTER TABLE "search_categories" 
    ADD COLUMN IF NOT EXISTS "relationTo" text,
    ADD COLUMN IF NOT EXISTS "value" uuid;

    -- Add missing columns to categories_breadcrumbs
    ALTER TABLE "categories_breadcrumbs" 
    ADD COLUMN IF NOT EXISTS "relationTo" text,
    ADD COLUMN IF NOT EXISTS "value" uuid;

    -- Add missing columns to posts_populated_authors
    ALTER TABLE "posts_populated_authors" 
    ADD COLUMN IF NOT EXISTS "relationTo" text,
    ADD COLUMN IF NOT EXISTS "value" uuid;

    -- Add missing columns to _posts_v_version_populated_authors
    ALTER TABLE "_posts_v_version_populated_authors" 
    ADD COLUMN IF NOT EXISTS "relationTo" text,
    ADD COLUMN IF NOT EXISTS "value" uuid;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: This migration only adds columns, so the down migration would need to drop them
  // For safety, we'll leave this empty as dropping columns can be dangerous
  console.log("⚠️  Down migration not implemented for safety - columns would need to be dropped manually");
}
