import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Student Ambassadors",
  description: "Represent Intern Next on campus, grow leadership skills, and earn stipends.",
};

export default function AmbassadorsPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Student Ambassadors</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Intern Next Student Ambassadors
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Join students who build real projects, grow leadership skills, and represent Intern Next
            on campus.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/sign-up" size="lg">
              Apply Now
            </Button>
            <Button href="/webinars" variant="secondary" size="lg">
              View Community Events
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["300+", "Active Ambassadors"],
            ["50+", "Campuses"],
            ["1000+", "Events"],
            ["15K+", "Students Reached"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-surface p-5 text-center">
              <p className="font-display text-2xl font-bold text-brand md:text-3xl">{n}</p>
              <p className="mt-1 text-sm text-ink">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["Exclusive Stipend", "Earn based on performance and events organized"],
            ["Priority Recognition", "Get featured on Intern Next channels"],
            ["Free Learning Resources", "Premium courses and certifications"],
            ["Startup Support", "Mentorship and resources for founders"],
            ["Global Networking", "Connect with ambassadors and professionals"],
            ["Career Opportunities", "Pathway to internships and full-time roles"],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-7">
            <h2 className="font-display text-2xl font-bold">On Campus</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
              <li>Organize 2–3 events monthly — workshops, hackathons, talks</li>
              <li>Recruit students and share Intern Next opportunities</li>
              <li>Share updates and success stories</li>
              <li>Mentor peers through program selection</li>
              <li>Represent the brand at college events</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7">
            <h2 className="font-display text-2xl font-bold">Online</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted">
              <li>Create social content and testimonials</li>
              <li>Support the ambassador community</li>
              <li>Report metrics monthly</li>
              <li>Attend training and webinars</li>
              <li>Share feedback to improve programs</li>
            </ol>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-dark p-8 text-white md:flex md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/70">8–10 hrs/week · Stipend + bonus</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Make impact on your campus</h3>
          </div>
          <Button href="/sign-up" className="mt-4 md:mt-0">
            Become an Ambassador
          </Button>
        </div>
      </section>
    </div>
  );
}
