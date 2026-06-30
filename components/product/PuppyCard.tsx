"use client";
import Link from "next/link";
import Image from "next/image";
import {
  RiHeartLine,
  RiShoppingCartLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { useCart } from "@/hooks/useCart";
import { Puppy } from "@/types";
import { formatPrice } from "@/utils/helpers";
import toast from "react-hot-toast";

interface PuppyCardProps {
  puppy: Puppy;
}

export const PuppyCard = ({ puppy }: PuppyCardProps) => {
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.puppy.id === puppy.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inCart) {
      addItem(puppy);
      toast.success(`${puppy.name} added to cart!`);
    }
  };

  return (
    <Link
      href={`/shop/${puppy.id}`}
      className="card group block overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        <Image
          src={puppy.image_url}
          alt={`${puppy.name} — ${puppy.breed} puppy`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!puppy.is_available && (
            <span className="badge bg-red-500 text-white text-xs">Sold</span>
          )}
          {puppy.is_vaccinated && (
            <span className="badge bg-green-500/90 text-white text-xs">
              <RiCheckboxCircleLine className="w-3 h-3" /> Vaccinated
            </span>
          )}
        </div>
        {/* Gender badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`badge text-xs font-bold ${
              puppy.gender === "Male"
                ? "bg-blue-100 text-blue-700"
                : "bg-pink-100 text-pink-700"
            }`}
          >
            {puppy.gender}
          </span>
        </div>
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/20 transition-colors duration-300" />
        <button
          onClick={handleAddToCart}
          disabled={!puppy.is_available}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${
            inCart
              ? "bg-green-500 text-white"
              : puppy.is_available
                ? "bg-white text-warm-800 hover:bg-brand-500 hover:text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          aria-label={inCart ? "Already in cart" : "Add to cart"}
        >
          {inCart ? (
            <RiCheckboxCircleLine className="w-5 h-5" />
          ) : (
            <RiShoppingCartLine className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-warm-900 text-lg leading-tight truncate">
              {puppy.name}
            </h3>
            <p className="text-warm-500 text-sm mt-0.5">{puppy.breed}</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-warm-300 transition-colors shrink-0">
            <RiHeartLine className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-warm-500">
          <span>{puppy.age_weeks} weeks</span>
          <span className="w-1 h-1 rounded-full bg-warm-200" />
          <span>{puppy.color}</span>
          <span className="w-1 h-1 rounded-full bg-warm-200" />
          <span>{puppy.weight_lbs} lbs</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="font-display font-bold text-brand-600 text-md">
            {formatPrice(puppy.price)}
          </span>
          <span className="text-xs text-warm-400 bg-warm-100 px-2 py-1 rounded-md">
            {puppy.registration}
          </span>
        </div>
      </div>
    </Link>
  );
};
