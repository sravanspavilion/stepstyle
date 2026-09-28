import { Icon } from "@/components/ui/icon";
import { trustFeatures } from "@/lib/catalog";

const ticker = [
  "Free express shipping over ₹999",
  "7-day instant returns",
  "100% certified authentic",
  "Italian craft, direct from the atelier",
  "24/7 sizing concierge",
  "Zero-plastic packaging",
];

export function TrustBar() {
  return (
    <section aria-label="Why shop with us" className="border-y border-outline-variant/50 bg-primary text-on-primary">
      <div className="mx-auto grid max-w-[1600px] gap-px bg-on-primary/15 md:grid-cols-4">
        {trustFeatures.map((feature) => (
          <div key={feature.title} className="bg-primary px-gutter py-space-lg">
            <Icon name={feature.icon} className="text-[26px]" />
            <h3 className="mt-3 font-headline-sm text-headline-sm font-semibold uppercase tracking-tight">
              {feature.title}
            </h3>
            <p className="mt-1 font-body-sm text-body-sm text-on-primary/70">{feature.copy}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden border-t border-on-primary/15 py-space-sm">
        <ul className="marquee-track flex w-max items-center gap-space-xl px-gutter">
          {[...ticker, ...ticker].map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-3 font-label-md text-label-md uppercase tracking-[0.2em] text-on-primary/70"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-on-primary/40" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
