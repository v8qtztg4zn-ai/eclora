"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Alert, type AlertState } from "@/components/ui/Alert";

interface Settings {
  brandName: string;
  tagline: string;
  heroText: string;
  logoUrl: string | null;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  instagram: string | null;
  pinterest: string | null;
  tiktok: string | null;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "success" as const, message: "" });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof Settings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setAlert({ show: true, type: "success", message: "Settings saved successfully" });
    } else {
      setAlert({ show: true, type: "error", message: "Failed to save settings" });
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!settings) return <p className="text-silver">Failed to load settings</p>;

  return (
    <div>
      <Alert {...alert} onClose={() => setAlert((p) => ({ ...p, show: false }))} />
      <AdminHeader title="Settings" subtitle="Manage brand and contact details" />

      <form onSubmit={handleSave} className="glass p-8 max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Brand Name</label>
            <input className="input-field" value={settings.brandName} onChange={(e) => handleChange("brandName", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Tagline</label>
            <input className="input-field" value={settings.tagline} onChange={(e) => handleChange("tagline", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label-field">Hero Text</label>
          <input className="input-field" value={settings.heroText} onChange={(e) => handleChange("heroText", e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Email</label>
            <input className="input-field" value={settings.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Phone</label>
            <input className="input-field" value={settings.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>
          <div>
            <label className="label-field">WhatsApp Number</label>
            <input className="input-field" value={settings.whatsapp || ""} onChange={(e) => handleChange("whatsapp", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Address</label>
            <input className="input-field" value={settings.address || ""} onChange={(e) => handleChange("address", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="label-field">Instagram</label>
            <input className="input-field" value={settings.instagram || ""} onChange={(e) => handleChange("instagram", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Pinterest</label>
            <input className="input-field" value={settings.pinterest || ""} onChange={(e) => handleChange("pinterest", e.target.value)} />
          </div>
          <div>
            <label className="label-field">TikTok</label>
            <input className="input-field" value={settings.tiktok || ""} onChange={(e) => handleChange("tiktok", e.target.value)} />
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
