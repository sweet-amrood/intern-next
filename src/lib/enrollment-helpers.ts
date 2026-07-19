import type { CertificateDoc, EnrollmentDoc, IUser } from "@/lib/models/User";
import { MAX_ENROLLMENTS } from "@/lib/enrollment";
import { certificatesForTrack } from "@/data/internships";

type UserLike = {
  enrollments?: Array<Record<string, unknown>>;
  enrollmentSlug?: string;
  internship?: string;
  enrollmentSection?: number | null;
  enrolledAt?: Date | string | null;
  skills?: string[];
  tasks?: Array<Record<string, unknown>>;
  certificates?: Array<Record<string, unknown>>;
};

export function normalizeEnrollments(user: UserLike): EnrollmentDoc[] {
  if (user.enrollments && user.enrollments.length > 0) {
    return user.enrollments.map((e) => {
      const slug = String(e.slug || "");
      const tasks = Array.isArray(e.tasks) ? e.tasks : [];
      const certificates = Array.isArray(e.certificates) ? e.certificates : [];
      return {
        slug,
        title: String(e.title || slug),
        section: Number(e.section || 1),
        enrolledAt: new Date(e.enrolledAt as Date | string),
        skills: Array.isArray(e.skills) ? (e.skills as string[]) : [],
        tasks: tasks.map((t) => {
          const rawStatus = String(t.status || "todo");
          const status =
            rawStatus === "submitted" || rawStatus === "approved"
              ? rawStatus
              : "todo";
          return {
            id: String(t.id),
            title: String(t.title),
            module: String(t.module),
            due: String(t.due),
            status,
            description: String(t.description),
            githubUrl: String(t.githubUrl || ""),
            files: Array.isArray(t.files)
              ? (t.files as EnrollmentDoc["tasks"][0]["files"])
              : [],
            submissionNote: String(t.submissionNote || ""),
            submittedAt: t.submittedAt
              ? new Date(t.submittedAt as Date | string)
              : null,
            trackSlug: String(t.trackSlug || slug),
          };
        }),
        certificates: certificates.map((c) => ({
          id: String(c.id),
          title: String(c.title),
          status: c.status as "earned" | "pending",
          issuedAt: (c.issuedAt as string | null) ?? null,
          trackSlug: String(c.trackSlug || slug),
        })),
      };
    });
  }

  if (user.enrollmentSlug) {
    return [
      {
        slug: user.enrollmentSlug,
        title: (user.internship || user.enrollmentSlug).replace(/ Internship$/i, ""),
        section: user.enrollmentSection ?? 1,
        enrolledAt: user.enrolledAt ? new Date(user.enrolledAt) : new Date(),
        skills: user.skills ?? [],
        tasks: (user.tasks ?? []).map((t) => {
          const rawStatus = String(t.status || "todo");
          const status =
            rawStatus === "submitted" || rawStatus === "approved"
              ? rawStatus
              : "todo";
          return {
            id: String(t.id),
            title: String(t.title),
            module: String(t.module),
            due: String(t.due),
            status,
            description: String(t.description),
            githubUrl: String(t.githubUrl || ""),
            files: Array.isArray(t.files)
              ? (t.files as EnrollmentDoc["tasks"][0]["files"])
              : [],
            submissionNote: String(t.submissionNote || ""),
            submittedAt: t.submittedAt
              ? new Date(t.submittedAt as Date | string)
              : null,
            trackSlug: String(t.trackSlug || user.enrollmentSlug),
          };
        }),
        certificates: (user.certificates ?? []).map((c) => ({
          id: String(c.id),
          title: String(c.title),
          status: c.status as "earned" | "pending",
          issuedAt: (c.issuedAt as string | null) ?? null,
          trackSlug: String(c.trackSlug || user.enrollmentSlug),
        })),
      },
    ];
  }

  return [];
}

function certificateKind(id: string) {
  const part = id.includes(":") ? id.split(":").pop() || id : id;
  return part.toLowerCase();
}

function ensureEnrollmentCertificates(enrollment: EnrollmentDoc) {
  if (enrollment.certificates?.length) return;
  enrollment.certificates = certificatesForTrack(enrollment.title, enrollment.slug).map(
    (c) =>
      ({
        id: c.id,
        title: c.title,
        status: c.status,
        issuedAt: c.issuedAt,
        trackSlug: c.trackSlug || enrollment.slug,
      }) satisfies CertificateDoc,
  );
}

export function syncCertificateAwards(enrollment: EnrollmentDoc) {
  ensureEnrollmentCertificates(enrollment);
  const total = enrollment.tasks?.length ?? 0;
  if (!total || !enrollment.certificates?.length) return;

  const approved = enrollment.tasks.filter((t) => t.status === "approved").length;
  const issuedOn = new Date().toISOString().slice(0, 10);
  const foundationAt = Math.max(1, Math.ceil(total * 0.2));
  const milestoneAt = Math.max(2, Math.ceil(total * 0.6));
  const fullAt = total;

  enrollment.certificates.forEach((cert, index) => {
    const kind = certificateKind(cert.id);
    let required = fullAt;
    if (kind === "c1" || index === 0) required = foundationAt;
    else if (kind === "c2" || index === 1) required = milestoneAt;
    else if (kind === "c3" || index >= 2) required = fullAt;

    const shouldEarn = approved >= required;
    if (shouldEarn) {
      if (cert.status !== "earned") {
        cert.status = "earned";
        cert.issuedAt = issuedOn;
      } else if (!cert.issuedAt) {
        cert.issuedAt = issuedOn;
      }
    } else if (cert.status === "earned") {
      cert.status = "pending";
      cert.issuedAt = null;
    }
  });
}

export function syncEnrollmentFields(user: IUser) {
  const list = normalizeEnrollments(user);
  for (const enrollment of list) {
    syncCertificateAwards(enrollment);
  }
  user.enrollments = list;

  if (list.length === 0) {
    user.enrollmentSlug = "";
    user.enrollmentSection = null;
    user.enrolledAt = null;
    user.internship = "";
    user.tasks = [];
    user.certificates = [];
    return;
  }

  const primary = list[0];
  user.enrollmentSlug = primary.slug;
  user.enrollmentSection = primary.section;
  user.enrolledAt = primary.enrolledAt;
  user.internship = list.map((e) => `${e.title} Internship`).join(" · ");
  user.skills = Array.from(new Set(list.flatMap((e) => e.skills)));
  user.tasks = list.flatMap((e) => e.tasks);
  user.certificates = list.flatMap((e) => e.certificates);
}

export function canAddEnrollment(user: UserLike) {
  return normalizeEnrollments(user).length < MAX_ENROLLMENTS;
}

export function hasEnrollment(user: UserLike, slug: string) {
  return normalizeEnrollments(user).some((e) => e.slug === slug);
}

export { MAX_ENROLLMENTS };
