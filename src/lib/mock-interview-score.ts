import type { MockQuestion } from "@/data/mock-interviews";

export type AnswerScore = {
  questionId: string;
  clarity: number;
  relevance: number;
  structure: number;
  overall: number;
  strengths: string[];
  improvements: string[];
  summary: string;
};

export type SessionReport = {
  overall: number;
  clarity: number;
  relevance: number;
  structure: number;
  confidenceLabel: string;
  answers: AnswerScore[];
  highlights: string[];
  nextSteps: string[];
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasStarSignals(text: string) {
  const t = text.toLowerCase();
  const cues = ["situation", "task", "action", "result", "because", "then", "finally", "outcome"];
  return cues.filter((c) => t.includes(c)).length;
}

function keywordHits(text: string, keywords: string[]) {
  const t = text.toLowerCase();
  return keywords.filter((k) => t.includes(k.toLowerCase())).length;
}

export function scoreAnswer(question: MockQuestion, answer: string): AnswerScore {
  const words = wordCount(answer);
  const hits = keywordHits(answer, question.keywords);
  const star = hasStarSignals(answer);

  let clarity = 35;
  if (words >= 40) clarity += 25;
  else if (words >= 20) clarity += 15;
  else if (words >= 10) clarity += 8;
  if (answer.includes(".") || answer.includes("?")) clarity += 10;
  if (words > 220) clarity -= 12;

  let relevance = 30 + Math.min(45, hits * 9);
  if (words < 8) relevance -= 20;

  let structure = 30;
  if (question.type === "behavioral" || question.type === "situational") {
    structure += Math.min(40, star * 10);
  } else {
    structure += Math.min(35, hits * 7 + (words >= 25 ? 10 : 0));
  }
  if (words >= 30 && words <= 180) structure += 10;

  const overall = clamp(clarity * 0.3 + relevance * 0.4 + structure * 0.3);
  clarity = clamp(clarity);
  relevance = clamp(relevance);
  structure = clamp(structure);

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (hits >= 3) strengths.push("Used role-relevant terminology.");
  if (words >= 40) strengths.push("Answer length shows thoughtful explanation.");
  if (star >= 2) strengths.push("Included narrative structure (context → action → result).");
  if (!strengths.length) strengths.push("You attempted the question — good first step.");

  if (words < 25) improvements.push("Expand with a concrete example and clearer outcome.");
  if (hits < 2) improvements.push(`Cover more of: ${question.hints.join(", ")}.`);
  if ((question.type === "behavioral" || question.type === "situational") && star < 2) {
    improvements.push("Use STAR: Situation, Task, Action, Result.");
  }
  if (words > 200) improvements.push("Tighten the answer — keep it focused under 90 seconds.");
  if (!improvements.length) improvements.push("Add one quantified result to make impact clearer.");

  const summary =
    overall >= 80
      ? "Strong response — clear, relevant, and well structured."
      : overall >= 60
        ? "Solid baseline. Sharpen examples and keywords for a stronger score."
        : "Needs more depth. Rebuild the answer around the hints and a clear outcome.";

  return {
    questionId: question.id,
    clarity,
    relevance,
    structure,
    overall,
    strengths,
    improvements,
    summary,
  };
}

export function buildSessionReport(
  pairs: Array<{ question: MockQuestion; answer: string }>,
): SessionReport {
  const answers = pairs.map(({ question, answer }) => scoreAnswer(question, answer));
  const avg = (key: keyof Pick<AnswerScore, "clarity" | "relevance" | "structure" | "overall">) =>
    answers.length
      ? clamp(answers.reduce((s, a) => s + a[key], 0) / answers.length)
      : 0;

  const overall = avg("overall");
  const clarity = avg("clarity");
  const relevance = avg("relevance");
  const structure = avg("structure");

  const confidenceLabel =
    overall >= 85
      ? "Interview ready"
      : overall >= 70
        ? "Strong progress"
        : overall >= 55
          ? "Developing"
          : "Needs practice";

  const highlights = [
    overall >= 70
      ? "You can communicate ideas with usable structure."
      : "Focus on clearer openings and concrete outcomes.",
    relevance >= 65
      ? "Answers stayed mostly on-role."
      : "Bring more role-specific vocabulary into answers.",
    structure >= 65
      ? "You showed signs of structured storytelling."
      : "Practice STAR stories for behavioral prompts.",
  ];

  const nextSteps = [
    "Re-run the same role and aim for shorter, sharper answers.",
    "Prepare 3 STAR stories (project, conflict, learning).",
    "Record yourself once and check filler words and pace.",
  ];

  return {
    overall,
    clarity,
    relevance,
    structure,
    confidenceLabel,
    answers,
    highlights,
    nextSteps,
  };
}
