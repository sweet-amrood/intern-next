import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import { sendMail } from "@/lib/mail";
import { welcomeSignupEmail } from "@/lib/email-templates";
import { ensureAdminAccount, homePathForRoles } from "@/lib/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!name || !email || password.length < 6) {
      return NextResponse.json(
        { error: "Name, email, and password (min 6 chars) are required." },
        { status: 400 },
      );
    }

    const adminEmail = String(process.env.ADMIN_EMAIL || "")
      .trim()
      .toLowerCase();
    if (adminEmail && email === adminEmail) {
      return NextResponse.json(
        { error: "This email is reserved for the admin account. Sign in instead." },
        { status: 403 },
      );
    }

    await ensureAdminAccount();
    await connectDB();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "student",
      roles: ["student"],
      authProvider: "local",
      googleId: null,
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

    const welcome = welcomeSignupEmail(user.name);
    void sendMail({
      to: user.email,
      subject: welcome.subject,
      html: welcome.html,
    });

    const token = await createSessionToken({
      userId: user._id.toString(),
      email: user.email,
      role: "student",
      roles: ["student"],
    });

    const response = NextResponse.json({
      user: serializeUser(user),
      redirectTo: homePathForRoles(["student"]),
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("signup error", error);
    return NextResponse.json(
      { error: "Could not create account. Is MongoDB running?" },
      { status: 500 },
    );
  }
}
