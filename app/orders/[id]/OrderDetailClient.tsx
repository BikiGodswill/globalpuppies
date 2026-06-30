"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  RiCheckboxCircleLine, RiTruckLine, RiMapPinLine,
  RiTimeLine, RiArrowRightLine, RiFileCopyLine,
} from "react-icons/ri";
import { useOrder } from "@/hooks/useOrders";
import {
  formatPrice, formatDate,
  ORDER_STATUS_LABELS, ORDER_STATUS_COLORS,
  PAYMENT_METHOD_LABELS,
} from "@/utils/helpers";
import toast from "react-hot-toast";

interface Props { id: string }

export const OrderDetailClient = ({ id }: Props) => {
  const { data: order, isLoading } = useOrder(id);
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";

  const copyTracking = () => {
    if (order) {
      navigator.clipboard.writeText(order.tracking_number);
      toast.success("Tracking number copied!");
    }
  };

  if (isLoading) {
    return (
      <div className="pt-28 container-max py-10">
        <div className="max-w-2xl mx-auto space-y-4 animate-pulse">
          <div className="h-8 skeleton w-1/2" />
          <div className="h-40 skeleton rounded-2xl" />
          <div className="h-60 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-28 container-max text-center py-20">
        <h2 className="font-display text-3xl text-warm-800">Order not found</h2>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-warm-50">
      <div className="container-max py-10 max-w-3xl">
        {/* Success banner */}
        {isNew && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 flex items-start gap-4 animate-fade-in">
            <RiCheckboxCircleLine className="w-8 h-8 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display font-bold text-green-800 text-xl">
                Order Confirmed!
              </h2>
              <p className="text-green-700 text-sm mt-1">
                A confirmation email has been sent to <strong>{order.customer_email}</strong>.
                Use your tracking number to follow your puppy&apos;s journey.
              </p>
            </div>
          </div>
        )}

        <h1 className="font-display font-bold text-warm-900 text-4xl mb-2">
          Order Details
        </h1>
        <p className="text-warm-500 mb-8">
          Placed on {formatDate(order.created_at)}
        </p>

        {/* Tracking number */}
        <div className="card p-6 mb-6 bg-gradient-to-r from-brand-50 to-orange-50 border-brand-100">
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            Tracking Number
          </p>
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-warm-900 text-3xl tracking-widest">
              {order.tracking_number}
            </span>
            <button onClick={copyTracking} className="p-2 rounded-lg hover:bg-brand-100 text-brand-500 transition-colors">
              <RiFileCopyLine className="w-5 h-5" />
            </button>
          </div>
          <Link
            href={`/order-tracking?tracking=${order.tracking_number}`}
            className="btn-primary mt-4 inline-flex text-sm"
          >
            <RiTruckLine className="w-4 h-4" />
            Track This Order
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>

        {/* Status */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-semibold text-warm-900 text-lg mb-4">Order Status</h2>
          <div className="flex items-center gap-3">
            <span className={`badge text-sm px-3 py-1.5 ${ORDER_STATUS_COLORS[order.order_status]}`}>
              {ORDER_STATUS_LABELS[order.order_status]}
            </span>
            <span className={`badge text-sm ${
              order.payment_status === "paid" ? "bg-green-100 text-green-700" :
              order.payment_status === "failed" ? "bg-red-100 text-red-700" :
              "bg-yellow-100 text-yellow-700"
            }`}>
              Payment: {order.payment_status}
            </span>
          </div>

          {/* Tracking timeline */}
          {order.tracking_updates.length > 0 && (
            <div className="mt-6 space-y-4">
              {[...order.tracking_updates].reverse().map((update) => (
                <div key={update.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-brand-400 shrink-0 mt-1" />
                    <div className="w-px flex-1 bg-warm-200 my-1" />
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-warm-800 text-sm">
                      {ORDER_STATUS_LABELS[update.status]}
                    </p>
                    <p className="text-warm-500 text-sm">{update.message}</p>
                    {update.location && (
                      <p className="text-warm-400 text-xs flex items-center gap-1 mt-0.5">
                        <RiMapPinLine className="w-3 h-3" /> {update.location}
                      </p>
                    )}
                    <p className="text-warm-400 text-xs flex items-center gap-1 mt-0.5">
                      <RiTimeLine className="w-3 h-3" /> {formatDate(update.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-semibold text-warm-900 text-lg mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.puppy_id} className="flex justify-between items-center py-2 border-b border-warm-100 last:border-0">
                <div>
                  <p className="font-semibold text-warm-800">{item.puppy_name}</p>
                  <p className="text-warm-500 text-sm">{item.breed}</p>
                </div>
                <p className="font-bold text-brand-600">{formatPrice(item.price)}</p>
              </div>
            ))}
            <div className="pt-2 space-y-1 text-sm">
              <div className="flex justify-between text-warm-600">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-warm-600">
                <span>Shipping</span>
                <span>{order.shipping_cost === 0 ? "FREE" : formatPrice(order.shipping_cost)}</span>
              </div>
              <div className="flex justify-between font-bold text-warm-900 text-base pt-1 border-t border-warm-100">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold text-warm-800 mb-3">Customer</h3>
            <p className="text-warm-600 text-sm">{order.customer_name}</p>
            <p className="text-warm-600 text-sm">{order.customer_email}</p>
            <p className="text-warm-600 text-sm">{order.customer_phone}</p>
            <p className="text-warm-500 text-sm mt-2">
              Payment: {PAYMENT_METHOD_LABELS[order.payment_method]}
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-warm-800 mb-3">Ship To</h3>
            <p className="text-warm-600 text-sm">{order.shipping_address.street}</p>
            <p className="text-warm-600 text-sm">
              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
            </p>
            <p className="text-warm-600 text-sm">{order.shipping_address.country}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/shop" className="btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
