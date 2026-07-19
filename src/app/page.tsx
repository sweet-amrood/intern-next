import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { InternshipTracks } from "@/components/home/InternshipTracks";
import { TaskPortal } from "@/components/home/TaskPortal";
import { InstructorPortal } from "@/components/home/InstructorPortal";
import { ProfessionalDev } from "@/components/home/ProfessionalDev";
import { AiMockInterviews } from "@/components/home/AiMockInterviews";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AiCareerPath } from "@/components/home/AiCareerPath";
import { Testimonials } from "@/components/home/Testimonials";
import { BottomCta } from "@/components/home/BottomCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <InternshipTracks />
      <TaskPortal />
      <InstructorPortal />
      <ProfessionalDev />
      <AiMockInterviews />
      <HowItWorks />
      <AiCareerPath />
      <Testimonials />
      <BottomCta />
    </>
  );
}
