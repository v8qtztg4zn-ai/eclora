"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type AlertState = {
  show: boolean;
  type: "success" | "error";
  message: string;
};

interface AlertProps extends AlertState {
  onClose?: () => void;
}

export function Alert({ type, message, show, onClose }: AlertProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "fixed top-24 right-6 z-50 px-6 py-4 text-sm tracking-wide",
            type === "success"
              ? "bg-emerald/20 border border-emerald/40 text-ivory"
              : "bg-rose/20 border border-rose/40 text-ivory"
          )}
        >
          <div className="flex items-center gap-4">
            <span>{message}</span>
            {onClose && (
              <button onClick={onClose} className="text-silver hover:text-ivory">
                ✕
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
