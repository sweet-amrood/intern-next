import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWebinar, webinars } from "@/data/webinars";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return webinars.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) return { title: "Webinar" };
  return { title: w.title, description: w.description };
}

export default async function WebinarDetailPage({ params }: Props) {
  const { slug } = await params;
  const w = getWebinar(slug);
  if (!w) notFound();

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <div className="container-page max-w-3xl py-12 md:py-16">
        <Link
          href="/webinars"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Webinars
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-brand">
          {w.category} · {w.status}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
          {w.title}
        </h1>
        <p className="mt-4 text-muted">
          {w.speaker} · {w.role}
        </p>
        <p className="mt-1 text-sm text-muted">
          {w.date} · {w.duration}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-ink">{w.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {w.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
        <Button href="/sign-up" className="mt-10" size="lg">
          {w.status === "upcoming" ? "Register Interest" : "Access Recording via Dashboard"}
        </Button>
      </div>
    </div>
  );
}
