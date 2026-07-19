import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Application } from "@/lib/models/Application";
import { User } from "@/lib/models/User";
import { getSession } from "@/lib/session";
import { getInternship } from "@/data/internships";
import {
  canAddEnrollment,
  hasEnrollment,
  normalizeEnrollments,
  MAX_ENROLLMENTS,
} from "@/lib/enrollment-helpers";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    await connectDB();
    const apps = await Application.find({ userId: session.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      applications: apps.map((a) => ({
        id: String(a._id),
        slug: a.slug,
        trackTitle: a.trackTitle,
        status: a.status,
        fullName: a.fullName,
        email: a.email,
        phone: a.phone,
        university: a.university,
        semester: a.semester,
        city: a.city,
        createdAt:
          "createdAt" in a && a.createdAt
            ? new Date(a.createdAt as Date).toISOString()
            : undefined,
      })),
    });
  } catch (error) {
    console.error("applications list error", error);
    return NextResponse.json({ error: "Could not load applications." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const body = await request.json();
    const slug = String(body.slug || "").trim();
    const trackMeta = getInternship(slug);
    if (!trackMeta) {
      return NextResponse.json({ error: "Internship track not found." }, { status: 404 });
    }

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const university = String(body.university || "").trim();
    const address = String(body.address || "").trim();
    const semester = String(body.semester || "").trim();
    const city = String(body.city || "").trim();
    const experience = String(body.experience || "").trim();
    const portfolio = String(body.portfolio || "").trim();
    const linkedin = String(body.linkedin || "").trim();
    const motivation = String(body.motivation || "").trim();

    if (!fullName || !email || !phone || !university || !address || !semester || !city) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (hasEnrollment(user, slug)) {
      return NextResponse.json(
        { error: "You are already enrolled in this internship." },
        { status: 409 },
      );
    }

    const enrollments = normalizeEnrollments(user);
    const pendingCount = await Application.countDocuments({
      userId: user._id,
      status: "pending",
    });

    if (enrollments.length + pendingCount >= MAX_ENROLLMENTS) {
      return NextResponse.json(
        {
          error: `You can hold at most ${MAX_ENROLLMENTS} internships at once (including pending applications).`,
        },
        { status: 409 },
      );
    }

    if (!canAddEnrollment(user) && pendingCount === 0) {
      return NextResponse.json(
        { error: `Maximum of ${MAX_ENROLLMENTS} concurrent internships reached.` },
        { status: 409 },
      );
    }

    const existingPendingSame = await Application.findOne({
      userId: user._id,
      slug,
      status: "pending",
    });
    if (existingPendingSame) {
      return NextResponse.json(
        {
          error: `You already have a pending application for ${existingPendingSame.trackTitle}.`,
          applicationId: existingPendingSame._id.toString(),
        },
        { status: 409 },
      );
    }

    const application = await Application.create({
      userId: user._id,
      slug,
      trackTitle: trackMeta.title,
      fullName,
      email,
      phone,
      university,
      address,
      semester,
      city,
      experience,
      portfolio,
      linkedin,
      motivation,
      status: "pending",
    });

    const { sendMail } = await import("@/lib/mail");
    const { applicationReceivedEmail } = await import("@/lib/email-templates");
    const mail = applicationReceivedEmail(fullName, trackMeta.title);
    void sendMail({ to: email, subject: mail.subject, html: mail.html });

    return NextResponse.json({
      application: {
        id: application._id.toString(),
        slug: application.slug,
        trackTitle: application.trackTitle,
        status: application.status,
      },
      message:
        "Your request has been submitted. You will be informed within 24 hours.",
    });
  } catch (error) {
    console.error("application create error", error);
    return NextResponse.json({ error: "Could not submit application." }, { status: 500 });
  }
}
