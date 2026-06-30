"use client";
import Link from "next/link";
import Image from "next/image";
import {
  RiCloseLine,
  RiShoppingCartLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/helpers";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CartDrawer = ({ isOpen, onClose, className }: CartDrawerProps) => {
  const { items, removeItem, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-warm-100">
            <div className="flex items-center gap-2">
              <RiShoppingCartLine className="w-5 h-5 text-brand-500" />
              <h2 className="font-display font-bold text-warm-900 text-lg">
                Your Cart
              </h2>
              {totalItems > 0 && (
                <span className="badge bg-brand-100 text-brand-700">
                  {totalItems} {totalItems === 1 ? "puppy" : "puppies"}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="btn-ghost w-9 h-9 rounded-lg"
              aria-label="Close cart"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center">
                  <RiShoppingCartLine className="w-8 h-8 text-warm-300" />
                </div>
                <div>
                  <p className="font-display font-semibold text-warm-800 text-xl">
                    Your cart is empty
                  </p>
                  <p className="text-warm-400 text-sm mt-1">
                    Browse our puppies to find your perfect companion
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="btn-primary text-sm"
                >
                  Browse Puppies
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(({ puppy }) => (
                  <div
                    key={puppy.id}
                    className="flex gap-4 p-4 bg-warm-50 rounded-xl border border-warm-100"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={puppy.image_url}
                        alt={puppy.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-warm-900 truncate">
                        {puppy.name}
                      </h3>
                      <p className="text-warm-500 text-sm">{puppy.breed}</p>
                      <p className="font-bold text-brand-600 mt-1">
                        {formatPrice(puppy.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(puppy.id)}
                      className="self-start p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-warm-400 transition-colors"
                      aria-label={`Remove ${puppy.name}`}
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-warm-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-warm-600 font-medium">Subtotal</span>
                <span className="font-display font-bold text-warm-900 text-xl">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="text-warm-400 text-xs">
                Shipping calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="btn-primary w-full text-center"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                onClick={onClose}
                className="btn-secondary w-full text-center text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
