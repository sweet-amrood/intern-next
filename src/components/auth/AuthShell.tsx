"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const tracks = [
  "Frontend",
  "Backend",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile App",
  "Data Analytics",
  "UI / UX",
  "Graphic Design",
  "Digital Marketing",
];

const journey = [
  { step: "01", label: "Apply", hint: "Pick a track" },
  { step: "02", label: "Build", hint: "Ship real tasks" },
  { step: "03", label: "Prove", hint: "Earn certificates" },
  { step: "04", label: "Launch", hint: "Enter the job portal" },
];

export function AuthShell({
  children,
  mode,
  formTitle,
  formHint,
}: {
  children: ReactNode;
  mode: "sign-in" | "sign-up";
  formTitle: string;
  formHint: string;
}) {
  return (
    <section className="auth-stage relative min-h-[calc(100vh-5rem)] overflow-x-hidden">
      <div className="auth-stage-glow pointer-events-none absolute inset-0" />
      <div className="auth-stage-grid pointer-events-none absolute inset-0 opacity-[0.35]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-[100px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-[22rem] w-[22rem] rounded-full bg-brand/10 blur-[90px]"
        animate={{ opacity: [0.25, 0.45, 0.25], y: [0, -24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative z-10 flex min-h-[calc(100vh-5rem)] flex-col py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <div className="mt-6 grid flex-1 items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="relative">
            <p className="animate-fade-up font-display text-xs font-bold uppercase tracking-[0.28em] text-brand sm:text-sm">
              Virtual internships · Pakistan
            </p>

            <h1 className="animate-fade-up animate-delay-1 mt-3 font-display text-[clamp(2.35rem,5.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink">
              Intern <span className="text-brand">Next</span>
            </h1>

            <p className="animate-fade-up animate-delay-2 mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              The platform where students apply to tech tracks, complete mentor-ready
              tasks, collect proof of skill, and walk into jobs with a real portfolio —
              not just a CV.
            </p>

            <div className="animate-fade-up animate-delay-3 mt-8 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
              {journey.map((item) => (
                <div key={item.step}>
                  <p className="font-display text-[0.65rem] font-bold tracking-[0.2em] text-brand">
                    {item.step}
                  </p>
                  <p className="mt-1 font-display text-base font-bold text-ink sm:text-lg">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.hint}</p>
                </div>
              ))}
            </div>

            <div className="auth-marquee mt-8 border-y border-border/80 py-2.5">
              <div className="auth-marquee-track">
                {[...tracks, ...tracks].map((track, i) => (
                  <span
                    key={`${track}-${i}`}
                    className="mx-4 inline-flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-ink-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {track}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-lg text-sm text-muted">
              {mode === "sign-in"
                ? "Your dashboard keeps applications, task submissions, certificates, and job portal activity in one place."
                : "Create a free student account, then apply to up to three internship tracks and start your first phase."}
            </p>
          </div>

          <div className="auth-form-panel relative mx-auto w-full max-w-md animate-fade-up lg:mx-0 lg:justify-self-end">
            <div className="pointer-events-none absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-brand/40 via-transparent to-brand/10 opacity-80" />
            <div className="relative rounded-[1.7rem] border border-border bg-surface/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                    {mode === "sign-in" ? "Student access" : "Join the platform"}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                    {formTitle}
                  </h2>
                </div>
                <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
              </div>
              <p className="mt-2 text-sm text-muted">{formHint}</p>
              <div className="mt-7">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
