"use client";
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

const FAQ_ITEMS = [
  {
    q: "Are all your puppies AKC registered?",
    a: "Most of our puppies are AKC registered. Each listing clearly shows the registration type (AKC, UKC, FCI, or Designer). We always provide full registration documentation upon purchase.",
  },
  {
    q: "Do the puppies come with health certificates?",
    a: "Yes. Every puppy sold through GlobalPuppies comes with a certificate of health signed by a licensed veterinarian. The certificate covers vaccinations, parasite treatments, and an overall health assessment completed within 10 days of shipping.",
  },
  {
    q: "How are puppies delivered?",
    a: "We work with licensed, specialty pet transport companies that specialize in live animal shipping. Puppies travel in climate-controlled, USDA-compliant kennels. We offer ground transport (within the US) and air cargo or cabin options for international delivery.",
  },
  {
    q: "What is your health guarantee?",
    a: "We offer a 2-year genetic health guarantee on all puppies. If your puppy is diagnosed with a hereditary condition covered by our guarantee within that period, we will provide a full replacement puppy or a partial refund at your discretion.",
  },
  {
    q: "Can I visit the breeder before purchasing?",
    a: "Absolutely! We encourage you to connect with the breeder directly. We can arrange virtual tours via video call and, for local buyers, in-person visits to the breeder's home. Transparency is one of our core values.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept PayPal, major credit/debit cards (Visa, Mastercard, American Express), and select cryptocurrencies (Bitcoin, Ethereum, USDT). All transactions are processed securely.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 80 countries worldwide. International shipping costs and timelines vary by destination. Contact us for a shipping quote to your specific country.",
  },
  {
    q: "What age are the puppies when I receive them?",
    a: "Puppies are typically 8–12 weeks old when they are ready to go to their new homes. Some breeds may be ready slightly earlier or later depending on their development and breeder recommendations.",
  },
  {
    q: "Can I return a puppy?",
    a: "We understand that sometimes circumstances change. We have a 72-hour satisfaction policy — if for any reason you are not satisfied within 72 hours of receiving your puppy, contact us and we will work with you to find a solution. We never want a puppy to end up in a shelter.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is confirmed, you will receive a unique tracking number via email. You can use this number on our Order Tracking page at any time to see real-time updates on your puppy's journey.",
  },
  {
    q: "Are your breeders inspected?",
    a: "Yes. All breeders in our network undergo a rigorous vetting process including home inspections, reference checks, and compliance verification with local breeding regulations. We conduct annual re-evaluations to ensure ongoing standards are met.",
  },
  {
    q: "What support do you offer after purchase?",
    a: "We offer lifetime support to all GlobalPuppies families. Our team of canine experts and partner veterinarians is available to answer questions about nutrition, training, health, and behavior throughout your puppy's life.",
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-warm-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-warm-900 group-hover:text-brand-600 transition-colors">
          {q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-brand-500 text-white" : "bg-warm-100 text-warm-500 group-hover:bg-brand-100 group-hover:text-brand-600"}`}>
          {open ? <RiSubtractLine className="w-4 h-4" /> : <RiAddLine className="w-4 h-4" />}
        </div>
      </button>
      {open && (
        <div className="pb-5 text-warm-600 leading-relaxed text-sm animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
};

export default function FaqPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-brand-50 to-warm-50 py-16">
        <div className="container-max text-center">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Help Center
          </p>
          <h1 className="font-display font-bold text-warm-900 text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="text-warm-500 mt-4 max-w-md mx-auto text-lg">
            Everything you need to know about GlobalPuppies.
          </p>
        </div>
      </div>

      <div className="container-max py-14 max-w-3xl">
        <div className="card p-6 sm:p-10">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="mt-10 text-center bg-brand-50 rounded-2xl p-8 border border-brand-100">
          <h3 className="font-display font-semibold text-warm-900 text-xl mb-2">
            Still have questions?
          </h3>
          <p className="text-warm-500 text-sm mb-5">
            Our team is here to help you every step of the way.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
