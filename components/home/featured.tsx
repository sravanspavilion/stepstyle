"use client";

import { useState } from "react";

import { ProductCard } from "@/components/ui/product-card";
import { Link } from "@/components/ui/primitives";
import { getProducts, products } from "@/lib/catalog";

const TABS = [
  { id: "new", label: "New Arrivals", slugs: products.filter((p) => p.isNew).map((p) => p.slug) },
  { id: "best", label: "Best Sellers", slugs: products.filter((p) => p.isBestSeller).map((p) => p.slug) },
  { id: "trending", label: "Trending Now", slugs: products.filter((p) => p.isTrending).map((p) => p.slug) },
];

export function FeaturedTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  const items = getProducts(tab.slugs);

  // every tab is a real slice of the catalog, but keep the rail a full row
  const shown = items.length >= 4 ? items : [...items, ...getProducts(TABS.flatMap((t) => t.slugs)).filter((p) => !items.includes(p))].slice(0, 4);

  return (
    <section className="bg-surface-container-low py-space-xl">
      <div className="mx-auto max-w-[1600px] px-gutter-mobile md:px-margin">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
              Curated rotation
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
              This week&rsquo;s shortlist
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Product collections"
            className="scrollbar-none -mx-gutter-mobile flex gap-space-sm overflow-x-auto px-gutter-mobile md:mx-0 md:px-0"
          >
            {TABS.map((t) => {
              const selected = t.id === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(t.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 font-label-md text-label-md uppercase tracking-widest transition-colors ${
                    selected
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          className="mt-space-lg grid grid-cols-2 gap-space-md md:grid-cols-3 lg:grid-cols-4"
        >
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-space-lg flex justify-center">
          <Link
            href="/shoes"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-primary px-7 font-label-lg text-label-lg uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
