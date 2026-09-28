import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { Link, SectionHeading } from "@/components/ui/primitives";
import { recentlyViewed } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function RecentlyViewed() {
  return (
    <section className="mx-auto max-w-[1600px] px-gutter-mobile py-space-xl md:px-margin">
      <SectionHeading
        eyebrow="Picking up where you left off"
        title="Recently viewed"
        copy="Pairs you looked at in the last seven days, on any device."
      />

      <ul className="mt-space-xl grid grid-cols-2 gap-space-md lg:grid-cols-4">
        {recentlyViewed.map((item) => (
          <li key={item.slug + item.name} className="group flex flex-col">
            <Link
              href={`/shoes/${item.slug}`}
              className="relative block aspect-square overflow-hidden rounded-lg bg-surface-container"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="mt-3 flex items-start justify-between gap-space-sm">
              <div className="min-w-0">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  {item.department}
                </span>
                <h3 className="truncate font-headline-sm text-headline-sm font-semibold text-primary">
                  <Link href={`/shoes/${item.slug}`} className="hover:underline">
                    {item.name}
                  </Link>
                </h3>
              </div>
              <span className="shrink-0 font-label-lg text-label-lg text-primary">
                {formatPrice(item.price)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-space-lg flex justify-center">
        <Link
          href="/shoes"
          className="inline-flex items-center gap-2 font-label-lg text-label-lg uppercase tracking-wider text-primary underline-offset-4 hover:underline"
        >
          Continue shopping
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </section>
  );
}
