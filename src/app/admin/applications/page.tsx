"use client";

import { useState } from "react";
import { useAdminLive } from "@/hooks/useAdminLive";
import { Button } from "@/components/ui/Button";

export default function AdminApplicationsPage() {
  const { data, live, refresh } = useAdminLive();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function act(applicationId: string, action: "approve" | "reject") {
    setBusyId(applicationId);
    setError(null);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ applicationId, action }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Action failed");
        return;
      }
      await refresh();
    } catch {
      setError("Could not update application");
    } finally {
      setBusyId(null);
    }
  }

  const apps = data?.applications ?? [];
  const pending = apps.filter((a) => a.status === "pending");
  const rest = apps.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-white/55">
          Approve enrolls the student into the track in real time on their dashboard.
        </p>
        <span className={`text-xs font-semibold ${live ? "text-brand" : "text-white/40"}`}>
          {live ? "Live" : "Syncing…"}
        </span>
      </div>

      {error && <p className="rounded-xl bg-danger/15 px-3 py-2 text-sm text-danger">{error}</p>}

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold">Pending ({pending.length})</h2>
        {pending.map((app) => (
          <article
            key={app.id}
            className="rounded-2xl border border-white/10 bg-[#161b18] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold text-white">{app.fullName}</p>
                <p className="text-sm text-white/55">
                  {app.email} · {app.phone}
                </p>
                <p className="mt-2 text-sm text-brand">{app.trackTitle}</p>
                <p className="mt-1 text-sm text-white/50">
                  {app.university} · Semester {app.semester} · {app.city}
                </p>
                {app.motivation && (
                  <p className="mt-3 max-w-2xl text-sm text-white/65">{app.motivation}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={busyId === app.id}
                  onClick={() => void act(app.id, "approve")}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={busyId === app.id}
                  onClick={() => void act(app.id, "reject")}
                >
                  Reject
                </Button>
              </div>
            </div>
          </article>
        ))}
        {!pending.length && (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
            No pending applications.
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold">History</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/45">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">When</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((app) => (
                <tr key={app.id} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{app.fullName}</p>
                    <p className="text-white/45">{app.email}</p>
                  </td>
                  <td className="px-4 py-3 text-white/70">{app.trackTitle}</td>
                  <td className="px-4 py-3 capitalize text-white/70">{app.status}</td>
                  <td className="px-4 py-3 text-white/45">
                    {app.reviewedAt
                      ? new Date(app.reviewedAt).toLocaleString()
                      : app.createdAt
                        ? new Date(app.createdAt).toLocaleString()
                        : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
