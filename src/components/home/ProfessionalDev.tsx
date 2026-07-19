"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CircleCheck,
  FileText,
  GraduationCap,
  MessageSquare,
  Target,
  Users,
  BarChart3,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ProfessionalDev() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container-page">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted border border-border">
            <GraduationCap className="h-5 w-5" />
            Professional Development
          </div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">
            Launch Your Career with Intern Next
          </h2>
          <p className="mt-4 text-muted md:text-lg">
            Pakistan&apos;s platform for career growth. Join virtual internships to gain practical
            experience and kickstart your professional journey.
          </p>
        </motion.div>

        <motion.div
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[
            ["1000+", "Active Internships"],
            ["500+", "Partner Companies"],
            ["10,000+", "Success Stories"],
            ["50+", "Industry Sectors"],
          ].map(([n, l]) => (
            <motion.div
              key={l}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-surface p-5 text-center"
            >
              <div className="font-display text-2xl font-bold text-brand md:text-3xl">{n}</div>
              <div className="mt-1 text-sm text-ink">{l}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mb-12 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[
            {
              icon: Target,
              title: "Targeted Learning",
              body: "Industry-specific virtual internships designed to build practical skills.",
              items: ["Web Development", "Digital Marketing", "UI/UX Design"],
            },
            {
              icon: Users,
              title: "Mentorship Program",
              body: "Learn from industry experts with guided weekly sessions.",
              items: ["One-on-One Guidance", "Project Reviews", "Career Planning"],
            },
            {
              icon: Award,
              title: "Certification Track",
              body: "Earn recognized certifications and a portfolio employers trust.",
              items: ["Skill Verification", "Performance Badges", "Digital Certificates"],
            },
          ].map(({ icon: Icon, title, body, items }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                <Icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink md:text-2xl">{title}</h3>
              <p className="mt-3 text-muted">{body}</p>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-ink">
                    <CircleCheck className="mr-3 h-5 w-5 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border bg-surface p-7"
          >
            <h3 className="font-display text-xl font-bold">Your Learning Journey</h3>
            <div className="mt-5 space-y-4">
              {[
                ["Phase 1: Foundation", 75],
                ["Phase 2: Practical Skills", 60],
                ["Phase 3: Industry Projects", 85],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-2 flex justify-between">
                    <h4 className="font-semibold">{label}</h4>
                    <span className="text-sm text-muted">{value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-border">
                    <motion.div
                      className="h-2 rounded-full bg-brand"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border bg-surface p-7"
          >
            <h3 className="font-display text-xl font-bold">Career Resources</h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                [FileText, "Resume Templates"],
                [MessageSquare, "Mock Interviews"],
                [BarChart3, "Skill Analysis"],
                [BookOpen, "Learning Paths"],
                [Target, "Goal Tracking"],
                [Users, "Peer Feedback"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof FileText;
                return (
                  <div
                    key={label as string}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
                  >
                    <I className="h-5 w-5 text-brand" />
                    <span className="text-sm font-medium">{label as string}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
