import type { Metadata } from "next";
import { MockInterviewApp } from "@/components/aimock/MockInterviewApp";

export const metadata: Metadata = {
  title: "AI Mock Interviews",
  description:
    "Practice role-specific mock interviews with timed questions and instant feedback on Intern Next.",
};

export default function AiMockPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-12 md:py-16">
        <MockInterviewApp />
      </section>
    </div>
  );
}
