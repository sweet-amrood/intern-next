import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import {
  getSession,
  createSessionToken,
  setSessionCookie,
} from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import {
  normalizeEnrollments,
  syncEnrollmentFields,
} from "@/lib/enrollment-helpers";
import { maybeSendProgressReminders } from "@/lib/notifications";
import {
  ensureAdminAccount,
  homePathForRoles,
  normalizeRoles,
} from "@/lib/admin";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await ensureAdminAccount();
    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const list = normalizeEnrollments(user);
    const needsMigrate =
      list.length > 0 && (!user.enrollments || user.enrollments.length === 0);

    if (list.length > 0) {
      const before = JSON.stringify(
        list.map((e) =>
          (e.certificates || []).map((c) => ({ id: c.id, status: c.status, issuedAt: c.issuedAt })),
        ),
      );
      syncEnrollmentFields(user);
      const after = JSON.stringify(
        (user.enrollments || []).map((e) =>
          (e.certificates || []).map((c) => ({ id: c.id, status: c.status, issuedAt: c.issuedAt })),
        ),
      );
      if (needsMigrate || before !== after) {
        user.markModified("enrollments");
        user.markModified("certificates");
        user.markModified("tasks");
        await user.save();
      }
    } else if (
      !user.enrollmentSlug &&
      (user.internship || (user.tasks && user.tasks.length) || (user.certificates && user.certificates.length))
    ) {
      user.internship = "";
      user.tasks = [];
      user.certificates = [];
      user.enrollmentSection = null;
      user.enrolledAt = null;
      user.enrollments = [];
      await user.save();
    }

    void maybeSendProgressReminders(user);

    const roles = normalizeRoles(user.roles, user.role);
    if (!user.roles?.length) {
      user.roles = roles;
      user.role = roles.includes("admin") && !roles.includes("student") ? "admin" : "student";
      await user.save();
    }

    const role = roles.includes("admin") && !roles.includes("student") ? "admin" : "student";
    const sessionRoles = normalizeRoles(session.roles, session.role);
    const rolesChanged =
      sessionRoles.slice().sort().join(",") !== roles.slice().sort().join(",");

    const response = NextResponse.json({
      user: serializeUser(user),
      redirectTo: homePathForRoles(roles),
    });

    if (rolesChanged || session.role !== role) {
      const token = await createSessionToken({
        userId: user._id.toString(),
        email: user.email,
        role,
        roles,
      });
      setSessionCookie(response, token);
    }

    return response;
  } catch (error) {
    console.error("me error", error);
    return NextResponse.json({ user: null, error: "Session check failed." }, { status: 500 });
  }
}
