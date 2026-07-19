"use client";

import { LayoutDashboard, Shield } from "lucide-react";

export function RolePickerModal({
  onSelect,
}: {
  onSelect: (workspace: "student" | "admin") => void;
}) {
  return (
    <div className="bg-overlay fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-picker-title"
        className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl sm:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
          Choose workspace
        </p>
        <h2
          id="role-picker-title"
          className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl"
        >
          How do you want to continue?
        </h2>
        <p className="mt-2 text-sm text-muted">
          This account has both student and admin access. Pick where to go — you can switch anytime
          from the header.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onSelect("student")}
            className="rounded-2xl border border-border bg-background p-5 text-left transition hover:border-brand hover:bg-brand-soft"
          >
            <LayoutDashboard className="h-6 w-6 text-brand" />
            <p className="mt-3 font-display text-lg font-bold text-ink">Student dashboard</p>
            <p className="mt-1 text-sm text-muted">
              Tasks, applications, certificates, and job portal.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onSelect("admin")}
            className="rounded-2xl border border-border bg-background p-5 text-left transition hover:border-brand hover:bg-brand-soft"
          >
            <Shield className="h-6 w-6 text-brand" />
            <p className="mt-3 font-display text-lg font-bold text-ink">Admin panel</p>
            <p className="mt-1 text-sm text-muted">
              Approvals, users, task review, and live platform data.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
