"use client";

type IconProps = {
  accent: string;
  accentDeep?: string;
  size?: number;
  className?: string;
  muted?: boolean;
};

function hexAlpha(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function FoundationBadgeIcon({
  accent,
  accentDeep,
  size = 64,
  className,
  muted,
}: IconProps) {
  const deep = accentDeep || accent;
  const id = `fb-${accent.replace("#", "")}`;
  const opacity = muted ? 0.45 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 96"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="35%" stopColor={accent} />
          <stop offset="70%" stopColor={deep} />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M40 4 L68 16 V42 C68 62 54 78 40 88 C26 78 12 62 12 42 V16 Z"
          fill={`url(#${id}-metal)`}
        />
        <path
          d="M40 10 L62 20 V42 C62 58 51 71 40 80 C29 71 18 58 18 42 V20 Z"
          fill={hexAlpha("#0f172a", 0.18)}
        />
        <path
          d="M40 10 L62 20 V30 C50 26 30 26 18 30 V20 Z"
          fill={`url(#${id}-shine)`}
        />
        <circle cx="40" cy="42" r="16" fill={hexAlpha("#fff", 0.16)} stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" />
        <path
          d="M40 30 L43.2 38.4 H52 L44.9 43.5 L47.6 52 L40 46.8 L32.4 52 L35.1 43.5 L28 38.4 H36.8 Z"
          fill="#fff"
        />
      </g>
      <path d="M28 88 H52 L48 94 H32 Z" fill={deep} />
      <path d="M30 88 H50 L47 92 H33 Z" fill={accent} />
    </svg>
  );
}

export function MilestoneBadgeIcon({
  accent,
  accentDeep,
  size = 64,
  className,
  muted,
}: IconProps) {
  const deep = accentDeep || accent;
  const id = `mb-${accent.replace("#", "")}`;
  const opacity = muted ? 0.45 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="40%" stopColor={accent} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`${id}-core`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="45%" stopColor={accent} />
          <stop offset="100%" stopColor={deep} />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.28" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M44 4 L50 18 L65 12 L62 28 L78 32 L66 42 L78 52 L62 56 L65 72 L50 66 L44 80 L38 66 L23 72 L26 56 L10 52 L22 42 L10 32 L26 28 L23 12 L38 18 Z"
          fill={`url(#${id}-ring)`}
        />
        <circle cx="44" cy="42" r="22" fill={`url(#${id}-core)`} stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
        <path
          d="M44 28 L47.5 37.5 H57.5 L49.5 43.2 L52.5 53 L44 47.8 L35.5 53 L38.5 43.2 L30.5 37.5 H40.5 Z"
          fill="#fff"
        />
        <circle cx="44" cy="42" r="26" fill="none" stroke={hexAlpha("#fff", 0.35)} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function CertificateSealIcon({
  accent,
  accentDeep,
  size = 64,
  className,
  muted,
}: IconProps) {
  const deep = accentDeep || accent;
  const id = `cs-${accent.replace("#", "")}`;
  const opacity = muted ? 0.45 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="35%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor={accent} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.28" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <circle cx="44" cy="44" r="34" fill={`url(#${id}-gold)`} />
        <circle cx="44" cy="44" r="28" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
        <circle cx="44" cy="44" r="22" fill={hexAlpha("#0f172a", 0.16)} stroke={hexAlpha("#fff", 0.35)} />
        <path
          d="M44 26 C50 32 56 34 56 42 C56 50 50 54 44 60 C38 54 32 50 32 42 C32 34 38 32 44 26 Z"
          fill="#fff"
          opacity="0.95"
        />
        <path d="M38 44 L42 48 L52 36" fill="none" stroke={deep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function AchievementIcon({
  kind,
  accent,
  accentDeep,
  size = 64,
  muted,
  className,
}: IconProps & { kind: "foundation" | "milestone" | "certificate" }) {
  if (kind === "foundation") {
    return (
      <FoundationBadgeIcon
        accent={accent}
        accentDeep={accentDeep}
        size={size}
        muted={muted}
        className={className}
      />
    );
  }
  if (kind === "milestone") {
    return (
      <MilestoneBadgeIcon
        accent={accent}
        accentDeep={accentDeep}
        size={size}
        muted={muted}
        className={className}
      />
    );
  }
  return (
    <CertificateSealIcon
      accent={accent}
      accentDeep={accentDeep}
      size={size}
      muted={muted}
      className={className}
    />
  );
}
