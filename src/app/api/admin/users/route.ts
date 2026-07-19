import { NextResponse } from "next/server";
import { requireAdmin, normalizeRoles, hasAdminAccess } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { User, type UserRole } from "@/lib/models/User";
import { createSessionToken, setSessionCookie, getSession } from "@/lib/session";

export async function PATCH(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const body = await request.json();
    const userId = String(body.userId || "").trim();
    const action = String(body.action || "").trim();

    if (!userId || (action !== "grant-admin" && action !== "revoke-admin")) {
      return NextResponse.json(
        { error: "userId and action (grant-admin|revoke-admin) are required." },
        { status: 400 },
      );
    }

    await connectDB();
    const target = await User.findById(userId);
    if (!target) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    let roles = normalizeRoles(target.roles, target.role);

    if (action === "grant-admin") {
      roles = Array.from(new Set<UserRole>([...roles, "student", "admin"]));
    } else {
      const adminCount = await User.countDocuments({
        $or: [{ role: "admin" }, { roles: "admin" }],
      });
      if (adminCount <= 1 && hasAdminAccess(roles)) {
        return NextResponse.json(
          { error: "Cannot remove admin from the last admin account." },
          { status: 400 },
        );
      }
      roles = ["student"];
    }

    target.roles = roles;
    target.role = roles.includes("admin") && !roles.includes("student") ? "admin" : "student";
    await target.save();

    const session = await getSession();
    const response = NextResponse.json({
      ok: true,
      user: {
        id: target._id.toString(),
        name: target.name,
        email: target.email,
        role: target.role,
        roles: target.roles,
      },
    });

    if (session && session.userId === target._id.toString()) {
      const token = await createSessionToken({
        userId: target._id.toString(),
        email: target.email,
        role: target.role,
        roles,
      });
      setSessionCookie(response, token);
    }

    return response;
  } catch (error) {
    console.error("admin user role error", error);
    return NextResponse.json({ error: "Could not update role." }, { status: 500 });
  }
}
