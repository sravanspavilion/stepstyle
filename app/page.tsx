import type { Metadata } from "next";

import { BestSellers } from "@/components/home/best-sellers";
import { CategoryGrid } from "@/components/home/categories";
import { FeaturedTabs } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import { Reviews } from "@/components/home/reviews";
import { TrustBar } from "@/components/home/trust-bar";
import { UniformSpotlight } from "@/components/home/uniform-spotlight";

export const metadata: Metadata = {
  title: "Engineered Everyday Footwear & Apparel",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedTabs />
      <UniformSpotlight />
      <BestSellers />
      <TrustBar />
      <Reviews />
    </>
  );
}
