import { appUrl } from "@/lib/mail";

function shell(title: string, body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#f3f7f1;font-family:Manrope,Segoe UI,Arial,sans-serif;color:#121212;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f7f1;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2ebe3;">
        <tr><td style="background:#121212;padding:22px 28px;">
          <p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">
            Intern <span style="color:#43a724;">Next</span>
          </p>
          <p style="margin:6px 0 0;font-size:12px;color:#9aab9c;text-transform:uppercase;letter-spacing:0.16em;">${title}</p>
        </td></tr>
        <tr><td style="padding:28px;">${body}</td></tr>
        <tr><td style="padding:0 28px 24px;font-size:12px;color:#5c6b5e;line-height:1.5;">
          Pakistan’s virtual internship platform · Apply · Build · Prove · Launch<br/>
          <a href="${appUrl()}" style="color:#43a724;text-decoration:none;">${appUrl()}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeSignupEmail(name: string) {
  const dashboard = `${appUrl()}/dashboard`;
  const internships = `${appUrl()}/internship`;
  return {
    subject: "Welcome to Intern Next — your student account is ready",
    html: shell(
      "Welcome",
      `<p style="margin:0 0 12px;font-size:18px;font-weight:700;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 14px;line-height:1.6;color:#5c6b5e;">
        Your Intern Next account is live. You can apply to up to 3 internship tracks,
        submit mentor-ready tasks, earn certificates, and use the job portal — all from one dashboard.
      </p>
      <p style="margin:0 0 18px;line-height:1.6;color:#5c6b5e;">
        Next step: browse tracks and apply. We’ll email you when your application is reviewed
        and when task due dates are getting close.
      </p>
      <a href="${internships}" style="display:inline-block;background:#43a724;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;margin-right:8px;">Browse internships</a>
      <a href="${dashboard}" style="display:inline-block;background:#121212;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">Open dashboard</a>`,
    ),
  };
}

export function contactAutoReplyEmail(name: string) {
  return {
    subject: "We received your message — Intern Next",
    html: shell(
      "Contact",
      `<p style="margin:0 0 12px;font-size:18px;font-weight:700;">Thanks ${escapeHtml(name)},</p>
      <p style="margin:0;line-height:1.6;color:#5c6b5e;">
        Your message reached the Intern Next team. We typically reply within one business day.
        For certificates you can also write to issues@internee.pk.
      </p>`,
    ),
  };
}

export function contactTeamEmail(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return {
    subject: `[Contact] ${payload.subject}`,
    html: shell(
      "New contact message",
      `<p style="margin:0 0 8px;"><strong>From:</strong> ${escapeHtml(payload.name)} &lt;${escapeHtml(payload.email)}&gt;</p>
      <p style="margin:0 0 8px;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p style="margin:16px 0 0;white-space:pre-wrap;line-height:1.6;color:#5c6b5e;">${escapeHtml(payload.message)}</p>`,
    ),
  };
}

export function applicationReceivedEmail(name: string, trackTitle: string) {
  return {
    subject: `Application received — ${trackTitle}`,
    html: shell(
      "Application",
      `<p style="margin:0 0 12px;font-size:18px;font-weight:700;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0;line-height:1.6;color:#5c6b5e;">
        We received your application for <strong>${escapeHtml(trackTitle)}</strong>.
        You’ll be informed within 24 hours after review. Hang tight — no action needed right now.
      </p>`,
    ),
  };
}

export function enrollmentApprovedEmail(
  name: string,
  trackTitle: string,
  section: number,
  nextDue?: string,
) {
  const tasksUrl = `${appUrl()}/dashboard/tasks`;
  return {
    subject: `You're in — ${trackTitle} (Section ${section})`,
    html: shell(
      "Enrollment",
      `<p style="margin:0 0 12px;font-size:18px;font-weight:700;">Congrats ${escapeHtml(name)},</p>
      <p style="margin:0 0 14px;line-height:1.6;color:#5c6b5e;">
        Your application for <strong>${escapeHtml(trackTitle)}</strong> is approved.
        You’re enrolled in <strong>Section ${section}</strong>. Open the Task Portal and start Phase 1.
      </p>
      ${
        nextDue
          ? `<p style="margin:0 0 18px;padding:12px 14px;background:#eef8ea;border-radius:12px;color:#30781a;font-size:14px;">
              First due date coming up: <strong>${escapeHtml(nextDue)}</strong>
            </p>`
          : ""
      }
      <a href="${tasksUrl}" style="display:inline-block;background:#43a724;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">Go to tasks</a>`,
    ),
  };
}

export type ProgressAlert = {
  title: string;
  progress: number;
  incompletePct: number;
  dueSoon: Array<{ title: string; due: string; overdue: boolean }>;
};

export function progressReminderEmail(name: string, alerts: ProgressAlert[]) {
  const blocks = alerts
    .map((a) => {
      const dueLines = a.dueSoon
        .map(
          (t) =>
            `<li style="margin:0 0 6px;">${escapeHtml(t.title)} — <strong>${escapeHtml(t.due)}</strong>${
              t.overdue ? ' <span style="color:#dc2626;">(overdue)</span>' : " (due soon)"
            }</li>`,
        )
        .join("");
      return `<div style="margin:0 0 16px;padding:14px 16px;border:1px solid #e2ebe3;border-radius:14px;">
        <p style="margin:0 0 6px;font-weight:800;">${escapeHtml(a.title)}</p>
        <p style="margin:0 0 8px;color:#5c6b5e;font-size:14px;">
          ${a.progress}% complete · ${a.incompletePct}% of tasks still open
        </p>
        ${
          dueLines
            ? `<ul style="margin:0;padding-left:18px;color:#5c6b5e;font-size:14px;">${dueLines}</ul>`
            : `<p style="margin:0;color:#5c6b5e;font-size:14px;">Keep momentum — finish open tasks before deadlines pile up.</p>`
        }
      </div>`;
    })
    .join("");

  return {
    subject: "Internship progress check — finish tasks before time runs out",
    html: shell(
      "Progress reminder",
      `<p style="margin:0 0 12px;font-size:18px;font-weight:700;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;line-height:1.6;color:#5c6b5e;">
        A quick heads-up on your Intern Next internship progress. Complete open tasks before due dates slip.
      </p>
      ${blocks}
      <a href="${appUrl()}/dashboard/tasks" style="display:inline-block;background:#43a724;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">Continue tasks</a>`,
    ),
  };
}

export function newsletterJoinedEmail(email: string) {
  return {
    subject: "You're on the Intern Next newsletter",
    html: shell(
      "Newsletter",
      `<p style="margin:0 0 12px;line-height:1.6;color:#5c6b5e;">
        Thanks for subscribing with <strong>${escapeHtml(email)}</strong>.
        You’ll get internship updates, webinars, and career tips from Intern Next.
      </p>`,
    ),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
