"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Engagement Rings",
    slug: "Engagement Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247fc67f4565?w=800&q=80",
    description: "Symbols of forever, crafted with intention",
  },
  {
    name: "Diamond Pendants",
    slug: "Diamond Pendants",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    description: "Elegance that rests close to the heart",
  },
  {
    name: "Tennis Bracelets",
    slug: "Tennis Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    description: "Continuous brilliance around your wrist",
  },
  {
    name: "Earrings",
    slug: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60904?w=800&q=80",
    description: "Frame your face with radiant light",
  },
  {
    name: "Custom Jewelry",
    slug: "Custom Jewelry",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    description: "Your vision, our craftsmanship",
  },
];

export function CollectionShowcase() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
            Curated for You
          </p>
          <h2 className="heading-section text-ivory">The Collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${encodeURIComponent(cat.slug)}`}
            >
              <GlassCard
                delay={i * 0.1}
                className="group cursor-pointer overflow-hidden !p-0"
              >
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl text-ivory mb-2 group-hover:text-champagne transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-silver">{cat.description}</p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-champagne opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
