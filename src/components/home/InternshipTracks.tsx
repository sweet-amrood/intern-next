"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { InternshipPoster } from "@/components/internship/InternshipPoster";
import { SEATS_PER_SECTION, type Internship } from "@/data/internships";

type LiveInternship = Internship & {
  enrolledCount: number;
  openSection: number;
  seatsLeft: number;
  seatsPerSection: number;
};

export function InternshipTracks() {
  const { user, ready, applications } = useAuth();
  const [items, setItems] = useState<LiveInternship[]>([]);
  const enrollments = user?.enrollments ?? [];
  const pendingApps = applications.filter((a) => a.status === "pending");
  const slotsUsed = enrollments.length + pendingApps.length;
  const canApplyMore = slotsUsed < (user?.maxEnrollments ?? 3);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch("/api/internships");
      const data = await res.json();
      if (alive) setItems(data.internships ?? []);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-muted">
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
              Trending
            </span>
            Explore Internship Opportunities
          </div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">
            Your Dream Internship
            <br />
            is Just One <span className="text-brand">Click Away!</span>
          </h2>
          <p className="mt-4 text-muted md:text-lg">
            Apply with your details — our team reviews every request within 24 hours. Each section
            has {SEATS_PER_SECTION} seats.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 9).map((item, index) => {
            const enrolledHere = enrollments.some((e) => e.slug === item.slug);
            const pendingHere = pendingApps.some((a) => a.slug === item.slug);
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.04 }}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
              >
                <div className="relative h-40 w-full overflow-hidden bg-[#0f1a12]">
                  <InternshipPoster src={item.image} alt={item.title} slug={item.slug} />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                      {item.category}
                    </span>
                    <Link href={`/internship/${item.slug}`} prefetch>
                      <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-brand" />
                    </Link>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.mode}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {item.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      Sec {item.openSection} · {item.seatsLeft}/{item.seatsPerSection} seats
                    </span>
                  </div>
                  <div className="mt-5">
                    {!ready ? null : enrolledHere ? (
                      <Button href="/dashboard" className="w-full">
                        Go to Dashboard
                      </Button>
                    ) : pendingHere ? (
                      <Button href="/dashboard" variant="secondary" className="w-full">
                        Application pending
                      </Button>
                    ) : user && canApplyMore ? (
                      <Button href={`/internship/${item.slug}/apply`} className="w-full">
                        Apply now
                      </Button>
                    ) : user ? (
                      <Button href={`/internship/${item.slug}`} variant="secondary" className="w-full">
                        View details
                      </Button>
                    ) : (
                      <Button href="/sign-in" className="w-full">
                        Sign in to apply
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/internship" className="font-semibold text-brand hover:underline">
            View all internships →
          </Link>
        </div>
      </div>
    </section>
  );
}
