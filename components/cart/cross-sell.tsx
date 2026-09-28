"use client";

import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { careAddOns } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";

type AddOn = { id: string; name: string; variant: string; price: number; tag: string; image: string; alt: string };

export function CrossSell() {
  const [added, setAdded] = useState<string[]>([]);
  const { notify } = useStore();

  const items: AddOn[] = careAddOns.map((c) => ({ ...c }));

  function add(item: AddOn) {
    setAdded((prev) => [...prev, item.id]);
    notify(`${item.name} added to your bag`);
    window.setTimeout(() => setAdded((prev) => prev.filter((id) => id !== item.id)), 2000);
  }

  return (
    <section className="mt-space-xl">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
            Add to your order
          </span>
          <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-tight text-primary">
            Care &amp; essentials
          </h2>
        </div>
        <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
          Everything below ships in the same carton — no second delivery fee.
        </p>
      </div>

      <ul className="mt-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-3">
        {items.map((item) => {
          const isAdded = added.includes(item.id);
          return (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-container-lowest"
            >
              <Link
                href="/shoes"
                className="group relative aspect-4/3 w-full overflow-hidden bg-surface-container"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-primary px-2.5 py-0.5 font-label-sm text-label-sm uppercase tracking-wider text-on-primary">
                  {item.tag}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-gutter">
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  {item.name}
                </h3>
                <p className="mt-0.5 font-body-sm text-body-sm text-secondary">{item.variant}</p>
                <p className="mt-2 font-label-lg text-label-lg text-primary">
                  {formatPrice(item.price)}
                </p>

                <button
                  type="button"
                  onClick={() => add(item)}
                  className={`mt-auto flex h-10 w-full items-center justify-center gap-1.5 rounded-full border font-label-md text-label-md uppercase tracking-widest transition-colors ${
                    isAdded
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-primary text-primary hover:bg-primary hover:text-on-primary"
                  }`}
                >
                  <Icon name={isAdded ? "check" : "add_shopping_cart"} className="text-[16px]" />
                  {isAdded ? "Added" : "Add to Bag"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
