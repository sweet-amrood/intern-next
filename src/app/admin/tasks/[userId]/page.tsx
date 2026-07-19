"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type TaskItem = {
  id: string;
  title: string;
  module: string;
  due: string;
  status: "todo" | "submitted" | "approved";
  description: string;
  githubUrl: string;
  submissionNote: string;
  files: Array<{ name: string; url: string; size: number }>;
  submittedAt: string | null;
  trackSlug: string;
};

type EnrollmentBlock = {
  slug: string;
  title: string;
  section: number;
  enrolledAt: string | null;
  submitted: number;
  approved: number;
  todo: number;
  total: number;
  tasks: TaskItem[];
};

type Payload = {
  user: { id: string; name: string; email: string };
  enrollments: EnrollmentBlock[];
};

export default function AdminStudentTasksPage() {
  const params = useParams();
  const userId = String(params.userId || "");
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/admin/tasks/${userId}`, { credentials: "include" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not load student");
        setData(null);
        return;
      }
      setData(json);
      setError(null);
    } catch {
      setError("Could not reach server");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function review(taskId: string, status: "approved" | "todo") {
    setBusyKey(taskId);
    setActionError(null);
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, taskId, status }),
      });
      const json = await res.json();
      if (!res.ok) {
        setActionError(json.error || "Could not update task");
        return;
      }
      await load();
    } catch {
      setActionError("Could not update task");
    } finally {
      setBusyKey(null);
    }
  }

  if (loading) {
    return <p className="text-white/50">Loading student tasks…</p>;
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/tasks"
          className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to students
        </Link>
        <p className="text-danger">{error || "Student not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/admin/tasks"
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to students
          </Link>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-white">
            {data.user.name}
          </h2>
          <p className="text-sm text-white/55">{data.user.email}</p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70 hover:bg-white/5"
        >
          Refresh
        </button>
      </div>

      {actionError && (
        <p className="rounded-xl bg-danger/15 px-3 py-2 text-sm text-danger">{actionError}</p>
      )}

      {!data.enrollments.length && (
        <p className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/45">
          This student is not enrolled in any course yet.
        </p>
      )}

      {data.enrollments.map((course) => (
        <section
          key={course.slug}
          className="space-y-4 rounded-2xl border border-white/10 bg-[#161b18] p-5"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Enrolled course
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Section {course.section}
                {course.enrolledAt
                  ? ` · since ${new Date(course.enrolledAt).toLocaleDateString()}`
                  : ""}
              </p>
            </div>
            <p className="text-sm text-white/55">
              <span className="text-warning">{course.submitted} submitted</span>
              {" · "}
              <span className="text-brand">{course.approved} approved</span>
              {" · "}
              {course.todo} open · {course.total} total
            </p>
          </div>

          <div className="space-y-3">
            {course.tasks.map((task) => {
              const isSubmitted = task.status === "submitted";
              return (
                <article
                  key={task.id}
                  className={cn(
                    "rounded-xl border p-4",
                    isSubmitted
                      ? "border-warning/40 bg-warning/5"
                      : task.status === "approved"
                        ? "border-brand/30 bg-brand/5"
                        : "border-white/10 bg-white/[0.02]",
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase",
                            task.status === "submitted" && "bg-warning/20 text-warning",
                            task.status === "approved" && "bg-brand/20 text-brand",
                            task.status === "todo" && "bg-white/10 text-white/60",
                          )}
                        >
                          {task.status}
                        </span>
                        <p className="text-xs text-white/40">{task.module}</p>
                      </div>
                      <h4 className="mt-2 font-display text-lg font-bold text-white">
                        {task.title}
                      </h4>
                      <p className="mt-1 text-sm text-white/50">{task.description}</p>
                      <p className="mt-2 text-xs text-white/40">
                        Due {task.due}
                        {task.submittedAt
                          ? ` · submitted ${new Date(task.submittedAt).toLocaleString()}`
                          : ""}
                      </p>

                      {isSubmitted && (
                        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                          {task.githubUrl && (
                            <a
                              href={task.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                            >
                              Open GitHub <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {task.submissionNote && (
                            <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/45">
                                <FileText className="h-3.5 w-3.5" />
                                Student note
                              </p>
                              <p className="mt-1 text-sm text-white/75">{task.submissionNote}</p>
                            </div>
                          )}
                          {task.files?.length > 0 && (
                            <div>
                              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/45">
                                <Paperclip className="h-3.5 w-3.5" />
                                Uploaded files ({task.files.length})
                              </p>
                              <ul className="mt-2 space-y-1.5">
                                {task.files.map((f) => (
                                  <li key={f.url}>
                                    <a
                                      href={f.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                                    >
                                      {f.name}
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      {f.size > 0 && (
                                        <span className="text-xs text-white/40">
                                          ({Math.max(1, Math.round(f.size / 1024))} KB)
                                        </span>
                                      )}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {isSubmitted && (
                      <div className="flex shrink-0 flex-col gap-2">
                        <Button
                          size="sm"
                          disabled={busyKey === task.id}
                          onClick={() => void review(task.id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={busyKey === task.id}
                          onClick={() => void review(task.id, "todo")}
                        >
                          Send back
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
