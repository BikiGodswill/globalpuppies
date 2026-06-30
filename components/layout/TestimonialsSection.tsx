import { RiStarFill, RiDoubleQuotesL } from "react-icons/ri";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    text: "I was nervous about buying a puppy online, but GlobalPuppies made the whole process so smooth and transparent. My Golden Retriever, Biscuit, arrived healthy and happy. The tracking system kept me informed every step of the way!",
    breed: "Golden Retriever owner",
    initials: "SM",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "James Okafor",
    location: "London, UK",
    rating: 5,
    text: "Outstanding service from start to finish. The team was incredibly helpful with all my questions about the French Bulldog breed. My puppy Max is everything they described — healthy, playful, and absolutely adorable.",
    breed: "French Bulldog owner",
    initials: "JO",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Amara Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "GlobalPuppies delivered my Siberian Husky all the way to Canada with zero issues. The health certificate, vaccination records — everything was perfect. The email updates throughout delivery were so reassuring.",
    breed: "Siberian Husky owner",
    initials: "AC",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "David Ferreira",
    location: "São Paulo, Brazil",
    rating: 5,
    text: "Never thought I'd find such a reputable service that ships internationally. My German Shepherd puppy Ares is everything and more. The lifetime support they offer is genuinely helpful — they answered every question I had.",
    breed: "German Shepherd owner",
    initials: "DF",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Priya Sharma",
    location: "Dubai, UAE",
    rating: 5,
    text: "I've purchased two puppies from GlobalPuppies now — a Poodle and a Maltese. Both arrived in perfect health with all documentation in order. The customer service is unmatched. Will always come back here.",
    breed: "Poodle & Maltese owner",
    initials: "PS",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Marcus Thompson",
    location: "Sydney, Australia",
    rating: 5,
    text: "The Bernese Mountain Dog I purchased is the most beautiful puppy I've ever seen. GlobalPuppies made international shipping straightforward and the whole experience felt safe and professional. Highly recommend.",
    breed: "Bernese Mountain Dog owner",
    initials: "MT",
    color: "bg-amber-100 text-amber-600",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section bg-warm-900 overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Testimonials
          </p>
          <h2 className="font-display font-bold text-warm-50 text-4xl md:text-5xl">
            Families Who Found Their Match
          </h2>
          <p className="text-warm-400 mt-4 max-w-lg mx-auto">
            Over 2,400 families have welcomed a GlobalPuppies companion into their homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, location, rating, text, breed, initials, color }) => (
            <div
              key={name}
              className="bg-warm-800 rounded-2xl p-6 border border-warm-700 hover:border-brand-500/50 transition-colors duration-300 relative"
            >
              <RiDoubleQuotesL className="w-8 h-8 text-brand-500/40 absolute top-4 right-4" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <RiStarFill key={i} className="w-4 h-4 text-amber-400" />
                ))}
              </div>

              <p className="text-warm-300 text-sm leading-relaxed mb-6">
                &quot;{text}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-sm shrink-0`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-warm-100 font-semibold text-sm">{name}</p>
                  <p className="text-warm-500 text-xs">{location} · {breed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
