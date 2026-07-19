import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Startup Journey",
  description: "From launch in 2023 to Pakistan's leading virtual internship platform.",
};

export default function StartupJourneyPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Our Journey</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Our Journey to Impact & Excellence
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            From launch in 2023 to South Asia&apos;s leading virtual internship platform. We&apos;ve
            transformed 20,000+ careers and partnered with 200+ companies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/internship">Explore Programs</Button>
            <Button href="/studentambassadors" variant="secondary">
              Join Community
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["2+", "Years Active"],
            ["200+", "Companies"],
            ["98%", "Success Rate"],
            ["20K+", "Students Transformed"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-surface p-5 text-center">
              <p className="font-display text-3xl font-bold text-brand">{n}</p>
              <p className="mt-1 text-sm text-ink">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-3xl font-bold text-center">Recognition & Awards</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["Runner-Up · 2024", "Sindh Regional Zindigi Prize"],
              ["Winner · 2024", "SEE Pakistan Ed-Tech"],
              ["Winner · 2024", "Aptech Young Entrepreneurs Award"],
              ["Winner · 2024", "Google Cloud Startup Competition"],
            ].map(([badge, title]) => (
              <div key={title} className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{badge}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["Mission-Driven", "Empower youth through real-world experience and skill development."],
            ["Community First", "Strong networks of mentors, partners, and students."],
            ["Growth Focused", "Track outcomes, improve continuously, showcase real results."],
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
