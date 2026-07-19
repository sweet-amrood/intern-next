"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  ChevronRight,
  CircleCheck,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TaskPortal() {
  return (
    <section className="bg-dark-mesh py-20 text-white md:py-24">
      <div className="container-page">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-brand">
            <Workflow className="mr-2 h-5 w-5" />
            Task Management Platform
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Turn Learning into Proof with
            <br />
            the Intern Next Task Portal
          </h2>
          <p className="mt-5 text-base text-white/70 md:text-lg">
            Complete real tasks, get structured feedback, and build a portfolio employers trust.
            Every milestone moves you closer to job-ready.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-dark-border bg-dark-elevated p-7 transition hover:border-brand/40"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f1a12]">
              <Briefcase className="h-7 w-7 text-brand" />
            </div>
            <h3 className="font-display text-2xl font-semibold">Hands-on Industry Projects</h3>
            <p className="mt-3 text-white/70">
              Practice with real-world projects that mirror industry workflows. Each task sharpens
              your skills and strengthens your portfolio.
            </p>
            <ul className="mt-5 space-y-3 text-sm md:text-base">
              {["Project-based learning", "Industry-standard practices", "Portfolio building"].map(
                (item) => (
                  <li key={item} className="flex items-center text-white/80">
                    <CircleCheck className="mr-3 h-5 w-5 text-brand" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-dark-border bg-dark-elevated p-7 transition hover:border-brand/40"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f1a12]">
              <BadgeCheck className="h-7 w-7 text-brand" />
            </div>
            <h3 className="font-display text-2xl font-semibold">Skill Verification System</h3>
            <p className="mt-3 text-white/70">
              Every completed task adds verified proof to your profile. Track progress and showcase
              outcomes with confidence.
            </p>
            <ul className="mt-5 space-y-3 text-sm md:text-base">
              {["Skill verification", "Progress tracking", "Achievement badges"].map((item) => (
                <li key={item} className="flex items-center text-white/80">
                  <CircleCheck className="mr-3 h-5 w-5 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-10 grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-4 rounded-xl border border-dark-border bg-dark-elevated p-6"
          >
            <div className="rounded-xl bg-[#0f1a12] p-3">
              <Workflow className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">SDLC Implementation</h3>
              <p className="mt-2 text-sm text-white/70 md:text-base">
                Experience the complete Software Development Life Cycle through structured tasks and
                milestones.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-4 rounded-xl border border-dark-border bg-dark-elevated p-6"
          >
            <div className="rounded-xl bg-[#0f1a12] p-3">
              <BookOpen className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Guided Learning Path</h3>
              <p className="mt-2 text-sm text-white/70 md:text-base">
                Follow a structured path designed for beginners and advanced learners in our virtual
                internship curriculum.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-dark-border bg-dark-elevated p-10 text-center md:p-12"
        >
          <h3 className="font-display text-2xl font-semibold md:text-3xl">
            Ready to Build Your Professional Portfolio?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Join virtual internships and get access to industry-standard tasks that help you build a
            remarkable portfolio.
          </p>
          <Button href="/sign-in" size="lg" className="mt-7">
            Start Your Journey Now
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
