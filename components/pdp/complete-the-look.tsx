"use client";

import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { completeTheLook, getProducts, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";

export function CompleteTheLook({ product }: { product: Product }) {
  const { addBundle } = useStore();
  const [added, setAdded] = useState(false);

  const addons = getProducts(completeTheLook.addons).filter((p) => p.id !== product.id);
  const list = [product, ...addons];
  const gross = list.reduce((sum, p) => sum + p.price, 0);
  const net = Math.max(0, gross - completeTheLook.bundleSaving);

  function addAll() {
    addBundle(list);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <section className="bg-surface-container-low py-space-xl">
      <div className="mx-auto max-w-[1600px] px-gutter-mobile md:px-margin">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
              {completeTheLook.eyebrow}
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
              {completeTheLook.title}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-label-md text-label-md uppercase tracking-widest text-on-primary">
            <Icon name="sell" className="text-[16px]" />
            {completeTheLook.badge}
          </span>
        </div>

        <div className="mt-space-xl grid grid-cols-1 gap-space-lg lg:grid-cols-[1fr_360px] lg:items-start">
          <ul className="grid grid-cols-2 gap-space-md sm:grid-cols-3">
            {list.map((item, i) => (
              <li key={item.id} className="flex flex-col">
                <Link
                  href={`/shoes/${item.slug}`}
                  className="group relative aspect-4/5 overflow-hidden rounded-lg bg-surface-container-lowest"
                >
                  <Image
                    src={item.gallery[0].src}
                    alt={item.gallery[0].alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {i === 0 && (
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-primary px-2.5 py-0.5 font-label-sm text-label-sm uppercase tracking-wider text-on-primary">
                      In this bundle
                    </span>
                  )}
                </Link>
                <h3 className="mt-3 truncate font-headline-sm text-headline-sm font-semibold text-primary">
                  {item.name}
                </h3>
                <p className="truncate font-body-sm text-body-sm text-secondary">{item.variant}</p>
                <p className="mt-1 font-label-lg text-label-lg text-primary">
                  {formatPrice(item.price)}
                </p>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-gutter">
            <h3 className="font-label-md text-label-md uppercase tracking-widest text-secondary">
              Bundle summary
            </h3>

            <ul className="mt-space-md divide-y divide-outline-variant/40 border-y border-outline-variant/40">
              {list.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-space-sm py-2.5">
                  <span className="truncate font-body-sm text-body-sm text-on-surface-variant">
                    {item.name}
                  </span>
                  <span className="shrink-0 font-body-sm text-body-sm text-primary">
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-space-sm py-2.5">
                <span className="font-label-md text-label-md uppercase tracking-widest text-error">
                  Bundle saving
                </span>
                <span className="font-label-md text-label-md uppercase tracking-widest text-error">
                  &minus;{formatPrice(completeTheLook.bundleSaving)}
                </span>
              </li>
            </ul>

            <div className="mt-space-md flex items-end justify-between">
              <span className="font-body-sm text-body-sm text-secondary">Bundle total</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">
                {formatPrice(net)}
              </span>
            </div>

            <button
              type="button"
              onClick={addAll}
              className="mt-space-md h-12 w-full rounded-full bg-primary font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-transform hover:scale-[1.01]"
            >
              {added ? "Added to Bag" : "Add Bundle to Bag"}
            </button>

            <p className="mt-3 text-center font-body-sm text-body-sm text-secondary">
              or buy pieces separately for {formatPrice(gross)}
            </p>

            <Link
              href="/cart"
              className="mt-3 block text-center font-label-md text-label-md uppercase tracking-widest text-primary underline-offset-4 hover:underline"
            >
              View bag
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
