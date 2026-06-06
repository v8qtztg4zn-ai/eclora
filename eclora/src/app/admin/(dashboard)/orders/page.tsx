"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/validations";

interface OrderItem {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  deliveryDate: string | null;
  adminNotes: string | null;
  createdAt: string;
  customer: { name: string; email: string };
  items: { product: { name: string }; quantity: number; price: number }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OrderItem | null>(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const fetchOrders = () => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleSelect = (order: OrderItem) => {
    setSelected(order);
    setStatus(order.status);
    setPaymentStatus(order.paymentStatus);
    setDeliveryDate(order.deliveryDate ? order.deliveryDate.split("T")[0] : "");
    setAdminNotes(order.adminNotes || "");
  };

  const handleUpdate = async () => {
    if (!selected) return;
    await fetch(`/api/orders/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, paymentStatus, deliveryDate, adminNotes }),
    });
    fetchOrders();
    setSelected(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <AdminHeader title="Orders" subtitle={`${orders.length} total`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left p-4 text-xs uppercase text-silver">Order</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Customer</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Amount</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleSelect(order)}
                  className={`border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.02] ${selected?.id === order.id ? "bg-champagne/5" : ""}`}
                >
                  <td className="p-4">
                    <p className="text-ivory">{order.orderNumber}</p>
                    <p className="text-xs text-silver">{formatDate(order.createdAt)}</p>
                  </td>
                  <td className="p-4 text-silver">{order.customer.name}</td>
                  <td className="p-4 text-champagne">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="glass p-6">
            <h3 className="text-lg text-ivory mb-2">{selected.orderNumber}</h3>
            <p className="text-sm text-silver mb-4">{selected.customer.name} · {selected.customer.email}</p>

            <div className="space-y-2 mb-6 text-sm">
              {selected.items.map((item, i) => (
                <div key={i} className="flex justify-between text-silver">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span className="text-ivory">{formatPrice(item.price)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-white/10 font-medium">
                <span className="text-champagne">Total</span>
                <span className="text-champagne">{formatPrice(selected.totalAmount)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label-field">Status</label>
                <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label-field">Payment Status</label>
                <select className="input-field" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Partial</option>
                  <option>Refunded</option>
                </select>
              </div>
              <div>
                <label className="label-field">Delivery Date</label>
                <input type="date" className="input-field" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
              </div>
              <div>
                <label className="label-field">Notes</label>
                <textarea className="input-field resize-none" rows={2} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
              </div>
              <button onClick={handleUpdate} className="btn-primary text-xs w-full">Update Order</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
