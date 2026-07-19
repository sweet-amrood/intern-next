"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import { getJob } from "@/data/jobs";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const job = getJob(id);
  const { user, applyToJob, hasApplied, ready } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");

  if (!job) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Job not found</h1>
        <Button href="/jobs" className="mt-6">
          Back to jobs
        </Button>
      </div>
    );
  }

  const applied = hasApplied(job.id);

  async function handleApply() {
    if (!ready || !job) return;
    if (!user) {
      router.push(`/sign-in`);
      return;
    }
    const ok = await applyToJob({ id: job.id, title: job.title, company: job.company });
    if (ok) {
      setMessage("Application submitted. Track it under Dashboard → Jobs.");
    }
  }

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <div className="container-page py-12 md:py-16">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job Portal
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              {job.category}
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-ink md:text-5xl">
              {job.title}
            </h1>
            <p className="mt-3 text-lg text-muted">{job.company}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                {job.location}
              </span>
              <span>{job.type}</span>
              <span>{job.salary}</span>
              <span>Posted {job.postedAt}</span>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-surface p-7">
              <h2 className="font-display text-2xl font-bold">About the role</h2>
              <p className="mt-4 leading-relaxed text-muted">{job.description}</p>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-7">
              <h2 className="font-display text-2xl font-bold">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-muted">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold">Apply now</h3>
              <p className="mt-2 text-sm text-muted">
                {applied
                  ? "You already applied for this role."
                  : user
                    ? "One click submits a demo application to your dashboard."
                    : "Sign in to apply and track status."}
              </p>
              <Button
                onClick={handleApply}
                disabled={applied}
                className="mt-6 w-full"
                size="lg"
              >
                {applied ? "Already applied" : user ? "Submit application" : "Sign in to apply"}
              </Button>
              {message && (
                <p className="mt-4 rounded-xl bg-brand-soft p-3 text-sm text-ink">{message}</p>
              )}
              {user && (
                <Button href="/dashboard/jobs" variant="secondary" className="mt-3 w-full">
                  View my applications
                </Button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
