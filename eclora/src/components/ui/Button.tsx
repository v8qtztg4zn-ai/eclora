"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "px-6 py-2 text-silver hover:text-champagne transition-colors",
  };

  const classes = cn(variants[variant], className);

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          className={cn(classes, "inline-block cursor-pointer")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
