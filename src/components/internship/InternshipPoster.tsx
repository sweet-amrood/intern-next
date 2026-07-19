"use client";

import {
  BarChart3,
  Bot,
  Brain,
  Cloud,
  Code2,
  Database,
  Film,
  Layout,
  Palette,
  Server,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const posters: Record<
  string,
  { icon: LucideIcon; label: string; accent: string; soft: string }
> = {
  "frontend-development": {
    icon: Code2,
    label: "Frontend · React · UI",
    accent: "#43A724",
    soft: "#1a3320",
  },
  "backend-development": {
    icon: Server,
    label: "Backend · API · Database",
    accent: "#3db82a",
    soft: "#163024",
  },
  "flutter-mobile-app": {
    icon: Smartphone,
    label: "Flutter · Dart · Mobile",
    accent: "#45c02a",
    soft: "#163528",
  },
  "ui-ux-design": {
    icon: Layout,
    label: "UI/UX · Figma · Prototype",
    accent: "#43A724",
    soft: "#1f3320",
  },
  "digital-marketing": {
    icon: BarChart3,
    label: "Marketing · SEO · Growth",
    accent: "#4caf30",
    soft: "#1d3522",
  },
  "cyber-security": {
    icon: Shield,
    label: "Security · SOC · Defense",
    accent: "#43A724",
    soft: "#1a2c20",
  },
  "data-science": {
    icon: Database,
    label: "Data · Python · Analytics",
    accent: "#3db82a",
    soft: "#173226",
  },
  "cloud-computing": {
    icon: Cloud,
    label: "Cloud · Compute · Deploy",
    accent: "#45c02a",
    soft: "#163528",
  },
  "graphic-designing": {
    icon: Palette,
    label: "Graphic · Brand · Visual",
    accent: "#43A724",
    soft: "#203520",
  },
  "machine-learning": {
    icon: Brain,
    label: "ML · Models · Training",
    accent: "#3db82a",
    soft: "#183226",
  },
  "video-editing": {
    icon: Film,
    label: "Video · Edit · Motion",
    accent: "#4caf30",
    soft: "#1c3224",
  },
  "chatbot-development": {
    icon: Bot,
    label: "Chatbot · NLP · AI Flows",
    accent: "#43A724",
    soft: "#173528",
  },
};

function slugFromSrc(src: string, alt: string) {
  const fromPath = src.match(/\/posters\/([^/.]+)/)?.[1];
  if (fromPath) {
    const map: Record<string, string> = {
      frontend: "frontend-development",
      backend: "backend-development",
      flutter: "flutter-mobile-app",
      uiux: "ui-ux-design",
      marketing: "digital-marketing",
      security: "cyber-security",
      data: "data-science",
      cloud: "cloud-computing",
      graphic: "graphic-designing",
      ml: "machine-learning",
      video: "video-editing",
      chatbot: "chatbot-development",
    };
    return map[fromPath] || fromPath;
  }
  return alt.toLowerCase().replace(/\s+/g, "-").replace(/internship/g, "").replace(/-+/g, "-").trim();
}

export function InternshipPoster({
  src,
  alt,
  className,
  slug,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  slug?: string;
}) {
  const key = slug || slugFromSrc(src, alt);
  const config = posters[key] || {
    icon: Code2,
    label: alt,
    accent: "#43A724",
    soft: "#1a3320",
  };
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden p-4",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, #0f1a12 0%, ${config.soft} 55%, #0d1510 100%)`,
      }}
      role="img"
      aria-label={alt}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full opacity-30"
        style={{ background: config.accent }}
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full opacity-20"
        style={{ background: config.accent }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span
          className="rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: config.accent }}
        >
          Track
        </span>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white"
          style={{ boxShadow: `0 0 0 1px ${config.accent}33` }}
        >
          <Icon className="h-6 w-6" style={{ color: config.accent }} />
        </div>
      </div>

      <div className="relative z-10">
        <p className="font-display text-lg font-bold leading-tight text-white md:text-xl">
          {alt.replace(/ Internship$/i, "")}
        </p>
        <p className="mt-1 text-xs font-medium" style={{ color: config.accent }}>
          {config.label}
        </p>
        <div className="mt-3 flex gap-1.5">
          {[0.35, 0.55, 0.8].map((op) => (
            <span
              key={op}
              className="h-1.5 flex-1 rounded-full"
              style={{ background: config.accent, opacity: op }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
