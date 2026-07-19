import type { Metadata } from "next";
import { Award, Briefcase, CircleCheck, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Graduate Program",
  description: "12-week career-focused graduate programs with mentorship, projects, and placement support.",
};

export default function GraduateProgramPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Graduate Programs</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Graduate Programs That Launch Careers
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Structured, career-focused programs with real projects, mentorship, and industry expertise.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/sign-up" size="lg">
              Enroll Now
            </Button>
            <Button href="/internship" variant="secondary" size="lg">
              Browse Related Internships
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            [Clock, "12 Weeks"],
            [Briefcase, "20+ Tracks"],
            [Award, "80+ Projects"],
            [Users, "35+ Mentors"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Clock;
            return (
              <div
                key={label as string}
                className="rounded-2xl border border-border bg-surface p-5 text-center"
              >
                <I className="mx-auto h-6 w-6 text-brand" />
                <p className="mt-2 font-display text-xl font-bold">{label as string}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Career-Focused Curriculum",
              body: "Programs aligned with current industry demands and hiring requirements.",
            },
            {
              title: "Expert Mentorship",
              body: "Learn from professionals working at top tech companies worldwide.",
            },
            {
              title: "Job Placement Support",
              body: "Direct connections with hiring partners and interview prep.",
            },
            {
              title: "Verified Certificates",
              body: "Industry-recognized credentials that boost your resume.",
            },
            {
              title: "Flexible Scheduling",
              body: "Learn at your own pace with live and recorded sessions.",
            },
            {
              title: "Real Projects",
              body: "Work on practical projects and build portfolio pieces recruiters trust.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-6">
              <CircleCheck className="h-6 w-6 text-brand" />
              <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-muted">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-dark p-10 text-white md:p-14">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How programs work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              ["1", "Choose Your Track"],
              ["2", "Learn & Project"],
              ["3", "Build Portfolio"],
              ["4", "Land Your Job"],
            ].map(([n, t]) => (
              <div key={n} className="rounded-2xl border border-dark-border bg-dark-elevated p-5">
                <p className="text-brand font-display text-2xl font-bold">{n}</p>
                <p className="mt-2 font-semibold">{t}</p>
              </div>
            ))}
          </div>
          <Button href="/sign-up" className="mt-8">
            Start Your Graduate Program
          </Button>
        </div>
      </section>
    </div>
  );
}
