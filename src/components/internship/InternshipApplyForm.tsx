"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { validateInternshipApplyForm, type FieldErrors } from "@/lib/validate";

type Props = {
  slug: string;
  title: string;
};

export function InternshipApplyForm({ slug, title }: Props) {
  const { user, ready, applications, error, clearError, refreshApplications } =
    useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const enrollments = user?.enrollments ?? [];
  const enrolledHere = enrollments.some((e) => e.slug === slug);
  const pendingHere = applications.find((a) => a.slug === slug && a.status === "pending");
  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const slotsUsed = enrollments.length + pendingCount;
  const atLimit = slotsUsed >= (user?.maxEnrollments ?? 3);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    address: "",
    semester: "",
    city: "",
    experience: "",
    portfolio: "",
    linkedin: "",
    motivation: "",
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        fullName: f.fullName || user.name,
        email: f.email || user.email,
        portfolio: f.portfolio || user.portfolio,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/sign-in?next=/internship/${slug}/apply`);
    }
  }, [ready, user, router, slug]);

  function setField(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((errs) => {
      if (!errs[key]) return errs;
      const next = { ...errs };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    setLocalError(null);
    const check = validateInternshipApplyForm(form);
    setFieldErrors(check.errors);
    if (!check.ok) {
      setLocalError(check.message);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/internships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ slug, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLocalError(data.error || "Could not submit application");
        setLoading(false);
        return;
      }
      await refreshApplications();
      router.replace(`/internship/${slug}/apply/success`);
    } catch {
      setLocalError("Could not submit application");
      setLoading(false);
    }
  }

  if (!ready || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted">Loading…</div>
    );
  }

  if (enrolledHere) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h1 className="font-display text-2xl font-bold">Already enrolled</h1>
        <p className="mt-2 text-muted">You are already enrolled in {title}.</p>
        <Button href="/dashboard" className="mt-6">
          Open Dashboard
        </Button>
      </div>
    );
  }

  if (pendingHere) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h1 className="font-display text-2xl font-bold">Application pending</h1>
        <p className="mt-2 text-muted">
          You already applied for {pendingHere.trackTitle}. You will be informed within 24 hours.
        </p>
        <Button href="/dashboard" className="mt-6">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  if (atLimit) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h1 className="font-display text-2xl font-bold">Slot limit reached</h1>
        <p className="mt-2 text-muted">
          You can hold up to {user?.maxEnrollments ?? 3} internships at once (including pending
          applications). Drop a course or wait for a decision to free a slot.
        </p>
        <Button href="/dashboard" className="mt-6">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  const fields: Array<{
    key: keyof typeof form;
    label: string;
    required?: boolean;
    type?: string;
    rows?: number;
    placeholder?: string;
  }> = [
    { key: "fullName", label: "Full name", required: true },
    { key: "email", label: "Email", required: true, type: "email" },
    { key: "phone", label: "Phone number", required: true, placeholder: "03XX-XXXXXXX" },
    { key: "university", label: "University / Institute", required: true },
    { key: "semester", label: "Semester / Year", required: true, placeholder: "e.g. 6th semester" },
    { key: "city", label: "City", required: true },
    { key: "address", label: "Address", required: true, rows: 2 },
    {
      key: "experience",
      label: "Previous experience (if any)",
      rows: 3,
      placeholder: "Projects, freelancing, courses…",
    },
    { key: "portfolio", label: "Portfolio / website", placeholder: "https://" },
    { key: "linkedin", label: "LinkedIn profile", placeholder: "https://linkedin.com/in/…" },
    {
      key: "motivation",
      label: "Why do you want this internship?",
      rows: 3,
      placeholder: "Tell us about your goals",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Application</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">{title} Internship</h1>
      <p className="mt-2 text-muted">
        Fill in your details. Submitting does not enroll you automatically — our team reviews every
        request and responds within 24 hours.
      </p>

      <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.key}
            className={`block text-sm font-medium text-ink ${field.rows ? "md:col-span-2" : ""}`}
          >
            {field.label}
            {field.required && <span className="text-brand"> *</span>}
            {field.rows ? (
              <textarea
                rows={field.rows}
                value={form[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => setField(field.key, e.target.value)}
                aria-invalid={Boolean(fieldErrors[field.key])}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            ) : (
              <input
                type={field.type || "text"}
                value={form[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => setField(field.key, e.target.value)}
                aria-invalid={Boolean(fieldErrors[field.key])}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            )}
            {fieldErrors[field.key] && (
              <p className="mt-1 text-xs text-danger">{fieldErrors[field.key]}</p>
            )}
          </label>
        ))}

        {(localError || error) && (
          <p className="md:col-span-2 rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
            {localError || error}
          </p>
        )}

        <div className="md:col-span-2">
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={loading}>
            {loading ? "Submitting…" : "Submit application"}
          </Button>
        </div>
      </form>
    </div>
  );
}
