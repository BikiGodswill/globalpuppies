import type { Metadata } from "next";
import { PuppyDetailClient } from "./PuppyDetailClient";

export const metadata: Metadata = {
  title: "Puppy Details",
};

export default function PuppyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <PuppyDetailClient id={params.id} />;
}
