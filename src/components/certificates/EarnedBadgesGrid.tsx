"use client";

import { AchievementIcon } from "@/components/certificates/BadgeIcons";
import { getCertificateKind, getCourseCertificateTheme } from "@/lib/certificates";
import { cn } from "@/lib/cn";

type BadgeItem = {
  id: string;
  title: string;
  issuedAt: string | null;
  trackSlug: string;
  courseTitle?: string;
};

export function EarnedBadgesGrid({
  badges,
  emptyLabel = "No badges earned yet.",
}: {
  badges: BadgeItem[];
  emptyLabel?: string;
}) {
  if (!badges.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-muted">
        <div className="mx-auto mb-3 flex justify-center opacity-50">
          <AchievementIcon kind="foundation" accent="#43a724" accentDeep="#2f7818" size={48} />
        </div>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {badges.map((badge) => {
        const kind = getCertificateKind(badge.id);
        const theme = getCourseCertificateTheme(badge.trackSlug);
        const label = kind === "foundation" ? "Foundation" : "Milestone";
        const badgeKind = kind === "milestone" ? "milestone" : "foundation";
        return (
          <article
            key={badge.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border bg-surface p-4",
            )}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1.5"
              style={{ background: theme.accent }}
            />
            <div className="flex items-center gap-4 pl-2">
              <AchievementIcon
                kind={badgeKind}
                accent={theme.accent}
                accentDeep={theme.accentDeep}
                size={72}
              />
              <div className="min-w-0">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: theme.accent }}
                >
                  {label} badge
                </p>
                <h3 className="mt-1 font-display text-base font-bold text-ink">{badge.title}</h3>
                {badge.courseTitle && (
                  <p className="mt-0.5 text-xs text-muted">{badge.courseTitle}</p>
                )}
                <p className="mt-1 text-xs text-muted">
                  {badge.issuedAt
                    ? `Earned ${new Date(badge.issuedAt).toLocaleDateString()}`
                    : "Earned"}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
