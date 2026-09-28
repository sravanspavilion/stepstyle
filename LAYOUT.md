# STEPSTYLE — Layout & Architecture

Reference for the four-page storefront ported from the Google Stitch HTML mockups.
Everything below is a description of the code as it exists, not an aspiration.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.6, App Router, Turbopack |
| React | 19.2.8 |
| Styling | Tailwind CSS v4.3.3 via `@tailwindcss/postcss` (CSS-first, no `tailwind.config.js`) |
| Language | TypeScript (`@/*` → `./*`) |
| Persistence | `localStorage` only — no backend, no database |

---

## Routes & rendering strategy

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static | Pure server composition of 7 home sections |
| `/shoes` | **Dynamic** (`ƒ`) | Filtering/sorting/pagination happen on the server from `searchParams` |
| `/shoes/[slug]` | SSG (`●`) | `generateStaticParams` over all 11 products; unknown slug → `notFound()` |
| `/cart` | Static | `robots: { index: false }` |
| `/_not-found` | Static | Branded 404 |

`/shoes` is deliberately server-rendered rather than client-filtered. Facet state
lives in the URL, so every filtered view is shareable and reloadable, and the
product grid never has to serialize the catalogue into the client bundle.

---

## Global shell — `app/layout.tsx`

```
<html>  data-announcement="visible"
  ├── <head>
  │     ├── preconnect × 3   (fonts.googleapis, fonts.gstatic, lh3.googleusercontent)
  │     ├── Material Symbols Outlined stylesheet
  │     └── inline script    (pre-paint announcement restore)
  └── <body>  flex flex-col min-h-full
        └── <StoreProvider>                 ← client boundary, wraps everything
              ├── <SiteHeader />             fixed, z-50
              ├── <main className="flex-1 pt-[var(--header-h)]">
              └── <SiteFooter />
```

- **Fonts** — `Hanken_Grotesk` (body/label) and `Space_Grotesk` (display/headline),
  both `next/font/google`, weights `400/500/600/700`, exposed as CSS variables
  `--font-hanken-grotesk` / `--font-space-grotesk`.
- **Material Symbols** is loaded via a plain `<link>` in `<head>`, not through
  `next/font`. Its FILL axis is set through the `Icon` component's `fill` prop
  (`fontVariationSettings: "'FILL' 1"`) — there is no `fill-1` class.
- **Pre-paint script** restores the dismissed announcement strip before first
  paint, keyed off the same `localStorage` key the header writes to. The
  `<html suppressHydrationWarning>` is required because the script mutates the DOM
  before React hydrates.

### Header offset

The header is `announcement (2.25rem) + nav (5rem)` tall. That total is exposed
as a CSS custom property so every dependent offset stays in sync automatically:

```css
:root                              { --header-h: 7.25rem; }
html[data-announcement="hidden"]   { --header-h: 5rem;   }
```

Consumed by `main`'s top padding, the hero's negative margin, the catalog
toolbar's `sticky top-[var(--header-h)]`, and the buy panel's `lg:top`.

---

## Design tokens — `app/globals.css`

Every token lives in a single `@theme { … }` block. Tailwind v4 maps the
namespace prefix to the utility prefix, which is the single most important thing
to internalise when editing this project:

| Custom property | Generates | Example |
|---|---|---|
| `--color-*` | `bg-` `text-` `border-` | `--color-primary` → `bg-primary`, `text-primary` |
| `--spacing-*` | `p-` `gap-` `px-` | `--spacing-margin` → `px-margin`, `gap-margin` |
| `--font-*` | `font-` (family only) | `--font-headline-lg` → `font-headline-lg` |
| `--text-*` | `text-` (size ramp) | `--text-headline-lg` → `text-headline-lg` |
| `--radius-*` | `rounded-` | `--radius-xl` → `rounded-xl` |

> **Gotcha — the `font-*` / `text-*` parallel.** The family token and the size
> token have the *same name* (`--font-headline-lg` and `--text-headline-lg`).
> They are not alternatives; you need both to get a correctly tuned heading:
> `className="font-headline-lg text-headline-lg font-bold uppercase"`.
> `font-headline-lg` picks Space Grotesk, `text-headline-lg` brings the 48px /
> 56px / −0.025em ramp, and `font-bold` overrides the ramp's weight of 500.
> Writing only `text-headline-lg` renders Hanken Grotesk at display size.

### Colours

A full Material-3 style set. The load-bearing ones:

| Token | Value | Used for |
|---|---|---|
| `primary` | `#000000` | Buttons, headings, price — the brand is monochrome |
| `surface` / `background` | `#f9f9f9` | Page canvas |
| `surface-container-lowest` | `#ffffff` | Cards, panels, inputs |
| `surface-container` / `-low` / `-high` | `#eeeeee` / `#f3f3f3` / `#e8e8e8` | Nested surfaces |
| `on-surface` | `#1a1c1c` | Body copy |
| `on-surface-variant` | `#444748` | Secondary copy |
| `secondary` | `#585f6c` | Eyebrows, metadata, icons |
| `outline-variant` | `#c4c7c7` | Every border in the design |
| `error` | `#ba1a1a` | Low-stock, form errors, sale badges |

Status greens (`emerald-600` / `emerald-700`) are deliberately **not** tokens —
they are inline Tailwind defaults in the buy panel and cart lines.

### Spacing rhythm

`space-xs .25rem` · `space-sm .5rem` · `space-md 1rem` · `space-lg 1.5rem` ·
`space-xl 2.5rem` — vertical section rhythm.

Two separate horizontal scales, used as a mobile/desktop pair:

| Mobile | Desktop | Purpose |
|---|---|---|
| `px-gutter-mobile` (1rem) | `px-margin` (3rem) | Page gutters |
| `px-gutter` (1.5rem) | — | Inner component padding |

### Typography

| Token | Size / line-height | Tracking | Weight |
|---|---|---|---|
| `display` | 64 / 72 | −0.03em | 600 |
| `display-mobile` | 40 / 48 | −0.02em | 600 |
| `headline-lg` | 48 / 56 | −0.025em | 500 |
| `headline-lg-mobile` | 32 / 40 | −0.02em | 500 |
| `headline-md` | 28 / 36 | −0.02em | 500 |
| `headline-sm` | 22 / 28 | −0.015em | 500 |
| `body-lg` | 18 / 28 | −0.01em | 400 |
| `body-md` | 15 / 24 | 0 | 400 |
| `body-sm` | 13 / 20 | 0.005em | 400 |
| `label-lg` | 14 / 20 | 0.02em | 600 |
| `label-md` | 12 / 16 | 0.04em | 600 |
| `label-sm` | 10 / 14 | 0.06em | 600 |

`label-*` is the uppercase micro-type used for eyebrows, buttons and meta rows.

### Custom utilities

- `.material-symbols-outlined` — icon font reset (ligatures, `1em` sizing).
- `scrollbar-none` — declared with `@utility`; keeps horizontal chip rails from
  reserving scrollbar space.
- `.marquee-track` + `@keyframes marquee` — the trust-bar ticker. Items render
  **twice** so the `translateX(-50%)` shift lands exactly on the seam.
  `prefers-reduced-motion` parks the rail (`animation: none`).

---

## Container & grid conventions

Every page uses the same shell:

```jsx
className="mx-auto max-w-[1600px] px-gutter-mobile md:px-margin"
```

- Content ceiling is **1600px**, not Tailwind's `max-w-7xl`.
- Product imagery is **4:5 portrait** (`aspect-4/5`) everywhere except cart
  cross-sell tiles, which are `aspect-4/3`.
- Product grids are `grid-cols-2 md:grid-cols-3`.
- Breakpoints in use: base → `sm` (640) → `md` (768) → `lg` (1024).

---

## Page layouts

### `/` — Homepage (`app/page.tsx`)

A flat server component; all seven sections are independent.

```
<Hero />              full-bleed, -mt to slide under the fixed header
<CategoryGrid />      md:grid-cols-12
<FeaturedTabs />      grid-cols-2 md:grid-cols-3
<UniformSpotlight />  2-col split, aspect-4/5 image
<BestSellers />       grid-cols-2 md:grid-cols-3
<TrustBar />          md:grid-cols-4, marquee ticker
<Reviews />           md:grid-cols-3
```

### `/shoes` — Catalog (`app/shoes/page.tsx`)

```
breadcrumb
page head (heading + "N of M products")
<CatalogToolbar />          sticky, top-[var(--header-h)], z-40
└── flex
    ├── <CatalogSidebar />  hidden lg:block, w-64
    └── <ProductGrid />     server component
└── footnote banner         md:grid-cols-3
```

`CatalogToolbar` is the only client piece that owns ephemeral UI state (whether
the mobile filter drawer is open). Every facet control is a link-shaped button
that rewrites the query string, so the grid below stays a server component.

Below `lg` the sidebar is replaced by a left-side drawer: scrim at `z-[65]`,
Escape closes it, and body scroll is locked while open.

### `/shoes/[slug]` — Product detail (`app/shoes/[slug]/page.tsx`)

```
JSON-LD <script>            Product schema, incl. aggregateRating + offers
breadcrumb
lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]
├── <Gallery />             aspect-4/5, thumbnails
└── <BuyPanel />            lg:sticky, top-[calc(var(--header-h)+1.5rem)]
<DetailTabs />              md:grid-cols-3
<CompleteTheLook />         lg:grid-cols-[1fr_360px]
<RecentlyViewed />          grid-cols-2 md:grid-cols-4
```

`BuyPanel` owns the only genuinely stateful part of a PDP: colourway, size,
quantity, pincode and the size-guide modal. Size starts **unselected** on purpose
— preselecting hides the "select a size" nudge and makes low-stock warnings read
as a fault.

### `/cart` — Bag (`app/cart/page.tsx`)

```
breadcrumb
page head
lg:grid-cols-[minmax(0,1fr)_380px]
├── <CartLines />    + <CrossSell />  (sm:grid-cols-3)
└── <OrderSummary /> (sticky on lg)
```

Totals are computed in the store, not the page: subtotal → product savings →
`promoDiscount` (flat 10% of subtotal) → delivery (free) → total. The seeded
cart resolves to ₹4,698 / −₹1,700 / −₹470 / **₹4,228**, matching the mockup.

---

## Shared UI kit — `components/ui/`

| Component | Notes |
|---|---|
| `Icon` | Material Symbols wrapper. `fill` prop drives the FILL axis |
| `StarRow` | Renders `product.rating` as filled/outlined stars |
| `primitives.tsx` | `BadgeChip`, `ColorDots`, `PriceRow`, `SectionHeading`; re-exports `Link`, `WishlistToggle` |
| `ProductCard` | Server-safe card: `aspect-4/5` image + `ProductCardActions` |
| `ProductCardActions` | Client. Takes **only** `slug`/`name`/`inStock` |
| `WishlistToggle` | Client, wired to the store |
| `SizeGuideModal` | Client. Escape closes, body scroll locks |

> **Why `ProductCardActions` takes a slug, not a product.** Passing the whole
> `Product` would drag gallery, specs, care and reviews into the client bundle
> for every card on the page. It calls the store's `addBySlug(slug)` instead.

---

## State & data

### `lib/catalog.ts` — content, single source of truth

11 typed `Product` records (`p-01`…`p-11`) plus every editorial string: hero
copy, categories, trust features, reviews, size chart, footer columns, nav items,
facet definitions. Also the lookups `productBySlug`, `getProduct`, `getProducts`,
`getFeatured`, `getBestSellers`, `discountPercent`.

### `lib/store.tsx` — cart, wishlist, promo

Built on `useSyncExternalStore` with `localStorage` as the external system
(module-level `cache` + `listeners` + `commit()`).

This is **not** incidental. The React Compiler lint rejects `setState` inside a
mount effect, so the conventional "hydrate in `useEffect`" store does not compile
clean here. `getServerSnapshot` returns the seed snapshot so the hydration pass
matches the server render; a second `useSyncExternalStore` (`() => true` /
`() => false`) drives the `ready` flag so the header badges render a stable `0`
until real counts land.

Line identity is `${productId}::${size}::${colorway}`, which is what makes
re-adding the same variant merge quantities instead of duplicating the row.

`maxQty` on each line is the per-size stock ceiling (hard-capped at 10) and is
enforced in `addToCart`, `addBundle` and `setQty`, so the bag can never promise
more units than the warehouse will release.

> **Seeded data.** `SEED_LINES` (2 lines), `SEED_WISHLIST` (2 slugs) and
> `SERVER_SNAPSHOT` exist so `/cart` and the header badges match the approved
> mockup on a first visit. Delete that block for a genuinely empty store.

### `lib/catalog-query.ts` — facet state

`parseCatalogQuery` reads `searchParams`; `catalogHref` serialises back;
`toggleFacet` / `setFacet` mutate; `activeFacetTags` builds the removable chips.
`CATALOG_MULTI_KEYS` enumerates the five repeatable facets.

### `lib/format.ts`

`inr`, `formatPrice`, `formatNumber` (Indian digit grouping).

---

## Conventions worth knowing

- **React Compiler-era lint is on.** No `setState` in effects, no ref writes
  during render, no direct `Context` reads in `useEffect`. Derive instead —
  e.g. the header's menu/search panels are derived from
  `{ menu, search, at: pathname }` rather than reset by an effect.
- **Images** go through `next/image` with `fill` inside aspect-ratio containers,
  against `lh3.googleusercontent.com` (allowed via `images.remotePatterns` in
  `next.config.ts`).
- **`LayoutProps<"/">` / `PageProps<"/shoes">`** are globals generated by
  `npx next typegen`. Re-run it after adding a route or `tsc` fails with
  `Type '"..."' does not satisfy the constraint`. `searchParams` and `params` on
  these helpers are `Promise`s and must be awaited.
- **Material Symbols name `360` does not exist** — use `rotate_right`.
- `@next/next/no-page-custom-font` is disabled in `eslint.config.mjs`; the App
  Router has no `_document.js` to hang custom font links on.

---

## Known gaps

- **No visual verification has been done.** The desktop browser was not
  connected during the port, so all checks were `curl` + HTML extraction +
  compiled-CSS inspection. Responsive breakpoints, the sticky toolbar offset and
  drawer behaviour are structurally sound but have not been seen rendered.
- The `README.md` is still the `create-next-app` boilerplate.
