import { Puppy } from "@/types";
import { PuppyCard } from "./PuppyCard";
import { PuppyCardSkeleton } from "./PuppyCardSkeleton";

interface PuppyGridProps {
  puppies: Puppy[];
  isLoading?: boolean;
}

export const PuppyGrid = ({ puppies, isLoading }: PuppyGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <PuppyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (puppies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center mb-4">
          <span className="text-3xl">🐾</span>
        </div>
        <h3 className="font-display font-semibold text-warm-800 text-xl">
          No puppies found
        </h3>
        <p className="text-warm-400 text-sm mt-2">
          Try adjusting your filters or check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {puppies.map((puppy) => (
        <PuppyCard key={puppy.id} puppy={puppy} />
      ))}
    </div>
  );
};
