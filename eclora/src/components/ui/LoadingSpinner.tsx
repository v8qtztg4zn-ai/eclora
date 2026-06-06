"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-2 border-champagne/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-champagne rounded-full animate-spin" />
      </div>
    </div>
  );
}
