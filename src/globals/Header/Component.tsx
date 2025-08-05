import { getLocale } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { HeaderClient } from "./Component.client";

import type { Header } from "@/payload-types";

export async function Header({ disableCart }: { disableCart?: boolean }) {
  const locale = (await getLocale()) as Locale;
  const headerData: Header = await getCachedGlobal("header", locale, 1)();

  // DEBUG: Log header data to see what's being fetched
  console.log("🔍 HEADER DEBUG - Locale:", locale);
  console.log("🔍 HEADER DEBUG - Header data:", JSON.stringify({
    type: headerData?.type,
    navItemsCount: headerData?.navItems?.length || 0,
    navItems: headerData?.navItems?.map(item => ({
      linkType: item?.link?.type,
      linkLabel: item?.link?.label,
      linkUrl: item?.link?.url,
    })) || [],
  }, null, 2));

  return <HeaderClient data={headerData} disableCart={disableCart} />;
}
