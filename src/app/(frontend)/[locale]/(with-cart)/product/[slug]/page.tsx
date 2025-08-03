import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { ProductDetails } from "@/globals/(ecommerce)/Layout/ProductDetails/Component";
import { type Locale } from "@/i18n/config";
import { safeFind } from "@/utilities/safePayloadQuery";

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const { docs } = await safeFind("products", {
    depth: 2,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  const { variant } = await searchParams;

  if (docs.length === 0) {
    notFound();
  }

  return <ProductDetails variant={variant} product={docs[0]} />;
};

export default ProductPage;
