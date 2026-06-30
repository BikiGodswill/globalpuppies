"use client";
import Link from "next/link";
import Image from "next/image";
import {
  RiArrowRightLine,
  RiShieldCheckLine,
  RiStarFill,
} from "react-icons/ri";

export const HeroSection = () => {
  const rating = [
    { value: "2,400+", label: "Happy Families", icon: true },
    { value: "100+", label: "Breeds Available", icon: true },
    { value: "4.9", label: "Star Rating", icon: true },
  ];
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-50 via-warm-50 to-orange-50">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-brand-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />

      <div className="container-max w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="animate-fade-up border-blue-500">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <RiShieldCheckLine className="w-4 h-4" />
              Health Guaranteed · AKC Registered
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-warm-900 leading-[1.05] tracking-tight">
              Find Your
              <span className="block text-brand-500">Perfect</span>
              Companion
            </h1>
            <p className="mt-6 text-warm-600 text-md leading-relaxed max-w-lg">
              Over 100 premium, health-certified breeds each puppy raised with
              love and delivered safely to your door, anywhere in the world.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-8 text-sm">
              {rating.map(({ value, label, icon }) => (
                <div key={label}>
                  <div className="flex items-center gap-1">
                    <span className="font-display font-bold text-warm-900 text-sm">
                      {value}
                    </span>
                    {icon && <RiStarFill className="w-5 h-5 text-amber-400" />}
                  </div>
                  <p className="text-warm-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/shop" className="btn-primary text-base px-8 py-4">
                Browse Puppies
                <RiArrowRightLine className="w-5 h-5" />
              </Link>
              <Link
                href="/breeds"
                className="btn-secondary text-base px-8 py-4"
              >
                Explore Breeds
              </Link>
            </div>
          </div>

          {/* Right — Image collage */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main image */}
              <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl animate-float">
                <Image
                  src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=700&q=80"
                  alt="Adorable golden retriever puppy"
                  fill
                  className="object-cover"
                  priority
                  sizes="500px"
                />
              </div>

              {/* Floating card — top left */}
              <div className="absolute top-0 left-0 bg-white rounded-2xl shadow-lg p-4 w-44 animate-fade-up border border-warm-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <RiShieldCheckLine className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-warm-700">
                    Health Cert.
                  </span>
                </div>
                <p className="text-xs text-warm-500">
                  All puppies vet-checked and certified
                </p>
              </div>

              {/* Floating card — bottom right */}
              <div className="absolute bottom-4 right-0 bg-white rounded-2xl shadow-lg p-4 w-44 border border-warm-100">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <RiStarFill key={i} className="w-3 h-3 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-warm-700 font-semibold">
                  &quot;Best puppy experience ever!&quot;
                </p>
                <p className="text-xs text-warm-400 mt-0.5">
                  Sarah M., New York
                </p>
              </div>

              {/* Small image — bottom left */}
              <div className="absolute bottom-0 left-4 w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&q=80"
                  alt="French bulldog puppy"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-warm-400 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-warm-300 to-transparent" />
      </div>
    </section>
  );
};