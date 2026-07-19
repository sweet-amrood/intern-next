import type { Metadata } from "next";
import Link from "next/link";
import { webinars } from "@/data/webinars";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Webinars",
  description: "Expert-led webinars and masterclasses from Intern Next.",
};

export default function WebinarsPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Expert-Led Sessions</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Webinars & Masterclasses
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Join exclusive online sessions hosted by industry professionals. Gain practical insights
            and accelerate your career growth.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {webinars.map((w) => (
            <Link
              key={w.slug}
              href={`/webinars/${w.slug}`}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-brand/40 md:flex md:items-center md:justify-between md:gap-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      w.status === "upcoming"
                        ? "bg-brand text-white"
                        : "bg-brand-soft text-brand",
                    )}
                  >
                    {w.status}
                  </span>
                  <span className="text-xs text-muted">{w.duration}</span>
                  <span className="text-xs text-muted">{w.category}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-ink md:text-2xl">
                  {w.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {w.speaker} · {w.role}
                </p>
                <p className="mt-1 text-xs text-muted">{w.date}</p>
              </div>
              <span
                className={cn(
                  "mt-4 inline-flex shrink-0 items-center rounded-full px-6 py-2.5 text-sm font-semibold md:mt-0",
                  w.status === "upcoming"
                    ? "bg-brand text-white"
                    : "border border-border bg-surface text-ink",
                )}
              >
                {w.status === "upcoming" ? "Register" : "Watch Recording"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
