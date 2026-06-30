import type { Metadata } from "next";
import Link from "next/link";
import { RiTruckLine, RiGlobalLine, RiTimeLine, RiShieldCheckLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Learn how GlobalPuppies delivers your puppy safely to your door.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-blue-50 to-warm-50 py-16">
        <div className="container-max text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <RiTruckLine className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="font-display font-bold text-warm-900 text-5xl">
            Shipping Policy
          </h1>
          <p className="text-warm-500 mt-4 max-w-md mx-auto">
            Your puppy&apos;s safety and comfort during transit is our top priority.
          </p>
        </div>
      </div>

      <div className="container-max py-14 max-w-3xl">
        <div className="space-y-8">
          {[
            {
              icon: RiTruckLine,
              color: "bg-blue-100 text-blue-600",
              title: "Domestic Shipping (USA)",
              content: [
                "Ground transport via licensed pet transport vehicle for distances under 500 miles.",
                "Air cargo on Delta Cargo or United PetSafe for longer distances.",
                "Typical delivery: 1–3 business days after payment confirmation.",
                "Shipping cost: $199–$399 depending on distance. Free for orders over $3,000.",
              ],
            },
            {
              icon: RiGlobalLine,
              color: "bg-green-100 text-green-600",
              title: "International Shipping",
              content: [
                "We ship to 80+ countries via licensed IATA-certified animal transport agents.",
                "All required import permits, health certificates, and customs documentation handled by us.",
                "Typical delivery: 3–10 business days depending on destination.",
                "International shipping: $499–$1,299. Contact us for a precise quote.",
              ],
            },
            {
              icon: RiTimeLine,
              color: "bg-amber-100 text-amber-600",
              title: "Shipping Timeline",
              content: [
                "Order confirmation: immediate upon payment.",
                "Preparation (vet check, paperwork): 3–5 business days.",
                "Shipping notification with tracking: sent 24 hours before departure.",
                "Delivery confirmation call: our team calls when your puppy arrives.",
              ],
            },
            {
              icon: RiShieldCheckLine,
              color: "bg-purple-100 text-purple-600",
              title: "Puppy Safety Standards",
              content: [
                "USDA and IATA compliant crates with ample space, bedding, and ventilation.",
                "Food and water provided throughout the journey.",
                "Direct flights only for international shipments — no unnecessary layovers.",
                "Real-time GPS tracking on all transport vehicles.",
              ],
            },
          ].map(({ icon: Icon, color, title, content }) => (
            <div key={title} className="card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-display font-bold text-warm-900 text-xl">{title}</h2>
              </div>
              <ul className="space-y-2">
                {content.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-warm-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-brand-50 rounded-2xl p-8 border border-brand-100">
          <p className="text-warm-600 mb-4">
            Have questions about shipping to your location?
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Our Shipping Team
          </Link>
        </div>
      </div>
    </div>
  );
}
