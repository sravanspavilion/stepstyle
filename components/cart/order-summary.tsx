"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { promo as PROMO } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";

const payPills = [
  { id: "upi", label: "UPI", icon: "qr_code_2" },
  { id: "card", label: "Cards", icon: "credit_card" },
  { id: "netbanking", label: "Net Banking", icon: "account_balance" },
  { id: "cod", label: "COD", icon: "payments" },
];

const assurances = [
  { icon: "lock", title: "Secure checkout", copy: "256-bit encrypted payments" },
  { icon: "undo", title: "7-day returns", copy: "Free doorstep pickup" },
  { icon: "workspace_premium", title: "Craft warranty", copy: "1-year repair cover" },
];

export function OrderSummary() {
  const {
    subtotal,
    productSavings,
    promoDiscount,
    deliveryFee,
    total,
    totalSavings,
    promo,
    applyPromo,
    removePromo,
    itemCount,
    notify,
  } = useStore();

  const [code, setCode] = useState("");
  const [payWith, setPayWith] = useState("upi");

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
      <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-gutter">
        <h2 className="font-headline-sm text-headline-sm font-bold uppercase tracking-tight text-primary">
          Order summary
        </h2>
        <p className="mt-0.5 font-body-sm text-body-sm text-secondary">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
        </p>

        <ul className="mt-space-md divide-y divide-outline-variant/40 border-y border-outline-variant/40">
          <LedgerRow label={`Subtotal (${itemCount} items)`} value={formatPrice(subtotal)} />
          {productSavings > 0 && (
            <LedgerRow
              label="Product discounts"
              value={`−${formatPrice(productSavings)}`}
              tone="save"
            />
          )}
          {promo ? (
            <li className="flex items-center justify-between gap-space-sm py-3">
              <span className="flex items-center gap-1.5 font-body-md text-body-md text-emerald-700">
                <Icon name="sell" className="text-[16px]" />
                Promo · {promo.code}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-label-lg text-label-lg text-emerald-700">
                  −{formatPrice(promoDiscount)}
                </span>
                <button
                  type="button"
                  onClick={removePromo}
                  aria-label="Remove promo code"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface-container hover:text-error"
                >
                  <Icon name="close" className="text-[14px]" />
                </button>
              </span>
            </li>
          ) : null}
          <li className="flex items-center justify-between gap-space-sm py-3">
            <span className="font-body-md text-body-md text-on-surface">Delivery</span>
            <span className="font-label-lg text-label-lg text-emerald-700">
              {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
            </span>
          </li>
        </ul>

        {totalSavings > 0 && (
          <p className="mt-3 flex items-center justify-between rounded-md bg-surface-container-low px-3 py-2">
            <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
              You save
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-emerald-700">
              {formatPrice(totalSavings)}
            </span>
          </p>
        )}

        <div className="mt-space-md flex items-end justify-between">
          <span className="font-headline-sm text-headline-sm font-semibold text-primary">
            Total
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary">
            {formatPrice(total)}
          </span>
        </div>
        <p className="mt-0.5 text-right font-body-sm text-body-sm text-secondary">
          Inclusive of all taxes
        </p>

        {/* promo */}
        <div className="mt-space-md">
          {promo ? (
            <p className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 font-body-sm text-body-sm text-emerald-800">
              <Icon name="check_circle" className="text-[18px]" />
              {promo.label}
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (applyPromo(code)) setCode("");
              }}
              className="flex"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
                className="h-11 min-w-0 flex-1 rounded-l-md border border-outline-variant bg-surface px-3 font-label-md text-label-md uppercase tracking-widest outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-r-md border border-l-0 border-primary px-5 font-label-md text-label-md uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary"
              >
                Apply
              </button>
            </form>
          )}
          <p className="mt-1.5 font-body-sm text-body-sm text-secondary">
            Welcome offer:{" "}
            <button
              type="button"
              onClick={() => setCode(PROMO.code)}
              className="font-label-md text-label-md uppercase tracking-widest text-primary underline underline-offset-4"
            >
              {PROMO.code}
            </button>{" "}
            for 10% off &middot; free delivery over {formatPrice(PROMO.threshold)}
          </p>
        </div>

        {/* 1-click pay */}
        <fieldset className="mt-space-md">
          <legend className="font-label-md text-label-md uppercase tracking-widest text-secondary">
            Pay using
          </legend>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {payPills.map((pill) => {
              const on = payWith === pill.id;
              return (
                <li key={pill.id}>
                  <button
                    type="button"
                    onClick={() => setPayWith(pill.id)}
                    aria-pressed={on}
                    className={`flex h-11 w-full items-center justify-center gap-1.5 rounded-md border font-label-md text-label-md uppercase tracking-wider transition-colors ${
                      on
                        ? "border-primary bg-primary text-on-primary"
                        : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Icon name={pill.icon} className="text-[16px]" />
                    {pill.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <button
          type="button"
          onClick={() => notify("This is a demo store — checkout is not wired up yet")}
          className="mt-space-md h-13 w-full rounded-full bg-primary font-label-lg text-label-lg uppercase tracking-wider text-on-primary transition-transform hover:scale-[1.01]"
        >
          Place order · {formatPrice(total)}
        </button>

        <ul className="mt-space-md grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {assurances.map((row) => (
            <li key={row.title} className="flex items-center gap-2">
              <Icon name={row.icon} className="text-[18px] text-secondary" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                <strong className="text-primary">{row.title}</strong> — {row.copy}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-center font-body-sm text-body-sm text-secondary">
        <Link href="/shoes" className="text-primary underline underline-offset-4">
          Continue shopping
        </Link>
      </p>
    </div>
  );
}

function LedgerRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "save";
}) {
  return (
    <li className="flex items-center justify-between gap-space-sm py-3">
      <span
        className={`font-body-md text-body-md ${
          tone === "save" ? "text-emerald-700" : "text-on-surface"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-label-lg text-label-lg ${
          tone === "save" ? "text-emerald-700" : "text-primary"
        }`}
      >
        {value}
      </span>
    </li>
  );
}
