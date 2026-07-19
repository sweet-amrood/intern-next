import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-mesh flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        That URL doesn&apos;t exist in this rebuild. Try the homepage, internships, or job portal.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/jobs" variant="secondary">
          Job Portal
        </Button>
        <Button href="/internship" variant="secondary">
          Internships
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted">
        Tip: use <Link href="/jobs" className="font-semibold text-brand hover:underline">/jobs</Link>
        , not <code className="text-ink">/jobs/public</code>.
      </p>
    </div>
  );
}
