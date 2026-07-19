import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark shadow-sm shadow-brand/20",
  secondary:
    "bg-surface text-ink border border-border hover:border-brand/40 hover:bg-brand-soft",
  ghost: "bg-transparent text-ink hover:bg-brand-soft",
  dark: "bg-dark text-white hover:bg-ink-soft border border-dark-border",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

type Base = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type AsButton = Base &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    external?: undefined;
  };

type AsLink = Base & {
  href: string;
  external?: boolean;
};

export function Button(props: AsButton | AsLink) {
  const { children, className, variant = "primary", size = "md" } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as AsButton;
  return (
    <button
      className={classes}
      type={buttonProps.type}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      aria-label={buttonProps["aria-label"]}
    >
      {children}
    </button>
  );
}
