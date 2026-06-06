"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/lib/utils";
import { APPOINTMENT_STATUSES } from "@/lib/validations";

interface AppointmentItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  purpose: string;
  status: string;
  notes: string | null;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AppointmentItem | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const fetchAppointments = () => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setAppointments)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleUpdate = async () => {
    if (!selected) return;
    await fetch(`/api/appointments/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    fetchAppointments();
    setSelected(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <AdminHeader title="Appointments" subtitle={`${appointments.length} total`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left p-4 text-xs uppercase text-silver">Customer</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Date & Time</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Purpose</th>
                <th className="text-left p-4 text-xs uppercase text-silver">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr
                  key={apt.id}
                  onClick={() => { setSelected(apt); setStatus(apt.status); setNotes(apt.notes || ""); }}
                  className={`border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.02] ${selected?.id === apt.id ? "bg-champagne/5" : ""}`}
                >
                  <td className="p-4">
                    <p className="text-ivory">{apt.name}</p>
                    <p className="text-xs text-silver">{apt.email}</p>
                  </td>
                  <td className="p-4 text-silver">
                    {formatDate(apt.date)}<br />
                    <span className="text-xs">{apt.time}</span>
                  </td>
                  <td className="p-4 text-silver">{apt.purpose}</td>
                  <td className="p-4"><StatusBadge status={apt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="glass p-6">
            <h3 className="text-lg text-ivory mb-4">{selected.name}</h3>
            <div className="space-y-2 text-sm text-silver mb-6">
              <p>{selected.email}</p>
              {selected.phone && <p>{selected.phone}</p>}
              <p>{formatDate(selected.date)} at {selected.time}</p>
              <p className="text-ivory">{selected.purpose}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-field">Status</label>
                <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {APPOINTMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label-field">Notes</label>
                <textarea className="input-field resize-none" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <button onClick={handleUpdate} className="btn-primary text-xs w-full">Update</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
