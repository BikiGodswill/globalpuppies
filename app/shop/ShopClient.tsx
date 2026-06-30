"use client";
import { useState, useMemo } from "react";
import { RiFilterLine, RiSearchLine, RiCloseLine } from "react-icons/ri";
import { useAvailablePuppies } from "@/hooks/usePuppies";
import { PuppyGrid } from "@/components/product/PuppyGrid";
import { Puppy } from "@/types";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A–Z" },
];

export default function ShopClient() {
  const { data: puppies, isLoading } = useAvailablePuppies();
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<"all" | "Male" | "Female">("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceMax, setPriceMax] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  const breeds = useMemo(
    () => [...new Set(puppies?.map((p) => p.breed) || [])].sort(),
    [puppies],
  );
  const [selectedBreed, setSelectedBreed] = useState("all");

  const filtered = useMemo(() => {
    let list: Puppy[] = puppies || [];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q),
      );
    }
    if (gender !== "all") list = list.filter((p) => p.gender === gender);
    if (selectedBreed !== "all")
      list = list.filter((p) => p.breed === selectedBreed);
    list = list.filter((p) => p.price <= priceMax);

    switch (sortBy) {
      case "price_asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name_asc":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [puppies, search, gender, selectedBreed, priceMax, sortBy]);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-warm-50 py-14">
        <div className="container-max text-center">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Our Collection
          </p>
          <h1 className="font-display font-bold text-warm-900 text-5xl md:text-6xl">
            Browse Puppies
          </h1>
          <p className="text-warm-500 mt-4 text-lg max-w-md mx-auto">
            {isLoading
              ? "Loading..."
              : `${puppies?.length || 0} puppies available`}
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="text"
              placeholder="Search by name, breed, or color..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-700"
              >
                <RiCloseLine className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-auto min-w-[180px]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary gap-2 ${showFilters ? "border-brand-400 text-brand-600" : ""}`}
          >
            <RiFilterLine className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="card p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-5 animate-fade-in">
            {/* Gender */}
            <div>
              <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-2">
                Gender
              </label>
              <div className="flex gap-2">
                {(["all", "Male", "Female"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      gender === g
                        ? "bg-brand-500 text-white"
                        : "bg-warm-100 text-warm-600 hover:bg-warm-200"
                    }`}
                  >
                    {g === "all" ? "All" : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Breed */}
            <div>
              <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-2">
                Breed
              </label>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="input text-sm py-2"
              >
                <option value="all">All Breeds</option>
                {breeds.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-semibold text-warm-600 uppercase tracking-wider block mb-2">
                Max Price: ${priceMax.toLocaleString()}
              </label>
              <input
                type="range"
                min={500}
                max={10000}
                step={100}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
              <div className="flex justify-between text-xs text-warm-400 mt-1">
                <span>$500</span>
                <span>$10,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        {!isLoading && (
          <p className="text-warm-400 text-sm mb-6">
            Showing{" "}
            <span className="font-semibold text-warm-700">
              {filtered.length}
            </span>{" "}
            results
          </p>
        )}

        <PuppyGrid puppies={filtered} isLoading={isLoading} />
      </div>
    </div>
  );
}
