"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export default function DashboardJobsPage() {
  const { appliedJobs } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">Job applications</h1>
          <p className="mt-2 text-muted">Roles you applied to from the Job Portal.</p>
        </div>
        <Button href="/jobs">Browse jobs</Button>
      </div>

      {appliedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-muted">No applications yet.</p>
          <Button href="/jobs" className="mt-4">
            Explore Job Portal
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {appliedJobs.map((job) => (
            <div
              key={job.jobId}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-5"
            >
              <div>
                <p className="font-semibold text-ink">{job.title}</p>
                <p className="text-sm text-muted">{job.company}</p>
                <p className="mt-1 text-xs text-muted">
                  Applied {new Date(job.appliedAt).toLocaleDateString()}
                </p>
              </div>
              <Link
                href={`/jobs/${job.jobId}`}
                className="text-sm font-semibold text-brand hover:underline"
              >
                View role →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
