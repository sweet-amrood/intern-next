"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { WorkspaceSwitch } from "@/components/layout/WorkspaceSwitch";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/tasks", label: "Task review", icon: ListChecks },
  { href: "/admin/enrollments", label: "Enrollments", icon: GraduationCap },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, ready, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const canAdmin = Boolean(user?.roles?.includes("admin") || user?.role === "admin");

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/sign-in?next=/admin");
      return;
    }
    if (!user.roles?.includes("admin") && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [ready, user, router]);

  if (!ready || !user || !canAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark text-white/70">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1210] text-[#e8efe6]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#121714] p-4 md:block">
          <Link href="/admin" className="font-display text-xl font-extrabold">
            Intern <span className="text-brand">Next</span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Admin
            </span>
          </Link>
          <nav className="mt-8 space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === href
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-brand text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => void signOut().then(() => router.replace("/sign-in"))}
            className="mt-8 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 md:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand">Control center</p>
              <h1 className="font-display text-lg font-bold md:text-xl">
                {nav.find(
                  (n) =>
                    n.href === pathname ||
                    (n.href !== "/admin" && pathname.startsWith(`${n.href}/`)),
                )?.label || "Admin"}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <WorkspaceSwitch variant="dark" />
              <div className="text-right text-sm">
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-white/50">{user.email}</p>
              </div>
            </div>
          </header>

          <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-2 md:hidden">
            {nav.map(({ href, label }) => {
              const active =
                href === "/admin"
                  ? pathname === href
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold",
                    active ? "bg-brand text-white" : "bg-white/5 text-white/70",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
