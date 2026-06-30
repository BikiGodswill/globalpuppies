import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";

const FEATURED_BREEDS = [
  { name: "Golden Retriever", count: "12 available", image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&q=80", slug: "golden-retriever" },
  { name: "French Bulldog", count: "8 available", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80", slug: "french-bulldog" },
  { name: "Siberian Husky", count: "6 available", image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&q=80", slug: "siberian-husky" },
  { name: "Labrador Retriever", count: "10 available", image: "https://images.unsplash.com/photo-1591856954575-e5c6b3dad23e?w=400&q=80", slug: "labrador-retriever" },
  { name: "German Shepherd", count: "5 available", image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=80", slug: "german-shepherd" },
  { name: "Poodle", count: "9 available", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80", slug: "poodle" },
];

export const BreedsSection = () => {
  return (
    <section className="section bg-white">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Explore
            </p>
            <h2 className="font-display font-bold text-warm-900 text-4xl md:text-5xl">
              Popular Breeds
            </h2>
          </div>
          <Link href="/breeds" className="btn-ghost text-brand-600 font-semibold shrink-0">
            All breeds
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURED_BREEDS.map(({ name, count, image, slug }) => (
            <Link
              key={slug}
              href={`/breeds/${slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900/80 via-warm-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-display font-semibold text-sm leading-tight">
                  {name}
                </p>
                <p className="text-warm-300 text-xs mt-0.5">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
