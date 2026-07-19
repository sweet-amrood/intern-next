import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Intern Next — Pakistan's virtual internship platform.",
};

export default function AboutPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page max-w-3xl py-16 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">About Us</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
          Bridging students and Pakistan&apos;s IT industry
        </h1>
        <div className="mt-8 space-y-5 text-muted leading-relaxed md:text-lg">
          <p>
            Intern Next is Pakistan&apos;s virtual internship platform. We help students and
            early-career professionals build skills through task-based projects, earn verified
            proof, and move toward job-ready careers.
          </p>
          <p>
            Our ecosystem includes a Task Portal, Learning Management System, Job Portal, AI career
            tools, webinars, and a nationwide ambassador community.
          </p>
          <p>
            Founded in 2023, we partner with companies and campuses to turbocharge the IT sector —
            one internship, one project, one certificate at a time.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/internship">Explore Internships</Button>
          <Button href="/startupjourney" variant="secondary">
            Our Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
