import Link from "next/link";

import { Icon, StarRow } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { footerColumns, trustFeatures } from "@/lib/catalog";

const socials = [
  { name: "instagram", label: "Instagram" },
  { name: "youtube_play", label: "YouTube" },
  { name: "pinterest", label: "Pinterest" },
  { name: "forum", label: "Community" },
];

const paymentPills = [
  "UPI",
  "Visa",
  "Mastercard",
  "RuPay",
  "Net Banking",
  "Apple Pay",
];

export function SiteFooter() {
  return (
    <footer className="mt-space-xl border-t border-outline-variant/60 bg-surface-container-lowest">
      {/* trust strip */}
      <div className="border-b border-outline-variant/60">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-outline-variant/40 sm:grid-cols-2 lg:grid-cols-4">
          {trustFeatures.map((feature) => (
            <li key={feature.title} className="bg-surface-container-lowest px-gutter py-space-lg">
              <div className="flex items-start gap-space-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                  <Icon name={feature.icon} className="text-[20px]" />
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                    {feature.copy}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-space-xl px-gutter-mobile py-space-xl md:px-margin lg:grid-cols-12">
        {/* brand + newsletter */}
        <div className="lg:col-span-4">
          <Logo width={140} />
          <p className="mt-space-md max-w-sm font-body-md text-body-md text-on-surface-variant">
            Engineered everyday footwear &amp; apparel. Italian craft, direct from the atelier to
            your door — no markup layers in between.
          </p>

          <div className="mt-space-lg flex items-center gap-2">
            <StarRow rating={4.9} />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-primary">4.9</strong> from 2,400+ verified buyers
            </span>
          </div>

          <form className="mt-space-lg" action="#" >
            <label
              htmlFor="footer-email"
              className="font-label-md text-label-md uppercase tracking-widest text-secondary"
            >
              Newsletter
            </label>
            <div className="mt-2 flex border-b border-primary">
              <input
                id="footer-email"
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-transparent py-2 font-body-md text-body-md outline-none placeholder:text-secondary/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center gap-1 font-label-lg text-label-lg uppercase tracking-wider text-primary transition-opacity hover:opacity-70"
              >
                Join
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </div>
          </form>
        </div>

        {/* link columns */}
        {footerColumns.map((column) => (
          <nav key={column.heading} aria-label={column.heading} className="lg:col-span-2">
            <h3 className="font-label-md text-label-md uppercase tracking-widest text-secondary">
              {column.heading}
            </h3>
            <ul className="mt-space-md space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body-md text-body-md text-on-surface transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* contact */}
        <div className="lg:col-span-4">
          <h3 className="font-label-md text-label-md uppercase tracking-widest text-secondary">
            Concierge
          </h3>
          <ul className="mt-space-md space-y-3 font-body-md text-body-md">
            <li className="flex items-center gap-space-sm">
              <Icon name="location_on" className="text-[18px] text-secondary" />
              <span className="text-on-surface-variant">
                4th Floor, Nexus Atelier, Indiranagar, Bengaluru 560038
              </span>
            </li>
            <li className="flex items-center gap-space-sm">
              <Icon name="call" className="text-[18px] text-secondary" />
              <a href="tel:+918000000000" className="text-on-surface-variant hover:text-primary">
                +91 80000 00000
              </a>
            </li>
            <li className="flex items-center gap-space-sm">
              <Icon name="schedule" className="text-[18px] text-secondary" />
              <span className="text-on-surface-variant">Mon–Sat, 10am – 8pm IST</span>
            </li>
          </ul>

          <ul className="mt-space-lg flex items-center gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant text-primary transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
                >
                  <Icon name={social.name} className="text-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* legal / payments */}
      <div className="border-t border-outline-variant/60">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-gutter-mobile py-space-md md:flex-row md:items-center md:justify-between md:px-margin">
          <p className="font-body-sm text-body-sm text-secondary">
            © {new Date().getFullYear()} STEPSTYLE Atelier Pvt. Ltd. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-1.5">
            {paymentPills.map((pill) => (
              <li
                key={pill}
                className="rounded-sm border border-outline-variant/70 px-2 py-1 font-label-sm text-label-sm uppercase tracking-wider text-secondary"
              >
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
