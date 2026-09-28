"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";

export function CartLines() {
  const { lines, setQty, removeLine, toggleWishlist, isWishlisted, notify } = useStore();
  const [gift, setGift] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  if (lines.length === 0) {
    return (
      <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-gutter py-space-xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-container">
          <Icon name="shopping_bag" className="text-[28px] text-secondary" />
        </span>
        <h2 className="mt-space-md font-headline-md text-headline-md font-bold uppercase tracking-tight text-primary">
          Your bag is empty
        </h2>
        <p className="mx-auto mt-2 max-w-md font-body-md text-body-md text-on-surface-variant">
          Nothing in here yet. Start with the pieces our community reorders most — most people add
          them twice.
        </p>
        <Link
          href="/shoes"
          className="mt-space-lg inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-transform hover:scale-[1.01]"
        >
          Start shopping
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-outline-variant/40 border-y border-outline-variant/40">
      {lines.map((line) => (
        <li key={line.key} className="py-space-md first:pt-0 last:pb-0">
          <div className="flex gap-space-md">
            <Link
              href={`/shoes/${line.slug}`}
              className="relative h-32 w-24 shrink-0 overflow-hidden rounded-md bg-surface-container sm:h-40 sm:w-32"
            >
              <Image
                src={line.image}
                alt={line.imageAlt}
                fill
                sizes="128px"
                className="object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="min-w-0">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    {line.kindLabel}
                  </span>
                  <h3 className="truncate font-headline-sm text-headline-sm font-semibold text-primary">
                    <Link href={`/shoes/${line.slug}`} className="hover:underline">
                      {line.name}
                    </Link>
                  </h3>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-headline-sm text-headline-sm font-bold text-primary">
                    {formatPrice(line.unitPrice * line.qty)}
                  </p>
                  {line.qty > 1 && (
                    <p className="font-body-sm text-body-sm text-secondary">
                      {formatPrice(line.unitPrice)} each
                    </p>
                  )}
                  {line.mrp > line.unitPrice && (
                    <p className="font-body-sm text-body-sm text-secondary line-through">
                      {formatPrice(line.mrp * line.qty)}
                    </p>
                  )}
                </div>
              </div>

              <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex gap-1.5">
                  <dt className="text-secondary">Size:</dt>
                  <dd>{line.size}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-secondary">Colour:</dt>
                  <dd>{line.colorway}</dd>
                </div>
              </dl>

              <p
                className={`mt-1 flex items-center gap-1.5 font-body-sm text-body-sm ${
                  line.stockNote.startsWith("Low") || line.stockNote.startsWith("Currently")
                    ? "text-error"
                    : "text-emerald-700"
                }`}
              >
                <Icon
                  name={
                    line.stockNote.startsWith("Low")
                      ? "warning"
                      : line.stockNote.startsWith("Currently")
                        ? "error"
                        : "check_circle"
                  }
                  className="text-[14px]"
                />
                {line.stockNote}
              </p>

              {/* controls */}
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-space-sm">
                <div className="flex h-10 items-center rounded-full border border-outline-variant">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${line.name}`}
                    onClick={() => setQty(line.key, line.qty - 1)}
                    className="flex h-full w-9 items-center justify-center rounded-l-full text-primary transition-colors hover:bg-surface-container"
                  >
                    <Icon name="remove" className="text-[16px]" />
                  </button>
                  <span className="w-7 text-center font-label-md text-label-md" aria-live="polite">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${line.name}`}
                    disabled={line.qty >= line.maxQty}
                    onClick={() => setQty(line.key, line.qty + 1)}
                    className="flex h-full w-9 items-center justify-center rounded-r-full text-primary transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:text-secondary/40 disabled:hover:bg-transparent"
                  >
                    <Icon name="add" className="text-[16px]" />
                  </button>
                </div>
                {line.qty >= line.maxQty && (
                  <span className="font-body-sm text-body-sm text-secondary">
                    Max available
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!isWishlisted(line.slug)) toggleWishlist(line.slug);
                    removeLine(line.key);
                    notify(`${line.name} moved to your wishlist`);
                  }}
                  className="font-label-md text-label-md uppercase tracking-widest text-secondary underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  Save for later
                </button>

                <button
                  type="button"
                  onClick={() => {
                    removeLine(line.key);
                    notify(`${line.name} removed from your bag`);
                  }}
                  className="font-label-md text-label-md uppercase tracking-widest text-secondary underline-offset-4 transition-colors hover:text-error hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* gift + note */}
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex cursor-pointer items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-xs border transition-colors ${
                      gift[line.key] ? "border-primary bg-primary text-on-primary" : "border-outline-variant"
                    }`}
                  >
                    {gift[line.key] && <Icon name="check" className="text-[12px]" />}
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(gift[line.key])}
                    onChange={() => setGift((g) => ({ ...g, [line.key]: !g[line.key] }))}
                    className="sr-only"
                  />
                  Add gift wrap &amp; a handwritten note (₹149)
                </label>

                {gift[line.key] && (
                  <input
                    value={notes[line.key] ?? ""}
                    onChange={(e) => setNotes((n) => ({ ...n, [line.key]: e.target.value }))}
                    placeholder="What should we write?"
                    aria-label={`Gift note for ${line.name}`}
                    className="h-10 w-full max-w-sm rounded-md border border-outline-variant bg-surface-container-lowest px-3 font-body-sm text-body-sm outline-none focus:border-primary"
                  />
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
