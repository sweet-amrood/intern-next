"use client";

import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { EarnedBadgesGrid } from "@/components/certificates/EarnedBadgesGrid";
import { isBadge } from "@/lib/certificates";

export default function ProfilePage() {
  const { user, updateProfile, error } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const earnedBadges = useMemo(() => {
    if (!user) return [];
    return (user.enrollments ?? []).flatMap((course) =>
      (course.certificates ?? [])
        .filter((c) => c.status === "earned" && isBadge(c.id))
        .map((c) => ({
          id: c.id,
          title: c.title,
          issuedAt: c.issuedAt,
          trackSlug: c.trackSlug || course.slug,
          courseTitle: course.title,
        })),
    );
  }, [user]);

  if (!user) return null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const current = user;
    const data = new FormData(e.currentTarget);
    setLoading(true);
    const ok = await updateProfile({
      name: String(data.get("name") || current.name),
      bio: String(data.get("bio") || current.bio),
      portfolio: String(data.get("portfolio") || current.portfolio),
      skills: String(data.get("skills") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      internship: String(data.get("internship") || current.internship),
    });
    setLoading(false);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Profile</h1>
        <p className="mt-2 text-muted">Updates are saved to MongoDB.</p>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Achieved badges</h2>
            <p className="mt-1 text-sm text-muted">
              Foundation and milestone badges earned from your internship courses.
            </p>
          </div>
          <p className="text-sm font-semibold text-brand">
            {earnedBadges.length} badge{earnedBadges.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="mt-5">
          <EarnedBadgesGrid
            badges={earnedBadges}
            emptyLabel="Complete approved tasks to earn foundation and milestone badges."
          />
        </div>
      </section>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-border bg-surface p-6 md:p-8"
      >
        <label className="block text-sm font-medium">
          Full name
          <input
            name="name"
            defaultValue={user.name}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            value={user.email}
            disabled
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted"
          />
        </label>
        <label className="block text-sm font-medium">
          Active internship
          <input
            name="internship"
            defaultValue={user.internship}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block text-sm font-medium">
          Skills (comma separated)
          <input
            name="skills"
            defaultValue={user.skills.join(", ")}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block text-sm font-medium">
          Portfolio / GitHub
          <input
            name="portfolio"
            defaultValue={user.portfolio}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block text-sm font-medium">
          Bio
          <textarea
            name="bio"
            defaultValue={user.bio}
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving…" : "Save profile"}
          </Button>
          {saved && <span className="text-sm font-medium text-brand">Saved</span>}
        </div>
      </form>
    </div>
  );
}
