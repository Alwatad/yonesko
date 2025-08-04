import { type MigrateUpArgs, type MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

   CREATE TYPE "public"."_locales" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_cta_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_cta_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_cta_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneSixth', 'oneThird', 'half', 'twoThirds', 'fiveSixth', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_alignment" AS ENUM('center', 'left', 'right', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_radius_all" AS ENUM('rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full');
  CREATE TYPE "public"."enum_pages_blocks_content_radius_top_left" AS ENUM('rounded-tl-none', 'rounded-tl-sm', 'rounded-tl-md', 'rounded-tl-lg', 'rounded-tl-xl', 'rounded-tl-2xl', 'rounded-tl-3xl', 'rounded-tl-full');
  CREATE TYPE "public"."enum_pages_blocks_content_radius_top_right" AS ENUM('rounded-tr-none', 'rounded-tr-sm', 'rounded-tr-md', 'rounded-tr-lg', 'rounded-tr-xl', 'rounded-tr-2xl', 'rounded-tr-3xl', 'rounded-tr-full');
  CREATE TYPE "public"."enum_pages_blocks_content_radius_bottom_left" AS ENUM('rounded-bl-none', 'rounded-bl-sm', 'rounded-bl-md', 'rounded-bl-lg', 'rounded-bl-xl', 'rounded-bl-2xl', 'rounded-bl-3xl', 'rounded-bl-full');
  CREATE TYPE "public"."enum_pages_blocks_content_radius_bottom_right" AS ENUM('rounded-br-none', 'rounded-br-sm', 'rounded-br-md', 'rounded-br-lg', 'rounded-br-xl', 'rounded-br-2xl', 'rounded-br-3xl', 'rounded-br-full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_media_block_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_media_block_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_media_block_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_carousel_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_carousel_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_carousel_type" AS ENUM('default', 'logo');
  CREATE TYPE "public"."enum_pages_blocks_carousel_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_carousel_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_carousel_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_carousel_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_accordion_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_accordion_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_accordion_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_accordion_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_type" AS ENUM('category', 'subcategory', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_appearance" AS ENUM('default', 'slider', 'sliderLoop');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_sort" AS ENUM('-bought', '-createdAt', 'createdAt', 'variants.pricing[0].value,pricing.value', '-variants.pricing[0].value,-pricing.value');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_hotspot_zone_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneSixth', 'oneThird', 'half', 'twoThirds', 'fiveSixth', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_alignment" AS ENUM('center', 'left', 'right', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_radius_all" AS ENUM('rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_radius_top_left" AS ENUM('rounded-tl-none', 'rounded-tl-sm', 'rounded-tl-md', 'rounded-tl-lg', 'rounded-tl-xl', 'rounded-tl-2xl', 'rounded-tl-3xl', 'rounded-tl-full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_radius_top_right" AS ENUM('rounded-tr-none', 'rounded-tr-sm', 'rounded-tr-md', 'rounded-tr-lg', 'rounded-tr-xl', 'rounded-tr-2xl', 'rounded-tr-3xl', 'rounded-tr-full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_radius_bottom_left" AS ENUM('rounded-bl-none', 'rounded-bl-sm', 'rounded-bl-md', 'rounded-bl-lg', 'rounded-bl-xl', 'rounded-bl-2xl', 'rounded-bl-3xl', 'rounded-bl-full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_radius_bottom_right" AS ENUM('rounded-br-none', 'rounded-br-sm', 'rounded-br-md', 'rounded-br-lg', 'rounded-br-xl', 'rounded-br-2xl', 'rounded-br-3xl', 'rounded-br-full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_type" AS ENUM('default', 'logo');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_type" AS ENUM('category', 'subcategory', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_appearance" AS ENUM('default', 'slider', 'sliderLoop');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_sort" AS ENUM('-bought', '-createdAt', 'createdAt', 'variants.pricing[0].value,pricing.value', '-variants.pricing[0].value,-pricing.value');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_spacing_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_spacing_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_hotspot_zone_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_customers_shippings_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TYPE "public"."enum_customers_last_buyer_type" AS ENUM('individual', 'company');
  CREATE TYPE "public"."enum_orders_invoice_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TYPE "public"."enum_orders_shipping_address_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TYPE "public"."enum_orders_order_details_shipping" AS ENUM('inpost-pickup', 'inpost-courier', 'inpost-courier-cod');
  CREATE TYPE "public"."enum_orders_order_details_status" AS ENUM('pending', 'paid', 'unpaid', 'processing', 'shipped', 'completed', 'cancelled', 'returned');
  CREATE TYPE "public"."enum_products_variants_type" AS ENUM('sizes', 'colors', 'colorsAndSizes');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_variants_type" AS ENUM('sizes', 'colors', 'colorsAndSizes');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_type" AS ENUM('default', 'floating');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_email_messages_messages_template" AS ENUM('default');
  CREATE TYPE "public"."enum_shop_settings_available_currencies" AS ENUM('USD', 'EUR', 'GBP', 'PLN');
  CREATE TYPE "public"."enum_shop_layout_product_details_type" AS ENUM('WithImageGalleryExpandableDetails');
  CREATE TYPE "public"."enum_shop_layout_product_list_filters" AS ENUM('none', 'withSidebar', 'sortOnly');
  CREATE TYPE "public"."enum_shop_layout_cart_and_wishlist_type" AS ENUM('slideOver');
  CREATE TYPE "public"."enum_shop_layout_checkout_type" AS ENUM('OneStepWithSummary');
  CREATE TYPE "public"."enum_shop_layout_client_panel_type" AS ENUM('withSidebar');
  CREATE TYPE "public"."enum_inpost_pickup_delivery_zones_countries" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TYPE "public"."enum_inpost_pickup_a_p_i_url" AS ENUM('https://api-shipx-pl.easypack24.net', 'https://sandbox-api-shipx-pl.easypack24.net');
  CREATE TYPE "public"."enum_inpost_courier_delivery_zones_countries" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TYPE "public"."enum_inpost_courier_a_p_i_url" AS ENUM('https://api-shipx-pl.easypack24.net', 'https://sandbox-api-shipx-pl.easypack24.net');
  CREATE TYPE "public"."enum_inpost_courier_cod_delivery_zones_countries" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TYPE "public"."enum_inpost_courier_cod_a_p_i_url" AS ENUM('https://api-shipx-pl.easypack24.net', 'https://sandbox-api-shipx-pl.easypack24.net');
  CREATE TYPE "public"."enum_paywalls_paywall" AS ENUM('stripe', 'autopay', 'p24');
  CREATE TYPE "public"."enum_fulfilment_shop_address_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing_bottom" "enum_pages_blocks_cta_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum_pages_blocks_cta_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum_pages_blocks_cta_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_cta_padding_top" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"enable_link" boolean,
  	"enable_prose" boolean DEFAULT true,
  	"padding_bottom" "enum_pages_blocks_content_columns_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_content_columns_padding_top" DEFAULT 'medium',
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"background" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alignment" "enum_pages_blocks_content_alignment" DEFAULT 'center',
  	"spacing_bottom" "enum_pages_blocks_content_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum_pages_blocks_content_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum_pages_blocks_content_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_content_padding_top" DEFAULT 'medium',
  	"radius" boolean DEFAULT false,
  	"specified_radius" boolean DEFAULT false,
  	"radius_all" "enum_pages_blocks_content_radius_all" DEFAULT 'rounded-none',
  	"radius_top_left" "enum_pages_blocks_content_radius_top_left" DEFAULT 'rounded-tl-none',
  	"radius_top_right" "enum_pages_blocks_content_radius_top_right" DEFAULT 'rounded-tr-none',
  	"radius_bottom_left" "enum_pages_blocks_content_radius_bottom_left" DEFAULT 'rounded-bl-none',
  	"radius_bottom_right" "enum_pages_blocks_content_radius_bottom_right" DEFAULT 'rounded-br-none',
  	"background" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" uuid,
  	"spacing_bottom" "enum_pages_blocks_media_block_spacing_bottom" DEFAULT 'none',
  	"spacing_top" "enum_pages_blocks_media_block_spacing_top" DEFAULT 'none',
  	"padding_bottom" "enum_pages_blocks_media_block_padding_bottom" DEFAULT 'medium',
  	"padding_top" "enum_pages_blocks_media_block_padding_top" DEFAULT 'medium',
  	"block_name" varchar
  );
  
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
  	"force_migration_field" varchar,
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
  `);
}

export async function down({ db: _db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  // This chunk's down migration would drop the tables created in this chunk
  // For now, we'll leave it as a placeholder since this is a partial migration
  console.log("Down migration for chunk 1 - would drop tables created in this chunk");
}
