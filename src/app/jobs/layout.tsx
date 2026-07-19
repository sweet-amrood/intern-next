import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Browse tech jobs and internships matched to Intern Next skills.",
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
