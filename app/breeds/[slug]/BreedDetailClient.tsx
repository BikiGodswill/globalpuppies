"use client";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { useAvailablePuppies } from "@/hooks/usePuppies";
import { PuppyGrid } from "@/components/product/PuppyGrid";
import { slugify } from "@/utils/helpers";

interface Props {
  slug: string;
}

export const BreedDetailClient = ({ slug }: Props) => {
  const { data: all, isLoading } = useAvailablePuppies();

  const puppies = all?.filter((p) => slugify(p.breed) === slug) || [];
  const breedName = puppies[0]?.breed || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-brand-50 to-warm-50 py-14">
        <div className="container-max">
          <Link href="/breeds" className="btn-ghost text-sm mb-4 inline-flex">
            <RiArrowLeftLine className="w-4 h-4" />
            All Breeds
          </Link>
          <h1 className="font-display font-bold text-warm-900 text-5xl">
            {breedName}
          </h1>
          <p className="text-warm-500 mt-3">
            {isLoading
              ? "Loading..."
              : `${puppies.length} ${puppies.length === 1 ? "puppy" : "puppies"} available`}
          </p>
        </div>
      </div>

      <div className="container-max py-12">
        {!isLoading && puppies.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-display font-semibold text-warm-700 text-2xl mb-3">
              No puppies available right now
            </h3>
            <p className="text-warm-500 mb-6">
              Check back soon or browse other breeds.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse All Puppies
            </Link>
          </div>
        ) : (
          <PuppyGrid puppies={puppies} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
