import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop Puppies",
  description:
    "Browse our full selection of premium, health-certified puppies. Filter by breed, price, gender, and more.",
};

export default function ShopPage() {
  return <ShopClient />;
}
