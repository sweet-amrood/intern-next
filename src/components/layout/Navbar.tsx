"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/internship", label: "Internship" },
  { href: "/graduateprogram", label: "Graduate Program" },
  { href: "/studentambassadors", label: "Student Ambassador" },
  { href: "/startupjourney", label: "Startup Journey" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog", desc: "Insights and career articles" },
  { href: "/webinars", label: "Webinars", desc: "Expert-led sessions" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut, ready, hasBothRoles, activeWorkspace, switchWorkspace } =
    useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dualStudent =
    Boolean(ready && user && hasBothRoles && activeWorkspace === "student");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/90 backdrop-blur-md shadow-sm"
          : "bg-surface/70 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-20 w-full items-center gap-3",
          dualStudent
            ? "max-w-none px-3 sm:px-4 lg:px-5 xl:px-6"
            : "container-page",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center">
          <BrandLogo priority />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-between gap-1 lg:flex xl:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 whitespace-nowrap px-0.5 text-[12px] font-medium transition-colors xl:text-[13px] 2xl:text-sm",
                pathname === link.href
                  ? "text-brand"
                  : "text-muted hover:text-brand",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="group relative shrink-0">
            <button className="flex items-center gap-0.5 whitespace-nowrap py-4 text-[12px] font-medium text-muted hover:text-brand xl:text-[13px] 2xl:text-sm">
              Resources
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-2 rounded-xl border border-border bg-surface p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {resourceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg p-3 hover:bg-brand-soft"
                >
                  <p className="text-sm font-bold text-ink">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
          {dualStudent && (
            <Link
              href="/jobs"
              className={cn(
                "shrink-0 whitespace-nowrap text-[12px] font-medium transition-colors xl:text-[13px] 2xl:text-sm",
                pathname.startsWith("/jobs")
                  ? "text-brand"
                  : "text-muted hover:text-brand",
              )}
            >
              Jobs
            </Link>
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2">
          <ThemeToggle />

          {ready && user ? (
            dualStudent ? (
              <>
                <div className="flex items-center rounded-full border border-border bg-background p-0.5">
                  <span className="rounded-full bg-brand px-2.5 py-1.5 text-[11px] font-semibold text-white xl:px-3 xl:text-xs">
                    Student
                  </span>
                  <button
                    type="button"
                    onClick={() => switchWorkspace("admin")}
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-muted transition hover:bg-brand-soft hover:text-ink xl:px-3 xl:text-xs"
                  >
                    <Shield className="h-3 w-3" />
                    Admin
                  </button>
                </div>
                <Button href="/dashboard" size="sm" className="px-4 text-xs xl:text-sm">
                  Dashboard
                </Button>
                <button
                  onClick={() => void signOut()}
                  className="whitespace-nowrap px-1 text-xs font-medium text-muted hover:text-brand xl:text-sm"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Button href="/jobs" size="sm">
                  Job Portal
                </Button>
                <Button href="/dashboard" variant="secondary" size="sm">
                  Dashboard
                </Button>
                <button
                  onClick={() => void signOut()}
                  className="text-sm font-medium text-muted hover:text-brand"
                >
                  Sign out
                </button>
              </>
            )
          ) : (
            <>
              <Button href="/jobs" size="sm">
                Job Portal
              </Button>
              <Button href="/sign-in" variant="secondary" size="sm">
                Sign in
              </Button>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {[
              ...links,
              ...resourceLinks,
              { href: "/jobs", label: "Job Portal" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href
                    ? "bg-brand-soft text-brand"
                    : "text-ink hover:bg-brand-soft",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 px-1">
              {user ? (
                <>
                  {dualStudent && (
                    <div className="mb-1 flex rounded-full border border-border bg-background p-0.5">
                      <span className="flex-1 rounded-full bg-brand px-3 py-2 text-center text-xs font-semibold text-white">
                        Student
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          switchWorkspace("admin");
                        }}
                        className="flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-muted"
                      >
                        <Shield className="h-3.5 w-3.5" />
                        Admin
                      </button>
                    </div>
                  )}
                  <Button href="/dashboard">Dashboard</Button>
                  <Button variant="secondary" onClick={() => void signOut()}>
                    Sign out
                  </Button>
                </>
              ) : (
                <Button href="/sign-in">Sign in</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
