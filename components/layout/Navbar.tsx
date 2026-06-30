"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  RiMenuLine,
  RiCloseLine,
  RiShoppingCartLine,
  RiSearchLine,
} from "react-icons/ri";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/cart/CartDrawer";

const NAV_LINKS = [
  { href: "/shop", label: "Shop Puppies" },
  { href: "/breeds", label: "Breeds" },
  { href: "/order-tracking", label: "Track Order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-sm shadow-sm border-b border-warm-100"
            : "bg-warm-900/50"
        }`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm group-hover:bg-brand-600 transition-colors">
                <span className="text-white font-display font-bold text-lg leading-none ">
                  <img src="logo.png" alt="Logo" className="rounded-full" />
                </span>
              </div>
              <div className={`md:flex flex-col leading-none hidden`}>
                <span className="font-display font-bold text-warm-900 text-lg tracking-widest">
                  Global Puppies
                </span>
                <span className="text-[10px] text-warm-400 font-body uppercase tracking-widest">
                  Premium Companions
                </span>
              </div>
            </Link>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn-ghost text-sm px-4 py-2  rounded-md font-bold hover:underline hover:decoration-2 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href="/shop" className="btn-ghost hidden sm:flex text-sm">
                <RiSearchLine className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative btn-ghost"
                aria-label="Open cart"
              >
                <RiShoppingCartLine className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center animate-fade-in">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="md:hidden btn-ghost"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <RiCloseLine className="w-5 h-5" />
                ) : (
                  <RiMenuLine className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden border-t border-warm-100 bg-white pb-4 animate-fade-in">
              <nav className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-warm-800 hover:text-brand-600 hover:bg-warm-50 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        className="font-bold"
      />
    </>
  );
};
