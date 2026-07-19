"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:border-brand/40 hover:bg-brand-soft",
        className,
      )}
    >
      {!ready ? (
        <Sun className="h-4 w-4 opacity-50" />
      ) : theme === "dark" ? (
        <Sun className="h-4 w-4 text-brand" />
      ) : (
        <Moon className="h-4 w-4 text-ink" />
      )}
    </button>
  );
}
