import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/primitives";
import { BuyPanel } from "@/components/pdp/buy-panel";
import { CompleteTheLook } from "@/components/pdp/complete-the-look";
import { DetailTabs } from "@/components/pdp/detail-tabs";
import { Gallery } from "@/components/pdp/gallery";
import { RecentlyViewed } from "@/components/pdp/recently-viewed";
import { getProduct, products } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.variant}`,
    description: `${product.descriptor}. ${product.highlights.join(". ")}.`,
    openGraph: {
      title: product.name,
      description: product.descriptor,
      images: [{ url: product.gallery[0].src, alt: product.gallery[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/shoes/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery.map((g) => g.src),
    description: product.descriptor,
    sku: product.sku,
    brand: { "@type": "Brand", name: "STEPSTYLE" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.sizes.some((s) => s.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1600px] px-gutter-mobile pt-space-md md:px-margin">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-body-sm text-body-sm text-secondary">
            <li>
              <Link href="/" className="hover:text-primary hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron_right" className="text-[16px]" />
            </li>
            <li>
              <Link
                href={`/shoes?dept=${encodeURIComponent(product.department)}`}
                className="hover:text-primary hover:underline"
              >
                {product.department === "Unisex" ? "Unisex" : `${product.department}'s`}
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron_right" className="text-[16px]" />
            </li>
            <li>
              <Link
                href={`/shoes?q=${encodeURIComponent(product.silhouette)}`}
                className="hover:text-primary hover:underline"
              >
                {product.silhouette}
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron_right" className="text-[16px]" />
            </li>
            <li className="font-medium text-primary" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-space-xl px-gutter-mobile py-space-lg md:px-margin lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Gallery product={product} />
        <BuyPanel product={product} />
      </div>

      <DetailTabs product={product} />
      <CompleteTheLook product={product} />
      <RecentlyViewed />
    </>
  );
}
