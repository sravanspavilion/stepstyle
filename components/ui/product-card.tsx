import Image from "next/image";

import type { Product } from "@/lib/catalog";

import { StarRow } from "./icon";
import { ProductCardActions } from "./product-card-actions";
import { BadgeChip, ColorDots, Link, PriceRow } from "./primitives";
import { WishlistToggle } from "./wishlist-toggle";

export function ProductCard({
  product,
  className = "",
  showActions = true,
  priority = false,
}: {
  product: Product;
  className?: string;
  showActions?: boolean;
  priority?: boolean;
}) {
  const [primary, secondary] = product.gallery;
  const inStock = product.sizes.some((s) => s.stock > 0);

  return (
    <article className={`group flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-surface-container">
        <Link
          href={`/shoes/${product.slug}`}
          className="relative block aspect-4/5 w-full"
          aria-label={product.name}
        >
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {product.badges.slice(0, 2).map((badge, i) => (
          <BadgeChip
            key={badge.label}
            label={badge.label}
            tone={badge.tone}
            className={i === 0 ? "top-2.5 left-2.5" : "top-11 left-2.5"}
          />
        ))}

        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistToggle
            slug={product.slug}
            label={`Save ${product.name} to Wishlist`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-lowest/85 text-primary backdrop-blur-md transition-colors hover:text-error"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="min-w-0">
            <h3 className="truncate font-headline-sm text-headline-sm font-semibold text-primary">
              <Link href={`/shoes/${product.slug}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="truncate font-body-sm text-body-sm text-secondary">{product.variant}</p>
          </div>
          <ColorDots colors={product.colorways} />
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <StarRow rating={product.rating} iconClass="text-[14px]" />
          <span className="font-body-sm text-body-sm text-secondary">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <PriceRow price={product.price} mrp={product.mrp} className="mt-2" />

        {showActions && (
          <ProductCardActions
            slug={product.slug}
            name={product.name}
            inStock={inStock}
            className="mt-3"
          />
        )}
      </div>
    </article>
  );
}
