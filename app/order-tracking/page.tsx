import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackingClient } from "./TrackingClient";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Enter your tracking number to get real-time updates on your puppy's delivery.",
};

function TrackingFallback() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-warm-500">Loading tracking page...</p>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<TrackingFallback />}>
      <TrackingClient />
    </Suspense>
  );
}