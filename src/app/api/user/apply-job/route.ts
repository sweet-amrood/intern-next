import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { getSession } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const jobId = String(body.id || "").trim();
    const title = String(body.title || "").trim();
    const company = String(body.company || "").trim();

    if (!jobId || !title || !company) {
      return NextResponse.json({ error: "Invalid job payload." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const already = user.appliedJobs.some((j) => j.jobId === jobId);
    if (!already) {
      user.appliedJobs.unshift({
        jobId,
        title,
        company,
        appliedAt: new Date(),
      });
      await user.save();
    }

    return NextResponse.json({ user: serializeUser(user) });
  } catch (error) {
    console.error("apply job error", error);
    return NextResponse.json({ error: "Could not apply to job." }, { status: 500 });
  }
}
