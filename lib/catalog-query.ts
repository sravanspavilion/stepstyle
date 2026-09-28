/**
 * The catalog is filtered on the server and the whole facet state lives in the
 * query string, so every filtered view is shareable and back/forward works.
 * Parsing lives here so the page and the client filter controls can never
 * disagree about what "?dept=Men,Women" means.
 */

export type CatalogQuery = {
  q: string;
  tab: string;
  /** comma-separated facet values, `[]` when the facet is unconstrained */
  dept: string[];
  silhouette: string[];
  size: string[];
  color: string[];
  material: string[];
  sort: string;
  page: number;
};

export const CATALOG_MULTI_KEYS = ["dept", "silhouette", "size", "color", "material"] as const;
export type CatalogMultiKey = (typeof CATALOG_MULTI_KEYS)[number];

export const EMPTY_CATALOG_QUERY: CatalogQuery = {
  q: "",
  tab: "",
  dept: [],
  silhouette: [],
  size: [],
  color: [],
  material: [],
  sort: "Recommended",
  page: 1,
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function list(value: string | string[] | undefined): string[] {
  return (first(value) ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function parseCatalogQuery(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogQuery {
  const page = Number.parseInt(first(searchParams.page) ?? "1", 10);
  return {
    q: (first(searchParams.q) ?? "").trim(),
    tab: first(searchParams.tab) ?? "",
    dept: list(searchParams.dept),
    silhouette: list(searchParams.silhouette),
    size: list(searchParams.size),
    color: list(searchParams.color),
    material: list(searchParams.material),
    sort: first(searchParams.sort) ?? "Recommended",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

/** Toggles one value inside a comma-separated facet, leaving the rest alone. */
export function toggleFacet(query: CatalogQuery, key: CatalogMultiKey, value: string) {
  const current = query[key];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  return { ...query, [key]: next, page: 1 };
}

export function setFacet(query: CatalogQuery, key: CatalogMultiKey, values: string[]) {
  return { ...query, [key]: values, page: 1 };
}

/**
 * Rebuilds the URL from the full query state. Parameters are emitted in a fixed
 * order so equivalent states always produce the same href.
 */
export function catalogHref(pathname: string, query: CatalogQuery): string {
  const params = new URLSearchParams();
  if (query.tab) params.set("tab", query.tab);
  if (query.q) params.set("q", query.q);
  for (const key of CATALOG_MULTI_KEYS) {
    if (query[key].length > 0) params.set(key, query[key].join(","));
  }
  if (query.sort && query.sort !== "Recommended") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

/** Human-readable labels for the active-facet chips above the grid. */
export function activeFacetTags(query: CatalogQuery): { key: CatalogMultiKey; value: string }[] {
  const labels: Record<CatalogMultiKey, string> = {
    dept: "Gender",
    silhouette: "Type",
    size: "Size",
    color: "Colour",
    material: "Material",
  };
  return CATALOG_MULTI_KEYS.flatMap((key) =>
    query[key].map((value) => ({ key, value: `${labels[key]}: ${value}` })),
  );
}
