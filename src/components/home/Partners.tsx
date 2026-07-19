"use client";

import { motion } from "framer-motion";
import { partners } from "@/data/site";

export function Partners() {
  const row = [...partners, ...partners];

  return (
    <section className="overflow-hidden border-y border-border bg-surface py-10">
      <div className="container-page mb-8">
        <h2 className="text-center text-sm font-medium uppercase tracking-wide text-muted">
          Collaborated with Trusted Worldwide Partners
        </h2>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />
        <motion.div
          className="flex w-max gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-14 min-w-[160px] items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-muted"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
