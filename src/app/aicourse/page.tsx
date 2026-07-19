import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "AI Courses",
  description: "Explore AI learning paths connected to Intern Next internships and LMS.",
};

export default function AiCoursePage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page max-w-3xl py-16 md:py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">AI Learning</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
          AI Courses & Learning Paths
        </h1>
        <p className="mt-4 text-muted md:text-lg">
          Pair Task Portal projects with LMS courses — including Urdu-friendly content — to build
          AI fluency faster.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="https://learn.internee.pk/" external size="lg">
            Open LMS
          </Button>
          <Button href="/internship/machine-learning" variant="secondary" size="lg">
            ML Internship
          </Button>
        </div>
      </section>
    </div>
  );
}
