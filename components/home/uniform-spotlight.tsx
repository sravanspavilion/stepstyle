"use client";

import Image from "next/image";
import { useState } from "react";

import { Icon, StarRow } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { SizeGuideModal } from "@/components/ui/size-guide-modal";
import { getProducts, uniformBundle, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";

export function UniformSpotlight() {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const items = getProducts(uniformBundle.items);
  const bundleTotal = items.reduce((sum, p) => sum + p.price, 0);
  const saleTotal = Math.round(bundleTotal * 0.85);
  const hero = getProducts(["heavy-linen-field-overshirt"])[0];

  return (
    <section className="mx-auto max-w-[1600px] px-gutter-mobile py-space-xl md:px-margin">
      {/* `minmax(0,…)` on the track and `min-w-0` on the column: a grid child
          defaults to `min-width: auto`, so the bundle list's min-content width
          would otherwise push the whole page sideways on mobile. */}
      <div className="grid gap-space-xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div className="relative overflow-hidden rounded-lg bg-surface-container">
          <div className="relative aspect-4/5 w-full sm:aspect-square lg:aspect-4/5">
            {hero && (
              <Image
                src={hero.gallery[1].src}
                alt={hero.gallery[1].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-space-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-white/80">
                Shot on location &middot; Bengaluru
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
            {uniformBundle.eyebrow}
          </span>
          <h2 className="mt-2 font-headline-lg text-headline-lg font-bold uppercase leading-none tracking-tight text-primary">
            {uniformBundle.titleTop}
            <br />
            <span className="text-secondary">{uniformBundle.titleBottom}</span>
            <br />
            {uniformBundle.titleTail}
          </h2>
          <p className="mt-space-md max-w-lg font-body-md text-body-md text-on-surface-variant">
            {uniformBundle.copy}
          </p>

          <ul className="mt-space-lg divide-y divide-outline-variant/40 border-y border-outline-variant/40">
            {items.map((item) => (
              <li key={item.id}>
                <BundleRow product={item} />
              </li>
            ))}
          </ul>

          <div className="mt-space-md flex items-end justify-between gap-space-sm">
            <div>
              <span className="font-body-sm text-body-sm text-secondary line-through">
                {formatPrice(bundleTotal)}
              </span>
              <p className="font-headline-md text-headline-md font-bold text-primary">
                {formatPrice(saleTotal)}
              </p>
            </div>
            <span className="rounded-full bg-primary px-3 py-1.5 font-label-md text-label-md uppercase tracking-widest text-on-primary">
              {uniformBundle.savingLabel}
            </span>
          </div>

          <div className="mt-space-md flex flex-wrap items-center gap-space-sm">
            <BundleAddButton items={items} />
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-outline-variant px-6 font-label-lg text-label-lg uppercase tracking-wider text-primary transition-colors hover:border-primary"
            >
              <Icon name="straighten" className="text-[18px]" />
              Size Guide
            </button>
          </div>

          <div className="mt-space-md flex items-center gap-2">
            <StarRow rating={4.9} />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Rated 4.9 by 2,400+ verified buyers
            </span>
          </div>
        </div>
      </div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </section>
  );
}

function BundleRow({ product }: { product: Product }) {
  return (
    <Link
      href={`/shoes/${product.slug}`}
      className="group flex items-center gap-space-md py-space-md"
    >
      <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface-container">
        <Image
          src={product.gallery[0].src}
          alt={product.gallery[0].alt}
          fill
          sizes="80px"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-headline-sm text-headline-sm font-semibold text-primary group-hover:underline">
          {product.name}
        </span>
        <span className="block truncate font-body-sm text-body-sm text-secondary">
          {product.variant}
        </span>
      </span>
      <span className="shrink-0 font-label-lg text-label-lg text-primary">
        {formatPrice(product.price)}
      </span>
    </Link>
  );
}

function BundleAddButton({ items }: { items: Product[] }) {
  const { addBundle } = useStore();
  return (
    <button
      type="button"
      onClick={() => addBundle(items)}
      className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-transform hover:scale-[1.01] sm:flex-none"
    >
      <Icon name="shopping_bag" className="text-[18px]" />
      Add Bundle to Bag
    </button>
  );
}
