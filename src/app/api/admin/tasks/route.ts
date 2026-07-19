import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { sendMail } from "@/lib/mail";
import { syncEnrollmentFields } from "@/lib/enrollment-helpers";

export async function PATCH(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const body = await request.json();
    const userId = String(body.userId || "").trim();
    const taskId = String(body.taskId || "").trim();
    const status = String(body.status || "").trim();

    if (!userId || !taskId || (status !== "approved" && status !== "todo")) {
      return NextResponse.json(
        { error: "userId, taskId, and status (approved|todo) are required." },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    let taskTitle = "";
    let updated = false;

    for (const enrollment of user.enrollments || []) {
      const task = enrollment.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = status;
        if (status === "todo") {
          task.submittedAt = null;
        }
        taskTitle = task.title;
        updated = true;
        break;
      }
    }

    if (!updated) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    const earnedBefore = new Set(
      (user.enrollments || [])
        .flatMap((e) => e.certificates || [])
        .filter((c) => c.status === "earned")
        .map((c) => c.id),
    );
    if (!earnedBefore.size && user.certificates?.length) {
      for (const c of user.certificates) {
        if (c.status === "earned") earnedBefore.add(c.id);
      }
    }

    syncEnrollmentFields(user);
    user.markModified("enrollments");
    user.markModified("tasks");
    user.markModified("certificates");
    await user.save();

    const newlyEarned = (user.certificates || []).filter(
      (c) => c.status === "earned" && !earnedBefore.has(c.id),
    );

    if (status === "approved") {
      void sendMail({
        to: user.email,
        subject: `Task approved — ${taskTitle}`,
        html: `<p>Hi ${user.name},</p>
          <p>Your task <strong>${taskTitle}</strong> was approved by Intern Next mentors. Keep going!</p>`,
      });
    }

    for (const cert of newlyEarned) {
      void sendMail({
        to: user.email,
        subject: `You earned: ${cert.title}`,
        html: `<p>Hi ${user.name},</p>
          <p>Congratulations — you unlocked <strong>${cert.title}</strong>.</p>
          <p>Open your dashboard Certificates page to view it.</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin task review error", error);
    return NextResponse.json({ error: "Could not update task." }, { status: 500 });
  }
}
