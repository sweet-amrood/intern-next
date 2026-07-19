"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Lightbulb, PenTool, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function AiCareerPath() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-5 inline-flex items-center rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted border border-border">
              <Brain className="mr-2 h-5 w-5" />
              Your AI Career Journey
            </div>
            <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">
              Master the AI Career Path
            </h2>
            <p className="mt-5 max-w-2xl text-muted md:text-lg">
              Expert guidance in resume building, cover letters, interview preparation, quizzes, and
              industry insights — designed to help you land roles in Artificial Intelligence.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="/aicareer" size="lg">
                Explore Tools
              </Button>
              <Button href="https://learn.internee.pk/" external variant="secondary" size="lg">
                Start Learning
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  [PenTool, "AI Resume Building"],
                  [BookOpen, "Cover Letter Creation"],
                  [Users, "Interview Preparation"],
                  [Lightbulb, "Industry Insights"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof PenTool;
                  return (
                    <div
                      key={label as string}
                      className="rounded-2xl border border-border bg-background p-4"
                    >
                      <div className="flex items-center gap-3">
                        <I className="h-5 w-5 text-brand" />
                        <span className="text-sm font-semibold text-ink">{label as string}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 rounded-2xl bg-dark p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Career Growth</p>
                    <p className="text-xl font-semibold">Personalized Path</p>
                  </div>
                  <Sparkles className="h-6 w-6 text-brand" />
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                  <motion.div
                    className="h-2 rounded-full bg-brand"
                    initial={{ width: 0 }}
                    whileInView={{ width: "66%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[
            {
              icon: PenTool,
              title: "AI Resume Building",
              body: "Highlight AI skills, experience, and accomplishments that catch employer attention.",
            },
            {
              icon: BookOpen,
              title: "Cover Letter Creation",
              body: "Create compelling cover letters that showcase passion and value for AI roles.",
            },
            {
              icon: Users,
              title: "Interview Preparation",
              body: "Practice questions, strategies, and tips for technical AI-related interviews.",
            },
            {
              icon: Lightbulb,
              title: "Industry Insights",
              body: "Stay ahead with trends, market demands, and emerging AI technologies.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                  <Icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="ml-4 font-display text-xl font-bold md:text-2xl">{title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
