"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-midnight border-r border-white/[0.05] flex flex-col z-40">
      <div className="p-6 border-b border-white/[0.05]">
        <Link href="/admin" className="font-display text-xl tracking-[0.2em] text-champagne">
          ECLORA
        </Link>
        <p className="text-[10px] tracking-wider uppercase text-silver/50 mt-1">
          Admin Dashboard
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200",
                isActive
                  ? "bg-champagne/10 text-champagne border-l-2 border-champagne"
                  : "text-silver hover:text-ivory hover:bg-white/[0.03]"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm text-silver hover:text-rose transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
