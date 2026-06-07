"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export function AppointmentForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({
          show: true,
          type: "success",
          message: "Appointment booked! We'll confirm shortly.",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          purpose: "",
          notes: "",
        });
      } else {
        setAlert({
          show: true,
          type: "error",
          message: data.error || "Booking failed",
        });
      }
    } catch {
      setAlert({
        show: true,
        type: "error",
        message: "Failed to book. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert
        type={alert.type}
        message={alert.message}
        show={alert.show}
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="label-field">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">Date *</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="label-field">Time *</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="label-field">Purpose *</label>
          <select
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select purpose</option>
            <option value="Consultation">General Consultation</option>
            <option value="Engagement Ring">Engagement Ring Selection</option>
            <option value="Custom Design">Custom Design Discussion</option>
            <option value="Studio Visit">Studio Visit</option>
            <option value="Collection Viewing">Private Collection Viewing</option>
          </select>
        </div>

        <div>
          <label className="label-field">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="input-field resize-none"
            placeholder="Anything we should know?"
          />
        </div>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </Button>
      </form>
    </>
  );
}
