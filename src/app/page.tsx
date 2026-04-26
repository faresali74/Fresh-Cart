import { Metadata } from "next";
import BrandsSection from "./_components/CategorySection";
import FeaturesCards from "./_components/FeaturesCards";
import MainHero from "./_components/MainHero";
import NewsletterAppSection from "./_components/Newsletter";
import Products from "./_components/Products";
import PromoBanners from "./_components/PromoBanners";
import SectionHeader from "./_components/SectionHeader";

export const metadata: Metadata = {
  title: "FreshCart | Fresh Groceries Delivered to Your Door",
  description:
    "Shop fresh groceries, electronics, fashion and more. Fast delivery, secure payments, and the best prices — all in one place.",
  keywords: ["grocery", "ecommerce", "fresh", "delivery", "online shopping"],
  openGraph: {
    title: "FreshCart | Fresh Groceries Delivered to Your Door",
    description: "Shop fresh groceries and more with fast delivery.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <MainHero />
      <FeaturesCards />
      <BrandsSection />
      <PromoBanners />
      <div className="container mx-auto px-4">
        <SectionHeader title="Featured" highlight="Products" />
      </div>
      <Products />
      <NewsletterAppSection />
    </div>
  );
}
