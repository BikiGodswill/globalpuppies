import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  RiShieldCheckLine, RiHeartLine, RiGlobalLine,
  RiAwardLine, RiTeamLine, RiLeafLine,
} from "react-icons/ri";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GlobalPuppies — our mission, our standards, and our commitment to ethical breeding.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative bg-warm-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=80"
            alt="Happy puppies"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="container-max relative text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl max-w-3xl mx-auto">
            Connecting Hearts, One Puppy at a Time
          </h1>
          <p className="text-warm-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2015, GlobalPuppies was born from a simple belief: every family
            deserves to find their perfect canine companion — and every puppy deserves
            a loving home.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Our Mission
              </p>
              <h2 className="font-display font-bold text-warm-900 text-4xl mb-6">
                Setting the Standard in Responsible Puppy Placement
              </h2>
              <p className="text-warm-600 leading-relaxed mb-4">
                We believe that the journey to finding your perfect companion should be
                transparent, joyful, and worry-free. We partner exclusively with ethical
                breeders who share our uncompromising commitment to puppy welfare.
              </p>
              <p className="text-warm-600 leading-relaxed mb-8">
                Every puppy in our program undergoes rigorous health screening, receives
                all age-appropriate vaccinations, and is raised in a loving home environment
                — never in a commercial kennel or puppy mill.
              </p>
              <Link href="/shop" className="btn-primary">
                Meet Our Puppies
              </Link>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=700&q=80"
                alt="Happy husky puppy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-warm-50">
        <div className="container-max">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-warm-900 text-4xl">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: RiShieldCheckLine, color: "bg-blue-100 text-blue-600", title: "Transparency", desc: "We provide full documentation, health records, and breeder information for every puppy. No surprises." },
              { icon: RiHeartLine, color: "bg-red-100 text-red-600", title: "Animal Welfare", desc: "Puppy welfare comes before profit. We inspect every breeder and maintain strict ethical standards." },
              { icon: RiGlobalLine, color: "bg-green-100 text-green-600", title: "Global Reach", desc: "We deliver to over 80 countries, ensuring puppies travel safely with licensed transport specialists." },
              { icon: RiAwardLine, color: "bg-brand-100 text-brand-600", title: "Quality Breeding", desc: "We work only with breeders whose bloodlines meet championship standards and genetic health requirements." },
              { icon: RiTeamLine, color: "bg-purple-100 text-purple-600", title: "Expert Support", desc: "Our team of veterinarians and dog trainers is available to support you for the lifetime of your puppy." },
              { icon: RiLeafLine, color: "bg-teal-100 text-teal-600", title: "Sustainability", desc: "We actively support breed preservation programs and contribute to canine welfare organizations worldwide." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card p-6">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-warm-900 text-xl mb-2">{title}</h3>
                <p className="text-warm-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-brand-500">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "2,400+", label: "Puppies Placed" },
              { value: "80+", label: "Countries Served" },
              { value: "100+", label: "Breeds Available" },
              { value: "9 Years", label: "Of Excellence" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-bold text-5xl">{value}</p>
                <p className="text-brand-100 mt-2 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
