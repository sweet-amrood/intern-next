import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "AI Career Coach",
  description: "Resume, cover letter, interview prep, and industry insights for AI careers.",
};

export default function AiCareerPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">AI Career Journey</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Master the AI Career Path
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Guides for resume building, cover letters, interview preparation, and industry insights.
          </p>
          <Button href="/sign-in" size="lg" className="mt-8">
            Open Career Tools
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            ["AI Resume Building", "Highlight AI skills and outcomes recruiters scan for."],
            ["Cover Letter Creation", "Write compelling letters tailored to AI roles."],
            ["Interview Preparation", "Practice technical and behavioral questions."],
            ["Industry Insights", "Track trends, demand, and emerging technologies."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
