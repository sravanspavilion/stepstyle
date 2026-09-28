"use client";

import { useStore } from "@/lib/store";

import { Icon } from "./icon";

export function WishlistToggle({
  slug,
  className = "",
  label = "Add to Wishlist",
}: {
  slug: string;
  className?: string;
  label?: string;
}) {
  const { isWishlisted, toggleWishlist, ready } = useStore();
  const active = isWishlisted(slug);

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={ready ? active : false}
      title={active ? "Remove from Wishlist" : "Add to Wishlist"}
      onClick={() => toggleWishlist(slug)}
      className={`flex items-center justify-center rounded-full transition-colors hover:text-error ${
        active ? "text-error" : "text-primary"
      } ${className}`}
    >
      <Icon name="favorite" fill={active ? 1 : 0} className="text-[18px]" />
    </button>
  );
}
