"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Search } from "lucide-react";
import { jobCategories, jobs } from "@/data/jobs";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const { user, hasApplied } = useAuth();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const catOk = category === "All" || job.category === category;
      const qOk =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((t) => t.toLowerCase().includes(q));
      return catOk && qOk;
    });
  }, [query, category]);

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-12 md:py-16">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Job Portal</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Your Dream Job is Waiting
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Browse roles matched to skills you build through Intern Next internships.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col gap-4 md:flex-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, company, or skill"
              className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </motion.div>

        <div className="mt-5 flex flex-wrap gap-2">
          {jobCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                category === cat
                  ? "bg-brand text-white"
                  : "bg-surface border border-border text-muted hover:border-brand/40",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">
          Showing {filtered.length} of {jobs.length} roles
          {user ? " · signed in" : " · sign in to apply"}
        </p>

        <motion.div
          className="mt-6 grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          key={`${category}-${query}`}
        >
          {filtered.map((job) => (
            <motion.article
              key={job.id}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-brand/40 md:flex md:items-center md:justify-between md:gap-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                    {job.category}
                  </span>
                  <span className="text-xs text-muted">{job.type}</span>
                  {hasApplied(job.id) && (
                    <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                      Applied
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-ink md:text-2xl">
                  {job.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{job.company}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {job.salary}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button href={`/jobs/${job.id}`} className="mt-4 shrink-0 md:mt-0">
                View role
              </Button>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
              No jobs match your filters. Try another category or keyword.
            </div>
          )}
        </motion.div>

        {!user && (
          <p className="mt-8 text-center text-sm text-muted">
            <Link href="/sign-in" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>{" "}
            to apply and track applications in your dashboard.
          </p>
        )}
      </section>
    </div>
  );
}
