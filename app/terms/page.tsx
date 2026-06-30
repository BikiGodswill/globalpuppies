import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="bg-warm-50 py-14">
        <div className="container-max max-w-3xl">
          <h1 className="font-display font-bold text-warm-900 text-5xl mb-3">Terms of Service</h1>
          <p className="text-warm-500">Last updated: January 1, 2025</p>
        </div>
      </div>
      <div className="container-max max-w-3xl py-12">
        <div className="card p-8 space-y-8 text-warm-700 leading-relaxed">
          {[
            {
              title: "1. Acceptance of Terms",
              body: "By accessing or using the GlobalPuppies website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
            },
            {
              title: "2. Purchase and Payment",
              body: "All purchases are subject to availability. Prices are listed in USD and may change without notice. A deposit may be required to reserve a specific puppy. Full payment must be completed before shipping. We reserve the right to cancel orders at our discretion.",
            },
            {
              title: "3. Health Guarantee",
              body: "Our 2-year genetic health guarantee is subject to the terms detailed in our Health Guarantee Policy. Claims must be supported by documentation from a licensed veterinarian. The guarantee applies only to the original purchaser and is non-transferable.",
            },
            {
              title: "4. Shipping and Delivery",
              body: "We make every effort to ensure safe and timely delivery. However, we are not liable for delays caused by weather, airline changes, or circumstances beyond our control. Risk of loss passes to the buyer upon delivery.",
            },
            {
              title: "5. Prohibited Uses",
              body: "You may not use our services for any illegal purpose, to purchase puppies for resale without prior written consent, to misrepresent yourself or your intended use, or to engage in any fraudulent activity.",
            },
            {
              title: "6. Limitation of Liability",
              body: "GlobalPuppies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our maximum liability shall not exceed the amount paid for the specific puppy that gave rise to the claim.",
            },
            {
              title: "7. Governing Law",
              body: "These terms shall be governed by the laws of the State of New York, USA, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of New York County, New York.",
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-display font-semibold text-warm-900 text-xl mb-3">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
