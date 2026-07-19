"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileUp,
  Link2,
  Upload,
  X,
} from "lucide-react";
import { useAuth, type UserTask } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { getTaskGuideline } from "@/data/task-guidelines";

function TaskGuidelinesModal({
  task,
  onClose,
}: {
  task: UserTask;
  onClose: () => void;
}) {
  const guide = getTaskGuideline(task.id, task.trackSlug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="bg-overlay fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-guide-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl md:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              Task guidelines
            </p>
            <h2 id="task-guide-title" className="mt-1 font-display text-2xl font-bold text-ink">
              {task.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{task.module}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border p-2 text-muted hover:bg-brand-soft hover:text-ink"
            aria-label="Close guidelines"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-brand/30 bg-brand-soft/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">
            What the company expects
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{guide.companyExpectation}</p>
        </div>

        <div className="mt-5">
          <h3 className="font-display text-lg font-bold text-ink">Task brief</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{guide.taskBrief}</p>
        </div>

        {(
          [
            ["What you must do", guide.whatYouMustDo],
            ["Acceptance criteria (mentor checklist)", guide.acceptanceCriteria],
            ["Deliverables to submit", guide.deliverables],
            ["How you will be evaluated", guide.evaluationNotes],
          ] as const
        ).map(([heading, items]) => (
          <div key={heading} className="mt-6">
            <h3 className="font-display text-lg font-bold text-ink">{heading}</h3>
            <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-sm text-muted">
              {items.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ))}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={onClose}>Got it — start task</Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function TaskSubmitForm({
  task,
  onDone,
}: {
  task: UserTask;
  onDone: () => void;
}) {
  const { submitTask, error, clearError } = useAuth();
  const [githubUrl, setGithubUrl] = useState(task.githubUrl || "");
  const [note, setNote] = useState(task.submissionNote || "");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 5));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    setLoading(true);
    const ok = await submitTask({
      taskId: task.id,
      githubUrl: githubUrl.trim(),
      submissionNote: note.trim(),
      files,
    });
    setLoading(false);
    if (ok) onDone();
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-4 border-t border-border pt-5">
      <div className="rounded-xl bg-brand-soft/70 px-4 py-3 text-sm text-ink">
        <p className="inline-flex items-center gap-2 font-semibold text-brand">
          <Link2 className="h-4 w-4" />
          GitHub link is required
        </p>
        <p className="mt-1 text-muted">
          Push your project to GitHub and paste the repository URL below. You can also attach files
          (PDF, ZIP, images — max 5MB each).
        </p>
      </div>

      <label className="block text-sm font-medium text-ink">
        GitHub repository URL *
        <input
          type="url"
          required
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username/project"
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <label className="block text-sm font-medium text-ink">
        Notes (optional)
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Briefly describe what you built…"
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-2xl border-2 border-dashed p-6 text-center transition",
          dragOver ? "border-brand bg-brand-soft" : "border-border bg-background",
        )}
      >
        <Upload className="mx-auto h-8 w-8 text-brand" />
        <p className="mt-2 text-sm font-medium text-ink">Drop project files here</p>
        <p className="mt-1 text-xs text-muted">or click to browse (up to 5 files)</p>
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink ring-1 ring-border hover:bg-brand-soft">
          <FileUp className="h-4 w-4" />
          Choose files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={`${f.name}-${f.size}`}
              className="flex items-center justify-between rounded-xl bg-background px-3 py-2 text-sm"
            >
              <span className="truncate text-ink">{f.name}</span>
              <button
                type="button"
                onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                className="text-muted hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting…" : "Submit task"}
        </Button>
        <Button type="button" variant="secondary" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function DashboardTasksPage() {
  const { user, isEnrolled } = useAuth();
  const enrollments = user?.enrollments ?? [];
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [guideTask, setGuideTask] = useState<UserTask | null>(null);

  const activeCourse = hasChosen
    ? openCourse && enrollments.some((e) => e.slug === openCourse)
      ? openCourse
      : null
    : (enrollments[0]?.slug ?? null);

  const courseStats = useMemo(
    () =>
      enrollments.map((e) => {
        const list = e.tasks ?? [];
        return {
          slug: e.slug,
          title: e.title,
          section: e.section,
          tasks: list,
          total: list.length,
          approved: list.filter((t) => t.status === "approved").length,
          submitted: list.filter((t) => t.status === "submitted").length,
          todo: list.filter((t) => t.status === "todo").length,
        };
      }),
    [enrollments],
  );

  if (!isEnrolled) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">No tasks yet</h1>
        <p className="mt-2 text-muted">
          Apply for an internship and wait for approval to unlock your Task Portal.
        </p>
        <Button href="/internship" className="mt-6">
          Browse internships
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Tasks</h1>
        <p className="mt-2 text-muted">
          Open a course to see its tasks. Review guidelines, then submit with a GitHub repo link
          and optional files.
        </p>
      </div>

      <div className="space-y-5">
        {courseStats.map((course) => {
          const expanded = activeCourse === course.slug;
          return (
            <section
              key={course.slug}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <button
                type="button"
                onClick={() => {
                  setHasChosen(true);
                  setOpenCourse(expanded ? null : course.slug);
                }}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-brand-soft/40 md:px-6"
                aria-expanded={expanded}
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    Internship course
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-extrabold text-ink md:text-3xl">
                    {course.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Section {course.section} · {course.todo} open · {course.submitted} submitted ·{" "}
                    {course.approved} approved · {course.total} total
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-ink",
                    expanded && "border-brand bg-brand text-white",
                  )}
                >
                  {expanded ? "Close tasks" : "Open tasks"}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                  />
                </span>
              </button>

              {expanded && (
                <div className="space-y-4 border-t border-border px-5 py-5 md:px-6">
                  {!course.tasks.length && (
                    <p className="text-sm text-muted">No tasks assigned for this course yet.</p>
                  )}
                  {course.tasks.map((task) => {
                    const taskKey = `${course.slug}:${task.id}`;
                    return (
                      <article
                        key={taskKey}
                        className="rounded-2xl border border-border bg-background p-5 md:p-6"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <span
                              className={cn(
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                task.status === "approved" && "bg-brand text-white",
                                task.status === "submitted" && "bg-ink text-white",
                                task.status === "todo" && "bg-brand-soft text-brand",
                              )}
                            >
                              {task.status}
                            </span>
                            <h3 className="mt-3 font-display text-xl font-bold text-ink">
                              {task.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted">{task.module}</p>
                          </div>
                          <p className="text-xs text-muted">Due {task.due}</p>
                        </div>
                        <p className="mt-3 text-sm text-muted">{task.description}</p>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button variant="secondary" onClick={() => setGuideTask(task)}>
                            <BookOpen className="h-4 w-4" />
                            Guidelines
                          </Button>
                          {task.status === "todo" && openId !== taskKey && (
                            <Button onClick={() => setOpenId(taskKey)}>Submit task</Button>
                          )}
                        </div>

                        {task.status !== "todo" && task.githubUrl && (
                          <a
                            href={task.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                          >
                            <Link2 className="h-4 w-4" />
                            View GitHub repo
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {task.files?.length > 0 && (
                          <ul className="mt-3 space-y-1 text-sm">
                            {task.files.map((f) => (
                              <li key={f.url}>
                                <a
                                  href={f.url}
                                  className="text-brand hover:underline"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {f.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}

                        {task.status === "todo" && openId === taskKey && (
                          <TaskSubmitForm task={task} onDone={() => setOpenId(null)} />
                        )}

                        {task.status === "submitted" && (
                          <p className="mt-4 text-sm font-medium text-ink">
                            Submitted
                            {task.submittedAt
                              ? ` · ${new Date(task.submittedAt).toLocaleString()}`
                              : ""}{" "}
                            — awaiting mentor review.
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {guideTask && (
        <TaskGuidelinesModal task={guideTask} onClose={() => setGuideTask(null)} />
      )}
    </div>
  );
}
