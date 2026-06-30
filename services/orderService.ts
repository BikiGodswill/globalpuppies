import { supabase } from "@/lib/supabase/client";
import { Order, OrderStatus, TrackingUpdate } from "@/types";

// ─── CLIENT-SIDE READS ────────────────────────────────────────────────────────

export const orderService = {
  getById: async (id: string): Promise<Order | null> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  },

  getByTracking: async (trackingNumber: string): Promise<Order | null> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("tracking_number", trackingNumber)
      .single();
    if (error) return null;
    return data;
  },

  // ─── WRITES — go through API routes (server-side only) ─────────────────────

  getAll: async (): Promise<Order[]> => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch orders");
    return data.orders;
  },

  create: async (
    orderData: Omit<Order, "id" | "tracking_number" | "tracking_updates" | "created_at" | "updated_at">
  ): Promise<Order> => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create order");
    return data.order;
  },

  updateStatus: async (
    id: string,
    status: OrderStatus,
    message: string,
    location?: string
  ): Promise<Order> => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, message, location }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update order");
    return data.order;
  },
};
