import Link from "next/link";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeFill,
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiShieldCheckLine,
  RiHeartLine,
} from "react-icons/ri";

const SHOP_LINKS = [
  { href: "/shop", label: "Browse All Puppies" },
  { href: "/breeds", label: "All Breeds" },
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop?filter=sale", label: "Special Offers" },
];

const SUPPORT_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/order-tracking", label: "Track Your Order" },
  { href: "/contact", label: "Contact Us" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/returns", label: "Returns & Refunds" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About GlobalPuppies" },
  { href: "/health-guarantee", label: "Health Guarantee" },
  { href: "/breeder-standards", label: "Breeder Standards" },
  { href: "/blog", label: "Puppy Blog" },
  { href: "/careers", label: "Careers" },
];

const SOCIAL_LINKS = [
  { href: "#", icon: RiFacebookFill, label: "Facebook", color: "blue" },
  { href: "#", icon: RiInstagramLine, label: "Instagram", color: "red" },
  { href: "#", icon: RiTwitterXLine, label: "X (Twitter)", color: "black" },
  { href: "#", icon: RiYoutubeFill, label: "YouTube", color: "red" },
];

export const Footer = () => {
  return (
    <footer className="bg-warm-900 text-warm-200">
      {/* Trust bar */}
      <div className="border-b border-warm-800 ">
        <div className="container-max py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: RiShieldCheckLine,
                title: "Health Certified",
                desc: "Every puppy vet-checked",
              },
              {
                icon: RiHeartLine,
                title: "Lifetime Support",
                desc: "We're here after purchase",
              },
              {
                icon: RiMapPinLine,
                title: "Worldwide Delivery",
                desc: "Safe & comfortable shipping",
              },
              {
                icon: RiShieldCheckLine,
                title: "Breeder Verified",
                desc: "Ethical breeding standards",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="font-semibold text-warm-100 text-sm">{title}</p>
                  <p className="text-warm-400 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-max py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">
                  <img src="logo.png" alt="Logo" className="rounded-full" />
                </span>
              </div>
              <span className="font-display font-bold text-warm-100 text-xl">
                GlobalPuppies
              </span>
            </Link>
            <p className="text-warm-400 text-sm leading-relaxed max-w-xs">
              Connecting loving homes with healthy, happy puppies from ethical
              breeders around the world. Every companion deserves a perfect
              family.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`text-${color}-800 w-9 h-9 rounded-lg bg-warm-800 hover:bg-brand-500 flex items-center justify-center transition-colors duration-200`}
                >
                  <Icon className="w-4 h-4 text-warm-300" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-warm-400">
              <div className="flex items-center gap-2">
                <RiMapPinLine className="w-4 h-4 text-brand-400 shrink-0" />
                <span>123 Kennel Lane, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <RiMailLine className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href="mailto:support@globalpuppies.com"
                  className="hover:text-brand-400 transition-colors"
                >
                  support@globalpuppies.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <RiPhoneLine className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+1 (800) 555-PUPS</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-warm-100 font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-warm-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-warm-100 font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-warm-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-warm-100 font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-warm-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-800">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-warm-500">
          <p>
            &copy; {new Date().getFullYear()} GlobalPuppies. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-brand-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-brand-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-brand-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
