"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getInternship } from "@/data/internships";

export default function ApplySuccessPage() {
  const params = useParams<{ slug: string }>();
  const item = getInternship(params.slug);

  return (
    <div className="bg-mesh flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold text-ink">Request submitted</h1>
        <p className="mt-3 text-muted">
          Your application for{" "}
          <span className="font-semibold text-ink">{item?.title || "this internship"}</span> has
          been received. You are not enrolled yet — our team will review your details.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-medium text-brand">
          <Clock className="h-4 w-4" />
          You will be informed within 24 hours
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/dashboard">Go to Dashboard</Button>
          <Button href="/internship" variant="secondary">
            Browse more tracks
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Need help?{" "}
          <Link href="/about" className="font-semibold text-brand hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
