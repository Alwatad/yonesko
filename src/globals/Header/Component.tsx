import { getLocale } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { HeaderClient } from "./Component.client";

import type { Header } from "@/payload-types";

export async function Header({ disableCart }: { disableCart?: boolean }) {
  try {
    console.log("🔍 HEADER DEBUG - Starting Header render");
    
    const locale = (await getLocale()) as Locale;
    console.log("🔍 HEADER DEBUG - Locale:", locale);
    
    const headerData: Header = await getCachedGlobal("header", locale, 1)();
    console.log("🔍 HEADER DEBUG - Raw header data:", headerData);
    
    if (!headerData) {
      console.log("🚨 HEADER ERROR - No header data returned!");
      return <div style={{ background: 'red', color: 'white', padding: '10px' }}>
        ERROR: No header data found!
      </div>;
    }

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
  } catch (error) {
    console.error("🚨 HEADER ERROR - Component failed:", error);
    return <div style={{ background: 'red', color: 'white', padding: '10px' }}>
      HEADER ERROR: {String(error)}
    </div>;
  }
}
