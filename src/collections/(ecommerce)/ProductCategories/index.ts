import { type CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { slugField } from "@/fields/slug";

export const ProductCategories: CollectionConfig = {
  slug: "productCategories",
  admin: {
    useAsTitle: "title",
    group: {
      en: "Products",
      pl: "Produkty",
    },
  },
  labels: {
    singular: {
      en: "Product Category",
      pl: "Kateogria produktu",
    },
    plural: {
      en: "Product Categories",
      pl: "Kategorie produktów",
    },
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Category name",
        pl: "Nazwa kategorii",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "parent",
      type: "relationship",
      // --- FIX: Use the correct camelCase slug nam e ---
      relationTo: "productCategories",
    },
    ...slugField(),
    {
      name: "subcategories",
      label: {
        en: "Related subcategories",
        pl: "Powiązane podkategorie",
      },
      type: "join",
      collection: "productCategories",
      on: "parent",
    },
    {
      name: "products",
      label: {
        en: "Products in this category",
        pl: "Produkty w tej kategorii",
      },
      type: "join",
      collection: "products",
      on: "categoriesArr.category",
    },
  ],
};
