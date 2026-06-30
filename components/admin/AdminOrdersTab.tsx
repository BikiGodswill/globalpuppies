"use client";
import { useState } from "react";
import {
  RiTruckLine, RiMapPinLine, RiTimeLine, RiEditLine,
} from "react-icons/ri";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { Order, OrderStatus } from "@/types";
import { formatPrice, formatDate, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/utils/helpers";
import { AdminTrackingModal } from "./AdminTrackingModal";
import toast from "react-hot-toast";

export const AdminOrdersTab = () => {
  const { data: orders, isLoading } = useOrders();
  const [selected, setSelected] = useState<Order | null>(null);

  return (
    <div>
      <p className="text-warm-400 text-sm mb-6">
        {orders?.length || 0} total orders
      </p>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-warm-800 rounded-xl h-20 animate-pulse" />
          ))}
        </div>
      ) : orders?.length === 0 ? (
        <div className="text-center py-20">
          <RiTruckLine className="w-12 h-12 text-warm-600 mx-auto mb-3" />
          <p className="text-warm-500">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-warm-800 rounded-xl border border-warm-700 p-4 hover:border-warm-600 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-brand-400 font-semibold text-sm">
                      {order.tracking_number}
                    </span>
                    <span className={`badge text-xs ${ORDER_STATUS_COLORS[order.order_status]}`}>
                      {ORDER_STATUS_LABELS[order.order_status]}
                    </span>
                    <span className={`badge text-xs ${
                      order.payment_status === "paid" ? "bg-green-900 text-green-300" :
                      order.payment_status === "failed" ? "bg-red-900 text-red-300" :
                      "bg-yellow-900 text-yellow-300"
                    }`}>
                      {order.payment_status}
                    </span>
                  </div>
                  <p className="text-white font-semibold mt-1">{order.customer_name}</p>
                  <p className="text-warm-400 text-sm">{order.customer_email}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-warm-500">
                    <span className="flex items-center gap-1">
                      <RiTimeLine className="w-3 h-3" />
                      {formatDate(order.created_at)}
                    </span>
                    <span>{order.items.length} item(s)</span>
                    <span className="font-semibold text-warm-300">{formatPrice(order.total)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(order)}
                  className="flex items-center gap-2 bg-brand-500/20 hover:bg-brand-500/40 text-brand-300 px-4 py-2 rounded-lg text-sm transition-colors shrink-0"
                >
                  <RiEditLine className="w-4 h-4" />
                  Update Tracking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <AdminTrackingModal
          order={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};
