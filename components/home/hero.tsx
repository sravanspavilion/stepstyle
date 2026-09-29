import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { heroImage, heroPerks } from "@/lib/catalog";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary">
      {/*
        The wrapper carries the asset's real 512:286 ratio instead of a viewport
        height, so `object-contain` has nothing to crop at any width. The hero no
        longer slides up under the header either — the nav bar is opaque
        (`bg-surface/95`), so those pixels were never visible anyway.
      */}
      <div className="relative aspect-[512/286] w-full">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
        {/* Only desktop overlays copy on the image, so only desktop needs the scrim. */}
        <div className="absolute inset-0 hidden bg-linear-to-t from-black/75 via-black/25 to-black/35 md:block" />
      </div>

      {/* Mobile: a black block directly under the image. Desktop: overlaid on it. */}
      <div className="relative mx-auto flex max-w-[1600px] flex-col bg-primary px-gutter-mobile pt-space-xl pb-space-xl md:absolute md:inset-0 md:justify-end md:bg-transparent md:px-margin md:pt-0 md:pb-space-xl">
        <span className="mb-space-sm font-label-md text-label-md uppercase tracking-[0.25em] text-white/80">
          Season 04 &middot; The Everyday Uniform
        </span>

        <h1 className="max-w-4xl font-display-mobile text-display-mobile font-semibold uppercase leading-[0.95] tracking-tight text-white md:font-display md:text-display">
          Step into the
          <br />
          <span className="text-white/70">everyday</span>
        </h1>

        <p className="mt-space-md max-w-xl font-body-md text-body-md text-white/85 md:font-body-lg md:font-body-lg">
          Italian-crafted soles, structured linen and honest materials — engineered for days
          that start at a desk and end somewhere later.
        </p>

        <div className="mt-space-lg flex flex-wrap items-center gap-space-sm">
          <Link
            href="/shoes"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-label-lg text-label-lg uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
          >
            Shop the Drop
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
          <Link
            href="/shoes?tab=new"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/70 px-7 font-label-lg text-label-lg uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
          >
            New Arrivals
          </Link>
        </div>

        <ul className="mt-space-xl grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/20 sm:grid-cols-3">
          {heroPerks.map((perk) => (
            <li
              key={perk.title}
              className="flex items-start gap-space-sm bg-black/45 px-4 py-3 backdrop-blur-md"
            >
              <Icon name={perk.icon} className="mt-0.5 text-[20px] text-white" />
              <div>
                <p className="font-label-md text-label-md uppercase tracking-wider text-white">
                  {perk.title}
                </p>
                <p className="font-body-sm text-body-sm text-white/70">{perk.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
