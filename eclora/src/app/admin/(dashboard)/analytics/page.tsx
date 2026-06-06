"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TrendingUp } from "lucide-react";

interface AnalyticsData {
  monthlyData: { month: string; inquiries: number; sales: number }[];
  topProducts: { name: string; views: number; category: string }[];
  topCategories: { category: string; count: number }[];
  conversionRate: number;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return <p className="text-silver">Failed to load analytics</p>;

  return (
    <div>
      <AdminHeader title="Analytics" subtitle="Performance insights" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Conversion Rate" value={`${data.conversionRate}%`} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass p-6">
          <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">Monthly Inquiries</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#C9CDD3" fontSize={12} />
              <YAxis stroke="#C9CDD3" fontSize={12} />
              <Tooltip contentStyle={{ background: "#050505", border: "1px solid #D6B56D30" }} />
              <Line type="monotone" dataKey="inquiries" stroke="#E8B7C8" strokeWidth={2} dot={{ fill: "#E8B7C8" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#C9CDD3" fontSize={12} />
              <YAxis stroke="#C9CDD3" fontSize={12} />
              <Tooltip contentStyle={{ background: "#050505", border: "1px solid #D6B56D30" }} />
              <Bar dataKey="sales" fill="#D6B56D" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">Most Viewed Products</h3>
          <div className="space-y-3">
            {data.topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0">
                <div>
                  <p className="text-sm text-ivory">{p.name}</p>
                  <p className="text-xs text-silver">{p.category}</p>
                </div>
                <span className="text-sm text-champagne">{p.views} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-sm tracking-wider uppercase text-champagne mb-6">Most Requested Categories</h3>
          <div className="space-y-3">
            {data.topCategories.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0">
                <span className="text-sm text-ivory">{c.category}</span>
                <span className="text-sm text-champagne">{c.count} products</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
