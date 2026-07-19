"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function BottomCta() {
  return (
    <section className="bg-surface pb-16">
      <div className="container-page">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-dark px-6 py-12 text-white md:px-10 md:py-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-10 hidden h-full w-40 bg-gradient-to-l from-brand/10 to-transparent md:block" />
          <div className="relative max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold sm:text-sm">
              <span className="mr-2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                Trending
              </span>
              Explore Internship Opportunities
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Unlock New Opportunities
              <br />
              With Top-tier Internships.
            </h2>
            <p className="mt-5 text-base text-white/80 md:text-lg">
              Take the first step toward a successful career with Intern Next.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Button href="/graduateprogram">Get Started Now</Button>
              <Button
                href="/internship"
                variant="secondary"
                className="border-brand/40 bg-transparent text-white hover:bg-brand/10"
              >
                <Search className="h-4 w-4" />
                Explore Internships
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-10 px-6 py-6 md:flex-row md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[
            ["20K+", "Students Empowered"],
            ["200+", "Industry Partners"],
            ["98%", "Success Rate"],
          ].map(([n, l]) => (
            <motion.div key={l} variants={fadeUp} transition={{ duration: 0.35 }} className="text-center">
              <p className="font-display text-5xl font-semibold text-ink md:text-6xl">{n}</p>
              <p className="mt-1 text-lg text-ink">{l}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
