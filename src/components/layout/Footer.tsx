"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";

const socials = [
  { href: "https://www.facebook.com/people/Interneepk/100093222249320/", label: "f" },
  { href: "https://twitter.com/interneepk", label: "X" },
  { href: "https://www.linkedin.com/company/internee-pk/", label: "in" },
  { href: "https://www.instagram.com/internee.pk/", label: "ig" },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="border-t border-border bg-surface-2 text-ink">
      <div className="container-page py-12">
        <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Subscribe to Newsletter</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              Get exclusive insights, industry trends, and internship updates.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2 rounded-full border border-border bg-surface p-1.5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email.trim()) return;
              try {
                await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: email.trim() }),
                });
              } catch {
                /* ignore */
              }
              setDone(true);
              setEmail("");
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-full border-0 bg-transparent px-4 text-sm outline-none"
              required
            />
            <button
              type="submit"
              className="h-11 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {done ? "Joined" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex">
              <BrandLogo className="!items-start" markClassName="h-10 w-10" />
            </Link>
            <p className="mt-4 text-sm text-muted">
              The ultimate platform designed to turbocharge the IT sector in Pakistan.
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-brand" />
              +92 312 3023645
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-bold uppercase text-white hover:bg-brand-dark"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="mb-3 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-brand">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-brand">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/studentambassadors" className="hover:text-brand">
                    Student Ambassador
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-brand">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-brand">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/webinars" className="hover:text-brand">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-brand">
                    Job Portal
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-brand">
                    Certification
                  </Link>
                </li>
                <li>
                  <a
                    href="https://linktr.ee/internee.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-border pt-4 text-xs text-muted md:flex-row">
          <p>Copyright © 2026 Intern Next</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-brand">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-brand">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
