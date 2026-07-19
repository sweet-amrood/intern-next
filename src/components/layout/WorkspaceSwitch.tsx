"use client";

import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";

export function WorkspaceSwitch({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const { user, hasBothRoles, activeWorkspace, switchWorkspace } = useAuth();

  if (!user || !hasBothRoles || !activeWorkspace) return null;

  const toAdmin = activeWorkspace === "student";
  const dark = variant === "dark";

  return (
    <button
      type="button"
      onClick={() => switchWorkspace(toAdmin ? "admin" : "student")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
        dark
          ? "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
          : "border border-border bg-surface text-ink hover:border-brand hover:bg-brand-soft",
        className,
      )}
    >
      <ArrowLeftRight className="h-3.5 w-3.5" />
      {toAdmin ? "Switch to Admin" : "Switch to Dashboard"}
    </button>
  );
}

export function WorkspaceLinks({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const { user, hasBothRoles, activeWorkspace } = useAuth();
  if (!user || !hasBothRoles || !activeWorkspace) return null;

  const dark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href="/dashboard"
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold",
          activeWorkspace === "student"
            ? "bg-brand text-white"
            : dark
              ? "text-white/60 hover:text-white"
              : "text-muted hover:text-ink",
        )}
      >
        Student
      </Link>
      <Link
        href="/admin"
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold",
          activeWorkspace === "admin"
            ? "bg-brand text-white"
            : dark
              ? "text-white/60 hover:text-white"
              : "text-muted hover:text-ink",
        )}
      >
        Admin
      </Link>
    </div>
  );
}
