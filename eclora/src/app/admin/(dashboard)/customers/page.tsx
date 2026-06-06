"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/lib/utils";

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  createdAt: string;
  _count: { inquiries: number; orders: number; wishlists: number };
}

interface CustomerDetail extends CustomerItem {
  inquiries: { id: string; type: string; status: string; createdAt: string }[];
  orders: { id: string; orderNumber: string; totalAmount: number; status: string }[];
  wishlists: { product: { name: string } }[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [detail, setDetail] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (id: string) => {
    const res = await fetch(`/api/customers/${id}`);
    const data = await res.json();
    setDetail(data);
    setNotes(data.notes || "");
  };

  const handleSaveNotes = async () => {
    if (!detail) return;
    await fetch(`/api/customers/${detail.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <AdminHeader title="Customers" subtitle={`${customers.length} total`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left p-4 text-xs uppercase text-silver">Name</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Contact</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Activity</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleSelect(c.id)}
                  className={`border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.02] ${detail?.id === c.id ? "bg-champagne/5" : ""}`}
                >
                  <td className="p-4 text-ivory">{c.name}</td>
                  <td className="p-4">
                    <p className="text-silver text-xs">{c.email}</p>
                    {c.phone && <p className="text-silver text-xs">{c.phone}</p>}
                  </td>
                  <td className="p-4 text-xs text-silver">
                    {c._count.inquiries} inquiries · {c._count.orders} orders
                  </td>
                  <td className="p-4 text-xs text-silver">{formatDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {detail && (
          <div className="glass p-6 space-y-6">
            <div>
              <h3 className="text-lg text-ivory">{detail.name}</h3>
              <p className="text-sm text-silver">{detail.email}</p>
            </div>

            {detail.inquiries.length > 0 && (
              <div>
                <h4 className="text-xs uppercase text-champagne mb-2">Inquiries</h4>
                {detail.inquiries.map((i) => (
                  <p key={i.id} className="text-xs text-silver">{i.type} — {i.status}</p>
                ))}
              </div>
            )}

            {detail.orders.length > 0 && (
              <div>
                <h4 className="text-xs uppercase text-champagne mb-2">Orders</h4>
                {detail.orders.map((o) => (
                  <p key={o.id} className="text-xs text-silver">{o.orderNumber} — {o.status}</p>
                ))}
              </div>
            )}

            {detail.wishlists.length > 0 && (
              <div>
                <h4 className="text-xs uppercase text-champagne mb-2">Wishlist</h4>
                {detail.wishlists.map((w, i) => (
                  <p key={i} className="text-xs text-silver">{w.product.name}</p>
                ))}
              </div>
            )}

            <div>
              <label className="label-field">Notes</label>
              <textarea className="input-field resize-none" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
              <button onClick={handleSaveNotes} className="btn-primary text-xs w-full mt-3">Save Notes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
