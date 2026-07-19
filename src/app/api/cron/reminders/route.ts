import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { maybeSendProgressReminders } from "@/lib/notifications";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const users = await User.find({
      "enrollments.0": { $exists: true },
    }).limit(200);

    let sent = 0;
    for (const user of users) {
      const ok = await maybeSendProgressReminders(user);
      if (ok) sent += 1;
    }

    return NextResponse.json({ ok: true, checked: users.length, sent });
  } catch (error) {
    console.error("cron reminders error", error);
    return NextResponse.json({ error: "Reminder job failed." }, { status: 500 });
  }
}
