import {
  RiShieldCheckLine,
  RiHeartLine,
  RiTruckLine,
  RiMedicineBottleLine,
  RiCustomerServiceLine,
  RiAwardLine,
} from "react-icons/ri";

const FEATURES = [
  {
    icon: RiShieldCheckLine,
    title: "Health Guaranteed",
    description:
      "Every puppy comes with a comprehensive health certificate, full vaccination records, and a 2-year genetic health guarantee.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: RiAwardLine,
    title: "AKC Registered",
    description:
      "Most of our puppies are AKC registered, coming from lineages with championship bloodlines and documented pedigrees.",
    color: "bg-brand-100 text-brand-600",
  },
  {
    icon: RiTruckLine,
    title: "Worldwide Delivery",
    description:
      "We partner with specialized pet transport services to ensure safe, comfortable, and stress-free delivery anywhere in the world.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: RiMedicineBottleLine,
    title: "Fully Vaccinated",
    description:
      "All puppies are current on vaccinations, dewormed, and microchipped before leaving our care.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: RiHeartLine,
    title: "Ethical Breeding",
    description:
      "We work exclusively with breeders who meet our stringent welfare standards. No puppy mills — ever.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: RiCustomerServiceLine,
    title: "Lifetime Support",
    description:
      "Our team of canine experts is available around the clock to answer any questions before and after your purchase.",
    color: "bg-amber-100 text-amber-600",
  },
];

export const WhyUsSection = () => {
  return (
    <section className="section bg-warm-50">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Why GlobalPuppies
          </p>
          <h2 className="font-display font-bold text-warm-900 text-4xl md:text-5xl">
            Your Trust Is Everything
          </h2>
          <p className="text-warm-500 mt-4 max-w-xl mx-auto text-lg">
            We hold ourselves to the highest standard so you can focus on
            the joy of welcoming a new companion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="card p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-warm-900 text-xl mb-2">
                {title}
              </h3>
              <p className="text-warm-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
