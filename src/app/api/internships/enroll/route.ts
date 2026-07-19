import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import {
  Track,
  SEATS_PER_SECTION,
  sectionForCount,
} from "@/lib/models/Track";
import { getSession } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import {
  certificatesForTrack,
  getInternship,
  tasksForTrack,
} from "@/data/internships";
import {
  canAddEnrollment,
  hasEnrollment,
  normalizeEnrollments,
  syncEnrollmentFields,
  MAX_ENROLLMENTS,
} from "@/lib/enrollment-helpers";

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

    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    user.enrollments = normalizeEnrollments(user);

    if (hasEnrollment(user, slug)) {
      return NextResponse.json(
        {
          error: `Already enrolled in ${trackMeta.title}.`,
          user: serializeUser(user),
        },
        { status: 409 },
      );
    }

    if (!canAddEnrollment(user)) {
      return NextResponse.json(
        {
          error: `Maximum of ${MAX_ENROLLMENTS} concurrent internships reached.`,
          user: serializeUser(user),
        },
        { status: 409 },
      );
    }

    let track = await Track.findOne({ slug });
    if (!track) {
      track = await Track.create({
        slug,
        title: trackMeta.title,
        enrolledCount: 0,
        seatsPerSection: SEATS_PER_SECTION,
      });
    }

    const section = sectionForCount(track.enrolledCount, track.seatsPerSection);
    track.enrolledCount += 1;
    await track.save();

    user.enrollments.push({
      slug,
      title: trackMeta.title,
      section,
      enrolledAt: new Date(),
      skills: trackMeta.skills,
      tasks: tasksForTrack(trackMeta.title, slug),
      certificates: certificatesForTrack(trackMeta.title, slug),
    });
    syncEnrollmentFields(user);
    await user.save();

    return NextResponse.json({
      user: serializeUser(user),
      section,
      seatsPerSection: track.seatsPerSection,
    });
  } catch (error) {
    console.error("enroll error", error);
    return NextResponse.json({ error: "Could not enroll. Try again." }, { status: 500 });
  }
}
