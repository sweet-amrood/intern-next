import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import { sendMail } from "@/lib/mail";
import { welcomeSignupEmail } from "@/lib/email-templates";
import {
  ensureAdminAccount,
  homePathForRoles,
  normalizeRoles,
} from "@/lib/admin";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json(
        { error: "Google sign-in is not configured." },
        { status: 503 },
      );
    }

    const body = await request.json();
    const credential = String(body.credential || "").trim();
    if (!credential) {
      return NextResponse.json({ error: "Missing Google credential." }, { status: 400 });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload.sub || !payload.email_verified) {
      return NextResponse.json({ error: "Google account is not verified." }, { status: 401 });
    }

    const email = payload.email.toLowerCase();
    const name = String(payload.name || email.split("@")[0]).trim();
    const googleId = payload.sub;
    const adminEmail = String(process.env.ADMIN_EMAIL || "")
      .trim()
      .toLowerCase();

    await ensureAdminAccount();
    await connectDB();

    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    });

    let isNew = false;

    if (!user) {
      isNew = true;
      const roles: Array<"student" | "admin"> =
        adminEmail && email === adminEmail ? ["admin"] : ["student"];
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
        passwordHash: null,
        role: roles.includes("admin") && !roles.includes("student") ? "admin" : "student",
        roles,
        internship: "",
        enrollmentSlug: "",
        enrollmentSection: null,
        enrolledAt: null,
        enrollments: [],
        skills: [],
        portfolio: "",
        bio: "",
        tasks: [],
        certificates: [],
        appliedJobs: [],
      });
    } else {
      if (!user.googleId) user.googleId = googleId;
      if (user.passwordHash) user.authProvider = "both";
      else user.authProvider = "google";
      if (!user.name && name) user.name = name;
      if (adminEmail && email === adminEmail) {
        user.roles = ["admin"];
        user.role = "admin";
      } else if (!user.roles?.length) {
        user.roles = normalizeRoles(user.roles, user.role);
      }
      await user.save();
    }

    const roles = normalizeRoles(user.roles, user.role);
    if (isNew && !roles.includes("admin")) {
      const welcome = welcomeSignupEmail(user.name);
      void sendMail({
        to: user.email,
        subject: welcome.subject,
        html: welcome.html,
      });
    }

    const token = await createSessionToken({
      userId: user._id.toString(),
      email: user.email,
      role: roles.includes("admin") && !roles.includes("student") ? "admin" : "student",
      roles,
    });

    const response = NextResponse.json({
      user: serializeUser(user),
      redirectTo: homePathForRoles(roles),
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("google auth error", error);
    return NextResponse.json(
      { error: "Google sign-in failed. Check Client ID and authorized origins." },
      { status: 500 },
    );
  }
}
