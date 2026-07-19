"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/auth/AuthShell";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { validateSignUpForm } from "@/lib/validate";

const field =
  "w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function SignUpPage() {
  const { signUp, signInWithGoogle, user, ready, error, clearError } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch("/dashboard");
    router.prefetch("/internship");
  }, [router]);

  useEffect(() => {
    if (ready && user) router.replace("/dashboard");
  }, [ready, user, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    setLocalError(null);

    const check = validateSignUpForm({ name, email, password, confirm });
    if (!check.ok) {
      setLocalError(check.message);
      return;
    }

    setLoading(true);
    const dest = await signUp(name.trim() || "Student", email.trim(), password);
    if (dest === "__select__") {
      router.replace("/");
      setLoading(false);
      return;
    }
    if (dest) {
      router.replace(dest);
      return;
    }
    setLoading(false);
  }

  async function onGoogle(credential: string) {
    clearError();
    setLocalError(null);
    setLoading(true);
    const dest = await signInWithGoogle(credential);
    if (dest === "__select__") {
      router.replace("/");
      setLoading(false);
      return;
    }
    if (dest) {
      router.replace(dest);
      return;
    }
    setLoading(false);
  }

  return (
    <AuthShell
      mode="sign-up"
      formTitle="Start free"
      formHint="Create with Google or email. We’ll email a welcome note and later progress reminders."
    >
      <GoogleSignInButton onCredential={onGoogle} disabled={loading} />

      <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        <span className="h-px flex-1 bg-border" />
        or email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-ink">
          Full name
          <div className="relative mt-1.5">
            <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className={field}
            />
          </div>
        </label>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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

        <label className="block text-sm font-medium text-ink">
          Confirm password
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className={field}
            />
          </div>
        </label>

        {(localError || error) && (
          <p className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
            {localError || error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Creating…" : "Create student account"}
        </Button>

        <p className="text-center text-xs text-muted">
          By joining you agree to our{" "}
          <Link href="/terms" className="text-brand hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          . A welcome email will be sent after signup.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already building with us?{" "}
        <Link href="/sign-in" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
