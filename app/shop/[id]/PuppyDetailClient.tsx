"use client";
import Image from "next/image";
import Link from "next/link";
import {
  RiShoppingCartLine, RiCheckboxCircleLine, RiArrowLeftLine,
  RiShieldCheckLine, RiHeartLine, RiStarFill, RiMedicineBottleLine,
  RiMapPinLine, RiBodyScanLine,
} from "react-icons/ri";
import { usePuppy } from "@/hooks/usePuppies";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/helpers";
import toast from "react-hot-toast";

interface Props { id: string }

export const PuppyDetailClient = ({ id }: Props) => {
  const { data: puppy, isLoading, error } = usePuppy(id);
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.puppy.id === id);

  if (isLoading) {
    return (
      <div className="pt-24 container-max py-10">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square rounded-3xl bg-warm-100" />
          <div className="space-y-4">
            <div className="h-8 skeleton w-1/2" />
            <div className="h-5 skeleton w-1/3" />
            <div className="h-10 skeleton w-1/4 mt-4" />
            <div className="h-24 skeleton" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !puppy) {
    return (
      <div className="pt-24 container-max py-20 text-center">
        <h2 className="font-display text-3xl text-warm-800">Puppy not found</h2>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!inCart) {
      addItem(puppy);
      toast.success(`${puppy.name} added to your cart!`);
    }
  };

  return (
    <div className="pt-20">
      <div className="container-max py-10">
        {/* Breadcrumb */}
        <Link href="/shop" className="btn-ghost text-sm mb-6 inline-flex">
          <RiArrowLeftLine className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl bg-warm-100">
            <Image
              src={puppy.image_url}
              alt={`${puppy.name} — ${puppy.breed}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {!puppy.is_available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white font-bold text-2xl px-8 py-3 rounded-2xl">
                  SOLD
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge text-sm ${puppy.gender === "Male" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>
                  {puppy.gender}
                </span>
                <span className="badge bg-warm-100 text-warm-600">{puppy.registration}</span>
                {puppy.is_vaccinated && (
                  <span className="badge bg-green-100 text-green-700">
                    <RiCheckboxCircleLine className="w-3 h-3" /> Vaccinated
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold text-warm-900 text-5xl">{puppy.name}</h1>
              <p className="text-warm-500 text-xl mt-1">{puppy.breed}</p>
              <div className="flex items-center gap-1 mt-2">
                {[1,2,3,4,5].map(i => <RiStarFill key={i} className="w-4 h-4 text-amber-400" />)}
                <span className="text-warm-400 text-sm ml-1">(Verified Breeder)</span>
              </div>
            </div>

            <div className="text-4xl font-display font-bold text-brand-600">
              {formatPrice(puppy.price)}
            </div>

            <p className="text-warm-600 leading-relaxed">{puppy.description}</p>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: RiBodyScanLine, label: "Age", value: `${puppy.age_weeks} weeks` },
                { icon: RiMapPinLine, label: "Color", value: puppy.color },
                { icon: RiShieldCheckLine, label: "Weight", value: `${puppy.weight_lbs} lbs` },
                { icon: RiMedicineBottleLine, label: "Health Cert", value: puppy.health_certificate ? "Included" : "No" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-warm-50 rounded-xl p-4 flex items-center gap-3 border border-warm-100">
                  <Icon className="w-5 h-5 text-brand-400 shrink-0" />
                  <div>
                    <p className="text-xs text-warm-400">{label}</p>
                    <p className="text-warm-800 font-semibold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Temperament */}
            {puppy.temperament.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-warm-600 uppercase tracking-wider mb-2">
                  Temperament
                </p>
                <div className="flex flex-wrap gap-2">
                  {puppy.temperament.map((t) => (
                    <span key={t} className="badge bg-brand-50 text-brand-700 text-xs border border-brand-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            <div className="flex flex-wrap gap-4 text-sm">
              {puppy.is_vaccinated && (
                <span className="flex items-center gap-1.5 text-green-700">
                  <RiCheckboxCircleLine className="w-4 h-4" /> Vaccinated
                </span>
              )}
              {puppy.is_microchipped && (
                <span className="flex items-center gap-1.5 text-blue-700">
                  <RiShieldCheckLine className="w-4 h-4" /> Microchipped
                </span>
              )}
              {puppy.health_certificate && (
                <span className="flex items-center gap-1.5 text-purple-700">
                  <RiMedicineBottleLine className="w-4 h-4" /> Health Certificate
                </span>
              )}
            </div>

            {/* CTA */}
            {puppy.is_available ? (
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={inCart}
                  className={`btn-primary flex-1 py-4 ${inCart ? "bg-green-500 hover:bg-green-600" : ""}`}
                >
                  {inCart ? (
                    <><RiCheckboxCircleLine className="w-5 h-5" /> Added to Cart</>
                  ) : (
                    <><RiShoppingCartLine className="w-5 h-5" /> Add to Cart</>
                  )}
                </button>
                <button className="btn-secondary w-14 h-14 shrink-0">
                  <RiHeartLine className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-semibold">This puppy has been sold</p>
                <Link href="/shop" className="btn-primary mt-3 inline-flex text-sm">
                  Browse Available Puppies
                </Link>
              </div>
            )}

            {inCart && (
              <Link href="/checkout" className="btn-secondary w-full text-center">
                Proceed to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
