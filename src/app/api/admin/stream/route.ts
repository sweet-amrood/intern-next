import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { buildAdminSnapshot } from "@/lib/admin-data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        if (closed) return;
        try {
          const data = await buildAdminSnapshot();
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        } catch (error) {
          console.error("admin stream error", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "sync failed", updatedAt: new Date().toISOString() })}\n\n`,
            ),
          );
        }
      };

      await send();
      const timer = setInterval(() => {
        void send();
      }, 4000);

      const abort = () => {
        closed = true;
        clearInterval(timer);
        try {
          controller.close();
        } catch {
          /* ignore */
        }
      };

      request.signal.addEventListener("abort", abort);
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
