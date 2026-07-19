import { NextResponse } from "next/server";
import { companyInbox, sendMail } from "@/lib/mail";
import {
  contactAutoReplyEmail,
  contactTeamEmail,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const subject = String(body.subject || "General inquiry").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const inbox = companyInbox();
    if (!inbox) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 },
      );
    }

    const team = contactTeamEmail({ name, email, subject, message });
    const teamOk = await sendMail({
      to: inbox,
      subject: team.subject,
      html: team.html,
      replyTo: email,
    });

    if (!teamOk) {
      return NextResponse.json(
        { error: "Could not send your message. Try again shortly." },
        { status: 502 },
      );
    }

    const reply = contactAutoReplyEmail(name);
    void sendMail({
      to: email,
      subject: reply.subject,
      html: reply.html,
    });

    return NextResponse.json({
      ok: true,
      message: "Message sent. We’ll get back to you soon.",
    });
  } catch (error) {
    console.error("contact error", error);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }
}
