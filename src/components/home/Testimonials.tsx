"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [index]);

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  const t = testimonials[index];

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12">
        <div className="text-center lg:col-span-5 lg:text-left">
          <div className="inline-flex items-center rounded-full bg-background px-4 py-2 text-sm font-medium text-muted">
            Trusted By Thousands
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Join Thousands of Achievers. Connect, Learn, Succeed.
          </h2>
          <div className="mt-6">
            <Button href="/internship">Join Our Community</Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="overflow-hidden rounded-2xl border border-border bg-surface"
              aria-roledescription="carousel"
              aria-label="Student testimonials"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28 }}
                  className="p-6 text-left md:p-7"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-brand-soft font-display text-lg font-bold text-brand">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                      <p className="text-sm text-muted">{t.city}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex gap-1 text-brand">★★★★★</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-ink transition hover:border-brand hover:text-brand"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index ? "w-6 bg-brand" : "w-2 bg-border",
                    )}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-ink transition hover:border-brand hover:text-brand"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
