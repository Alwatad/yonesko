import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { type Sort } from "payload";

import { ProductList } from "@/globals/(ecommerce)/Layout/ProductList/Component";
import { type Locale } from "@/i18n/config";
import { safeFind } from "@/utilities/safePayloadQuery";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const locale = (await getLocale()) as Locale;
  const { slug } = await params;
  const { color, size, sortBy } = await searchParams;
  const { docs: categories } = await safeFind("productCategories", {
    depth: 1,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!categories[0]) {
    notFound();
  }

  const category = categories[0];

  // This part you added is correct.
  const { docs: subcategories } = await safeFind("productCategories", {
    depth: 0,
    locale,
    where: {
      parent: {
        equals: category.id,
      },
    },
  });

  const colorArr = color ? color.split(",") : [];
  const sizeArr = size ? size.split(",") : [];
  let sortQuery: Sort = "bought";
  switch (sortBy) {
    case "priceasc":
      sortQuery = ["variants.pricing[0].value", "pricing.value"];
      break;
    case "pricedesc":
      sortQuery = ["-variants.pricing[0].value", "-pricing.value"];
      break;
    case "newest":
      sortQuery = ["-createdAt"];
      break;
    default:
      sortQuery = "-bought";
      break;
  }

  const { docs: products } = await safeFind("products", {
    depth: 2,
    locale,
    where: {
      "categoriesArr.category": {
        equals: categories[0].id,
      },
      ...(color && !size && { "variants.color": { in: colorArr } }),
      ...(size && !color && { "variants.size": { in: sizeArr } }),
      ...(size &&
        color && { and: [{ "variants.size": { in: sizeArr } }, { "variants.color": { in: colorArr } }] }),
    },
    sort: sortQuery,
  });

  return (
    <ProductList
      filteredProducts={products}
      title={category.title}
      category={category}
      // --- THIS IS THE FINAL FIX ---
      // Pass the subcategories list to the component
      subcategories={subcategories}
      // --------------------------
      searchParams={{
        color: colorArr,
        size: sizeArr,
        sortBy: sortBy ?? "most-popular",
      }}
    />
  );
};

export default CategoryPage;
