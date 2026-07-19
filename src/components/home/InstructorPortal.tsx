"use client";

import { motion } from "framer-motion";
import { CloudUpload, DollarSign, Handshake, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

const features = [
  {
    icon: CloudUpload,
    title: "Upload Tutorials & Exercises",
    body: "Share tutorials, exercises, and projects. Help others learn while you grow.",
  },
  {
    icon: DollarSign,
    title: "Earn from Your Expertise",
    body: "Tech creators and instructors can earn by sharing knowledge on the platform.",
  },
  {
    icon: UserCheck,
    title: "Build Your Instructor Profile",
    body: "Become a trusted voice and grow your personal brand in online learning.",
  },
  {
    icon: Handshake,
    title: "Fair Revenue Sharing",
    body: "Transparent payouts designed so your hard work is rewarded fairly.",
  },
];

export function InstructorPortal() {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center rounded-full bg-background px-4 py-2 text-sm font-medium text-muted">
              Instructor Portal
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink md:text-5xl">
              Tech Instructor or Content Creator?
            </h2>
            <p className="mt-4 text-muted md:text-lg">
              Create in your native language, reach more learners, and earn from your expertise with
              Intern Next.
            </p>
            <Button href="https://learn.internee.pk/" external size="lg" className="mt-6">
              Start Teaching Today
            </Button>
          </motion.div>
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Upload Content", "Tutorials & Projects"],
                  ["Earn Income", "Transparent Payouts"],
                  ["Grow Profile", "Verified Reviews"],
                  ["Reach Learners", "Global Community"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
                    <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-border pt-5 text-sm text-muted">
                Join a growing community of instructors sharing practical, industry-ready content.
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {features.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                <Icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
              <a
                href="https://learn.internee.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center font-medium text-brand hover:text-brand-dark"
              >
                Learn more →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
