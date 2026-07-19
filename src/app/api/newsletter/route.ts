import { NextResponse } from "next/server";
import { companyInbox, sendMail } from "@/lib/mail";
import { newsletterJoinedEmail } from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const joined = newsletterJoinedEmail(email);
    await sendMail({
      to: email,
      subject: joined.subject,
      html: joined.html,
    });

    const inbox = companyInbox();
    if (inbox) {
      void sendMail({
        to: inbox,
        subject: `Newsletter signup: ${email}`,
        html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("newsletter error", error);
    return NextResponse.json({ error: "Could not subscribe." }, { status: 500 });
  }
}
