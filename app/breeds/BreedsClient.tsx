"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiSearchLine, RiArrowRightLine } from "react-icons/ri";
import { useAvailablePuppies } from "@/hooks/usePuppies";
import { slugify } from "@/utils/helpers";

interface BreedGroup {
  breed: string;
  count: number;
  image: string;
  slug: string;
}

export const BreedsClient = () => {
  const { data: puppies, isLoading } = useAvailablePuppies();
  const [search, setSearch] = useState("");

  const breedGroups: BreedGroup[] = useMemo(() => {
    if (!puppies) return [];
    const map = new Map<string, { count: number; image: string }>();
    puppies.forEach((p) => {
      if (!map.has(p.breed)) {
        map.set(p.breed, { count: 1, image: p.image_url });
      } else {
        map.get(p.breed)!.count++;
      }
    });
    return Array.from(map.entries())
      .map(([breed, { count, image }]) => ({
        breed,
        count,
        image,
        slug: slugify(breed),
      }))
      .sort((a, b) => a.breed.localeCompare(b.breed));
  }, [puppies]);

  const filtered = breedGroups.filter((b) =>
    b.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-warm-50 py-16">
        <div className="container-max text-center">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Explore
          </p>
          <h1 className="font-display font-bold text-warm-900 text-5xl md:text-6xl">
            All Breeds
          </h1>
          <p className="text-warm-500 mt-4 max-w-md mx-auto text-lg">
            {isLoading
              ? "Loading breeds..."
              : `${breedGroups.length} breeds available`}
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto mt-8">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search breeds..."
              className="input pl-12 text-center"
            />
          </div>
        </div>
      </div>

      <div className="container-max py-14">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-warm-100" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-warm-500 text-lg">No breeds found for &quot;{search}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map(({ breed, count, image, slug }) => (
              <Link
                key={breed}
                href={`/breeds/${slug}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={image}
                  alt={breed}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-900/80 via-warm-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-display font-semibold text-sm leading-tight">
                    {breed}
                  </p>
                  <p className="text-warm-300 text-xs mt-0.5">
                    {count} available
                  </p>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <RiArrowRightLine className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
