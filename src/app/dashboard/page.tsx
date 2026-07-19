"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { InternshipPoster } from "@/components/internship/InternshipPoster";
import { getInternship } from "@/data/internships";
import { MAX_ENROLLMENTS } from "@/lib/enrollment";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function DashboardOverviewPage() {
  const {
    user,
    appliedJobs,
    tasks,
    isEnrolled,
    applications,
    dropCourse,
    error,
    clearError,
  } = useAuth();
  const [dropSlug, setDropSlug] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [dropping, setDropping] = useState(false);

  const pendingApps = applications.filter((a) => a.status === "pending");
  const enrollments = user?.enrollments ?? [];

  if (!user) return null;

  const list = tasks.length ? tasks : [];
  const approved = list.filter((t) => t.status === "approved").length;
  const submitted = list.filter((t) => t.status === "submitted").length;
  const todo = list.filter((t) => t.status === "todo").length;
  const nextTask = list.find((t) => t.status === "todo");
  const progress = list.length ? Math.round((approved / list.length) * 100) : 0;
  const slotsUsed = enrollments.length + pendingApps.length;

  async function onDrop(e: FormEvent) {
    e.preventDefault();
    if (!dropSlug) return;
    clearError();
    setDropping(true);
    const ok = await dropCourse(reason.trim(), dropSlug);
    setDropping(false);
    if (ok) {
      setDropSlug(null);
      setReason("");
    }
  }

  if (!isEnrolled) {
    return (
      <motion.div
        className="space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="relative grid h-44 place-items-center bg-dark md:h-56">
            <div className="relative h-24 w-24 md:h-28 md:w-28">
              <Image
                src="/logo.svg"
                alt="Intern Next"
                fill
                className="object-contain"
                sizes="112px"
                priority
              />
            </div>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-sm text-muted">Welcome</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">{user.name}</h1>
            <p className="mt-2 text-sm text-muted">
              Slots: {slotsUsed}/{MAX_ENROLLMENTS} (up to {MAX_ENROLLMENTS} internships at once)
            </p>
            {pendingApps.length > 0 ? (
              <div className="mt-4 space-y-2">
                {pendingApps.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-ink"
                  >
                    <span className="font-semibold">{app.trackTitle}</span> — pending review
                    <span className="mt-1 flex items-center gap-1 text-brand">
                      <Clock className="h-3.5 w-3.5" />
                      Informed within 24 hours
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 max-w-xl text-muted">
                You are not enrolled yet. Apply for up to {MAX_ENROLLMENTS} tracks — we review every
                request before enrollment.
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/internship" size="lg">
                Browse internships
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/jobs" variant="secondary" size="lg">
                Job Portal
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid gap-4 sm:grid-cols-3" variants={staggerContainer}>
          {[
            { icon: GraduationCap, label: "Apply", text: `Up to ${MAX_ENROLLMENTS} tracks` },
            { icon: ClipboardList, label: "Review", text: "Heard within 24h" },
            { icon: Award, label: "Learn", text: "Unlock tasks after approval" },
          ].map(({ icon: Icon, label, text }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <Icon className="h-6 w-6 text-brand" />
              <p className="mt-3 font-display text-lg font-bold text-ink">{label}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-8"
      >
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <Sparkles className="h-4 w-4 text-brand" />
          Welcome back
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">{user.name}</h1>
        <p className="mt-2 text-muted">
          Active tracks: {enrollments.length}/{MAX_ENROLLMENTS}
          {pendingApps.length > 0 ? ` · ${pendingApps.length} pending` : ""}
        </p>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Overall progress</span>
            <span className="text-muted">{progress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-background">
            <motion.div
              className="h-2.5 rounded-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
        </div>
        {slotsUsed < MAX_ENROLLMENTS && (
          <Button href="/internship" variant="secondary" className="mt-5">
            Apply for another internship
          </Button>
        )}
      </motion.div>

      <motion.div className="space-y-4" variants={fadeUp} transition={{ duration: 0.35 }}>
        <h2 className="font-display text-xl font-bold text-ink">Your enrollments</h2>
        {enrollments.map((enrollment) => {
          const meta = getInternship(enrollment.slug);
          const hoursLeft = enrollment.dropDeadline
            ? Math.max(0, (new Date(enrollment.dropDeadline).getTime() - Date.now()) / 3600000)
            : 0;
          return (
            <div
              key={enrollment.slug}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-[#0f1a12] sm:h-24 sm:w-32">
                <InternshipPoster
                  src={meta?.image || "/posters/frontend.svg"}
                  alt={enrollment.title}
                  slug={enrollment.slug}
                />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg font-bold text-ink">
                  {enrollment.title} Internship
                </p>
                <p className="text-sm text-muted">Section {enrollment.section}</p>
                {enrollment.canDropCourse && (
                  <p className="mt-2 text-xs text-warning">
                    Drop available for {hoursLeft.toFixed(1)} more hours
                  </p>
                )}
              </div>
              {enrollment.canDropCourse && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    clearError();
                    setDropSlug(enrollment.slug);
                  }}
                >
                  Drop course
                </Button>
              )}
            </div>
          );
        })}
      </motion.div>

      {pendingApps.length > 0 && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <h2 className="font-display text-lg font-bold">Pending applications</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {pendingApps.map((app) => (
              <li key={app.id}>
                <span className="font-medium text-ink">{app.trackTitle}</span> — under review
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {dropSlug && (
        <div className="bg-overlay fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onSubmit={onDrop}
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl"
          >
            <h2 className="font-display text-xl font-bold text-ink">Drop course</h2>
            <p className="mt-2 text-sm text-muted">
              Tell us why you want to leave{" "}
              {enrollments.find((e) => e.slug === dropSlug)?.title}. This cannot be undone.
            </p>
            <textarea
              required
              minLength={10}
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for dropping (min 10 characters)"
              className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            {error && <p className="mt-2 text-sm text-danger">{error}</p>}
            <div className="mt-4 flex gap-3">
              <Button type="submit" disabled={dropping} className="flex-1">
                {dropping ? "Dropping…" : "Confirm drop"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setDropSlug(null)}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        </div>
      )}

      <motion.div className="grid gap-4 sm:grid-cols-3" variants={staggerContainer}>
        {[
          { label: "Approved", value: approved, icon: CheckCircle2 },
          { label: "Submitted", value: submitted, icon: ClipboardList },
          { label: "To do", value: todo, icon: Briefcase },
        ].map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{label}</p>
              <Icon className="h-4 w-4 text-brand" />
            </div>
            <p className="mt-1 font-display text-3xl font-bold text-ink">{value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid gap-6 lg:grid-cols-2" variants={staggerContainer}>
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <h2 className="font-display text-xl font-bold">Next task</h2>
          {nextTask ? (
            <>
              <p className="mt-3 font-semibold text-ink">{nextTask.title}</p>
              <p className="mt-1 text-sm text-muted">{nextTask.module}</p>
              <Button href="/dashboard/tasks" className="mt-5">
                Open tasks
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <p className="mt-3 text-muted">All tasks complete — check certificates.</p>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <h2 className="font-display text-xl font-bold">Job applications</h2>
          <p className="mt-3 text-3xl font-bold text-brand">{appliedJobs.length}</p>
          <p className="text-sm text-muted">roles applied via Job Portal</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/jobs" variant="secondary">
              Browse jobs
            </Button>
            <Link
              href="/dashboard/jobs"
              className="self-center text-sm font-semibold text-brand hover:underline"
            >
              View applications →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
