import type { Metadata } from "next";
import { TrackingClient } from "./TrackingClient";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Enter your tracking number to get real-time updates on your puppy's delivery.",
};

export default function OrderTrackingPage() {
  return <TrackingClient />;
}
