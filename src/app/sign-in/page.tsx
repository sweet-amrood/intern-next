"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { validateSignInForm } from "@/lib/validate";

const field =
  "w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20";

function SignInForm() {
  const { signIn, signInWithGoogle, user, ready, error, clearError } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = useMemo(() => {
    const n = search.get("next");
    return n && n.startsWith("/") ? n : "/dashboard";
  }, [search]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch(nextPath);
  }, [router, nextPath]);

  useEffect(() => {
    if (!ready || !user) return;
    if (user.hasBothRoles) return;
    if (user.roles?.includes("admin") && !user.roles?.includes("student")) {
      router.replace("/admin");
      return;
    }
    router.replace(nextPath.startsWith("/admin") ? "/dashboard" : nextPath);
  }, [ready, user, router, nextPath]);

  function resolveRedirect(dest: string) {
    if (dest === "__select__") return "__select__";
    if (dest === "/admin") return "/admin";
    if (nextPath.startsWith("/admin")) return dest;
    return nextPath.startsWith("/") ? nextPath : dest;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    setLocalError(null);
    const check = validateSignInForm({ email, password });
    if (!check.ok) {
      setLocalError(check.message);
      return;
    }
    setLoading(true);
    const dest = await signIn(email.trim(), password);
    if (dest === "__select__") {
      router.replace("/");
      setLoading(false);
      return;
    }
    if (dest) {
      router.replace(resolveRedirect(dest));
      return;
    }
    setLoading(false);
  }

  async function onGoogle(credential: string) {
    clearError();
    setLoading(true);
    const dest = await signInWithGoogle(credential);
    if (dest === "__select__") {
      router.replace("/");
      setLoading(false);
      return;
    }
    if (dest) {
      router.replace(resolveRedirect(dest));
      return;
    }
    setLoading(false);
  }

  return (
    <>
      <GoogleSignInButton onCredential={onGoogle} disabled={loading} />

      <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        <span className="h-px flex-1 bg-border" />
        or email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-ink">
          Email
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className={field}
            />
          </div>
        </label>

        <label className="block text-sm font-medium text-ink">
          Password
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className={`${field} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-ink"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        {(localError || error) && (
          <p className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
            {localError || error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Signing in…" : "Enter dashboard"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        First time here?{" "}
        <Link href="/sign-up" className="font-semibold text-brand hover:underline">
          Create a student account
        </Link>
      </p>
    </>
  );
}

export default function SignInPage() {
  return (
    <AuthShell
      mode="sign-in"
      formTitle="Welcome back"
      formHint="Sign in with Google or email. We’ll also email due-date and progress reminders."
    >
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
