"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/lib/utils";
import { INQUIRY_STATUSES } from "@/lib/validations";

interface InquiryItem {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  jewelryType: string | null;
  budget: string | null;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  product?: { name: string } | null;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InquiryItem | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const fetchInquiries = () => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then(setInquiries)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleSelect = (inquiry: InquiryItem) => {
    setSelected(inquiry);
    setNotes(inquiry.adminNotes || "");
    setStatus(inquiry.status);
  };

  const handleUpdate = async () => {
    if (!selected) return;
    await fetch(`/api/inquiries/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes: notes }),
    });
    fetchInquiries();
    setSelected(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <AdminHeader title="Inquiries" subtitle={`${inquiries.length} total`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left p-4 text-xs uppercase text-silver">Customer</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Type</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Status</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => handleSelect(inq)}
                  className={`border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.02] ${selected?.id === inq.id ? "bg-champagne/5" : ""}`}
                >
                  <td className="p-4">
                    <p className="text-ivory">{inq.name}</p>
                    <p className="text-xs text-silver">{inq.email}</p>
                  </td>
                  <td className="p-4 text-silver capitalize">{inq.type}</td>
                  <td className="p-4"><StatusBadge status={inq.status} /></td>
                  <td className="p-4 text-silver text-xs">{formatDate(inq.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="glass p-6">
            <h3 className="text-lg text-ivory mb-4">{selected.name}</h3>
            <div className="space-y-3 text-sm mb-6">
              <p className="text-silver">Email: <span className="text-ivory">{selected.email}</span></p>
              {selected.phone && <p className="text-silver">Phone: <span className="text-ivory">{selected.phone}</span></p>}
              {selected.jewelryType && <p className="text-silver">Type: <span className="text-ivory">{selected.jewelryType}</span></p>}
              {selected.budget && <p className="text-silver">Budget: <span className="text-ivory">{selected.budget}</span></p>}
              {selected.product && <p className="text-silver">Product: <span className="text-ivory">{selected.product.name}</span></p>}
              {selected.message && <p className="text-silver mt-4">{selected.message}</p>}
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-field">Status</label>
                <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label-field">Admin Notes</label>
                <textarea className="input-field resize-none" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <button onClick={handleUpdate} className="btn-primary text-xs w-full">Update Inquiry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
