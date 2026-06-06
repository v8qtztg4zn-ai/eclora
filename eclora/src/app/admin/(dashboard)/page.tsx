"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  MessageSquare,
  Clock,
  DollarSign,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatPrice, formatDate } from "@/lib/utils";
import type { DashboardStats } from "@/types";

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return <p className="text-silver">Failed to load dashboard</p>;

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back to ECLORA admin"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Orders"
          value={data.totalOrders}
          icon={ShoppingCart}
          delay={0}
        />
        <StatCard
          title="Total Inquiries"
          value={data.totalInquiries}
          icon={MessageSquare}
          delay={0.1}
        />
        <StatCard
          title="Pending Inquiries"
          value={data.pendingInquiries}
          icon={Clock}
          delay={0.2}
        />
        <StatCard
          title="Revenue"
          value={formatPrice(data.revenue)}
          icon={DollarSign}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass p-6">
          <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">
            Monthly Sales
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#C9CDD3" fontSize={12} />
              <YAxis stroke="#C9CDD3" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#050505",
                  border: "1px solid #D6B56D30",
                  borderRadius: 0,
                }}
              />
              <Bar dataKey="sales" fill="#D6B56D" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">
            Popular Categories
          </h3>
          <div className="space-y-4">
            {data.popularCategories.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <span className="text-sm text-ivory">{cat.category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-champagne rounded-full"
                      style={{
                        width: `${Math.min(
                          (cat.count /
                            Math.max(
                              ...data.popularCategories.map((c) => c.count),
                              1
                            )) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-silver w-6 text-right">
                    {cat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {data.recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0"
            >
              <div>
                <p className="text-sm text-ivory">{item.title}</p>
                <p className="text-xs text-silver">
                  {item.type} · {item.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={item.status} />
                <span className="text-xs text-silver/60">
                  {formatDate(item.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
