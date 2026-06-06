"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Alert } from "@/components/ui/Alert";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "error", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setAlert({
          show: true,
          type: "error",
          message: data.error || "Login failed",
        });
      }
    } catch {
      setAlert({ show: true, type: "error", message: "Connection error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-glow-radial" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md glass p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl tracking-[0.2em] text-champagne mb-2">
            ECLORA
          </h1>
          <p className="text-xs tracking-wider uppercase text-silver">
            Admin Portal
          </p>
        </div>

        <Alert
          type={alert.type}
          message={alert.message}
          show={alert.show}
          onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label-field">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="admin@eclora.com"
            />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
