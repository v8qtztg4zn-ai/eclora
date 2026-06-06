"use client";

import { motion } from "framer-motion";
import { Gem, Leaf, Sparkles, Shield } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const pillars = [
  {
    icon: Gem,
    title: "Lab-Grown Diamonds",
    description:
      "Identical in composition to mined diamonds, created through advanced technology in controlled environments.",
  },
  {
    icon: Leaf,
    title: "Ethical Sourcing",
    description:
      "Zero mining impact. Every stone is traceable, transparent, and free from conflict.",
  },
  {
    icon: Sparkles,
    title: "Modern Craftsmanship",
    description:
      "Precision cutting and setting by master artisans who blend tradition with innovation.",
  },
  {
    icon: Shield,
    title: "Responsible Luxury",
    description:
      "Luxury that doesn't cost the earth. Conscious choices for a conscious generation.",
  },
];

export function Sustainability() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-emerald mb-4">
            Our Promise
          </p>
          <h2 className="heading-section text-ivory mb-6">
            Conscious Brilliance
          </h2>
          <p className="text-silver max-w-2xl mx-auto font-light leading-relaxed">
            We believe luxury and responsibility are not opposing forces.
            ECLORA proves that the most beautiful things can also be the most
            ethical.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <GlassCard key={pillar.title} delay={i * 0.15}>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-emerald/30 rounded-full">
                  <pillar.icon size={20} className="text-emerald" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-ivory mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-silver leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
