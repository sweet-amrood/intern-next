import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { buildAdminSnapshot } from "@/lib/admin-data";

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const data = await buildAdminSnapshot();
    return NextResponse.json(data);
  } catch (error) {
    console.error("admin overview error", error);
    return NextResponse.json({ error: "Could not load admin data." }, { status: 500 });
  }
}
