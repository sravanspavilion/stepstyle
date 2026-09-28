"use client";

import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { BadgeChip } from "@/components/ui/primitives";
import type { Product } from "@/lib/catalog";

export function Gallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const shot = product.gallery[index];

  return (
    <div className="flex flex-col gap-space-sm md:flex-row md:gap-space-md">
      {/* thumbnail rail */}
      <ul
        aria-label="Product images"
        className="scrollbar-none order-2 flex gap-2 overflow-x-auto md:order-1 md:w-20 md:shrink-0 md:flex-col md:overflow-visible"
      >
        {product.gallery.map((g, i) => (
          <li key={g.src} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${g.caption}`}
              aria-current={i === index}
              className={`relative h-20 w-16 overflow-hidden rounded-md border transition-colors md:h-24 md:w-full ${
                i === index
                  ? "border-primary"
                  : "border-outline-variant/50 hover:border-primary"
              }`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* stage */}
      <div className="order-1 min-w-0 flex-1 md:order-2">
        <div
          className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-surface-container"
          onClick={() => setZoomed((z) => !z)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setZoomed((z) => !z);
            }
          }}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
        >
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover transition-transform duration-500 ${
              zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
          />

          {product.badges.map((badge, i) => (
            <BadgeChip
              key={badge.label}
              label={badge.label}
              tone={badge.tone}
              className={i === 0 ? "top-3 left-3" : "top-12 left-3"}
            />
          ))}

          <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-label-sm text-label-sm uppercase tracking-widest text-white backdrop-blur-md">
            <Icon name={zoomed ? "zoom_out" : "zoom_in"} className="text-[14px]" />
            {shot.caption}
          </span>

          {product.gallery.length > 1 && (
            <>
              <StageArrow
                side="left"
                onClick={() => setIndex((i) => (i - 1 + product.gallery.length) % product.gallery.length)}
              />
              <StageArrow
                side="right"
                onClick={() => setIndex((i) => (i + 1) % product.gallery.length)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StageArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous image" : "Next image"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-container-lowest/85 text-primary shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-on-primary md:flex ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <Icon name={side === "left" ? "chevron_left" : "chevron_right"} className="text-[20px]" />
    </button>
  );
}
