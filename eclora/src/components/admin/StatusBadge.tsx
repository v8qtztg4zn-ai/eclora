import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  New: "bg-champagne/20 text-champagne border-champagne/30",
  Contacted: "bg-silver/20 text-silver border-silver/30",
  Converted: "bg-emerald/20 text-emerald border-emerald/30",
  Closed: "bg-rose/20 text-rose border-rose/30",
  Pending: "bg-champagne/20 text-champagne border-champagne/30",
  Confirmed: "bg-emerald/20 text-emerald border-emerald/30",
  "In Production": "bg-silver/20 text-silver border-silver/30",
  Ready: "bg-champagne/20 text-champagne border-champagne/30",
  Delivered: "bg-emerald/20 text-emerald border-emerald/30",
  Cancelled: "bg-rose/20 text-rose border-rose/30",
  Completed: "bg-emerald/20 text-emerald border-emerald/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block text-[10px] tracking-wider uppercase px-2.5 py-1 border",
        statusColors[status] || "bg-white/10 text-silver border-white/20"
      )}
    >
      {status}
    </span>
  );
}
