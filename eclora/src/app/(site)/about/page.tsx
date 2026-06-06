"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sustainability } from "@/components/home/Sustainability";

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
              Our Story
            </p>
            <h1 className="heading-display text-ivory mb-8">About ECLORA</h1>
            <p className="text-silver text-lg font-light leading-relaxed">
              ECLORA represents modern lab-grown diamond luxury for a new
              generation. The brand believes diamonds do not need to be mined to
              be meaningful.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1617032218108-9e806e9d8846?w=800&q=80"
              alt="ECLORA atelier"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-section text-ivory">
              Consciously Created,
              <br />
              Beautifully Designed
            </h2>
            <p className="text-silver leading-relaxed font-light">
              They can be consciously created, beautifully designed, and made
              to shine with purpose. Every ECLORA piece begins with a question:
              how can we create something extraordinary without causing harm?
            </p>
            <p className="text-silver leading-relaxed font-light">
              Our lab-grown diamonds are chemically, physically, and optically
              identical to mined diamonds. The difference lies in their origin —
              born from innovation in controlled environments, not extracted
              from the earth.
            </p>
            <p className="text-silver leading-relaxed font-light">
              We serve a generation that values authenticity, sustainability,
              and design excellence. ECLORA is luxury reimagined for those who
              refuse to compromise.
            </p>
          </motion.div>
        </div>
      </section>

      <Sustainability />
    </div>
  );
}
