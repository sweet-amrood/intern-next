"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Headset, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: "Support chat",
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not send.");
        return;
      }
      setStatus("Sent — check your inbox for confirmation.");
      setMessage("");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-4 z-[90] sm:right-6">
      {open && (
        <div className="mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-white">
            <p className="text-sm font-semibold">Intern Next Support</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <p className="rounded-xl bg-brand-soft p-3 text-ink">
              Message us here — it emails the team. Or open{" "}
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Contact Us
              </Link>
              .
            </p>
            <form onSubmit={onSubmit} className="space-y-2">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
              />
              {error && <p className="text-xs text-danger">{error}</p>}
              {status && <p className="text-xs text-brand-dark">{status}</p>}
              <Button type="submit" className="w-full" size="sm" disabled={loading}>
                {loading ? "Sending…" : "Send email"}
              </Button>
            </form>
            <p className="text-xs text-muted">Phone: +92 312 3023645</p>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white shadow-xl shadow-brand/30 transition hover:scale-105"
        aria-label="Toggle chatbot"
      >
        <Headset className="h-7 w-7" />
      </button>
    </div>
  );
}
