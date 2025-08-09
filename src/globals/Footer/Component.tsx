import Link from "next/link";
import { getLocale } from "next-intl/server";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { type Locale } from "@/i18n/config";
import { CurrencySelector } from "@/stores/Currency/CurrencySelector";
import { getCachedGlobal } from "@/utilities/getGlobals";

import type { Footer, ShopSetting, Header as HeaderType } from "@/payload-types";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footerData: Footer = await getCachedGlobal("footer", locale, 1)();
  const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
  const headerData: HeaderType = await getCachedGlobal("header", locale, 1)();
  const navItems = footerData?.navItems ?? [];

  return (
    <footer className="border-border dark:bg-card mt-auto border-t bg-black text-white">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          {headerData?.logo && typeof headerData.logo !== "string" && headerData.logo.url ? (
            <Media
              resource={headerData.logo}
              className="-my-7 h-[88px] w-full max-w-37.5"
              imgClassName="h-[88px] w-full max-w-37.5"
            />
          ) : (
            <Logo />
          )}
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <CurrencySelector currencyOptions={shopSettings.availableCurrencies} />
          <LocaleSwitch />
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
      {footerData.attribution ? (
        <div className="flex border-t p-4 text-xs">
          <div className="container">
            <RichText data={footerData.attribution} />
          </div>
        </div>
      ) : null}
    </footer>
  );
}
