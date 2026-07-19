"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock3,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/cn";
import {
  getMockTrackBank,
  mockTrackBanks,
  pickRandomQuestions,
  type MockDifficulty,
  type MockQuestion,
} from "@/data/mock-interviews";
import type { SessionReport } from "@/lib/mock-interview-score";

type Step = "landing" | "setup" | "interview" | "results";

type StoredSession = {
  roleId: string;
  roleTitle: string;
  overall: number;
  evaluatedAt: string;
};

const HISTORY_KEY = "internee_aimock_history_v1";
const QUESTION_SECONDS = 120;
const MIN_WORDS = 50;

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function MockInterviewApp() {
  const { user, ready } = useAuth();
  const [step, setStep] = useState<Step>("landing");
  const [trackSlug, setTrackSlug] = useState<string | null>(null);
  const [sessionTitle, setSessionTitle] = useState("");
  const [difficulty, setDifficulty] = useState<MockDifficulty>("intermediate");
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<SessionReport | null>(null);
  const [history, setHistory] = useState<StoredSession[]>([]);

  const current = questions[index];
  const progress = questions.length ? Math.round(((index + 1) / questions.length) * 100) : 0;
  const displayTitle =
    sessionTitle || (trackSlug ? getMockTrackBank(trackSlug)?.title : "") || "Mock interview";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as StoredSession[]);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (step !== "interview") return;
    setSecondsLeft(QUESTION_SECONDS);
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [step, index]);

  const answeredCount = useMemo(
    () =>
      questions.filter((q) => countWords(answers[q.id] || "") >= MIN_WORDS).length,
    [answers, questions],
  );

  const currentWordCount = current ? countWords(answers[current.id] || "") : 0;
  const canProceed = currentWordCount >= MIN_WORDS;

  function startSetup() {
    if (!ready) return;
    if (!user) {
      window.location.href = "/sign-in?next=/aimock";
      return;
    }
    setStep("setup");
    setError(null);
  }

  function beginInterview() {
    if (!trackSlug) {
      setError("Select an interview track to continue.");
      return;
    }
    const bank = getMockTrackBank(trackSlug);
    if (!bank) {
      setError("Track not found.");
      return;
    }
    const picked = pickRandomQuestions(trackSlug, difficulty);
    if (!picked.length) {
      setError("No questions available for this track yet.");
      return;
    }
    setQuestions(picked);
    setSessionTitle(bank.title);
    setAnswers({});
    setIndex(0);
    setReport(null);
    setError(null);
    setStep("interview");
  }

  function saveAnswer(value: string) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  }

  async function finishInterview() {
    if (!questions.length || !trackSlug) return;
    setBusy(true);
    setError(null);
    try {
      const payload = {
        roleId: trackSlug,
        roleTitle: displayTitle,
        questions,
        answers: questions.map((q) => ({
          questionId: q.id,
          answer: answers[q.id] || "",
        })),
      };
      const res = await fetch("/api/aimock/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not generate feedback.");
        return;
      }
      const nextReport = json.report as SessionReport;
      setReport(nextReport);
      const entry: StoredSession = {
        roleId: trackSlug,
        roleTitle: displayTitle,
        overall: nextReport.overall,
        evaluatedAt: json.evaluatedAt || new Date().toISOString(),
      };
      const nextHistory = [entry, ...history].slice(0, 8);
      setHistory(nextHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
      setStep("results");
    } catch {
      setError("Could not reach feedback service.");
    } finally {
      setBusy(false);
    }
  }

  async function goNext() {
    if (!canProceed) {
      setError(`Write at least ${MIN_WORDS} words before continuing (${currentWordCount}/${MIN_WORDS}).`);
      return;
    }
    setError(null);
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    await finishInterview();
  }

  function resetAll() {
    setStep("setup");
    setIndex(0);
    setAnswers({});
    setReport(null);
    setError(null);
  }

  if (step === "landing") {
    return (
      <div className="space-y-14">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              <Brain className="h-3.5 w-3.5" />
              AI Mock Interviews
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-ink md:text-5xl">
              Ace your internship interviews with AI practice
            </h1>
            <p className="mt-4 text-muted md:text-lg">
              Pick any Intern Next internship track. Each session draws a fresh random set of
              field-problem questions with instant feedback.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={startSetup}>
                Practice now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/internship" variant="secondary" size="lg">
                Browse internships
              </Button>
            </div>
            {!user && ready && (
              <p className="mt-3 text-sm text-muted">Sign in required to start a practice session.</p>
            )}
          </div>

          <div className="space-y-4">
            {[
              {
                icon: MessageSquare,
                title: "Problem-focused questions",
                body: "Debugging, trade-offs, and real scenarios — not job-description prompts.",
              },
              {
                icon: Sparkles,
                title: "Random every session",
                body: "Large banks per track so practice stays different each time.",
              },
              {
                icon: Target,
                title: "All interview tracks",
                body: "Frontend, backend, Flutter, ML, marketing, and more.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["01", "Select a track", "Choose from interview domains."],
            ["02", "Answer random questions", "Timed field problems for that track."],
            ["03", "Review your report", "Scores, strengths, and next steps."],
          ].map(([n, t, b]) => (
            <div key={n} className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Step {n}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{t}</h3>
              <p className="mt-2 text-sm text-muted">{b}</p>
            </div>
          ))}
        </section>

        {history.length > 0 && (
          <section className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand" />
              <h2 className="font-display text-xl font-bold text-ink">Recent practice reports</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {history.slice(0, 4).map((h) => (
                <li
                  key={`${h.evaluatedAt}-${h.roleId}`}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm last:border-0"
                >
                  <span className="font-medium text-ink">{h.roleTitle}</span>
                  <span className="text-muted">
                    Score {h.overall} · {new Date(h.evaluatedAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  if (step === "setup") {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <button
          type="button"
          onClick={() => setStep("landing")}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">
            Choose interview track
          </h1>
          <p className="mt-2 text-muted">
            Select a domain. We’ll pull a random set of problem questions from that track.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockTrackBanks.map((track) => {
            const active = trackSlug === track.slug;
            return (
              <button
                key={track.slug}
                type="button"
                onClick={() => setTrackSlug(track.slug)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition",
                  active
                    ? "border-brand bg-brand-soft/60 ring-2 ring-brand/30"
                    : "border-border bg-surface hover:border-brand/40",
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  {track.category}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-ink">{track.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {track.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm font-semibold text-ink">Difficulty</p>
          <p className="mt-1 text-xs text-muted">
            Beginner: 4 questions · Intermediate: 5 · Advanced: 6 (harder pool included)
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["beginner", "intermediate", "advanced"] as MockDifficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold capitalize",
                  difficulty === d
                    ? "bg-brand text-white"
                    : "border border-border bg-background text-muted",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button size="lg" onClick={beginInterview} disabled={!trackSlug}>
          Start mock interview
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (step === "interview" && current) {
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {displayTitle} interview
            </p>
            <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">
              Question {index + 1} of {questions.length}
            </h1>
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold",
              secondsLeft <= 20 ? "bg-danger/15 text-danger" : "bg-brand-soft text-brand",
            )}
          >
            <Clock3 className="h-4 w-4" />
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} />
        </div>

        <article className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {current.type}
            </span>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
              {current.difficulty}
            </span>
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-ink md:text-2xl">
            {current.prompt}
          </h2>
          <p className="mt-3 text-sm text-muted">Hints: {current.hints.join(" · ")}</p>
          <textarea
            value={answers[current.id] || ""}
            onChange={(e) => {
              saveAnswer(e.target.value);
              if (error) setError(null);
            }}
            rows={8}
            placeholder="Type your answer as if speaking to an interviewer…"
            className="mt-5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <p
            className={cn(
              "mt-2 text-xs",
              canProceed ? "text-brand" : "text-muted",
            )}
          >
            {currentWordCount}/{MIN_WORDS} words minimum · {answeredCount}/{questions.length}{" "}
            completed
          </p>
        </article>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex flex-wrap justify-between gap-3">
          <Button
            variant="secondary"
            disabled={index === 0 || busy}
            onClick={() => {
              setError(null);
              setIndex((i) => Math.max(0, i - 1));
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={() => void goNext()} disabled={busy || !canProceed}>
            {busy
              ? "Generating feedback…"
              : index === questions.length - 1
                ? "Submit & get feedback"
                : "Next question"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "results" && report) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Performance report
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">
            {displayTitle} mock interview
          </h1>
          <p className="mt-2 text-muted">
            {report.confidenceLabel} · overall score{" "}
            <span className="font-bold text-brand">{report.overall}/100</span>
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Clarity", report.clarity],
              ["Relevance", report.relevance],
              ["Structure", report.structure],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">{value as number}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Highlights</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {report.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Next practice steps</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {report.nextSteps.map((h) => (
                  <li key={h} className="flex gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-ink">Per-question feedback</h2>
          {questions.map((q, i) => {
            const scored = report.answers.find((a) => a.questionId === q.id);
            if (!scored) return null;
            return (
              <article key={q.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-ink">
                    Q{i + 1}. {q.prompt}
                  </h3>
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                    {scored.overall}/100
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{scored.summary}</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                      Strengths
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-muted">
                      {scored.strengths.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Improve
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-muted">
                      {scored.improvements.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={resetAll}>
            <RotateCcw className="h-4 w-4" />
            Practice again
          </Button>
          <Button variant="secondary" onClick={() => setStep("landing")}>
            Back to overview
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
