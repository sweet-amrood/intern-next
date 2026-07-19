import type { Document } from "mongoose";
import { sendMail } from "@/lib/mail";
import {
  progressReminderEmail,
  type ProgressAlert,
} from "@/lib/email-templates";
import { normalizeEnrollments } from "@/lib/enrollment-helpers";
import { User, type EnrollmentDoc, type IUser } from "@/lib/models/User";

const REMINDER_COOLDOWN_MS = 20 * 60 * 60 * 1000;
const DUE_SOON_DAYS = 3;

type UserDoc = Document &
  IUser & {
    _id: { toString: () => string };
    lastReminderAt?: Date | null;
  };

function taskAlerts(enrollment: EnrollmentDoc): ProgressAlert | null {
  const tasks = enrollment.tasks || [];
  if (!tasks.length) return null;

  const now = Date.now();
  const incomplete = tasks.filter((t) => t.status === "todo");
  const approved = tasks.filter((t) => t.status === "approved").length;
  const progress = Math.round((approved / tasks.length) * 100);
  const incompletePct = Math.round((incomplete.length / tasks.length) * 100);

  const dueSoon = incomplete
    .map((t) => {
      const due = new Date(`${t.due}T23:59:59`);
      const ms = due.getTime() - now;
      const days = ms / (24 * 60 * 60 * 1000);
      return {
        title: t.title,
        due: t.due,
        overdue: days < 0,
        days,
      };
    })
    .filter((t) => t.overdue || t.days <= DUE_SOON_DAYS)
    .sort((a, b) => a.days - b.days)
    .slice(0, 5)
    .map(({ title, due, overdue }) => ({ title, due, overdue }));

  if (!dueSoon.length && incompletePct < 40) return null;

  return {
    title: enrollment.title,
    progress,
    incompletePct,
    dueSoon,
  };
}

export function buildProgressAlerts(user: IUser): ProgressAlert[] {
  return normalizeEnrollments(user)
    .map((e) => taskAlerts(e))
    .filter((a): a is ProgressAlert => Boolean(a));
}

export async function maybeSendProgressReminders(user: UserDoc): Promise<boolean> {
  const alerts = buildProgressAlerts(user);
  if (!alerts.length) return false;

  const last = user.lastReminderAt ? new Date(user.lastReminderAt).getTime() : 0;
  if (last && Date.now() - last < REMINDER_COOLDOWN_MS) return false;

  const mail = progressReminderEmail(user.name || "Student", alerts);
  const ok = await sendMail({
    to: user.email,
    subject: mail.subject,
    html: mail.html,
  });

  if (ok) {
    await User.updateOne(
      { _id: user._id },
      { $set: { lastReminderAt: new Date() } },
    );
    user.lastReminderAt = new Date();
  }
  return ok;
}
