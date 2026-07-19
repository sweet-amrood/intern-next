"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { MAX_ENROLLMENTS } from "@/lib/enrollment";

export function EnrollPanel({
  slug,
  title,
  seatsLeft,
  openSection,
  seatsPerSection,
}: {
  slug: string;
  title: string;
  seatsLeft: number;
  openSection: number;
  seatsPerSection: number;
}) {
  const { user, ready, applications } = useAuth();
  const enrollments = user?.enrollments ?? [];
  const enrolledHere = enrollments.some((e) => e.slug === slug);
  const pendingHere = applications.some((a) => a.slug === slug && a.status === "pending");
  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const slotsUsed = enrollments.length + pendingCount;
  const canApplyMore = slotsUsed < MAX_ENROLLMENTS;

  return (
    <div className="sticky top-28 rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <p className="text-sm text-muted">Application</p>
      <h3 className="mt-1 font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-sm text-muted">
        Section {openSection} · {seatsLeft}/{seatsPerSection} seats left
      </p>
      <p className="mt-2 text-xs text-muted">
        You can join up to {MAX_ENROLLMENTS} internships at the same time. Enrollment is confirmed
        after review (within 24 hours).
      </p>

      {!ready ? (
        <p className="mt-6 text-sm text-muted">Checking account…</p>
      ) : enrolledHere ? (
        <>
          <p className="mt-4 rounded-xl bg-brand-soft p-3 text-sm text-ink">
            You are enrolled in this track
            {enrollments.find((e) => e.slug === slug)
              ? ` (Section ${enrollments.find((e) => e.slug === slug)!.section})`
              : ""}
            .
          </p>
          <Button href="/dashboard" className="mt-6 w-full" size="lg">
            Open Dashboard
          </Button>
        </>
      ) : pendingHere ? (
        <>
          <p className="mt-4 rounded-xl bg-brand-soft p-3 text-sm text-ink">
            Application submitted. You will be informed within 24 hours.
          </p>
          <Button href="/dashboard" className="mt-6 w-full" size="lg">
            View status
          </Button>
        </>
      ) : user && !canApplyMore ? (
        <>
          <p className="mt-4 rounded-xl bg-background p-3 text-sm text-muted">
            You already have {MAX_ENROLLMENTS} active slots (enrolled + pending). Drop a course or
            wait for a decision to apply again.
          </p>
          <Button href="/dashboard" className="mt-6 w-full" size="lg">
            Go to Dashboard
          </Button>
        </>
      ) : user ? (
        <>
          <p className="mt-4 text-xs text-muted">
            Slots used: {slotsUsed}/{MAX_ENROLLMENTS}
          </p>
          <Button href={`/internship/${slug}/apply`} className="mt-3 w-full" size="lg">
            Apply now
          </Button>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm text-muted">Sign in to apply for this internship.</p>
          <Button href="/sign-in" className="mt-6 w-full" size="lg">
            Sign in to apply
          </Button>
          <Button href="/sign-up" variant="secondary" className="mt-3 w-full">
            Create account
          </Button>
        </>
      )}
    </div>
  );
}
