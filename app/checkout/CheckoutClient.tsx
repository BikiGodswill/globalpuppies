"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  RiShoppingCartLine,
  RiArrowLeftLine,
  RiLockLine,
  RiPaypalLine,
  RiBankCardLine,
  RiBitCoinLine,
} from "react-icons/ri";
import { useCart } from "@/hooks/useCart";
import { CheckoutFormData } from "@/types";
import { formatPrice } from "@/utils/helpers";
import toast from "react-hot-toast";

const PAYMENT_OPTIONS = [
  {
    value: "paypal",
    label: "PayPal",
    icon: RiPaypalLine,
    desc: "Pay via PayPal account",
  },
  {
    value: "crypto",
    label: "Cryptocurrency",
    icon: RiBitCoinLine,
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    icon: RiBankCardLine,
    desc: "Visa, Mastercard, Amex",
  },
] as const;

const INITIAL_FORM: CheckoutFormData = {
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  payment_method: "card",
  notes: "",
};

export const CheckoutClient = () => {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const shippingCost = totalPrice > 3000 ? 0 : 299;
  const grandTotal = totalPrice + shippingCost;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
          subtotal: totalPrice,
          shipping_cost: shippingCost,
          total: grandTotal,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/orders/${data.order.id}?new=1`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 container-max py-20 text-center">
        <RiShoppingCartLine className="w-16 h-16 text-warm-200 mx-auto mb-4" />
        <h2 className="font-display text-3xl text-warm-800">
          Your cart is empty
        </h2>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Browse Puppies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-warm-50">
      <div className="container-max py-10">
        <Link href="/shop" className="btn-ghost text-sm mb-6 inline-flex">
          <RiArrowLeftLine className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="font-display font-bold text-warm-900 text-4xl mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="card p-6">
                <h2 className="font-display font-semibold text-warm-900 text-xl mb-5">
                  Personal Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      name="customer_email"
                      type="email"
                      value={form.customer_email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      name="customer_phone"
                      type="tel"
                      value={form.customer_phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="input"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="card p-6">
                <h2 className="font-display font-semibold text-warm-900 text-xl mb-5">
                  Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      Street Address *
                    </label>
                    <input
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                      required
                      placeholder="123 Main Street, Apt 4"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      City *
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="New York"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      State / Province *
                    </label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      placeholder="NY"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      ZIP / Postal Code *
                    </label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      required
                      placeholder="10001"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                      Country *
                    </label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                      placeholder="United States"
                      className="input"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="card p-6">
                <h2 className="font-display font-semibold text-warm-900 text-xl mb-5">
                  Payment Method
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {PAYMENT_OPTIONS.map(({ value, label, icon: Icon, desc }) => (
                    <label
                      key={value}
                      className={`relative flex flex-col gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.payment_method === value
                          ? "border-brand-500 bg-brand-50"
                          : "border-warm-200 bg-white hover:border-warm-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={value}
                        checked={form.payment_method === value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Icon
                        className={`w-6 h-6 ${form.payment_method === value ? "text-brand-600" : "text-warm-400"}`}
                      />
                      <span
                        className={`font-semibold text-sm ${form.payment_method === value ? "text-brand-700" : "text-warm-700"}`}
                      >
                        {label}
                      </span>
                      <span className="text-xs text-warm-400">{desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="card p-6">
                <label className="text-xs font-semibold text-warm-600 block mb-1.5">
                  Order Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions for delivery..."
                  className="input resize-none"
                />
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="space-y-4">
              <div className="card p-6 sticky top-24">
                <h2 className="font-display font-semibold text-warm-900 text-xl mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map(({ puppy }) => (
                    <div key={puppy.id} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-warm-100">
                        <Image
                          src={puppy.image_url}
                          alt={puppy.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-warm-900 text-sm truncate">
                          {puppy.name}
                        </p>
                        <p className="text-warm-500 text-xs">{puppy.breed}</p>
                        <p className="text-brand-600 font-bold text-sm">
                          {formatPrice(puppy.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-warm-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-warm-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-warm-600">
                    <span>Shipping</span>
                    <span
                      className={
                        shippingCost === 0 ? "text-green-600 font-medium" : ""
                      }
                    >
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <p className="text-green-600 text-xs">
                      Free shipping on orders over $3,000
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-warm-900 text-lg pt-2 border-t border-warm-100">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full mt-6 py-4 text-base disabled:opacity-70"
                >
                  <RiLockLine className="w-4 h-4" />
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>

                <p className="text-warm-400 text-xs text-center mt-3">
                  Your information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
