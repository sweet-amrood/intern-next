"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  Award,
  Briefcase,
  Brain,
  LayoutDashboard,
  ListChecks,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/tasks", label: "Tasks", icon: ListChecks },
  { href: "/aimock", label: "Mock Interview", icon: Brain },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    const adminOnly =
      user.roles?.includes("admin") && !user.roles?.includes("student");
    if (adminOnly) {
      router.replace("/admin");
    }
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted">
        Loading…
      </div>
    );
  }

  const adminOnly =
    user && user.roles?.includes("admin") && !user.roles?.includes("student");
  if (!user || adminOnly) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container-page grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-surface p-3 lg:sticky lg:top-28">
          <nav className="flex gap-1 overflow-x-auto lg:flex-col">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-brand text-white"
                      : "text-muted hover:bg-brand-soft hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
