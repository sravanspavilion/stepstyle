import Link from "next/link";

import { discountPercent } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export { WishlistToggle } from "./wishlist-toggle";

const badgeTone: Record<string, string> = {
  neutral: "bg-surface-container-lowest/90 text-primary backdrop-blur-md",
  dark: "bg-primary text-on-primary",
  danger: "bg-error text-on-error",
  muted: "bg-secondary-container text-on-secondary-fixed",
};

export function BadgeChip({
  label,
  tone,
  className = "top-2.5 left-2.5",
}: {
  label: string;
  tone: "neutral" | "dark" | "danger" | "muted";
  className?: string;
}) {
  return (
    <span
      className={`absolute ${className} z-10 rounded-full px-2.5 py-0.5 font-label-sm text-label-sm font-bold tracking-wider uppercase shadow-sm ${badgeTone[tone]}`}
    >
      {label}
    </span>
  );
}

export function ColorDots({
  colors,
  className = "h-3.5 w-3.5",
}: {
  colors: { name: string; hex: string }[];
  className?: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      {colors.slice(0, 4).map((c) => (
        <span
          key={c.name}
          title={c.name}
          className={`${className} inline-block rounded-full border border-outline-variant/50`}
          style={{ backgroundColor: c.hex }}
        />
      ))}
      {colors.length > 4 && (
        <span className="font-label-sm text-label-sm text-secondary">+{colors.length - 4}</span>
      )}
    </span>
  );
}

export function PriceRow({
  price,
  mrp,
  className = "",
  showPercent = true,
}: {
  price: number;
  mrp: number;
  className?: string;
  showPercent?: boolean;
}) {
  const off = discountPercent(price, mrp);
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-headline-sm text-headline-sm font-bold text-primary">
        {formatPrice(price)}
      </span>
      <span className="font-body-sm text-body-sm text-secondary line-through">
        {formatPrice(mrp)}
      </span>
      {showPercent && off > 0 && (
        <span className="font-label-sm text-label-sm font-bold text-emerald-700">
          {off}% OFF
        </span>
      )}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "start" | "center";
}) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
          {eyebrow}
        </span>
        <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
          {title}
        </h2>
        {copy && <p className="font-body-md text-body-md text-on-surface-variant">{copy}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="mb-2 block font-label-sm text-label-sm font-bold uppercase tracking-widest text-secondary">
          {eyebrow}
        </span>
        <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
          {title}
        </h2>
      </div>
      {copy && (
        <p className="max-w-md font-body-md text-body-md text-on-surface-variant">{copy}</p>
      )}
    </div>
  );
}

export { Link };
