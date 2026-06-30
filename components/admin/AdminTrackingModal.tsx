"use client";
import { useState } from "react";
import { RiCloseLine, RiTruckLine, RiMapPinLine } from "react-icons/ri";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import { Order, OrderStatus } from "@/types";
import { ORDER_STATUS_LABELS, formatDate, formatPrice } from "@/utils/helpers";
import toast from "react-hot-toast";

interface Props {
  order: Order;
  onClose: () => void;
}

const STATUS_OPTIONS: OrderStatus[] = [
  "confirmed", "preparing", "in_transit", "out_for_delivery", "delivered", "cancelled",
];

export const AdminTrackingModal = ({ order, onClose }: Props) => {
  const updateMutation = useUpdateOrderStatus();
  const [status, setStatus] = useState<OrderStatus>(order.order_status);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a tracking message.");
      return;
    }
    try {
      await updateMutation.mutateAsync({
        id: order.id,
        status,
        message: message.trim(),
        location: location.trim() || undefined,
      });
      toast.success("Tracking updated successfully!");
      onClose();
    } catch {
      toast.error("Failed to update tracking.");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-warm-800 rounded-2xl border border-warm-700 w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-warm-700">
          <div className="flex items-center gap-2">
            <RiTruckLine className="w-5 h-5 text-brand-400" />
            <h2 className="font-display font-bold text-white text-lg">Update Tracking</h2>
          </div>
          <button onClick={onClose} className="text-warm-400 hover:text-white">
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Order summary */}
          <div className="bg-warm-900/50 rounded-xl p-4 mb-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-brand-400 text-sm font-semibold">{order.tracking_number}</p>
                <p className="text-white font-semibold mt-0.5">{order.customer_name}</p>
                <p className="text-warm-400 text-sm">{order.customer_email}</p>
              </div>
              <p className="font-bold text-warm-200">{formatPrice(order.total)}</p>
            </div>
            <div className="mt-3 text-xs text-warm-500">
              {order.items.map(i => i.puppy_name).join(", ")}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Status select */}
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">
                New Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full bg-warm-900 border border-warm-600 text-warm-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">
                Tracking Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={2}
                placeholder="e.g. Your puppy has been picked up and is on its way!"
                className="w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-warm-400 uppercase tracking-wider block mb-1.5">
                Location (optional)
              </label>
              <div className="relative">
                <RiMapPinLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-500" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Chicago Distribution Center, IL"
                  className="w-full bg-warm-900 border border-warm-600 text-warm-200 placeholder-warm-600 rounded-xl px-4 py-2.5 pl-9 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Previous updates */}
            {order.tracking_updates.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-2">
                  History
                </p>
                <div className="max-h-32 overflow-y-auto space-y-2 bg-warm-900/50 rounded-xl p-3">
                  {[...order.tracking_updates].reverse().map((u) => (
                    <div key={u.id} className="text-xs">
                      <span className="text-brand-400 font-medium">{ORDER_STATUS_LABELS[u.status]}</span>
                      <span className="text-warm-500 ml-2">{u.message}</span>
                      <span className="text-warm-600 ml-1">— {formatDate(u.timestamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-3 bg-warm-700 hover:bg-warm-600 text-warm-300 rounded-xl font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={updateMutation.isPending} className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-70">
                {updateMutation.isPending ? "Updating..." : "Update Tracking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
