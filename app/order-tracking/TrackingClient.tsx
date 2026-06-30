"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  RiSearchLine, RiTruckLine, RiMapPinLine, RiTimeLine,
  RiCheckboxCircleLine, RiCloseCircleLine,
} from "react-icons/ri";
import { useOrderByTracking } from "@/hooks/useOrders";
import {
  formatPrice, formatDate,
  ORDER_STATUS_LABELS, ORDER_STATUS_COLORS,
  PAYMENT_METHOD_LABELS,
} from "@/utils/helpers";
import { OrderStatus } from "@/types";

const STATUS_STEPS: OrderStatus[] = [
  "confirmed", "preparing", "in_transit", "out_for_delivery", "delivered",
];

export const TrackingClient = () => {
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("tracking") || "");
  const [query, setQuery] = useState(searchParams.get("tracking") || "");

  const { data: order, isLoading, isFetching } = useOrderByTracking(query);

  useEffect(() => {
    const t = searchParams.get("tracking");
    if (t) { setInput(t); setQuery(t); }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(input.trim().toUpperCase());
  };

  const currentStepIndex = order
    ? STATUS_STEPS.indexOf(order.order_status as OrderStatus)
    : -1;

  return (
    <div className="pt-20 min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-warm-50 py-16">
        <div className="container-max text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
            <RiTruckLine className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="font-display font-bold text-warm-900 text-5xl">
            Track Your Order
          </h1>
          <p className="text-warm-500 mt-3 max-w-md mx-auto">
            Enter your tracking number to get real-time updates on your puppy&apos;s journey.
          </p>
        </div>
      </div>

      <div className="container-max py-10 max-w-2xl">
        {/* Search form */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="e.g. GP123456ABCD"
              className="input pl-11 text-lg font-mono tracking-wider"
            />
          </div>
          <button type="submit" className="btn-primary px-8">
            Track
          </button>
        </form>

        {/* Loading */}
        {(isLoading || isFetching) && query && (
          <div className="card p-8 text-center animate-pulse">
            <div className="w-12 h-12 rounded-full bg-warm-100 mx-auto mb-3" />
            <div className="h-4 skeleton w-1/2 mx-auto" />
          </div>
        )}

        {/* No result */}
        {query && !isLoading && !isFetching && !order && (
          <div className="card p-8 text-center">
            <RiCloseCircleLine className="w-12 h-12 text-red-300 mx-auto mb-3" />
            <h3 className="font-display font-semibold text-warm-800 text-xl">
              No order found
            </h3>
            <p className="text-warm-500 text-sm mt-2">
              No order found for tracking number <strong>{query}</strong>. Please check the number and try again.
            </p>
          </div>
        )}

        {/* Order found */}
        {order && !isLoading && !isFetching && (
          <div className="space-y-6 animate-fade-in">
            {/* Status header */}
            <div className="card p-6 bg-gradient-to-r from-brand-50 to-orange-50 border-brand-100">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    Tracking Number
                  </p>
                  <p className="font-display font-bold text-warm-900 text-2xl tracking-widest mt-1">
                    {order.tracking_number}
                  </p>
                </div>
                <span className={`badge text-sm px-3 py-1.5 ${ORDER_STATUS_COLORS[order.order_status]}`}>
                  {ORDER_STATUS_LABELS[order.order_status]}
                </span>
              </div>
            </div>

            {/* Progress stepper */}
            {order.order_status !== "cancelled" && (
              <div className="card p-6">
                <h3 className="font-semibold text-warm-800 mb-6">Delivery Progress</h3>
                <div className="flex items-center gap-0">
                  {STATUS_STEPS.map((step, i) => {
                    const done = i <= currentStepIndex;
                    const active = i === currentStepIndex;
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            done ? "bg-brand-500 text-white" : "bg-warm-100 text-warm-400"
                          } ${active ? "ring-4 ring-brand-200" : ""}`}>
                            {done && i < currentStepIndex ? (
                              <RiCheckboxCircleLine className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-bold">{i + 1}</span>
                            )}
                          </div>
                          <span className={`text-[10px] text-center leading-tight max-w-[60px] ${done ? "text-brand-600 font-medium" : "text-warm-400"}`}>
                            {ORDER_STATUS_LABELS[step].replace("Order ", "")}
                          </span>
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div className={`flex-1 h-0.5 mb-4 ${i < currentStepIndex ? "bg-brand-400" : "bg-warm-200"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="card p-6">
              <h3 className="font-semibold text-warm-800 mb-4">Tracking History</h3>
              <div className="space-y-4">
                {[...order.tracking_updates].reverse().map((update, i) => (
                  <div key={update.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${i === 0 ? "bg-brand-500" : "bg-warm-300"}`} />
                      {i < order.tracking_updates.length - 1 && (
                        <div className="w-px flex-1 bg-warm-200 my-1" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className={`font-semibold text-sm ${i === 0 ? "text-brand-700" : "text-warm-700"}`}>
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
            </div>

            {/* Summary */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <h4 className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-3">Order Info</h4>
                <p className="text-warm-700 text-sm">{order.customer_name}</p>
                <p className="text-warm-500 text-sm">{order.items.length} puppy(ies)</p>
                <p className="text-warm-500 text-sm">
                  {PAYMENT_METHOD_LABELS[order.payment_method]}
                </p>
                <p className="font-bold text-warm-900 mt-2">{formatPrice(order.total)}</p>
              </div>
              <div className="card p-5">
                <h4 className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-3">Ship To</h4>
                <p className="text-warm-700 text-sm">{order.shipping_address.street}</p>
                <p className="text-warm-500 text-sm">
                  {order.shipping_address.city}, {order.shipping_address.state}
                </p>
                <p className="text-warm-500 text-sm">{order.shipping_address.country}</p>
              </div>
            </div>

            <Link href={`/orders/${order.id}`} className="btn-secondary w-full text-center">
              View Full Order Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
