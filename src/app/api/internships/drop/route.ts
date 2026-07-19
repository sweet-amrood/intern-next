import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Track } from "@/lib/models/Track";
import { CourseDrop } from "@/lib/models/CourseDrop";
import { getSession } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import {
  normalizeEnrollments,
  syncEnrollmentFields,
} from "@/lib/enrollment-helpers";

const DROP_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const body = await request.json();
    const reason = String(body.reason || "").trim();
    const slug = String(body.slug || "").trim();

    if (reason.length < 10) {
      return NextResponse.json(
        { error: "Please share a reason (at least 10 characters)." },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    user.enrollments = normalizeEnrollments(user);
    if (user.enrollments.length === 0) {
      return NextResponse.json({ error: "You are not enrolled in any course." }, { status: 400 });
    }

    const target = slug
      ? user.enrollments.find((e) => e.slug === slug)
      : user.enrollments[0];

    if (!target) {
      return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
    }

    const elapsed = Date.now() - new Date(target.enrolledAt).getTime();
    if (elapsed > DROP_WINDOW_MS) {
      return NextResponse.json(
        { error: "Drop window closed. Courses can only be dropped within 24 hours of enrollment." },
        { status: 403 },
      );
    }

    await CourseDrop.create({
      userId: user._id,
      slug: target.slug,
      trackTitle: `${target.title} Internship`,
      section: target.section,
      reason,
      enrolledAt: target.enrolledAt,
      droppedAt: new Date(),
    });

    const track = await Track.findOne({ slug: target.slug });
    if (track && track.enrolledCount > 0) {
      track.enrolledCount -= 1;
      await track.save();
    }

    user.enrollments = user.enrollments.filter((e) => e.slug !== target.slug);
    syncEnrollmentFields(user);
    await user.save();

    return NextResponse.json({
      user: serializeUser(user),
      message: "Course dropped successfully.",
    });
  } catch (error) {
    console.error("drop course error", error);
    return NextResponse.json({ error: "Could not drop course." }, { status: 500 });
  }
}
