import { getSession, type SessionPayload } from "@/lib/session";
import { connectDB } from "@/lib/db";
import { User, type UserRole } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export type { UserRole };

export function normalizeRoles(
  input?: UserRole[] | UserRole | null,
  legacyRole?: UserRole | null,
): UserRole[] {
  const fromArray = Array.isArray(input)
    ? input.filter((r): r is UserRole => r === "student" || r === "admin")
    : [];
  if (fromArray.length) {
    return Array.from(new Set(fromArray));
  }
  if (legacyRole === "admin") return ["admin"];
  return ["student"];
}

export function hasAdminAccess(roles?: UserRole[] | null) {
  return Boolean(roles?.includes("admin"));
}

export function hasStudentAccess(roles?: UserRole[] | null) {
  return Boolean(roles?.includes("student"));
}

export function hasBothRoles(roles?: UserRole[] | null) {
  return hasAdminAccess(roles) && hasStudentAccess(roles);
}

export function primaryRole(roles?: UserRole[] | null): UserRole {
  return hasAdminAccess(roles) && !hasStudentAccess(roles) ? "admin" : "student";
}

export async function requireAdmin(): Promise<
  | { ok: true; session: SessionPayload }
  | { ok: false; status: number; error: string }
> {
  const session = await getSession();
  if (!session) {
    return { ok: false, status: 401, error: "Please sign in first." };
  }
  const roles = normalizeRoles(session.roles, session.role);
  if (!hasAdminAccess(roles)) {
    return { ok: false, status: 403, error: "Admin access required." };
  }
  return { ok: true, session };
}

export async function ensureAdminAccount() {
  const email = String(process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "");
  if (!email || password.length < 6) return null;

  await connectDB();
  let user = await User.findOne({ email });
  const passwordHash = await bcrypt.hash(password, 8);
  const adminRoles: UserRole[] = ["admin"];

  if (!user) {
    user = await User.create({
      name: "Admin",
      email,
      passwordHash,
      role: "admin",
      roles: adminRoles,
      authProvider: "local",
      googleId: null,
      internship: "",
      enrollmentSlug: "",
      enrollmentSection: null,
      enrolledAt: null,
      enrollments: [],
      skills: [],
      portfolio: "",
      bio: "Platform administrator",
      tasks: [],
      certificates: [],
      appliedJobs: [],
    });
    return user;
  }

  let dirty = false;
  const roles = normalizeRoles(user.roles, user.role);
  if (roles.join(",") !== "admin") {
    user.roles = adminRoles;
    user.role = "admin";
    dirty = true;
  }
  if (!user.passwordHash) {
    user.passwordHash = passwordHash;
    dirty = true;
  } else {
    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      user.passwordHash = passwordHash;
      dirty = true;
    }
  }
  if (dirty) await user.save();
  return user;
}

export function homePathForRoles(roles?: UserRole[] | null) {
  if (hasBothRoles(roles)) return "__select__";
  if (hasAdminAccess(roles)) return "/admin";
  return "/dashboard";
}

export function homePathForRole(role?: string | null) {
  return role === "admin" ? "/admin" : "/dashboard";
}
