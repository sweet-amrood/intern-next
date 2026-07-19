import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Users } from "lucide-react";
import { getInternship, internships, SEATS_PER_SECTION } from "@/data/internships";
import { LiveEnrollAside } from "@/components/internship/LiveEnrollAside";
import { InternshipPoster } from "@/components/internship/InternshipPoster";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return internships.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getInternship(slug);
  if (!item) return { title: "Internship" };
  return { title: item.title, description: item.description };
}

export default async function InternshipDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getInternship(slug);
  if (!item) notFound();

  const related = internships.filter((i) => i.id !== item.id).slice(0, 3);

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <div className="container-page py-12 md:py-16">
        <Link
          href="/internship"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Internships
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative mb-8 h-48 overflow-hidden rounded-2xl bg-[#0f1a12] md:h-64">
              <InternshipPoster src={item.image} alt={item.title} slug={item.slug} priority />
            </div>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              {item.category}
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-ink md:text-5xl">
              {item.title} Internship
            </h1>
            <p className="mt-4 text-lg text-muted">{item.description}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                {item.mode}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" />
                {item.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-brand" />
                {SEATS_PER_SECTION} seats per section
              </span>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-surface p-7">
              <h2 className="font-display text-2xl font-bold">What you&apos;ll do</h2>
              <ul className="mt-5 space-y-3">
                {[
                  "Complete structured Task Portal milestones aligned with SDLC",
                  "Submit projects for feedback and skill verification",
                  "Build a portfolio employers can trust",
                  "Earn badges and a verified internship certificate",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-muted">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-7">
              <h2 className="font-display text-2xl font-bold">Skills you&apos;ll practice</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <LiveEnrollAside slug={item.slug} title={item.title} />
          </aside>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold">Explore other internships</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/internship/${r.slug}`}
                className="rounded-2xl border border-border bg-surface p-5 hover:border-brand/40"
              >
                <p className="font-semibold text-ink">{r.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {r.mode} · {r.duration}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
