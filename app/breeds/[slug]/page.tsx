import type { Metadata } from "next";
import { BreedDetailClient } from "./BreedDetailClient";

export const metadata: Metadata = {
  title: "Breed Details",
};

export default function BreedDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BreedDetailClient slug={params.slug} />;
}
