import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { approveApplicationById } from "@/lib/approve-application";

export async function POST(request: Request) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) {
      return NextResponse.json({ error: gate.error }, { status: gate.status });
    }

    const body = await request.json();
    const applicationId = String(body.applicationId || "").trim();
    if (!applicationId) {
      return NextResponse.json({ error: "applicationId is required." }, { status: 400 });
    }

    const result = await approveApplicationById(applicationId);
    if (result.status !== 200) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json(result.data);
  } catch (error) {
    console.error("approve error", error);
    return NextResponse.json({ error: "Could not approve application." }, { status: 500 });
  }
}
