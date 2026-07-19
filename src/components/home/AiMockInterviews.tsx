"use client";

import { motion } from "framer-motion";
import { Award, Brain, ChevronRight, FileText, MessageSquare, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function AiMockInterviews() {
  return (
    <section className="bg-dark-mesh py-20 text-white md:py-24">
      <div className="container-page space-y-16">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-brand">
              <Brain className="mr-2 h-5 w-5" />
              AI Mock Interviews
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              Ace Your Internship Interviews with AI Practice
            </h2>
            <p className="mt-5 text-base text-white/70 md:text-lg">
              Get realistic, role-specific mock interviews for tech, marketing, and business.
              Receive instant feedback and build confidence before the real interview.
            </p>
            <Button href="/aimock" size="lg" className="mt-8">
              Practice Now
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div
            className="md:w-1/2 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {[
              {
                icon: MessageSquare,
                title: "Realistic AI Interview Simulations",
                body: "Simulate real interview environments powered by AI for internship and job readiness.",
              },
              {
                icon: Brain,
                title: "Smart Feedback with AI",
                body: "Instantly analyze answers, tone, and relevance with feedback tailored for candidates.",
              },
              {
                icon: Target,
                title: "Role-Based Mock Interviews",
                body: "Practice for software engineering, product, business, and digital marketing roles.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-4 rounded-2xl border border-dark-border bg-dark-elevated p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f1a12]">
                  <Icon className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-white/70">{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[
            {
              icon: Award,
              title: "Build Real Interview Confidence",
              body: "Reduce anxiety through repeated AI-based mock interview sessions.",
            },
            {
              icon: BarChart3,
              title: "Become Job-Ready Fast",
              body: "Structured interview training for real-world scenarios students face.",
            },
            {
              icon: FileText,
              title: "Track Progress with Reports",
              body: "Access detailed performance reports you can share with mentors.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-dark-border bg-dark-elevated p-8"
            >
              <Icon className="mb-4 h-8 w-8 text-brand" />
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-white/70">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
