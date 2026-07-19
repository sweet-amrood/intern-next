import type { Metadata } from "next";
import { InternshipCatalog } from "@/components/internship/InternshipCatalog";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Explore 10+ virtual internship tracks on Intern Next and start building job-ready skills.",
};

export default function InternshipPage() {
  return <InternshipCatalog />;
}
