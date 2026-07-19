"use client";

import { useAdminLive } from "@/hooks/useAdminLive";

export default function AdminEnrollmentsPage() {
  const { data, live } = useAdminLive();
  const rows = data?.enrollments ?? [];
  const tracks = data?.tracks ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/55">
          Active student enrollments and seat usage across tracks.
        </p>
        <span className={`text-xs font-semibold ${live ? "text-brand" : "text-white/40"}`}>
          {live ? "Live" : "Syncing…"}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t) => (
          <div
            key={t.slug}
            className="rounded-2xl border border-white/10 bg-[#161b18] p-4"
          >
            <p className="font-display font-bold text-white">{t.title}</p>
            <p className="mt-1 text-sm text-white/50">
              {t.enrolledCount} enrolled · {t.seatsPerSection} seats / section
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/45">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Track</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Tasks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.userId}-${row.slug}`} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{row.userName}</p>
                  <p className="text-white/45">{row.userEmail}</p>
                </td>
                <td className="px-4 py-3 text-white/70">{row.title}</td>
                <td className="px-4 py-3 text-white/70">{row.section}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-brand"
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                    <span className="text-white/70">{row.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/55">
                  {row.approved} approved · {row.submitted} submitted · {row.total} total
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/45">
                  No active enrollments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
