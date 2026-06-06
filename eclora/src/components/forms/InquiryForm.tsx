```typescriptreact
"use client";

import { useState } from "react";
import { Alert, type AlertState } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface InquiryFormProps {
  type?: string;
  productId?: string;
  showJewelryFields?: boolean;
}

export function InquiryForm({
  type = "general",
  productId,
  showJewelryFields = false,
}: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: "success",
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jewelryType: "",
    budget: "",
    diamondSize: "",
    metalPreference: "",
    message: "",
    referenceImage: "",
  });

  const handleChange = (
    e: React.ChangeEvent
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload/public", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, referenceImage: data.url }));
      }
    } catch {
      setAlert({ show: true, type: "error", message: "Image upload failed" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type, productId }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({
          show: true,
          type: "success",
          message: "Your inquiry has been submitted. We'll be in touch soon.",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          jewelryType: "",
          budget: "",
          diamondSize: "",
          metalPreference: "",
          message: "",
          referenceImage: "",
        });
      } else {
        setAlert({
          show: true,
          type: "error",
          message: data.error || "Something went wrong",
        });
      }
    } catch {
      setAlert({
        show: true,
        type: "error",
        message: "Failed to submit. Please try again.",
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
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="label-field">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="+1 (555) 000-0000"
            />
          </div>
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
            placeholder="you@email.com"
          />
        </div>

        {showJewelryFields && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-field">Jewelry Type</label>
                <select
                  name="jewelryType"
                  value={form.jewelryType}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select type</option>
                  <option value="Engagement Ring">Engagement Ring</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="label-field">Budget Range</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select budget</option>
                  <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                  <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-field">Preferred Diamond Size</label>
                <input
                  name="diamondSize"
                  value={form.diamondSize}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. 1.5 carat"
                />
              </div>
              <div>
                <label className="label-field">Metal Preference</label>
                <select
                  name="metalPreference"
                  value={form.metalPreference}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select metal</option>
                  <option value="18K White Gold">18K White Gold</option>
                  <option value="18K Yellow Gold">18K Yellow Gold</option>
                  <option value="18K Rose Gold">18K Rose Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-field">Reference Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input-field file:mr-4 file:py-1 file:px-4 file:border-0 file:text-sm file:bg-champagne/20 file:text-champagne"
              />
              {form.referenceImage && (
                <p className="text-xs text-emerald mt-2">Image uploaded ✓</p>
              )}
            </div>
          </>
        )}

        <div>
          <label className="label-field">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Tell us about your vision..."
          />
        </div>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Submitting..." : "Send Inquiry"}
        </Button>
      </form>
    </>
  );
}

```
