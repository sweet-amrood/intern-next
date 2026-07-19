import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { getSession } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (typeof body.name === "string" && body.name.trim()) user.name = body.name.trim();
    if (typeof body.bio === "string") user.bio = body.bio;
    if (typeof body.portfolio === "string") user.portfolio = body.portfolio;
    if (typeof body.internship === "string") user.internship = body.internship;
    if (Array.isArray(body.skills)) {
      user.skills = body.skills.map((s: unknown) => String(s).trim()).filter(Boolean);
    }

    await user.save();
    return NextResponse.json({ user: serializeUser(user) });
  } catch (error) {
    console.error("profile update error", error);
    return NextResponse.json({ error: "Could not update profile." }, { status: 500 });
  }
}
