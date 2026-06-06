"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const layers = [
  {
    text: "Born from design, not destruction.",
    subtext: "Every facet tells a story of innovation.",
  },
  {
    text: "Lab-grown brilliance. Ethical luxury.",
    subtext: "Diamonds created with purpose, not plunder.",
  },
  {
    text: "Made for the new generation of elegance.",
    subtext: "Conscious choices. Timeless beauty.",
  },
];

function StoryLayer({
  text,
  subtext,
  index,
}: {
  text: string;
  subtext: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 1, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.8, 1, 1, 1, 0.9]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative">
      <motion.div
        style={{ opacity, scale, y }}
        className="text-center px-6 max-w-4xl"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-champagne/60 mb-6 block">
          0{index + 1}
        </span>
        <h2 className="heading-display text-ivory mb-6">{text}</h2>
        <p className="text-silver text-lg font-light tracking-wide">{subtext}</p>
      </motion.div>
    </div>
  );
}

export function ScrollStory() {
  return (
    <section className="relative bg-midnight">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/95 to-midnight" />
      {layers.map((layer, i) => (
        <StoryLayer key={i} {...layer} index={i} />
      ))}
    </section>
  );
}
