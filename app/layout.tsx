import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GlobalPuppies Premium Puppies Delivered Worldwide",
    template: "%s | GlobalPuppies",
  },
  description:
    "Find your perfect companion from our curated selection of premium, health-certified puppies. Breeds from around the world, delivered with love.",
  keywords: [
    "puppies for sale",
    "buy puppies online",
    "premium puppies",
    "AKC puppies",
    "puppy delivery",
    "golden retriever puppy",
    "french bulldog puppy",
  ],
  openGraph: {
    title: "GlobalPuppies Premium Puppies Delivered Worldwide",
    description:
      "Find your perfect companion from our curated selection of health-certified puppies.",
    url: "https://globalpuppies.com",
    siteName: "GlobalPuppies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalPuppies",
    description: "Premium health-certified puppies delivered worldwide.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body bg-warm-50 text-warm-900 antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
