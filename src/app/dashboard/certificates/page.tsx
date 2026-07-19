"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { DownloadCertificateButton } from "@/components/certificates/DownloadCertificateButton";
import { CertificateDocument } from "@/components/certificates/CertificateDocument";
import { AchievementIcon } from "@/components/certificates/BadgeIcons";
import { getCertificateKind, getCourseCertificateTheme, isFullCertificate } from "@/lib/certificates";
import { cn } from "@/lib/cn";

export default function CertificatesPage() {
  const { user, isEnrolled } = useAuth();
  const enrollments = user?.enrollments ?? [];
  const [previewId, setPreviewId] = useState<string | null>(null);

  if (!isEnrolled || !user) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <Award className="mx-auto h-10 w-10 text-brand" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">No certificates yet</h1>
        <p className="mt-2 text-muted">Enroll in a track and complete tasks to earn certificates.</p>
        <Button href="/internship" className="mt-6">
          Browse internships
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Certificates</h1>
        <p className="mt-2 text-muted">
          Badges unlock as mentors approve your tasks. Full course certificates can be downloaded as
          PDF once every task is approved.
        </p>
      </div>

      {enrollments.map((course) => {
        const tasks = course.tasks ?? [];
        const approved = tasks.filter((t) => t.status === "approved").length;
        const total = tasks.length;
        const certs = course.certificates ?? [];
        const theme = getCourseCertificateTheme(course.slug);

        return (
          <section key={course.slug} className="space-y-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-ink">{course.title}</h2>
              <p className="mt-1 text-sm text-muted">
                {approved} of {total} tasks approved
                {approved === total && total > 0 ? " · course complete" : ""}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certs.map((cert, i) => {
                const kind = getCertificateKind(cert.id);
                const full = isFullCertificate(cert.id);
                const earned = cert.status === "earned";

                return (
                  <motion.article
                    key={cert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          earned ? "bg-brand text-white" : "bg-background text-muted",
                        )}
                      >
                        {earned ? "earned" : "pending"}
                      </span>
                      <AchievementIcon
                        kind={kind}
                        accent={theme.accent}
                        accentDeep={theme.accentDeep}
                        size={72}
                        muted={!earned}
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {full ? "Certificate" : "Badge"}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">{cert.title}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {earned && cert.issuedAt
                        ? `Issued ${new Date(cert.issuedAt).toLocaleDateString()}`
                        : "Complete more approved tasks to unlock"}
                    </p>

                    {earned && full ? (
                      <div className="mt-5 space-y-3">
                        <DownloadCertificateButton
                          studentName={user.name}
                          courseTitle={course.title}
                          courseSlug={course.slug}
                          issuedAt={cert.issuedAt}
                          certificateId={cert.id}
                          section={course.section}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewId((prev) => (prev === cert.id ? null : cert.id))
                          }
                          className="text-sm font-semibold text-brand hover:underline"
                        >
                          {previewId === cert.id ? "Hide preview" : "Preview certificate"}
                        </button>
                      </div>
                    ) : earned ? (
                      <p className="mt-5 text-sm font-medium text-ink">
                        Badge unlocked — shown on your profile.
                      </p>
                    ) : (
                      <Button href="/dashboard/tasks" className="mt-5">
                        Continue tasks
                      </Button>
                    )}
                  </motion.article>
                );
              })}
              {!certs.length && (
                <p className="text-sm text-muted md:col-span-2">
                  Certificates will appear once your enrollment is synced.
                </p>
              )}
            </div>

            {certs
              .filter((c) => c.id === previewId && c.status === "earned" && isFullCertificate(c.id))
              .map((cert) => (
                <div
                  key={`preview-${cert.id}`}
                  className="overflow-x-auto rounded-2xl border border-border bg-[#f3f4f2] p-4"
                >
                  <div
                    className="mx-auto origin-top"
                    style={{
                      width: 1122,
                      transform: "scale(0.72)",
                      transformOrigin: "top center",
                      marginBottom: -(794 * 0.28),
                    }}
                  >
                    <CertificateDocument
                      studentName={user.name}
                      courseTitle={course.title}
                      courseSlug={course.slug}
                      issuedAt={cert.issuedAt}
                      certificateId={cert.id}
                      section={course.section}
                    />
                  </div>
                </div>
              ))}
          </section>
        );
      })}
    </div>
  );
}
