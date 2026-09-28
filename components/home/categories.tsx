import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { Link, SectionHeading } from "@/components/ui/primitives";
import { categories } from "@/lib/catalog";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1600px] px-gutter-mobile py-space-xl md:px-margin">
      <SectionHeading
        eyebrow="Shop by department"
        title="Built for every part of the day"
        copy="Five curated departments, one shared philosophy: fewer, better pieces that earn their place in your rotation."
      />

      <div className="mt-space-xl grid grid-cols-1 gap-space-md md:grid-cols-12">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className={`group relative overflow-hidden rounded-lg bg-surface-container ${category.span} ${category.height}`}
          >
            <Image
              src={category.image}
              alt={category.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-space-sm p-space-md md:p-space-lg">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-white/75">
                  {category.eyebrow}
                </span>
                <h3 className="mt-1 font-headline-lg text-headline-lg font-semibold uppercase tracking-tight text-white">
                  {category.title}
                </h3>
                <p className="mt-1 max-w-xs font-body-sm text-body-sm text-white/75">
                  {category.copy}
                </p>
              </div>
              {category.showArrow && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <Icon name="arrow_outward" className="text-[18px]" />
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
