import type { Metadata } from "next";
import Link from "next/link";
import {
  RiShieldCheckLine, RiMedicineBottleLine,
  RiHeartLine, RiCustomerServiceLine,
} from "react-icons/ri";

export const metadata: Metadata = {
  title: "Health Guarantee",
  description: "Our comprehensive 2-year genetic health guarantee for every puppy.",
};

export default function HealthGuaranteePage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-green-50 to-warm-50 py-16">
        <div className="container-max text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <RiShieldCheckLine className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-display font-bold text-warm-900 text-5xl md:text-6xl">
            Health Guarantee
          </h1>
          <p className="text-warm-500 mt-4 max-w-md mx-auto text-lg">
            Your peace of mind is our priority. Every GlobalPuppies companion
            comes with comprehensive health protection.
          </p>
        </div>
      </div>

      <div className="container-max py-14 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {[
            { icon: RiShieldCheckLine, color: "bg-green-100 text-green-600", title: "2-Year Genetic Guarantee", desc: "Coverage for hereditary conditions diagnosed within 24 months of purchase." },
            { icon: RiMedicineBottleLine, color: "bg-blue-100 text-blue-600", title: "Full Health Certificate", desc: "Licensed vet exam within 10 days of shipping, covering vaccinations and parasite treatment." },
            { icon: RiHeartLine, color: "bg-red-100 text-red-600", title: "72-Hour Satisfaction", desc: "Not satisfied within 72 hours of receipt? Contact us for a full resolution." },
            { icon: RiCustomerServiceLine, color: "bg-purple-100 text-purple-600", title: "Lifetime Vet Support", desc: "Free consultations with our partner veterinarians for the life of your puppy." },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="card p-6 flex gap-4">
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-warm-900 text-lg">{title}</h3>
                <p className="text-warm-500 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-8 space-y-6">
          <h2 className="font-display font-bold text-warm-900 text-3xl">
            What Is Covered
          </h2>
          <p className="text-warm-600 leading-relaxed">
            GlobalPuppies guarantees that every puppy sold is free from life-threatening hereditary
            and congenital defects for a period of 24 months from the date of purchase. If your
            puppy is diagnosed with a covered condition within this period, you will receive either:
          </p>
          <ul className="space-y-2 text-warm-600">
            {[
              "A replacement puppy of equal or greater value",
              "A 50% refund of the original purchase price",
              "Reimbursement of veterinary expenses up to the purchase price",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <RiShieldCheckLine className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-display font-bold text-warm-900 text-2xl pt-4">
            What Is Not Covered
          </h2>
          <ul className="space-y-2 text-warm-500 text-sm">
            {[
              "Injuries resulting from accidents or owner negligence",
              "Conditions caused by improper nutrition or care",
              "Contagious diseases contracted after leaving our care",
              "Minor cosmetic conditions that do not affect quality of life",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warm-300 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="btn-primary mr-4">
            Browse Puppies
          </Link>
          <Link href="/contact" className="btn-secondary">
            Questions? Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
