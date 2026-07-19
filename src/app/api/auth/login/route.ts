import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import {
  ensureAdminAccount,
  homePathForRoles,
  normalizeRoles,
} from "@/lib/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    await ensureAdminAccount();
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "This account uses Google sign-in. Continue with Google." },
        { status: 401 },
      );
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const roles = normalizeRoles(user.roles, user.role);
    if (!user.roles?.length || user.role !== (roles.includes("admin") && !roles.includes("student") ? "admin" : "student")) {
      user.roles = roles;
      user.role = roles.includes("admin") && !roles.includes("student") ? "admin" : "student";
      await user.save();
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
    console.error("login error", error);
    return NextResponse.json(
      { error: "Could not sign in. Is MongoDB running?" },
      { status: 500 },
    );
  }
}
