export type CertificateKind = "foundation" | "milestone" | "certificate";

export function getCertificateKind(id: string): CertificateKind {
  const part = (id.includes(":") ? id.split(":").pop() : id) || id;
  const key = part.toLowerCase();
  if (key === "c1") return "foundation";
  if (key === "c2") return "milestone";
  return "certificate";
}

export function isFullCertificate(id: string) {
  return getCertificateKind(id) === "certificate";
}

export function isBadge(id: string) {
  return !isFullCertificate(id);
}

export type CourseCertTheme = {
  accent: string;
  accentDeep: string;
  soft: string;
  ink: string;
  paper: string;
  ribbon: string;
  seal: string;
  fieldLabel: string;
};

const DEFAULT_THEME: CourseCertTheme = {
  accent: "#43a724",
  accentDeep: "#2f7818",
  soft: "#eef8ea",
  ink: "#142018",
  paper: "#f7fbf5",
  ribbon: "#30781a",
  seal: "#43a724",
  fieldLabel: "Software & Product",
};

export const courseCertificateThemes: Record<string, CourseCertTheme> = {
  "frontend-development": {
    ...DEFAULT_THEME,
    accent: "#2563eb",
    accentDeep: "#1d4ed8",
    soft: "#eff6ff",
    paper: "#f8fbff",
    ribbon: "#1e40af",
    seal: "#3b82f6",
    fieldLabel: "Frontend Engineering",
  },
  "backend-development": {
    ...DEFAULT_THEME,
    accent: "#0f766e",
    accentDeep: "#115e59",
    soft: "#f0fdfa",
    paper: "#f7fffd",
    ribbon: "#0f766e",
    seal: "#14b8a6",
    fieldLabel: "Backend Engineering",
  },
  "flutter-mobile-app": {
    ...DEFAULT_THEME,
    accent: "#0284c7",
    accentDeep: "#0369a1",
    soft: "#f0f9ff",
    paper: "#f7fbff",
    ribbon: "#075985",
    seal: "#0ea5e9",
    fieldLabel: "Mobile Engineering",
  },
  "ui-ux-design": {
    ...DEFAULT_THEME,
    accent: "#db2777",
    accentDeep: "#be185d",
    soft: "#fdf2f8",
    paper: "#fff7fb",
    ribbon: "#9d174d",
    seal: "#ec4899",
    fieldLabel: "Product Design",
  },
  "digital-marketing": {
    ...DEFAULT_THEME,
    accent: "#ea580c",
    accentDeep: "#c2410c",
    soft: "#fff7ed",
    paper: "#fffcf8",
    ribbon: "#9a3412",
    seal: "#f97316",
    fieldLabel: "Growth Marketing",
  },
  "cyber-security": {
    ...DEFAULT_THEME,
    accent: "#b91c1c",
    accentDeep: "#991b1b",
    soft: "#fef2f2",
    paper: "#fff8f8",
    ribbon: "#7f1d1d",
    seal: "#ef4444",
    fieldLabel: "Cyber Defense",
  },
  "data-science": {
    ...DEFAULT_THEME,
    accent: "#7c3aed",
    accentDeep: "#6d28d9",
    soft: "#f5f3ff",
    paper: "#faf8ff",
    ribbon: "#5b21b6",
    seal: "#8b5cf6",
    fieldLabel: "Data Science",
  },
  "cloud-computing": {
    ...DEFAULT_THEME,
    accent: "#0369a1",
    accentDeep: "#075985",
    soft: "#f0f9ff",
    paper: "#f7fbff",
    ribbon: "#0c4a6e",
    seal: "#38bdf8",
    fieldLabel: "Cloud Systems",
  },
  "graphic-designing": {
    ...DEFAULT_THEME,
    accent: "#c026d3",
    accentDeep: "#a21caf",
    soft: "#fdf4ff",
    paper: "#fff8ff",
    ribbon: "#86198f",
    seal: "#d946ef",
    fieldLabel: "Visual Design",
  },
  "machine-learning": {
    ...DEFAULT_THEME,
    accent: "#4f46e5",
    accentDeep: "#4338ca",
    soft: "#eef2ff",
    paper: "#f8f9ff",
    ribbon: "#3730a3",
    seal: "#6366f1",
    fieldLabel: "Machine Learning",
  },
  "video-editing": {
    ...DEFAULT_THEME,
    accent: "#e11d48",
    accentDeep: "#be123c",
    soft: "#fff1f2",
    paper: "#fff8f9",
    ribbon: "#9f1239",
    seal: "#fb7185",
    fieldLabel: "Motion & Media",
  },
  "chatbot-development": {
    ...DEFAULT_THEME,
    accent: "#059669",
    accentDeep: "#047857",
    soft: "#ecfdf5",
    paper: "#f6fffb",
    ribbon: "#065f46",
    seal: "#10b981",
    fieldLabel: "Conversational AI",
  },
};

export function getCourseCertificateTheme(slug: string): CourseCertTheme {
  return courseCertificateThemes[slug] || DEFAULT_THEME;
}

export function certificateFileName(courseTitle: string, studentName: string) {
  const safe = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  return `intern-next-${safe(courseTitle)}-${safe(studentName)}.pdf`;
}
