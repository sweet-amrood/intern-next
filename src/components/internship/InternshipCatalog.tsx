"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";
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

export function InternshipCatalog() {
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
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Internships</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Choose Your Domain. Build Real Skills.
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Submit an application form — enrollment is confirmed after review (within 24 hours).
            Each section has {SEATS_PER_SECTION} seats.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const enrolledHere = enrollments.some((e) => e.slug === item.slug);
            const pendingHere = pendingApps.some((a) => a.slug === item.slug);
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              >
                <div className="relative h-40 overflow-hidden bg-[#0f1a12]">
                  <InternshipPoster src={item.image} alt={item.title} slug={item.slug} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                    {item.category}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
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
                      Sec {item.openSection} · {item.seatsLeft}/{item.seatsPerSection}
                    </span>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Button href={`/internship/${item.slug}`} variant="secondary" className="w-full">
                      View details
                    </Button>
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
                    ) : user ? null : (
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

        <p className="mt-10 text-center text-sm text-muted">
          Already enrolled?{" "}
          <Link href="/dashboard" className="font-semibold text-brand hover:underline">
            Open your dashboard
          </Link>
        </p>
      </section>
    </div>
  );
}
