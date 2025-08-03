import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // CHUNK 3: Global Relation Tables (~50 tables)
  await db.execute(sql`
    -- Header relation tables
    CREATE TABLE IF NOT EXISTS "header_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "header"("id") ON DELETE CASCADE,
      "path" text,
      "pages_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "header_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "header"("id") ON DELETE CASCADE,
      "_locale" text,
      "logo_id" uuid REFERENCES "media"("id") ON DELETE SET NULL,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "header_nav_items" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "header"("id") ON DELETE CASCADE,
      "_order" integer,
      "link_type" text,
      "link_new_tab" boolean DEFAULT false,
      "link_url" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "header_nav_items_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "header_nav_items"("id") ON DELETE CASCADE,
      "_locale" text,
      "link_label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Footer relation tables
    CREATE TABLE IF NOT EXISTS "footer_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "footer"("id") ON DELETE CASCADE,
      "path" text,
      "pages_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "footer_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "footer"("id") ON DELETE CASCADE,
      "_locale" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "footer_nav_items" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "footer"("id") ON DELETE CASCADE,
      "_order" integer,
      "link_type" text,
      "link_new_tab" boolean DEFAULT false,
      "link_url" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "footer_nav_items_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "footer_nav_items"("id") ON DELETE CASCADE,
      "_locale" text,
      "link_label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Forms relation tables
    CREATE TABLE IF NOT EXISTS "forms_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_emails" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "email_to" text,
      "email_from" text,
      "reply_to" text,
      "subject" text,
      "message" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_emails_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_emails"("id") ON DELETE CASCADE,
      "_locale" text,
      "subject" text,
      "message" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Form blocks
    CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_text_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_text"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "placeholder" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_textarea_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_textarea"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "placeholder" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_email_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_email"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "placeholder" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_number_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_number"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "placeholder" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_select_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_select"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_select"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_select_options_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_select_options"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "value" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_checkbox"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_message_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_message"("id") ON DELETE CASCADE,
      "_locale" text,
      "message" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_country_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_country"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "_order" integer,
      "name" text,
      "required" boolean DEFAULT false,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_state_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "forms_blocks_state"("id") ON DELETE CASCADE,
      "_locale" text,
      "label" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Search relation tables
    CREATE TABLE IF NOT EXISTS "search_rels" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "parent_id" uuid REFERENCES "search"("id") ON DELETE CASCADE,
      "path" text,
      "pages_id" uuid REFERENCES "pages"("id") ON DELETE CASCADE,
      "posts_id" uuid REFERENCES "posts"("id") ON DELETE CASCADE,
      "order" integer,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "search_locales" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "search"("id") ON DELETE CASCADE,
      "_locale" text,
      "title" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "search_categories" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "search"("id") ON DELETE CASCADE,
      "_order" integer,
      "relationTo" text,
      "value" uuid,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    -- Form submissions
    CREATE TABLE IF NOT EXISTS "form_submissions" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "form" uuid REFERENCES "forms"("id") ON DELETE CASCADE,
      "submission_data" jsonb,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "_parent_id" uuid REFERENCES "form_submissions"("id") ON DELETE CASCADE,
      "_order" integer,
      "field" text,
      "value" text,
      "created_at" timestamp with time zone DEFAULT now(),
      "updated_at" timestamp with time zone DEFAULT now()
    );
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop global relation tables in reverse order
  await db.execute(sql`
    DROP TABLE IF EXISTS "form_submissions_submission_data";
    DROP TABLE IF EXISTS "form_submissions";
    DROP TABLE IF EXISTS "search_categories";
    DROP TABLE IF EXISTS "search_locales";
    DROP TABLE IF EXISTS "search_rels";
    DROP TABLE IF EXISTS "forms_blocks_state_locales";
    DROP TABLE IF EXISTS "forms_blocks_state";
    DROP TABLE IF EXISTS "forms_blocks_country_locales";
    DROP TABLE IF EXISTS "forms_blocks_country";
    DROP TABLE IF EXISTS "forms_blocks_message_locales";
    DROP TABLE IF EXISTS "forms_blocks_message";
    DROP TABLE IF EXISTS "forms_blocks_checkbox_locales";
    DROP TABLE IF EXISTS "forms_blocks_checkbox";
    DROP TABLE IF EXISTS "forms_blocks_select_options_locales";
    DROP TABLE IF EXISTS "forms_blocks_select_options";
    DROP TABLE IF EXISTS "forms_blocks_select_locales";
    DROP TABLE IF EXISTS "forms_blocks_select";
    DROP TABLE IF EXISTS "forms_blocks_number_locales";
    DROP TABLE IF EXISTS "forms_blocks_number";
    DROP TABLE IF EXISTS "forms_blocks_email_locales";
    DROP TABLE IF EXISTS "forms_blocks_email";
    DROP TABLE IF EXISTS "forms_blocks_textarea_locales";
    DROP TABLE IF EXISTS "forms_blocks_textarea";
    DROP TABLE IF EXISTS "forms_blocks_text_locales";
    DROP TABLE IF EXISTS "forms_blocks_text";
    DROP TABLE IF EXISTS "forms_emails_locales";
    DROP TABLE IF EXISTS "forms_emails";
    DROP TABLE IF EXISTS "forms_locales";
    DROP TABLE IF EXISTS "footer_nav_items_locales";
    DROP TABLE IF EXISTS "footer_nav_items";
    DROP TABLE IF EXISTS "footer_locales";
    DROP TABLE IF EXISTS "footer_rels";
    DROP TABLE IF EXISTS "header_nav_items_locales";
    DROP TABLE IF EXISTS "header_nav_items";
    DROP TABLE IF EXISTS "header_locales";
    DROP TABLE IF EXISTS "header_rels";
  `);
}
