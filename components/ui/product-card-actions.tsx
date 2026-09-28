"use client";

import { Icon } from "./icon";
import { WishlistToggle } from "./wishlist-toggle";
import { useStore } from "@/lib/store";

/**
 * Card footer: quick-add + wishlist. Kept to a slug so a grid of cards does not
 * have to serialise whole products into the client bundle.
 */
export function ProductCardActions({
  slug,
  name,
  inStock = true,
  className = "",
  showButton = true,
}: {
  slug: string;
  name: string;
  inStock?: boolean;
  className?: string;
  showButton?: boolean;
}) {
  const { addBySlug } = useStore();

  return (
    <div className={`flex items-center gap-space-sm ${className}`}>
      {showButton && (
        <button
          type="button"
          disabled={!inStock}
          onClick={() => addBySlug(slug)}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-primary font-label-md text-label-md uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary disabled:cursor-not-allowed disabled:border-outline-variant disabled:text-secondary disabled:hover:bg-transparent"
        >
          <Icon name="shopping_bag" className="text-[16px]" />
          {inStock ? "Add to Bag" : "Sold Out"}
        </button>
      )}
      <WishlistToggle
        slug={slug}
        label={`Save ${name} to Wishlist`}
        className="h-9 w-9 shrink-0 border border-outline-variant/70 hover:border-primary"
      />
    </div>
  );
}
