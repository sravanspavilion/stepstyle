"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Icon } from "@/components/ui/icon";
import { catalogFilters } from "@/lib/catalog";
import {
  catalogHref,
  CATALOG_MULTI_KEYS,
  EMPTY_CATALOG_QUERY,
  toggleFacet,
  type CatalogMultiKey,
  type CatalogQuery,
} from "@/lib/catalog-query";
import { formatNumber } from "@/lib/format";

type Facet = { label: string; count: number };

/**
 * The whole facet state lives in the URL (see `lib/catalog-query.ts`), so every
 * control here is a link with a pending state. That keeps the product grid
 * server-rendered and makes every filtered view shareable.
 */
function useFacetNav(query: CatalogQuery) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function go(next: CatalogQuery) {
    startTransition(() => router.replace(catalogHref(pathname, next), { scroll: false }));
  }

  return {
    pending,
    go,
    toggle: (key: CatalogMultiKey, value: string) => go(toggleFacet(query, key, value)),
    clearFacets: () => {
      const next = { ...EMPTY_CATALOG_QUERY, q: query.q, tab: query.tab, sort: query.sort };
      for (const key of CATALOG_MULTI_KEYS) next[key] = [];
      go(next);
    },
    setSort: (sort: string) => go({ ...query, sort, page: 1 }),
    setTab: (tab: string) => go({ ...query, tab, page: 1 }),
  };
}

function FacetGroup({
  legend,
  items,
  selected,
  facet,
  query,
  swatches,
}: {
  legend: string;
  items: Facet[];
  selected: string[];
  facet: CatalogMultiKey;
  query: CatalogQuery;
  swatches?: Record<string, string>;
}) {
  const { toggle } = useFacetNav(query);

  return (
    <fieldset className="border-b border-outline-variant/40 py-space-md first:pt-0 last:border-0">
      <legend className="mb-3 font-label-md text-label-md uppercase tracking-widest text-secondary">
        {legend}
      </legend>
      <ul className="space-y-2.5">
        {items.map((item) => {
          const on = selected.includes(item.label);
          return (
            <li key={item.label}>
              <label className="group flex cursor-pointer items-center gap-space-sm">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(facet, item.label)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 ${
                    on
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant group-hover:border-primary"
                  }`}
                >
                  {on && <Icon name="check" className="text-[12px]" />}
                </span>
                {swatches?.[item.label] && (
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 rounded-full border border-outline-variant/60"
                    style={{ backgroundColor: swatches[item.label] }}
                  />
                )}
                <span className="flex-1 font-body-md text-body-md text-on-surface">
                  {item.label}
                </span>
                {item.count > 0 && (
                  <span className="font-body-sm text-body-sm text-secondary">
                    {formatNumber(item.count)}
                  </span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

const COLOR_SWATCHES = Object.fromEntries(catalogFilters.colors.map((c) => [c.name, c.hex]));

function FacetControls({ query }: { query: CatalogQuery }) {
  const { clearFacets } = useFacetNav(query);

  return (
    <div>
      <div className="flex items-center justify-between pb-space-md">
        <h2 className="font-headline-sm text-headline-sm font-semibold uppercase tracking-tight text-primary">
          Filters
        </h2>
        <button
          type="button"
          onClick={clearFacets}
          className="font-label-md text-label-md uppercase tracking-widest text-secondary underline-offset-4 hover:text-primary hover:underline"
        >
          Clear all
        </button>
      </div>

      <FacetGroup
        legend="Department"
        facet="dept"
        query={query}
        items={catalogFilters.departments}
        selected={query.dept}
      />
      <FacetGroup
        legend="Silhouette"
        facet="silhouette"
        query={query}
        items={catalogFilters.silhouettes}
        selected={query.silhouette}
      />
      <FacetGroup
        legend="Size"
        facet="size"
        query={query}
        items={catalogFilters.sizes.map((s) => ({ label: s, count: 0 }))}
        selected={query.size}
      />
      <FacetGroup
        legend="Colour"
        facet="color"
        query={query}
        items={catalogFilters.colors.map((c) => ({ label: c.name, count: 0 }))}
        selected={query.color}
        swatches={COLOR_SWATCHES}
      />
      <FacetGroup
        legend="Material"
        facet="material"
        query={query}
        items={catalogFilters.materials}
        selected={query.material}
      />
    </div>
  );
}

export function CatalogSidebar({ query, className = "" }: { query: CatalogQuery; className?: string }) {
  return (
    <aside className={className}>
      <FacetControls query={query} />
    </aside>
  );
}

export function CatalogToolbar({
  query,
  resultCount,
  tabCounts,
  sortOptions,
  activeTags,
}: {
  query: CatalogQuery;
  resultCount: number;
  tabCounts: { id: string; label: string; count: number }[];
  sortOptions: string[];
  activeTags: { key: CatalogMultiKey; value: string }[];
}) {
  const { pending, setSort, setTab, toggle, clearFacets } = useFacetNav(query);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Escape closes the drawer and the page behind it must not scroll.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <div
        className={`sticky top-[var(--header-h)] z-40 -mx-gutter-mobile mt-space-md border-y border-outline-variant/50 bg-surface/95 px-gutter-mobile backdrop-blur-md transition-opacity md:-mx-margin md:px-margin ${
          pending ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="flex h-16 items-center gap-space-sm">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            className="flex h-10 items-center gap-2 rounded-full border border-outline-variant px-4 font-label-md text-label-md uppercase tracking-widest text-primary lg:hidden"
          >
            <Icon name="tune" className="text-[18px]" />
            Filters
            {activeTags.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 font-label-sm text-label-sm text-on-primary">
                {activeTags.length}
              </span>
            )}
          </button>

          <nav aria-label="Collections" className="scrollbar-none flex flex-1 items-center gap-2 overflow-x-auto">
            {tabCounts.map((tab) => {
              const on = query.tab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTab(tab.id)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 font-label-md text-label-md uppercase tracking-wider transition-colors ${
                    on
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab.label}
                  <span className={on ? "text-on-primary/70" : "text-secondary"}>
                    {" "}
                    ({formatNumber(tab.count)})
                  </span>
                </button>
              );
            })}
          </nav>

          <label className="flex shrink-0 items-center gap-2">
            <span className="hidden font-label-md text-label-md uppercase tracking-widest text-secondary sm:inline">
              Sort
            </span>
            <select
              value={sortOptions.includes(query.sort) ? query.sort : sortOptions[0]}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="h-10 rounded-full border border-outline-variant bg-surface-container-lowest px-3 pr-8 font-body-sm text-body-sm text-primary outline-none focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {activeTags.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2 pb-3">
            {activeTags.map((tag) => (
              <li key={`${tag.key}-${tag.value}`}>
                <button
                  type="button"
                  onClick={() => toggle(tag.key, tag.value.slice(tag.value.indexOf(": ") + 2))}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-error hover:text-on-error"
                >
                  {tag.value}
                  <Icon name="close" className="text-[14px]" />
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={clearFacets}
                className="font-label-md text-label-md uppercase tracking-wider text-secondary underline-offset-4 hover:text-primary hover:underline"
              >
                Clear
              </button>
            </li>
          </ul>
        )}
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/50 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-surface-container-lowest p-gutter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-space-md flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm font-semibold uppercase text-primary">
                Refine
              </span>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-surface-container"
              >
                <Icon name="close" />
              </button>
            </div>
            <FacetControls query={query} />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-space-md h-12 w-full rounded-full bg-primary font-label-lg text-label-lg uppercase tracking-wider text-on-primary"
              disabled={resultCount === 0}
            >
              {resultCount === 0 ? "No matches" : `Show ${formatNumber(resultCount)} results`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
