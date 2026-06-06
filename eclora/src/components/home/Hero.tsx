"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const DiamondScene = dynamic(
  () => import("@/components/three/DiamondScene").then((m) => m.DiamondScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <DiamondScene />

      <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent to-midnight z-[1]" />
      <div className="absolute inset-0 bg-glow-radial z-[1]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-champagne mb-6"
          >
            Lab-Grown Luxury
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] font-light mb-6"
          >
            <span className="text-shimmer">ECLORA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-display text-lg md:text-2xl text-ivory/80 font-light tracking-wide mb-12 italic"
          >
            Not mined, but designed to shine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Button href="/collection" variant="primary">
              Explore Collection
            </Button>
            <Button href="/contact" variant="secondary">
              Book a Consultation
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-silver/60">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-8 bg-gradient-to-b from-champagne/60 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
