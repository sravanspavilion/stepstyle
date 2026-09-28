import type { Metadata } from "next";

import { CatalogSidebar, CatalogToolbar } from "@/components/catalog/catalog-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { catalogFilters, catalogFootnote, products, type Product } from "@/lib/catalog";
import { activeFacetTags, parseCatalogQuery, type CatalogQuery } from "@/lib/catalog-query";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "All Footwear & Apparel",
  description:
    "Shop the full STEPSTYLE rotation — Italian-crafted sneakers, penny loafers, running trainers, linen overshirts and tailored chinos.",
};

const PAGE_SIZE = 6;

/** "Unisex Standard" is the facet label for the `Unisex` department record. */
const DEPT_ALIASES: Record<string, string> = {
  Men: "Men",
  Women: "Women",
  "Unisex Standard": "Unisex",
};

const TAB_HEADINGS: Record<string, { heading: string; blurb: string }> = {
  new: {
    heading: "New Arrivals",
    blurb: "The latest drops off the atelier floor, added as soon as they pass inspection.",
  },
  featured: {
    heading: "Best Sellers",
    blurb: "Ranked by repeat purchase rate over the last 90 days — not by margin.",
  },
  sale: {
    heading: "Sale",
    blurb: "Marked-down pairs — same craft, same warranty, smaller number.",
  },
};

function sourceFor(query: CatalogQuery): Product[] {
  switch (query.tab) {
    case "new":
      return products.filter((p) => p.isNew);
    case "featured":
      return products.filter((p) => p.isBestSeller);
    case "sale":
      return products.filter((p) => p.mrp > p.price);
    default:
      return products;
  }
}

function applyFacets(items: Product[], query: CatalogQuery): Product[] {
  const needle = query.q.toLowerCase();

  const result = items.filter((p) => {
    if (
      needle &&
      ![p.name, p.variant, p.descriptor, p.silhouette, p.department, p.collection]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    ) {
      return false;
    }
    if (query.dept.length > 0) {
      const matches = query.dept.some(
        (d) => p.department === d || DEPT_ALIASES[d] === p.department,
      );
      if (!matches) return false;
    }
    if (query.silhouette.length > 0 && !query.silhouette.includes(p.silhouette)) return false;
    if (query.size.length > 0 && !p.sizes.some((s) => query.size.includes(s.label))) return false;
    if (query.color.length > 0 && !p.colorways.some((c) => query.color.includes(c.name))) {
      return false;
    }
    if (query.material.length > 0 && !query.material.includes(p.material)) return false;
    return true;
  });

  const sorted = [...result];
  if (query.sort === "Price: Low to High") sorted.sort((a, b) => a.price - b.price);
  if (query.sort === "Price: High to Low") sorted.sort((a, b) => b.price - a.price);
  if (query.sort === "Newest First") sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  if (query.sort === "Top Rated") sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

export default async function CatalogPage({ searchParams }: PageProps<"/shoes">) {
  const query = parseCatalogQuery(await searchParams);
  const source = sourceFor(query);
  const filtered = applyFacets(source, query);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(query.page, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const tabCopy = TAB_HEADINGS[query.tab];
  const heading = query.q ? `Results for “${query.q}”` : (tabCopy?.heading ?? "All Footwear & Apparel");
  const blurb = query.q
    ? "Showing everything that matches your search across the full rotation."
    : (tabCopy?.blurb ?? "Everyday staples, built one at a time in certified Italian ateliers.");

  return (
    <div className="mx-auto max-w-[1600px] px-gutter-mobile pb-space-xl md:px-margin">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-space-md">
        <ol className="flex items-center gap-1.5 font-body-sm text-body-sm text-secondary">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <Icon name="chevron_right" className="text-[16px]" />
          </li>
          <li className="font-medium text-primary" aria-current="page">
            {heading}
          </li>
        </ol>
      </nav>

      {/* page head */}
      <div className="flex flex-col gap-space-sm pt-space-lg md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
            {heading}
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{blurb}</p>
        </div>
        <p className="font-body-sm text-body-sm text-secondary">
          {formatNumber(filtered.length)} of {formatNumber(source.length)} products
        </p>
      </div>

      <CatalogToolbar
        query={query}
        resultCount={filtered.length}
        sortOptions={catalogFilters.sortOptions}
        activeTags={activeFacetTags(query)}
        tabCounts={[
          { id: "", label: "All", count: products.length },
          { id: "new", label: "New Arrivals", count: products.filter((p) => p.isNew).length },
          {
            id: "featured",
            label: "Best Sellers",
            count: products.filter((p) => p.isBestSeller).length,
          },
          { id: "sale", label: "Sale", count: products.filter((p) => p.mrp > p.price).length },
        ]}
      />

      <div className="mt-space-lg flex gap-space-xl">
        <CatalogSidebar query={query} className="hidden w-64 shrink-0 lg:block" />

        <div className="min-w-0 flex-1">
          <ProductGrid
            products={visible}
            page={page}
            totalPages={totalPages}
            totalResults={filtered.length}
            query={query}
          />

          {/* footnote banner */}
          <section className="mt-space-xl rounded-lg bg-surface-container-low px-gutter py-space-lg">
            <ul className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
              {catalogFootnote.map((item) => (
                <li key={item.title}>
                  <Icon name={item.icon} className="text-[24px] text-secondary" />
                  <h2 className="mt-2 font-headline-sm text-headline-sm font-semibold text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
