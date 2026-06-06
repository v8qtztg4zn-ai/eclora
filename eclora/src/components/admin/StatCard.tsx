"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wider uppercase text-silver mb-2">
            {title}
          </p>
          <p className="text-2xl font-light text-ivory">{value}</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border border-champagne/20 rounded-full">
          <Icon size={18} className="text-champagne" />
        </div>
      </div>
    </motion.div>
  );
}
