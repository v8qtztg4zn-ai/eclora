import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-midnight">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl tracking-[0.3em] text-ivory mb-4">
              ECLORA
            </h3>
            <p className="text-silver text-sm leading-relaxed">
              Not mined, but designed to shine.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/collection", label: "Collection" },
                { href: "/products", label: "Shop All" },
                { href: "/custom-jewelry", label: "Custom Design" },
                { href: "/about", label: "Our Story" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-silver hover:text-ivory transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-silver hover:text-ivory transition-colors"
                >
                  Book Consultation
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@eclora.com"
                  className="text-sm text-silver hover:text-ivory transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  hello@eclora.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-silver hover:text-ivory transition-colors flex items-center gap-2"
                >
                  <Phone size={14} />
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-champagne mb-6">
              Follow
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-champagne transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-silver/60 tracking-wider">
            &copy; {new Date().getFullYear()} ECLORA. All rights reserved.
          </p>
          <p className="text-xs text-silver/40 tracking-wider">
            Lab-grown diamonds. Ethical luxury.
          </p>
        </div>
      </div>
    </footer>
  );
}
