export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** `2499` -> `₹2,499` */
export function formatPrice(value: number) {
  return inr.format(value);
}

/** Bare grouped number, used where a currency symbol is rendered separately. */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}
