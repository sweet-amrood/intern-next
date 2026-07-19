import { NextResponse } from "next/server";
import { getMockTrackBank, type MockQuestion } from "@/data/mock-interviews";
import { buildSessionReport } from "@/lib/mock-interview-score";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const roleId = String(body.roleId || "");
    const roleTitle = String(body.roleTitle || "").trim();
    const answers = Array.isArray(body.answers) ? body.answers : [];
    const sessionQuestions = Array.isArray(body.questions)
      ? (body.questions as MockQuestion[])
      : [];

    const bank = getMockTrackBank(roleId);
    const questionBank: MockQuestion[] =
      sessionQuestions.length > 0 ? sessionQuestions : bank?.questions || [];

    if (!questionBank.length) {
      return NextResponse.json({ error: "Invalid interview session." }, { status: 400 });
    }

    const pairs = answers
      .map((a: { questionId?: string; answer?: string }) => {
        const question = questionBank.find((q) => q.id === String(a.questionId || ""));
        if (!question) return null;
        return { question, answer: String(a.answer || "") };
      })
      .filter(Boolean) as Array<{ question: MockQuestion; answer: string }>;

    if (!pairs.length) {
      return NextResponse.json({ error: "No answers provided." }, { status: 400 });
    }

    const report = buildSessionReport(pairs);
    const title = roleTitle || bank?.title || "Internship track";

    const openaiKey = process.env.OPENAI_API_KEY?.trim();
    if (openaiKey) {
      try {
        const prompt = pairs
          .map(
            (p, i) =>
              `Q${i + 1}: ${p.question.prompt}\nA${i + 1}: ${p.answer.slice(0, 600)}`,
          )
          .join("\n\n");
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            temperature: 0.4,
            messages: [
              {
                role: "system",
                content:
                  "You are an internship mock interview coach for Intern Next. Return 3 short bullet coaching tips (max 18 words each). No preamble.",
              },
              {
                role: "user",
                content: `Track: ${title}\n\n${prompt}`,
              },
            ],
          }),
        });
        if (res.ok) {
          const json = await res.json();
          const text = String(json.choices?.[0]?.message?.content || "");
          const tips = text
            .split("\n")
            .map((l: string) => l.replace(/^[-*\d.)\s]+/, "").trim())
            .filter(Boolean)
            .slice(0, 3);
          if (tips.length) report.nextSteps = tips;
        }
      } catch {
      }
    }

    return NextResponse.json({
      roleId: roleId || bank?.slug || "track",
      roleTitle: title,
      report,
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("aimock evaluate error", error);
    return NextResponse.json({ error: "Could not evaluate session." }, { status: 500 });
  }
}
