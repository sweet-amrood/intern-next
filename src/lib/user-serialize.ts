import {
  normalizeEnrollments,
  MAX_ENROLLMENTS,
} from "@/lib/enrollment-helpers";
import {
  hasBothRoles,
  normalizeRoles,
  primaryRole,
} from "@/lib/admin";

const DROP_WINDOW_MS = 24 * 60 * 60 * 1000;

function iso(value?: Date | string | null) {
  if (!value) return null;
  return typeof value === "string" ? value : new Date(value).toISOString();
}

export function serializeUser(user: {
  _id: { toString: () => string };
  name: string;
  email: string;
  role?: "student" | "admin";
  roles?: Array<"student" | "admin">;
  skills?: string[];
  portfolio?: string;
  bio?: string;
  internship?: string;
  enrollmentSlug?: string;
  enrollmentSection?: number | null;
  enrolledAt?: Date | string | null;
  enrollments?: Array<{
    slug: string;
    title: string;
    section: number;
    enrolledAt: Date | string;
    skills?: string[];
    tasks?: Array<{
      id: string;
      title: string;
      module: string;
      due: string;
      status: "todo" | "submitted" | "approved";
      description: string;
      githubUrl?: string;
      files?: Array<{ name: string; url: string; size?: number }>;
      submissionNote?: string;
      submittedAt?: Date | string | null;
      trackSlug?: string;
    }>;
    certificates?: Array<{
      id: string;
      title: string;
      status: "earned" | "pending";
      issuedAt?: string | null;
      trackSlug?: string;
    }>;
  }>;
  appliedJobs?: Array<{
    jobId: string;
    title: string;
    company: string;
    appliedAt?: Date | string;
  }>;
  tasks?: Array<{
    id: string;
    title: string;
    module: string;
    due: string;
    status: "todo" | "submitted" | "approved";
    description: string;
    githubUrl?: string;
    files?: Array<{ name: string; url: string; size?: number }>;
    submissionNote?: string;
    submittedAt?: Date | string | null;
    trackSlug?: string;
  }>;
  certificates?: Array<{
    id: string;
    title: string;
    status: "earned" | "pending";
    issuedAt?: string | null;
    trackSlug?: string;
  }>;
}) {
  const enrollments = normalizeEnrollments(user as Parameters<typeof normalizeEnrollments>[0]).map((e) => {
    const enrolledAt = iso(e.enrolledAt)!;
    const canDrop =
      Date.now() - new Date(e.enrolledAt).getTime() < DROP_WINDOW_MS;
    return {
      slug: e.slug,
      title: e.title,
      section: e.section,
      enrolledAt,
      skills: e.skills ?? [],
      canDropCourse: canDrop,
      dropDeadline: canDrop
        ? new Date(new Date(e.enrolledAt).getTime() + DROP_WINDOW_MS).toISOString()
        : null,
      tasks: (e.tasks ?? []).map((t) => ({
        id: t.id,
        title: t.title,
        module: t.module,
        due: t.due,
        status: t.status,
        description: t.description,
        githubUrl: t.githubUrl ?? "",
        files: (t.files ?? []).map((f) => ({
          name: f.name,
          url: f.url,
          size: f.size ?? 0,
        })),
        submissionNote: t.submissionNote ?? "",
        submittedAt: iso(t.submittedAt ?? null),
        trackSlug: t.trackSlug || e.slug,
      })),
      certificates: (e.certificates ?? []).map((c) => ({
        id: c.id,
        title: c.title,
        status: c.status,
        issuedAt: c.issuedAt ?? null,
        trackSlug: c.trackSlug || e.slug,
      })),
    };
  });

  const enrolled = enrollments.length > 0;
  const primary = enrollments[0] ?? null;
  const allTasks = enrollments.flatMap((e) => e.tasks);
  const allCerts = enrollments.flatMap((e) => e.certificates);

  const roles = normalizeRoles(user.roles, user.role);

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: primaryRole(roles),
    roles,
    hasBothRoles: hasBothRoles(roles),
    skills: enrolled
      ? Array.from(new Set(enrollments.flatMap((e) => e.skills)))
      : user.skills ?? [],
    portfolio: user.portfolio ?? "",
    bio: user.bio ?? "",
    internship: enrolled
      ? enrollments.map((e) => `${e.title} Internship`).join(" · ")
      : "",
    enrollmentSlug: primary?.slug || "",
    enrollmentSection: primary?.section ?? null,
    enrolledAt: primary?.enrolledAt ?? null,
    enrollments,
    enrollmentCount: enrollments.length,
    maxEnrollments: MAX_ENROLLMENTS,
    canEnrollMore: enrollments.length < MAX_ENROLLMENTS,
    canDropCourse: enrollments.some((e) => e.canDropCourse),
    dropDeadline: primary?.dropDeadline ?? null,
    appliedJobs: (user.appliedJobs ?? []).map((j) => ({
      jobId: j.jobId,
      title: j.title,
      company: j.company,
      appliedAt: iso(j.appliedAt) || new Date().toISOString(),
    })),
    tasks: allTasks,
    certificates: allCerts,
  };
}
