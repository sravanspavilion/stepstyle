"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { discountPercent, productBySlug, promo as PROMO, type Product } from "./catalog";

export type CartLine = {
  /** `${productId}::${size}::${colorway}` — stable key for merging quantities */
  key: string;
  productId: string;
  slug: string;
  name: string;
  size: string;
  colorway: string;
  image: string;
  imageAlt: string;
  unitPrice: number;
  mrp: number;
  qty: number;
  /** Units of this size the warehouse will actually release (stock, capped at 10). */
  maxQty: number;
  kindLabel: string;
  stockNote: string;
};

export type ResolvedCartLine = CartLine & {
  discount: number;
  lineTotal: number;
  lineSavings: number;
};

export type PromoState = { code: string; label: string } | null;

type Snapshot = {
  lines: CartLine[];
  wishlist: string[];
  promo: PromoState;
};

type StoreValue = {
  lines: CartLine[];
  resolved: ResolvedCartLine[];
  /** total number of units in the bag */
  itemCount: number;
  wishlist: string[];
  promo: PromoState;
  /** sum of discounted line totals, before promo + delivery */
  subtotal: number;
  productSavings: number;
  promoDiscount: number;
  deliveryFee: number;
  totalSavings: number;
  total: number;
  /** false during SSR + the first client render, true once localStorage is read */
  ready: boolean;

  addToCart: (
    product: Product,
    options?: { size?: string; colorway?: string; qty?: number },
  ) => void;
  /**
   * Slug-only variant for product cards. A card would otherwise have to ship
   * the whole product (gallery, specs, care, reviews) into the client bundle
   * just to power its quick-add button.
   */
  addBySlug: (slug: string, options?: { qty?: number }) => void;
  addBundle: (products: Product[], options?: { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  notify: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "stepstyle.cart.v1";
const WISHLIST_KEY = "stepstyle.wishlist.v1";
const PROMO_KEY = "stepstyle.promo.v1";
const CHANGE_EVENT = "stepstyle:store";

/** Hard ceiling on a single line, independent of per-size stock. */
const MAX_LINE_QTY = 10;

/**
 * The Stitch cart mock shipped with two pre-filled lines. Seeding keeps
 * `/cart` (and the header badges) looking like the approved design on a first
 * visit. Delete this block for a genuinely empty store.
 */
const SEED_LINES: CartLine[] = [
  {
    key: "p-01::UK 9 (Men)::Chalk White / Natural Gum",
    productId: "p-01",
    slug: "classic-minimalist-leather-sneaker",
    name: "Classic Minimalist Leather Sneaker",
    size: "UK 9 (Men)",
    colorway: "Chalk White / Natural Gum",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCnkrx_74foN747KZiEewcqKOSUzKZKgv_xZI43N10sV-yWxwAlUe--0WCt4arLk5MwFdOpnYwOdnV9e61DFaffSRLk4BXkwxzZj1UQW4XepqQIiHxU8vaWU0Zx-58PDzMEcu6bv3vm9YBrcCwo1pHsF5o9uoPr7m9rZ8gLyVpNSdtLGeE8TeWhgpN6fOEF61utn8ciQ1N27Svsg5NQ05DFEx4Vn7EulxpFXajyaFUxMBLjgUkaG63zA",
    imageAlt: "White leather minimalist sneaker with natural gum sole",
    unitPrice: 2499,
    mrp: 3499,
    qty: 1,
    maxQty: 10,
    kindLabel: "Sneaker",
    stockNote: "In Stock • Ready for dispatch today",
  },
  {
    key: "p-09::L (Regular Fit)::Moss Green",
    productId: "p-09",
    slug: "heavy-linen-field-overshirt",
    name: "Heavy Linen Field Overshirt",
    size: "L (Regular Fit)",
    colorway: "Moss Green",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBvVjHbbaaPkqNLAeietRXIHCss7wRkGKFPBjrCryBxjXW-jPhlyI7DDpEnWtZ0gMRQCjDMcAzylmMJ2gApkXfMxwvc5W1fpLBm-5-orIvshMJnvkULLeo9TAwWHwZ0IPez2ilFIcxFT4D1StGrlY85pidot-t0aL7Fg3nrvUXS5jNkEYyGf9vTBVKfs6JrOS4iEbGVGD-mAy0Zoyqe6nIhr4SbyEHoUXM4KvYVEK0YrY3pqrQ0sB5w",
    imageAlt: "Heavyweight olive moss linen overshirt folded on a stone pedestal",
    unitPrice: 2199,
    mrp: 2899,
    qty: 1,
    maxQty: 10,
    kindLabel: "Apparel",
    stockNote: "Low Stock • Only 3 pieces left in UK Warehouse",
  },
];

const SEED_WISHLIST = ["milano-suede-penny-loafer", "veloce-carbon-knit-trainer"];

const DEFAULT_PROMO: PromoState = { code: PROMO.code, label: PROMO.label };

/** Rendered on the server and for the hydration pass; identical on both. */
const SERVER_SNAPSHOT: Snapshot = {
  lines: SEED_LINES,
  wishlist: SEED_WISHLIST,
  promo: DEFAULT_PROMO,
};

/* ---------------------------------------------------------------------------
   localStorage is the external system. `useSyncExternalStore` reads it during
   render (server snapshot = the seeds, so hydration matches) and every mutation
   writes through and bumps the version counter.
--------------------------------------------------------------------------- */

let cache: Snapshot | null = null;
const listeners = new Set<() => void>();

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode — the store simply stops persisting */
  }
}

/**
 * `getSnapshot` for `useSyncExternalStore`, so it MUST return an `Object.is`-
 * stable value while nothing has changed. Returning a freshly-built object here
 * makes React see a change on every render and re-render forever. The cache is
 * invalidated only by `commit()` (which installs the next snapshot directly) and
 * by the cross-tab `storage` handler.
 */
function readSnapshot(): Snapshot {
  if (cache === null) {
    cache = {
      lines: readJSON<CartLine[]>(CART_KEY, SEED_LINES),
      wishlist: readJSON<string[]>(WISHLIST_KEY, SEED_WISHLIST),
      promo: readJSON<PromoState>(PROMO_KEY, DEFAULT_PROMO),
    };
  }
  return cache;
}

function subscribe(onChange: () => void) {
  const onStorage = () => {
    cache = null;
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(next: Snapshot) {
  writeJSON(CART_KEY, next.lines);
  writeJSON(WISHLIST_KEY, next.wishlist);
  writeJSON(PROMO_KEY, next.promo);
  cache = next;
  listeners.forEach((l) => l());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

/** Always a fresh read — mutation handlers cannot rely on React's render state. */
function current(): Snapshot {
  return readSnapshot();
}

function lineKey(productId: string, size: string, colorway: string) {
  return `${productId}::${size}::${colorway}`;
}

function toLine(product: Product, size: string, colorway: string, qty: number): CartLine {
  return {
    key: lineKey(product.id, size, colorway),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    size,
    colorway,
    image: product.gallery[0].src,
    imageAlt: product.gallery[0].alt,
    unitPrice: product.price,
    mrp: product.mrp,
    qty,
    maxQty: capFor(product, size),
    kindLabel: kindLabelFor(product),
    stockNote: stockNoteFor(product),
  };
}

function defaultSize(product: Product) {
  const inStock = product.sizes.find((s) => s.stock > 0);
  return (inStock ?? product.sizes[0])?.label ?? "One Size";
}

/** How many units of `size` may sit in the bag, capped at 10 per line. */
function capFor(product: Product, size: string) {
  const stock = product.sizes.find((s) => s.label === size)?.stock ?? 0;
  return Math.max(1, Math.min(stock, MAX_LINE_QTY));
}

function kindLabelFor(product: Product) {
  if (product.kind === "footwear") return product.silhouette.replace(/s$/, "");
  return product.kind === "apparel" ? "Apparel" : "Accessory";
}

function stockNoteFor(product: Product) {
  const total = product.sizes.reduce((sum, s) => sum + s.stock, 0);
  if (total === 0) return "Currently Unavailable";
  if (total <= 12) return `Low Stock • Only ${total} pieces left in UK Warehouse`;
  return "In Stock • Ready for dispatch today";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => SERVER_SNAPSHOT);
  // `false` on the server and for the hydration render, `true` afterwards — lets
  // the header and cart page render a stable "0" until the real counts land.
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = useCallback<StoreValue["addToCart"]>(
    (product, options) => {
      const size = options?.size ?? defaultSize(product);
      const colorway = options?.colorway ?? product.colorways[0]?.name ?? "Default";
      const qty = options?.qty ?? 1;
      const key = lineKey(product.id, size, colorway);

      // A sold-out size has no cap to offer — refuse rather than fake a line.
      if (product.sizes.find((s) => s.label === size)?.stock === 0) {
        notify(`${size} is sold out`);
        return;
      }

      const limit = capFor(product, size);
      const prev = current();
      const existing = prev.lines.find((l) => l.key === key);
      const lines = existing
        ? prev.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, limit) } : l))
        : [...prev.lines, toLine(product, size, colorway, Math.min(qty, limit))];

      commit({ ...prev, lines });
      notify(`${product.name} added to your bag`);
    },
    [notify],
  );

  const addBySlug = useCallback<StoreValue["addBySlug"]>(
    (slug, options) => {
      const product = productBySlug.get(slug);
      if (!product) {
        notify("That product is no longer available");
        return;
      }
      addToCart(product, { qty: options?.qty ?? 1 });
    },
    [addToCart, notify],
  );

  const addBundle = useCallback<StoreValue["addBundle"]>(
    (bundleProducts, options) => {
      const qty = options?.qty ?? 1;
      const prev = current();
      const lines = [...prev.lines];

      for (const product of bundleProducts) {
        const size = defaultSize(product);
        const colorway = product.colorways[0]?.name ?? "Default";
        const key = lineKey(product.id, size, colorway);
        const index = lines.findIndex((l) => l.key === key);
        if (index >= 0) {
          const limit = capFor(product, size);
          lines[index] = { ...lines[index], qty: Math.min(lines[index].qty + qty, limit) };
        } else {
          lines.push(toLine(product, size, colorway, qty));
        }
      }

      commit({ ...prev, lines });
      notify(
        bundleProducts.length > 1
          ? `Bundle of ${bundleProducts.length} items added to your bag`
          : `${bundleProducts[0].name} added to your bag`,
      );
    },
    [notify],
  );

  const setQty = useCallback((key: string, qty: number) => {
    const prev = current();
    const lines = prev.lines
      .map((l) =>
        l.key === key
          ? { ...l, qty: Math.max(0, Math.min(qty, l.maxQty ?? MAX_LINE_QTY)) }
          : l,
      )
      .filter((l) => l.qty > 0);
    commit({ ...prev, lines });
  }, []);

  const removeLine = useCallback((key: string) => {
    const prev = current();
    commit({ ...prev, lines: prev.lines.filter((l) => l.key !== key) });
  }, []);

  const clearCart = useCallback(() => commit({ ...current(), lines: [] }), []);

  const toggleWishlist = useCallback(
    (slug: string) => {
      const prev = current();
      const has = prev.wishlist.includes(slug);
      commit({
        ...prev,
        wishlist: has ? prev.wishlist.filter((s) => s !== slug) : [...prev.wishlist, slug],
      });
      notify(has ? "Removed from Wishlist" : "Saved to Wishlist");
    },
    [notify],
  );

  const isWishlisted = useCallback(
    (slug: string) => snapshot.wishlist.includes(slug),
    [snapshot.wishlist],
  );

  const applyPromo = useCallback(
    (code: string) => {
      if (code.trim().toUpperCase() === PROMO.code) {
        commit({ ...current(), promo: { code: PROMO.code, label: PROMO.label } });
        notify(`${PROMO.code} applied to your order`);
        return true;
      }
      notify("That promo code is not valid");
      return false;
    },
    [notify],
  );

  const removePromo = useCallback(() => {
    commit({ ...current(), promo: null });
    notify("Promo code removed");
  }, [notify]);

  const totals = useMemo(() => {
    const resolved: ResolvedCartLine[] = snapshot.lines.map((line) => ({
      ...line,
      discount: discountPercent(line.unitPrice, line.mrp),
      lineTotal: line.unitPrice * line.qty,
      lineSavings: (line.mrp - line.unitPrice) * line.qty,
    }));

    const itemCount = snapshot.lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = resolved.reduce((sum, l) => sum + l.lineTotal, 0);
    const productSavings = resolved.reduce((sum, l) => sum + l.lineSavings, 0);
    // The design shows a flat 10% off the discounted subtotal, and delivery is
    // free once there is anything in the bag.
    const promoDiscount = snapshot.promo ? Math.round(subtotal * 0.1) : 0;
    const deliveryFee = 0;
    const total = Math.max(0, subtotal - promoDiscount) + deliveryFee;
    const totalSavings = productSavings + promoDiscount;

    return { resolved, itemCount, subtotal, productSavings, promoDiscount, deliveryFee, totalSavings, total };
  }, [snapshot]);

  const value = useMemo<StoreValue>(
    () => ({
      lines: snapshot.lines,
      resolved: totals.resolved,
      itemCount: totals.itemCount,
      wishlist: snapshot.wishlist,
      promo: snapshot.promo,
      subtotal: totals.subtotal,
      productSavings: totals.productSavings,
      promoDiscount: totals.promoDiscount,
      deliveryFee: totals.deliveryFee,
      totalSavings: totals.totalSavings,
      total: totals.total,
      ready,
      addToCart,
      addBySlug,
      addBundle,
      setQty,
      removeLine,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyPromo,
      removePromo,
      notify,
    }),
    [
      snapshot,
      totals,
      ready,
      addToCart,
      addBySlug,
      addBundle,
      setQty,
      removeLine,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyPromo,
      removePromo,
      notify,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-on-primary shadow-2xl transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <span className="material-symbols-outlined text-[20px] text-emerald-400">
          check_circle
        </span>
        <span className="font-body-sm text-body-sm font-medium">{toast?.message ?? ""}</span>
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
