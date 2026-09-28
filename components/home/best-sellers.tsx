import { Icon } from "@/components/ui/icon";
import { ProductCard } from "@/components/ui/product-card";
import { Link, SectionHeading } from "@/components/ui/primitives";
import { getBestSellers } from "@/lib/catalog";

export function BestSellers() {
  const items = getBestSellers();

  return (
    <section className="mx-auto max-w-[1600px] px-gutter-mobile py-space-xl md:px-margin">
      <SectionHeading
        eyebrow="Most reordered"
        title="The ones that come back"
        copy="Ranked by repeat purchase rate over the last 90 days — not by margin."
      />

      <div className="mt-space-xl grid grid-cols-2 gap-space-md md:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-space-lg flex justify-center">
        <Link
          href="/shoes?tab=featured"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-primary px-7 font-label-lg text-label-lg uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-on-primary"
        >
          See all best sellers
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </section>
  );
}
