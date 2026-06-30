import type { Metadata } from "next";
import { OrderDetailClient } from "./OrderDetailClient";

export const metadata: Metadata = { title: "Order Confirmation" };

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetailClient id={params.id} />;
}
