"use client";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="font-display text-2xl text-ivory">{title}</h1>
        {subtitle && (
          <p className="text-sm text-silver mt-1">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
