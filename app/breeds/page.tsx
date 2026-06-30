import type { Metadata } from "next";
import { BreedsClient } from "./BreedsClient";

export const metadata: Metadata = {
  title: "All Breeds",
  description:
    "Explore our full collection of puppy breeds. From tiny Chihuahuas to majestic Great Danes — find the perfect match.",
};

export default function BreedsPage() {
  return <BreedsClient />;
}
