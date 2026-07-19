"use client";

import { useAdminLive } from "@/hooks/useAdminLive";
import Link from "next/link";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#161b18] p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-white">{value}</p>
    </div>
  );
}

export default function AdminOverviewPage() {
  const { data, error, live, loading, refresh } = useAdminLive();

  if (loading && !data) {
    return <p className="text-white/50">Syncing live platform data…</p>;
  }

  if (error && !data) {
    return <p className="text-danger">{error}</p>;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/60">
            Live sync from student site · last update{" "}
            {new Date(data.updatedAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold ${
              live ? "bg-brand/20 text-brand" : "bg-white/10 text-white/60"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-brand" : "bg-white/40"}`} />
            {live ? "Live" : "Polling"}
          </span>
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-full border border-white/15 px-3 py-1 font-semibold text-white/70 hover:bg-white/5"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Students" value={data.stats.students} />
        <Stat label="Pending applications" value={data.stats.pendingApplications} />
        <Stat label="Active enrollments" value={data.stats.activeEnrollments} />
        <Stat label="Tasks awaiting review" value={data.stats.submittedTasks} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#161b18] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Latest applications</h2>
            <Link href="/admin/applications" className="text-sm text-brand hover:underline">
              Open queue
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {data.applications.slice(0, 6).map((app) => (
              <li
                key={app.id}
                className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 text-sm last:border-0"
              >
                <div>
                  <p className="font-semibold text-white">{app.fullName}</p>
                  <p className="text-white/50">
                    {app.trackTitle} · {app.university}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    app.status === "pending"
                      ? "bg-warning/20 text-warning"
                      : app.status === "approved"
                        ? "bg-brand/20 text-brand"
                        : "bg-danger/20 text-danger"
                  }`}
                >
                  {app.status}
                </span>
              </li>
            ))}
            {!data.applications.length && (
              <li className="text-sm text-white/45">No applications yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#161b18] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Task submissions</h2>
            <Link href="/admin/tasks" className="text-sm text-brand hover:underline">
              Open students
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {(data.taskStudents ?? [])
              .filter((s) => s.submittedCount > 0)
              .slice(0, 6)
              .map((s) => (
                <li
                  key={s.userId}
                  className="border-b border-white/5 pb-3 text-sm last:border-0"
                >
                  <Link
                    href={`/admin/tasks/${s.userId}`}
                    className="font-semibold text-white hover:text-brand"
                  >
                    {s.userName}
                  </Link>
                  <p className="text-white/50">
                    {s.submittedCount} awaiting review ·{" "}
                    {s.enrollments.map((e) => e.title).join(", ")}
                  </p>
                </li>
              ))}
            {!(data.taskStudents ?? []).some((s) => s.submittedCount > 0) && (
              <li className="text-sm text-white/45">No tasks waiting for review.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
