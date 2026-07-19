"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquareText, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { validateContactForm, type FieldErrors } from "@/lib/validate";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(false);
    const check = validateContactForm({ name, email, subject, message });
    setFieldErrors(check.errors);
    if (!check.ok) {
      setError(check.message);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not send message.");
        return;
      }
      setDone(true);
      setMessage("");
      setSubject("General inquiry");
      setFieldErrors({});
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-mesh min-h-[70vh] px-4 py-14">
      <motion.div
        className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Contact us</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Talk to Intern Next
          </h1>
          <p className="mt-4 max-w-xl text-muted md:text-lg">
            Questions about internships, certificates, task validation, or partnerships? Send a
            message — it lands in our inbox over email, and you’ll get an auto-reply right away.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li>Certificates / account issues → we route them to the support inbox</li>
            <li>Typical reply time: within one business day</li>
            <li>Phone: +92 312 3023645</li>
          </ul>
        </motion.div>

        <motion.form
          noValidate
          onSubmit={onSubmit}
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[1.7rem] border border-border bg-surface/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-8"
        >
          <label className="block text-sm font-medium text-ink">
            Name
            <div className="relative mt-1.5">
              <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            {fieldErrors.name && <p className="mt-1 text-xs text-danger">{fieldErrors.name}</p>}
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Email
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            {fieldErrors.email && <p className="mt-1 text-xs text-danger">{fieldErrors.email}</p>}
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Subject
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              <option>General inquiry</option>
              <option>Internship application</option>
              <option>Task portal / deadlines</option>
              <option>Certificates</option>
              <option>Partnership</option>
            </select>
            {fieldErrors.subject && (
              <p className="mt-1 text-xs text-danger">{fieldErrors.subject}</p>
            )}
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Message
            <div className="relative mt-1.5">
              <MessageSquareText className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(fieldErrors.message)}
                className="w-full resize-y rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            {fieldErrors.message && (
              <p className="mt-1 text-xs text-danger">{fieldErrors.message}</p>
            )}
          </label>

          {error && (
            <p className="mt-4 rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>
          )}
          {done && (
            <p className="mt-4 rounded-xl bg-brand-soft px-3 py-2 text-sm text-brand-dark">
              Message sent. Check your inbox for a confirmation.
            </p>
          )}

          <Button type="submit" className="mt-5 w-full" size="lg" disabled={loading}>
            {loading ? "Sending…" : "Send message"}
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}
