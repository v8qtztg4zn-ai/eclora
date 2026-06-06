"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">{children}</main>
    </div>
  );
}
