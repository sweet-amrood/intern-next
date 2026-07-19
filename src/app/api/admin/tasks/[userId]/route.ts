import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { normalizeEnrollments } from "@/lib/enrollment-helpers";

function iso(value?: Date | string | null) {
  if (!value) return null;
  return typeof value === "string" ? value : new Date(value).toISOString();
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const { userId } = await context.params;
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const enrollments = normalizeEnrollments(user).map((e) => {
      const tasks = (e.tasks || []).map((t) => ({
        id: t.id,
        title: t.title,
        module: t.module,
        due: t.due,
        status: t.status,
        description: t.description,
        githubUrl: t.githubUrl || "",
        submissionNote: t.submissionNote || "",
        files: (t.files || []).map((f) => ({
          name: f.name,
          url: f.url,
          size: Number(f.size || 0),
        })),
        submittedAt: iso(t.submittedAt),
        trackSlug: t.trackSlug || e.slug,
      }));
      const submitted = tasks.filter((t) => t.status === "submitted").length;
      const approved = tasks.filter((t) => t.status === "approved").length;
      const todo = tasks.filter((t) => t.status === "todo").length;
      return {
        slug: e.slug,
        title: e.title,
        section: e.section,
        enrolledAt: iso(e.enrolledAt),
        skills: e.skills || [],
        submitted,
        approved,
        todo,
        total: tasks.length,
        tasks,
      };
    });

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      enrollments,
    });
  } catch (error) {
    console.error("admin user tasks error", error);
    return NextResponse.json({ error: "Could not load student tasks." }, { status: 500 });
  }
}
