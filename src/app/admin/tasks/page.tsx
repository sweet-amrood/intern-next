"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAdminLive } from "@/hooks/useAdminLive";

export default function AdminTasksPage() {
  const { data, live, loading, error } = useAdminLive();
  const students = data?.taskStudents ?? [];
  const withSubmissions = students.filter((s) => s.submittedCount > 0);
  const enrolled = students.filter((s) => s.enrollments.length > 0);

  if (loading && !data) {
    return <p className="text-white/50">Loading students…</p>;
  }

  if (error && !data) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-white/55">
          Students with internship enrollments. Open a student to review all course tasks and
          submitted work.
        </p>
        <span className={`text-xs font-semibold ${live ? "text-brand" : "text-white/40"}`}>
          {live ? "Live" : "Syncing…"} · {withSubmissions.length} awaiting review
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/45">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Courses</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Approved</th>
              <th className="px-4 py-3">Open</th>
              <th className="px-4 py-3">Last submit</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {enrolled.map((s) => (
              <tr key={s.userId} className="border-t border-white/5 hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{s.userName}</p>
                  <p className="text-white/45">{s.userEmail}</p>
                </td>
                <td className="px-4 py-3 text-white/70">
                  <div className="space-y-1">
                    {s.enrollments.map((e) => (
                      <p key={e.slug}>
                        {e.title}
                        <span className="text-white/40"> · Sec {e.section}</span>
                      </p>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      s.submittedCount > 0
                        ? "font-semibold text-warning"
                        : "text-white/50"
                    }
                  >
                    {s.submittedCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-brand">{s.approvedCount}</td>
                <td className="px-4 py-3 text-white/55">{s.todoCount}</td>
                <td className="px-4 py-3 text-white/45">
                  {s.lastSubmittedAt
                    ? new Date(s.lastSubmittedAt).toLocaleString()
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/tasks/${s.userId}`}
                    className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
                  >
                    Open
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
            {!enrolled.length && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-white/45">
                  No enrolled students yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
