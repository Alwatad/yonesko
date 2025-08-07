import { type ReactNode } from "react";

import { type Product, type ProductCategory } from "@/payload-types";

export const None = ({
  title,
  children,
  category: _category,
  subcategories: _subcategories,
  products: _products,
  searchParams: _searchParams,
}: {
  title: string;
  children: ReactNode;
  category?: ProductCategory;
  subcategories: ProductCategory[];
  products: Product[];
  searchParams: {
    size: string[];
    color: string[];
    sortBy: string;
  };
}) => {
  return (
    <main className="container pt-24 pb-6">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </main>
  );
};
