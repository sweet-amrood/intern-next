import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { approveApplicationById } from "@/lib/approve-application";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const body = await request.json();
    const applicationId = String(body.applicationId || "").trim();
    const action = String(body.action || "").trim();

    if (!applicationId || (action !== "approve" && action !== "reject")) {
      return NextResponse.json(
        { error: "applicationId and action (approve|reject) are required." },
        { status: 400 },
      );
    }

    if (action === "approve") {
      const result = await approveApplicationById(applicationId);
      if (result.status !== 200) {
        return NextResponse.json({ error: result.error }, { status: result.status });
      }
      return NextResponse.json(result.data);
    }

    await connectDB();
    const application = await Application.findById(applicationId);
    if (!application) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }
    if (application.status !== "pending") {
      return NextResponse.json({ error: "Application is not pending." }, { status: 400 });
    }

    application.status = "rejected";
    application.reviewedAt = new Date();
    await application.save();

    void sendMail({
      to: application.email,
      subject: `Application update — ${application.trackTitle}`,
      html: `<p>Hi ${application.fullName},</p>
        <p>Your application for <strong>${application.trackTitle}</strong> was not approved at this time.
        You can apply to another track from your Intern Next dashboard.</p>`,
    });

    return NextResponse.json({ ok: true, status: "rejected" });
  } catch (error) {
    console.error("admin application action error", error);
    return NextResponse.json({ error: "Could not update application." }, { status: 500 });
  }
}
