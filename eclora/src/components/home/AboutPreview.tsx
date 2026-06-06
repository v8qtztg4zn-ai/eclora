"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1617032218108-9e806e9d8846?w=800&q=80"
              alt="ECLORA craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 border border-champagne/20 m-4" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-rose/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
            Our Story
          </p>
          <h2 className="heading-section text-ivory mb-8">
            Redefining What
            <br />
            <span className="text-shimmer">Diamonds Mean</span>
          </h2>
          <p className="text-silver leading-relaxed mb-6 font-light">
            ECLORA represents modern lab-grown diamond luxury for a new
            generation. The brand believes diamonds do not need to be mined to
            be meaningful.
          </p>
          <p className="text-silver leading-relaxed mb-10 font-light">
            They can be consciously created, beautifully designed, and made to
            shine with purpose. Every piece is a testament to the idea that true
            luxury lies in intention, not extraction.
          </p>
          <Button href="/about" variant="secondary">
            Discover ECLORA
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
