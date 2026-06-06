"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/products", label: "Shop" },
  { href: "/custom-jewelry", label: "Custom" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-midnight/80 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-5">
        <Link href="/" className="group">
          <span className="font-display text-2xl md:text-3xl tracking-[0.3em] text-ivory group-hover:text-shimmer transition-all duration-500">
            ECLORA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.15em] uppercase text-silver hover:text-champagne transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-sm tracking-[0.15em] uppercase text-champagne border border-champagne/30 px-6 py-2.5 hover:bg-champagne/10 transition-all duration-300"
          >
            Book Consultation
          </Link>
        </div>

        <button
          className="md:hidden text-ivory"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight/95 backdrop-blur-xl border-b border-white/[0.05]"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-[0.15em] uppercase text-silver hover:text-champagne py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-champagne border border-champagne/30 px-6 py-3 text-center mt-2"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
