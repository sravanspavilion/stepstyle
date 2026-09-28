"use client";

import { useState } from "react";

import { Icon, StarRow } from "@/components/ui/icon";
import { Link, SectionHeading } from "@/components/ui/primitives";
import type { Product } from "@/lib/catalog";

const TABS = [
  { id: "craft", label: "Craftsmanship" },
  { id: "care", label: "Care Guide" },
  { id: "specs", label: "Size & Materials" },
  { id: "reviews", label: "Reviews" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function DetailTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabId>("craft");

  return (
    <section className="mx-auto max-w-[1600px] px-gutter-mobile py-space-xl md:px-margin">
      <SectionHeading
        eyebrow="Under the surface"
        title="Built to be taken apart"
        copy="Every component is specified, sourced and traceable. No mystery glue, no mystery foam."
      />

      <div
        role="tablist"
        aria-label="Product detail"
        className="scrollbar-none mt-space-lg flex gap-2 overflow-x-auto border-b border-outline-variant/50"
      >
        {TABS.map((tab) => {
          const on = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={on}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`-mb-px shrink-0 border-b-2 px-4 py-3 font-label-md text-label-md uppercase tracking-widest transition-colors ${
                on
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="pt-space-lg"
      >
        {active === "craft" && <CraftPanel product={product} />}
        {active === "care" && <CarePanel product={product} />}
        {active === "specs" && <SpecsPanel product={product} />}
        {active === "reviews" && <ReviewsPanel product={product} />}
      </div>
    </section>
  );
}

function CraftPanel({ product }: { product: Product }) {
  return (
    <ul className="grid grid-cols-1 gap-space-md md:grid-cols-2">
      {product.specs.map((spec) => (
        <li key={spec.title} className="flex gap-space-md rounded-lg bg-surface-container-low p-gutter">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
            <Icon name={spec.icon} className="text-[22px]" />
          </span>
          <div>
            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
              {spec.title}
            </h3>
            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{spec.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CarePanel({ product }: { product: Product }) {
  return (
    <ol className="grid grid-cols-1 gap-space-md md:grid-cols-3">
      {product.care.map((step) => (
        <li key={step.step} className="rounded-lg border border-outline-variant/50 p-gutter">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-[0.25em] text-secondary">
            {step.step}
          </span>
          <h3 className="mt-2 font-headline-sm text-headline-sm font-semibold text-primary">
            {step.title}
          </h3>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

function SpecsPanel({ product }: { product: Product }) {
  const rows = [
    ["SKU", product.sku],
    ["Department", product.department],
    ["Collection", product.collection],
    ["Silhouette", product.silhouette],
    ["Primary material", product.material],
    ["Also made from", product.materials.slice(1).join(", ") || "—"],
    ["Colourways", product.colorways.map((c) => c.name).join(", ")],
    ["Sizes stocked", product.sizes.map((s) => s.label).join(", ")],
  ];

  return (
    <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
      <dl className="divide-y divide-outline-variant/40 border-y border-outline-variant/40">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-3 gap-space-sm py-3">
            <dt className="font-label-md text-label-md uppercase tracking-widest text-secondary">
              {label}
            </dt>
            <dd className="col-span-2 font-body-md text-body-md text-on-surface">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-lg bg-surface-container-low p-gutter">
        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
          Colours in this run
        </h3>
        <ul className="mt-space-sm flex flex-wrap gap-2">
          {product.colorways.map((c) => (
            <li
              key={c.name}
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/60 px-3 py-1.5 font-body-sm text-body-sm text-on-surface"
            >
              <span
                aria-hidden="true"
                className="h-4 w-4 rounded-full border border-outline-variant/60"
                style={{ backgroundColor: c.hex }}
              />
              {c.name}
            </li>
          ))}
        </ul>

        <h3 className="mt-space-lg font-headline-sm text-headline-sm font-semibold text-primary">
          Materials
        </h3>
        <ul className="mt-space-sm space-y-2">
          {product.materials.map((m) => (
            <li key={m} className="flex items-start gap-2">
              <Icon name="eco" className="mt-0.5 text-[16px] text-emerald-700" />
              <span className="font-body-md text-body-md text-on-surface-variant">{m}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/shoes"
          className="mt-space-lg inline-flex items-center gap-2 font-label-lg text-label-lg uppercase tracking-wider text-primary underline-offset-4 hover:underline"
        >
          Compare with the full range
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </div>
  );
}

function ReviewsPanel({ product }: { product: Product }) {
  const distribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div id="reviews" className="grid grid-cols-1 gap-space-xl lg:grid-cols-3">
      <div className="rounded-lg bg-surface-container-low p-gutter">
        <p className="font-display text-display font-semibold tracking-tight text-primary">
          {product.rating.toFixed(1)}
        </p>
        <StarRow rating={product.rating} iconClass="text-[20px]" />
        <p className="mt-1 font-body-sm text-body-sm text-secondary">
          Based on {product.reviewCount} verified purchases
        </p>

        <ul className="mt-space-md space-y-2">
          {distribution.map((row) => (
            <li key={row.stars} className="flex items-center gap-2">
              <span className="w-3 font-body-sm text-body-sm text-secondary">{row.stars}</span>
              <Icon name="star" fill={1} className="text-[14px] text-amber-500" />
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-container-highest">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${row.pct}%` }}
                />
              </span>
              <span className="w-8 text-right font-body-sm text-body-sm text-secondary">
                {row.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-space-md lg:col-span-2">
        {product.reviews.map((review) => (
          <li key={review.author} className="border-b border-outline-variant/40 pb-space-md last:border-0">
            <div className="flex items-center justify-between gap-space-sm">
              <StarRow rating={review.rating} iconClass="text-[16px]" />
              <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-widest text-emerald-700">
                <Icon name="verified" className="text-[14px]" />
                Verified buyer
              </span>
            </div>
            <blockquote className="mt-2 font-body-md text-body-md text-on-surface">
              {review.quote}
            </blockquote>
            <p className="mt-2 font-body-sm text-body-sm text-secondary">
              <strong className="text-primary">{review.author}</strong> &middot; {review.meta}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
