"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon, StarRow } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { SizeGuideModal } from "@/components/ui/size-guide-modal";
import { WishlistToggle } from "@/components/ui/wishlist-toggle";
import { discountPercent, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";

const deliveryRows = [
  { icon: "local_shipping", title: "Dispatch today", copy: "Free express over ₹999" },
  { icon: "published_with_changes", title: "7-day returns", copy: "Free doorstep pickup" },
  { icon: "payments", title: "Cash on delivery", copy: "Plus UPI, cards & net banking" },
  { icon: "verified_user", title: "1-year warranty", copy: "Free repair on craft defects" },
];

export function BuyPanel({ product }: { product: Product }) {
  const { addToCart, notify } = useStore();
  const router = useRouter();
  const [colorway, setColorway] = useState(product.colorways[0]?.name ?? "");
  // Deliberately unselected: a preselected size hides the "pick a size" nudge
  // and makes low-stock warnings look like a fault.
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeState, setPincodeState] = useState<"idle" | "ok" | "error">("idle");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const selected = product.sizes.find((s) => s.label === size);
  const off = discountPercent(product.price, product.mrp);
  // The stepper must not promise more units than the warehouse will release.
  const maxQty = selected ? Math.max(1, Math.min(10, selected.stock)) : 10;

  function add() {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, { size, colorway, qty });
  }

  function buyNow() {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, { size, colorway, qty });
    router.push("/cart");
  }

  function checkPincode() {
    if (/^\d{6}$/.test(pincode.trim())) {
      setPincodeState("ok");
      notify(`Delivery confirmed for ${pincode.trim()}`);
    } else {
      setPincodeState("error");
    }
  }

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
      <span className="font-label-sm text-label-sm font-bold uppercase tracking-[0.25em] text-secondary">
        {product.collection}
      </span>

      <h1 className="mt-2 font-headline-lg text-headline-lg font-bold uppercase leading-tight tracking-tight text-primary">
        {product.name}
      </h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
        {product.descriptor}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <StarRow rating={product.rating} iconClass="text-[18px]" />
        <a
          href="#reviews"
          className="font-body-sm text-body-sm text-on-surface-variant underline-offset-4 hover:text-primary hover:underline"
        >
          {product.rating.toFixed(1)} &middot; {product.reviewCount} reviews
        </a>
        <span className="font-body-sm text-body-sm text-secondary">SKU {product.sku}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        <span className="font-body-md text-body-md text-secondary line-through">
          {formatPrice(product.mrp)}
        </span>
        {off > 0 && (
          <span className="rounded-full bg-primary px-2.5 py-1 font-label-md text-label-md uppercase tracking-widest text-on-primary">
            {off}% off
          </span>
        )}
      </div>
      <p className="mt-1 font-body-sm text-body-sm text-secondary">
        Inclusive of all taxes &middot; 10% off with FIRSTSTEP10
      </p>

      {/* colourways */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-label-md text-label-md uppercase tracking-widest text-secondary">
            Colour
          </h2>
          <span className="font-body-sm text-body-sm text-on-surface">{colorway}</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {product.colorways.map((c) => {
            const on = c.name === colorway;
            return (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => setColorway(c.name)}
                  aria-label={c.name}
                  aria-pressed={on}
                  title={c.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                    on ? "border-primary ring-1 ring-primary ring-offset-2" : "border-outline-variant"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {c.accent && (
                    <span
                      aria-hidden="true"
                      className="ml-auto h-2.5 w-2.5 self-end rounded-full"
                      style={{ backgroundColor: c.accent }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* sizes */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-label-md text-label-md uppercase tracking-widest text-secondary">
            Size
          </h2>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-primary underline-offset-4 hover:underline"
          >
            <Icon name="straighten" className="text-[16px]" />
            Size Guide
          </button>
        </div>

        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {product.sizes.map((s) => {
            const on = s.label === size;
            const dead = s.stock === 0;
            return (
              <li key={s.label}>
                <button
                  type="button"
                  disabled={dead}
                  onClick={() => {
                    setSize(s.label);
                    setSizeError(false);
                    // A smaller size may not honour the quantity already picked.
                    if (s.stock > 0) setQty((q) => Math.min(q, Math.max(1, Math.min(10, s.stock))));
                  }}
                  aria-pressed={on}
                  className={`relative h-11 w-full rounded-md border font-label-md text-label-md uppercase tracking-wider transition-colors ${
                    on
                      ? "border-primary bg-primary text-on-primary"
                      : dead
                        ? "cursor-not-allowed border-outline-variant/50 text-secondary/50 line-through"
                        : "border-outline-variant text-primary hover:border-primary"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        {!size && !sizeError && (
          <p className="mt-2 flex items-center gap-1.5 font-body-sm text-body-sm text-secondary">
            <Icon name="info" className="text-[16px]" />
            Select a size to continue
          </p>
        )}
        {sizeError && (
          <p className="mt-2 flex items-center gap-1.5 font-body-sm text-body-sm text-error">
            <Icon name="error" className="text-[16px]" />
            Please select a size first
          </p>
        )}
        {selected && selected.stock > 0 && selected.stock <= 5 && (
          <p className="mt-2 flex items-center gap-1.5 font-body-sm text-body-sm text-error">
            <Icon name="warning" className="text-[16px]" />
            Only {selected.stock} left in this size
          </p>
        )}
        {selected && selected.stock > 5 && (
          <p className="mt-2 flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
            <Icon name="check_circle" className="text-[16px] text-emerald-600" />
            In stock &middot; ready for dispatch today
          </p>
        )}
      </div>

      {/* pincode */}
      <div className="mt-6">
        <label
          htmlFor="pincode"
          className="font-label-md text-label-md uppercase tracking-widest text-secondary"
        >
          Check delivery
        </label>
        <div className="mt-2 flex">
          <input
            id="pincode"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setPincodeState("idle");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") checkPincode();
            }}
            placeholder="6-digit PIN code"
            className="h-11 min-w-0 flex-1 rounded-l-md border border-outline-variant bg-surface-container-lowest px-3 font-body-md text-body-md outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={checkPincode}
            className="h-11 shrink-0 rounded-r-md bg-primary px-5 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-opacity hover:opacity-85"
          >
            Check
          </button>
        </div>
        {pincodeState === "ok" && (
          <p className="mt-2 flex items-center gap-1.5 font-body-sm text-body-sm text-emerald-700">
            <Icon name="check_circle" className="text-[16px]" />
            Delivers by {pincode} in 2&ndash;4 working days
          </p>
        )}
        {pincodeState === "error" && (
          <p className="mt-2 flex items-center gap-1.5 font-body-sm text-body-sm text-error">
            <Icon name="error" className="text-[16px]" />
            Enter a valid 6-digit PIN code
          </p>
        )}
      </div>

      {/* qty + actions */}
      <div className="mt-6 flex flex-wrap items-center gap-space-sm">
        <div className="flex h-12 items-center rounded-full border border-outline-variant">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-11 items-center justify-center rounded-l-full text-primary transition-colors hover:bg-surface-container"
          >
            <Icon name="remove" className="text-[18px]" />
          </button>
          <span className="w-8 text-center font-label-lg text-label-lg" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={qty >= maxQty}
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
            className="flex h-full w-11 items-center justify-center rounded-r-full text-primary transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:text-secondary/40 disabled:hover:bg-transparent"
          >
            <Icon name="add" className="text-[18px]" />
          </button>
        </div>

        <button
          type="button"
          onClick={add}
          className="h-12 flex-1 rounded-full bg-primary px-8 font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-transform hover:scale-[1.01]"
        >
          Add to Bag
        </button>

        <WishlistToggle
          slug={product.slug}
          label={`Save ${product.name} to Wishlist`}
          className="h-12 w-12 border border-outline-variant hover:border-primary"
        />
      </div>

      <button
        type="button"
        onClick={buyNow}
        className="mt-2 h-12 w-full rounded-full border border-primary font-label-lg text-label-lg uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-on-primary"
      >
        Buy Now
      </button>

      {/* highlights */}
      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {product.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <Icon name="check" className="mt-0.5 text-[16px] text-emerald-600" />
            <span className="font-body-sm text-body-sm text-on-surface-variant">{h}</span>
          </li>
        ))}
      </ul>

      {/* delivery rows */}
      <ul className="mt-6 divide-y divide-outline-variant/40 border-y border-outline-variant/40">
        {deliveryRows.map((row) => (
          <li key={row.title} className="flex items-center gap-space-sm py-3">
            <Icon name={row.icon} className="text-[20px] text-secondary" />
            <div className="flex-1">
              <p className="font-label-md text-label-md uppercase tracking-widest text-primary">
                {row.title}
              </p>
              <p className="font-body-sm text-body-sm text-secondary">{row.copy}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-body-sm text-body-sm text-secondary">
        Need help sizing?{" "}
        <Link href="/shoes" className="text-primary underline underline-offset-4">
          Chat with our concierge
        </Link>
        .
      </p>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
