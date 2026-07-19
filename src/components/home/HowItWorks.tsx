"use client";

import { motion } from "framer-motion";
import { UserPlus, FileCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    n: "01",
    title: "Sign Up & Choose a Domain",
    body: "Explore internships across industries, tailored to your skills and goals.",
    icon: UserPlus,
  },
  {
    n: "02",
    title: "Enroll & Start Tasks",
    body: "Join an open section (50 seats each) and unlock your Task Portal instantly.",
    icon: FileCheck,
  },
  {
    n: "03",
    title: "Earn Your Certificate",
    body: "Finish tasks, gain real experience, and receive a verified certificate.",
    icon: Award,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-page grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="mb-5 inline-flex items-center rounded-full bg-background px-4 py-2 text-sm font-medium text-muted">
            How It Works
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            Start Fast.
            <br />
            Learn Smart.
            <br />
            Get Job-Ready.
          </h2>
          <p className="mt-5 text-muted md:text-lg">
            Follow three clear steps to start, learn, and earn your certificate.
          </p>
          <Button href="/internship" size="lg" className="mt-8">
            Get Started Now
          </Button>
        </div>
        <div className="space-y-6 lg:col-span-7">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-surface p-7"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-muted">Step {step.n}</span>
                </div>
                <h3 className="font-display text-lg font-semibold md:text-xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
