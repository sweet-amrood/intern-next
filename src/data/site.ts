export const testimonials = [
  {
    name: "Kashan Soomro",
    city: "Karachi, Pakistan",
    quote:
      "Thanks to Intern Next, I grew my skills here and now I am working as a Flutter Developer in a US company.",
  },
  {
    name: "Rabia Javed",
    city: "Karachi, Pakistan",
    quote:
      "Intern Next is the most practical path for students looking for internships. The projects are tough but market valued.",
  },
  {
    name: "Razaullah Sami",
    city: "KPK, Pakistan",
    quote:
      "Intern Next helped me grow my career. May they keep empowering more students across Pakistan.",
  },
  {
    name: "Naila Rozi",
    city: "Lahore, Pakistan",
    quote:
      "Amazing experience. The way the team supports interns is game-changing. Grateful for the opportunity.",
  },
];

export const partners = [
  "SEE Pakistan",
  "PITB",
  "NICS",
  "Google Cloud",
  "Aptech",
  "Zindigi",
];

export type DashboardTask = {
  id: string;
  title: string;
  module: string;
  due: string;
  status: "todo" | "submitted" | "approved";
  description: string;
};

export const dashboardTasks: DashboardTask[] = [
  {
    id: "t1",
    title: "Setup project repo and README",
    module: "Phase 1 · Foundation",
    due: "2026-07-18",
    status: "approved",
    description: "Initialize the internship project, document goals, and push a clean README.",
  },
  {
    id: "t2",
    title: "Build responsive landing section",
    module: "Phase 2 · Practical Skills",
    due: "2026-07-22",
    status: "submitted",
    description: "Implement a brand-first hero with mobile breakpoints and accessibility basics.",
  },
  {
    id: "t3",
    title: "Integrate API and error states",
    module: "Phase 2 · Practical Skills",
    due: "2026-07-26",
    status: "todo",
    description: "Fetch mock data, handle loading/empty/error UI, and write a short demo script.",
  },
  {
    id: "t4",
    title: "Portfolio case study write-up",
    module: "Phase 3 · Industry Projects",
    due: "2026-08-02",
    status: "todo",
    description: "Document problem, process, decisions, and outcomes for your main project.",
  },
  {
    id: "t5",
    title: "Peer review and final polish",
    module: "Phase 3 · Industry Projects",
    due: "2026-08-08",
    status: "todo",
    description: "Incorporate feedback, fix edge cases, and prepare certificate submission package.",
  },
];

export const certificates = [
  {
    id: "c1",
    title: "Frontend Foundation Badge",
    status: "earned" as const,
    issuedAt: "2026-07-12",
  },
  {
    id: "c2",
    title: "Task Portal Milestone — Phase 1",
    status: "earned" as const,
    issuedAt: "2026-07-15",
  },
  {
    id: "c3",
    title: "Frontend Development Internship Certificate",
    status: "pending" as const,
    issuedAt: null,
  },
];
