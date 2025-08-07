import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { ListingBreadcrumbs } from "@/components/(ecommerce)/ListingBreadcrumbs";
import { type Locale } from "@/i18n/config";
import { type Product, type ProductCategory } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { safeFind } from "@/utilities/safePayloadQuery";

import { None } from "./variants/filters/None";
import { WithSidebar } from "./variants/filters/WithSidebar/WithSidebar";
import { WithInlinePrice } from "./variants/listings/WithInlinePrice";

export const ProductList = async ({
  filteredProducts,
  title,
  category,
  subcategory,
  subcategories,
  searchParams,
}: {
  filteredProducts: Product[];
  title: string;
  category?: ProductCategory;
  subcategory?: ProductCategory;
  subcategories: ProductCategory[];
  searchParams: {
    size: string[];
    color: string[];
    sortBy: string;
  };
}) => {
  try {
    const locale = (await getLocale()) as Locale;
    const { productList } = await getCachedGlobal("shopLayout", locale, 1)();

    let ProductDetailsComponent: typeof WithSidebar | typeof None = None;
    switch (productList.filters) {
      case "withSidebar":
        ProductDetailsComponent = WithSidebar;
        break;
      default:
        ProductDetailsComponent = None;
    }

    const { docs: allProducts } = await safeFind("products", {
      depth: 2,
      locale,
      where: {
        or: [
          {
            "categoriesArr.category": {
              equals: category?.id,
            },
          },
          {
            "categoriesArr.subcategories": {
              equals: subcategory?.id,
            },
          },
        ],
      },
    });

    return (
      <div>
        {category && <ListingBreadcrumbs category={category} />}
        {subcategory && typeof subcategory.category !== "string" && (
          <ListingBreadcrumbs category={subcategory.category} subcategory={subcategory} />
        )}
        <ProductDetailsComponent
          products={allProducts}
          title={title}
          category={category}
          subcategories={subcategories}
          searchParams={searchParams}
        >
          <WithInlinePrice products={filteredProducts} />
        </ProductDetailsComponent>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};
