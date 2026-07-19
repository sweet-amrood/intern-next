import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import {
  Track,
  SEATS_PER_SECTION,
  sectionForCount,
} from "@/lib/models/Track";
import { Application } from "@/lib/models/Application";
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
import { sendMail } from "@/lib/mail";
import { enrollmentApprovedEmail } from "@/lib/email-templates";

export async function approveApplicationById(applicationId: string) {
  await connectDB();
  const application = await Application.findById(applicationId);
  if (!application) {
    return { status: 404 as const, error: "Application not found." };
  }

  if (application.status !== "pending") {
    return { status: 400 as const, error: "Application is not pending." };
  }

  const trackMeta = getInternship(application.slug);
  if (!trackMeta) {
    return { status: 404 as const, error: "Track not found." };
  }

  const user = await User.findById(application.userId);
  if (!user) {
    return { status: 404 as const, error: "User not found." };
  }

  user.enrollments = normalizeEnrollments(user);

  if (hasEnrollment(user, application.slug)) {
    application.status = "approved";
    application.reviewedAt = new Date();
    await application.save();
    return { status: 409 as const, error: "User already enrolled in this track." };
  }

  if (!canAddEnrollment(user)) {
    return {
      status: 409 as const,
      error: `User already has ${MAX_ENROLLMENTS} active internships.`,
    };
  }

  let track = await Track.findOne({ slug: application.slug });
  if (!track) {
    track = await Track.create({
      slug: application.slug,
      title: trackMeta.title,
      enrolledCount: 0,
      seatsPerSection: SEATS_PER_SECTION,
    });
  }

  const section = sectionForCount(track.enrolledCount, track.seatsPerSection);
  track.enrolledCount += 1;
  await track.save();

  user.enrollments.push({
    slug: application.slug,
    title: trackMeta.title,
    section,
    enrolledAt: new Date(),
    skills: trackMeta.skills,
    tasks: tasksForTrack(trackMeta.title, application.slug),
    certificates: certificatesForTrack(trackMeta.title, application.slug),
  });
  syncEnrollmentFields(user);
  if (!user.bio) {
    user.bio = `Enrolled in ${user.enrollments.length} track(s)`;
  }
  await user.save();

  application.status = "approved";
  application.reviewedAt = new Date();
  await application.save();

  const enrollment = user.enrollments[user.enrollments.length - 1];
  const nextDue = enrollment?.tasks
    ?.filter((t) => t.status === "todo")
    .map((t) => t.due)
    .sort()[0];
  const mail = enrollmentApprovedEmail(
    user.name,
    trackMeta.title,
    section,
    nextDue,
  );
  void sendMail({ to: user.email, subject: mail.subject, html: mail.html });

  return {
    status: 200 as const,
    data: {
      user: serializeUser(user),
      section,
      message: "Application approved and user enrolled.",
    },
  };
}
