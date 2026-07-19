import Image from "next/image";
import { cn } from "@/lib/cn";

export function BrandLogo({
  className,
  markClassName,
  showWordmark = true,
  priority = false,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("relative h-9 w-9 shrink-0 overflow-hidden rounded-xl", markClassName)}>
        <Image
          src="/logo.svg"
          alt="Intern Next"
          fill
          className="object-contain"
          sizes="36px"
          priority={priority}
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-ink xl:text-xl">
          Intern <span className="text-brand">Next</span>
        </span>
      )}
    </span>
  );
}
