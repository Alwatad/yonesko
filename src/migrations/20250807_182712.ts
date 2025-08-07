import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_customers_shippings_country" ADD VALUE 'ae' BEFORE 'va';
  ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_orders_invoice_country" ADD VALUE 'ae' BEFORE 'va';
  ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_orders_shipping_address_country" ADD VALUE 'ae' BEFORE 'va';
  ALTER TYPE "public"."enum_shop_settings_available_currencies" ADD VALUE 'SAR';
  ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_inpost_pickup_delivery_zones_countries" ADD VALUE 'ae' BEFORE 'va';
  ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_inpost_courier_delivery_zones_countries" ADD VALUE 'ae' BEFORE 'va';
  ALTER TYPE "public"."enum_inpost_courier_cod_delivery_zones_countries" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_inpost_courier_cod_delivery_zones_countries" ADD VALUE 'ae' BEFORE 'va';
  ALTER TYPE "public"."enum_fulfilment_shop_address_country" ADD VALUE 'sa' BEFORE 'se';
  ALTER TYPE "public"."enum_fulfilment_shop_address_country" ADD VALUE 'ae' BEFORE 'va';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "customers_shippings" ALTER COLUMN "country" SET DATA TYPE text;
  DROP TYPE "public"."enum_customers_shippings_country";
  CREATE TYPE "public"."enum_customers_shippings_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "customers_shippings" ALTER COLUMN "country" SET DATA TYPE "public"."enum_customers_shippings_country" USING "country"::"public"."enum_customers_shippings_country";
  ALTER TABLE "orders" ALTER COLUMN "invoice_country" SET DATA TYPE text;
  DROP TYPE "public"."enum_orders_invoice_country";
  CREATE TYPE "public"."enum_orders_invoice_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "orders" ALTER COLUMN "invoice_country" SET DATA TYPE "public"."enum_orders_invoice_country" USING "invoice_country"::"public"."enum_orders_invoice_country";
  ALTER TABLE "orders" ALTER COLUMN "shipping_address_country" SET DATA TYPE text;
  DROP TYPE "public"."enum_orders_shipping_address_country";
  CREATE TYPE "public"."enum_orders_shipping_address_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "orders" ALTER COLUMN "shipping_address_country" SET DATA TYPE "public"."enum_orders_shipping_address_country" USING "shipping_address_country"::"public"."enum_orders_shipping_address_country";
  ALTER TABLE "shop_settings_available_currencies" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_shop_settings_available_currencies";
  CREATE TYPE "public"."enum_shop_settings_available_currencies" AS ENUM('USD', 'EUR', 'GBP', 'PLN');
  ALTER TABLE "shop_settings_available_currencies" ALTER COLUMN "value" SET DATA TYPE "public"."enum_shop_settings_available_currencies" USING "value"::"public"."enum_shop_settings_available_currencies";
  ALTER TABLE "inpost_pickup_delivery_zones_countries" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_inpost_pickup_delivery_zones_countries";
  CREATE TYPE "public"."enum_inpost_pickup_delivery_zones_countries" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "inpost_pickup_delivery_zones_countries" ALTER COLUMN "value" SET DATA TYPE "public"."enum_inpost_pickup_delivery_zones_countries" USING "value"::"public"."enum_inpost_pickup_delivery_zones_countries";
  ALTER TABLE "inpost_courier_delivery_zones_countries" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_inpost_courier_delivery_zones_countries";
  CREATE TYPE "public"."enum_inpost_courier_delivery_zones_countries" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "inpost_courier_delivery_zones_countries" ALTER COLUMN "value" SET DATA TYPE "public"."enum_inpost_courier_delivery_zones_countries" USING "value"::"public"."enum_inpost_courier_delivery_zones_countries";
  ALTER TABLE "inpost_courier_cod_delivery_zones_countries" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_inpost_courier_cod_delivery_zones_countries";
  CREATE TYPE "public"."enum_inpost_courier_cod_delivery_zones_countries" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "inpost_courier_cod_delivery_zones_countries" ALTER COLUMN "value" SET DATA TYPE "public"."enum_inpost_courier_cod_delivery_zones_countries" USING "value"::"public"."enum_inpost_courier_cod_delivery_zones_countries";
  ALTER TABLE "fulfilment" ALTER COLUMN "shop_address_country" SET DATA TYPE text;
  DROP TYPE "public"."enum_fulfilment_shop_address_country";
  CREATE TYPE "public"."enum_fulfilment_shop_address_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va');
  ALTER TABLE "fulfilment" ALTER COLUMN "shop_address_country" SET DATA TYPE "public"."enum_fulfilment_shop_address_country" USING "shop_address_country"::"public"."enum_fulfilment_shop_address_country";`)
}
