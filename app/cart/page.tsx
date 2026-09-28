import type { Metadata } from "next";

import { CartLines } from "@/components/cart/cart-lines";
import { CrossSell } from "@/components/cart/cross-sell";
import { OrderSummary } from "@/components/cart/order-summary";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review your STEPSTYLE bag, apply a promo code and check out.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-gutter-mobile py-space-lg md:px-margin">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 font-body-sm text-body-sm text-secondary">
          <li>
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <Icon name="chevron_right" className="text-[16px]" />
          </li>
          <li className="font-medium text-primary" aria-current="page">
            Shopping Bag
          </li>
        </ol>
      </nav>

      <div className="mt-space-md flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h1 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
          Shopping Bag
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Free express shipping on every order over ₹999 &middot; 7-day instant returns
        </p>
      </div>

      <div className="mt-space-lg grid grid-cols-1 gap-space-xl lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div>
          <CartLines />
          <CrossSell />
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}
