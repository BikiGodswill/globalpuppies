"use client";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { useAvailablePuppies } from "@/hooks/usePuppies";
import { PuppyGrid } from "@/components/product/PuppyGrid";

export const FeaturedPuppies = () => {
  const { data: puppies, isLoading } = useAvailablePuppies();
  const featured = puppies?.slice(0, 8);

  return (
    <section className="section bg-white">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Just Arrived
            </p>
            <h2 className="font-display font-bold text-warm-900 text-4xl md:text-5xl">
              Featured Puppies
            </h2>
            <p className="text-warm-500 mt-3 max-w-md">
              Each puppy is health-certified, vaccinated, and ready to join your family.
            </p>
          </div>
          <Link href="/shop" className="btn-ghost text-brand-600 font-semibold shrink-0">
            View all puppies
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>

        <PuppyGrid puppies={featured || []} isLoading={isLoading} />

        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-primary">
            Browse All Puppies
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
