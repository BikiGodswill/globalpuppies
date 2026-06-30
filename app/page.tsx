import type { Metadata } from "next";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeaturedPuppies } from "@/components/layout/FeaturedPuppies";
import { BreedsSection } from "@/components/layout/BreedsSection";
import { WhyUsSection } from "@/components/layout/WhyUsSection";
import { TestimonialsSection } from "@/components/layout/TestimonialsSection";
import { NewsletterSection } from "@/components/layout/NewsletterSection";

export const metadata: Metadata = {
  title: "GlobalPuppies Premium Puppies Delivered Worldwide",
  description:
    "Find your perfect companion from our curated selection of premium, health-certified puppies. 100+ breeds available with worldwide delivery.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPuppies />
      <WhyUsSection />
      <BreedsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
