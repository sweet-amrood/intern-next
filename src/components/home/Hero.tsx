"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardList,
  LayoutDashboard,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";

const phases = [
  { label: "Foundation", key: "foundation" },
  { label: "Practical Skills", key: "skills" },
  { label: "Industry Projects", key: "projects" },
] as const;

export function Hero() {
  const { user, ready, isEnrolled, tasks } = useAuth();

  const approved = tasks.filter((t) => t.status === "approved").length;
  const submitted = tasks.filter((t) => t.status === "submitted").length;
  const total = tasks.length || 5;
  const progress = isEnrolled && tasks.length
    ? Math.round(((approved + submitted * 0.5) / tasks.length) * 100)
    : 0;

  const phaseValues = isEnrolled
    ? [
        Math.min(100, Math.round((approved / Math.max(total, 1)) * 180)),
        Math.min(100, Math.round(((approved + submitted) / Math.max(total, 1)) * 120)),
        Math.min(100, Math.round((approved / Math.max(total, 1)) * 100)),
      ]
    : [0, 0, 0];

  return (
    <section className="bg-mesh relative overflow-hidden">
      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left"
        >
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">
            Intern Next
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-ink md:text-5xl xl:text-6xl">
            Build Skills.
            <br />
            Get Experience.
            <br />
            <span className="text-brand">Land Your Job.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted md:text-lg lg:mx-0">
            Stop waiting for opportunities. Start building real skills with Pakistan&apos;s
            largest virtual internship platform. Your dream tech career begins here.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button href="/jobs" size="lg">
              Our Job Portal
              <ArrowRight className="h-4 w-4" />
            </Button>
            {ready && user ? (
              <Button href={isEnrolled ? "/dashboard" : "/internship"} variant="secondary" size="lg">
                {isEnrolled ? "Open Dashboard" : "Apply for internship"}
              </Button>
            ) : (
              <Button href="/internship" variant="secondary" size="lg">
                Explore Internships
              </Button>
            )}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand" />
              No Experience Required
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand" />
              Industry-Ready Projects
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-8 rounded-[2.5rem] bg-brand/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_24px_60px_-28px_rgba(67,167,36,0.45)]">
            <div className="flex items-center justify-between border-b border-border bg-brand-soft/60 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                  <ClipboardList className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Task Portal</p>
                  <p className="text-[11px] text-muted">Live · synced to your account</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold text-brand ring-1 ring-brand/20">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                {ready && user ? (isEnrolled ? "Enrolled" : "Ready") : "Preview"}
              </span>
            </div>

            <div className="space-y-5 p-5 md:p-6">
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Active track
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-ink md:text-2xl">
                      {!ready
                        ? "Loading…"
                        : isEnrolled
                          ? user?.internship
                          : user
                            ? "Application required"
                            : "Choose a track"}
                    </p>
                    {isEnrolled && user?.enrollmentSection != null ? (
                      <p className="mt-1 text-sm text-muted">Section {user.enrollmentSection}</p>
                    ) : (
                      <p className="mt-1 text-sm text-muted">
                        {user
                          ? "Apply first — approval within 24 hours"
                          : "Sign in and apply to begin"}
                      </p>
                    )}
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    {isEnrolled ? (
                      <LayoutDashboard className="h-6 w-6" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-medium text-ink">Overall progress</span>
                    <span className="text-muted">{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface ring-1 ring-border">
                    <motion.div
                      className="h-full rounded-full bg-brand"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {phases.map((phase, i) => {
                  const value = phaseValues[i];
                  const done = value >= 100;
                  const active = isEnrolled && value > 0 && value < 100;
                  return (
                    <motion.div
                      key={phase.key}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="inline-flex items-center gap-2 font-medium text-ink">
                          {done ? (
                            <CheckCircle2 className="h-4 w-4 text-brand" />
                          ) : active ? (
                            <Sparkles className="h-4 w-4 text-brand" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted" />
                          )}
                          {phase.label}
                        </span>
                        <span className="text-xs text-muted">{value}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-background">
                        <motion.div
                          className="h-full rounded-full bg-brand"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.65, delay: 0.25 + i * 0.08 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {(isEnrolled
                  ? [
                      `${approved} approved`,
                      `${submitted} submitted`,
                      `${tasks.filter((t) => t.status === "todo").length} to do`,
                    ]
                  : ["50 seats / section", "Remote tracks", "Verified certificate"]
                ).map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {isEnrolled ? (
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Continue in Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : user ? (
                <Link
                  href="/internship"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Choose an internship
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Sign in to apply
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
