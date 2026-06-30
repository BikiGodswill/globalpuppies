import { v4 as uuidv4 } from "uuid";

export const generateTrackingNumber = (): string => {
  const prefix = "GP";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateId = (): string => uuidv4();

export const slugify = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Order Pending",
  confirmed: "Order Confirmed",
  preparing: "Preparing for Shipment",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-50",
  confirmed: "text-blue-600 bg-blue-50",
  preparing: "text-purple-600 bg-purple-50",
  in_transit: "text-orange-600 bg-orange-50",
  out_for_delivery: "text-brand-600 bg-brand-50",
  delivered: "text-green-600 bg-green-50",
  cancelled: "text-red-600 bg-red-50",
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  paypal: "PayPal",
  crypto: "Cryptocurrency",
  card: "Credit / Debit Card",
};
