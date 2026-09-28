import { Fragment } from "react";

import { Icon } from "@/components/ui/icon";
import { ProductCard } from "@/components/ui/product-card";
import { Link } from "@/components/ui/primitives";
import { promo, type Product } from "@/lib/catalog";
import { catalogHref, type CatalogQuery } from "@/lib/catalog-query";
import { formatNumber } from "@/lib/format";

export function ProductGrid({
  products,
  page,
  totalPages,
  totalResults,
  query,
}: {
  products: Product[];
  page: number;
  totalPages: number;
  totalResults: number;
  query: CatalogQuery;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-surface-container-low px-gutter py-space-xl text-center">
        <Icon name="search_off" className="text-[36px] text-secondary" />
        <p className="mt-space-sm font-headline-sm text-headline-sm font-semibold text-primary">
          No products match those filters
        </p>
        <p className="mx-auto mt-1 max-w-sm font-body-md text-body-md text-on-surface-variant">
          Try widening a facet — the catalogue is still growing, so some combinations are empty.
        </p>
        <Link
          href={catalogHref("/shoes", { ...query, dept: [], silhouette: [], size: [], color: [], material: [], page: 1 })}
          className="mt-space-md inline-flex h-11 items-center rounded-full bg-primary px-6 font-label-lg text-label-lg uppercase tracking-wider text-on-primary"
        >
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-space-sm gap-y-space-xl md:grid-cols-3 md:gap-x-space-md">
        {products.map((product, i) => (
          <Fragment key={product.id}>
            <li>
              <ProductCard product={product} priority={page === 1 && i < 3} />
            </li>
            {/* the promo capsule breaks up the rail after the third tile */}
            {i === 2 && page === 1 && (
              <li className="col-span-2 md:col-span-3">
                <PromoCapsule />
              </li>
            )}
          </Fragment>
        ))}
      </ul>

      {/* status bar + pagination */}
      <div className="mt-space-xl flex flex-col gap-3 border-t border-outline-variant/50 pt-space-md sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body-sm text-body-sm text-secondary" role="status">
          Showing{" "}
          <strong className="text-primary">
            {(page - 1) * 6 + 1}–{Math.min(page * 6, totalResults)}
          </strong>{" "}
          of <strong className="text-primary">{formatNumber(totalResults)}</strong> results
        </p>

        <nav aria-label="Pagination" className="flex items-center gap-1">
          <PagerLink
            label="Previous"
            icon="chevron_left"
            disabled={page <= 1}
            href={catalogHref("/shoes", { ...query, page: page - 1 })}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={catalogHref("/shoes", { ...query, page: n })}
              aria-current={n === page ? "page" : undefined}
              scroll={false}
              className={`flex h-9 w-9 items-center justify-center rounded-full font-label-md text-label-md transition-colors ${
                n === page
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {n}
            </Link>
          ))}
          <PagerLink
            label="Next"
            icon="chevron_right"
            disabled={page >= totalPages}
            href={catalogHref("/shoes", { ...query, page: page + 1 })}
          />
        </nav>
      </div>
    </>
  );
}

function PagerLink({
  label,
  icon,
  disabled,
  href,
}: {
  label: string;
  icon: string;
  disabled: boolean;
  href: string;
}) {
  if (disabled) {
    return (
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant opacity-30"
      >
        <Icon name={icon} className="text-[18px]" />
      </span>
    );
  }
  return (
    <Link
      href={href}
      scroll={false}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container"
    >
      <Icon name={icon} className="text-[18px]" />
    </Link>
  );
}

/** In-grid promo capsule — the voucher that breaks up the product rail. */
function PromoCapsule() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-primary px-gutter py-space-lg text-on-primary">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 opacity-15"
      >
        <polygon points="100,10 40,198 190,78" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-on-primary/70">
            First step offer
          </span>
          <p className="mt-2 font-headline-md text-headline-md font-bold uppercase tracking-tight">
            Take 10% off your first pair
          </p>
          <p className="mt-1 max-w-md font-body-sm text-body-sm text-on-primary/75">
            Apply <strong className="text-on-primary">{promo.code}</strong> at checkout. Stacks with
            sale pricing, and with free express shipping over ₹999.
          </p>
        </div>
        <Link
          href="/shoes?tab=sale"
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-7 font-label-lg text-label-lg uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
        >
          Shop the sale
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </div>
  );
}
