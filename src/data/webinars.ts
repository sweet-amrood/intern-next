export type Webinar = {
  slug: string;
  title: string;
  speaker: string;
  role: string;
  date: string;
  duration: string;
  status: "upcoming" | "completed" | "live";
  category: string;
  tags: string[];
  description: string;
};

export const webinars: Webinar[] = [
  {
    slug: "digital-baithak-umair-ahmed",
    title: "Digital Baithak: Exploring Career Paths with Umair Ahmed",
    speaker: "Umair Ahmed",
    role: "Career Coach and Industry Expert",
    date: "2026-03-14",
    duration: "1h",
    status: "completed",
    category: "Career Development",
    tags: ["career development", "personal branding", "networking"],
    description:
      "A practical conversation on choosing domains, building credibility, and navigating early tech careers in Pakistan.",
  },
  {
    slug: "digital-baithak-qasim-hassan",
    title: "Digital Baithak: The Future of Career Development with Qasim Hassan",
    speaker: "Qasim Hassan",
    role: "Career Strategist and Coach",
    date: "2026-03-15",
    duration: "1h",
    status: "completed",
    category: "Career Development",
    tags: ["career development", "networking", "digital tools"],
    description:
      "Explore modern career systems, digital leverage, and how students can stay competitive.",
  },
  {
    slug: "successful-career-software-engineering",
    title: "Building a Successful Career in Software Engineering",
    speaker: "Abdullah",
    role: "Senior Software Engineer",
    date: "2026-03-09",
    duration: "1h",
    status: "completed",
    category: "Career Development",
    tags: ["software engineering", "careers", "growth"],
    description:
      "From fundamentals to shipping habits — what actually moves an engineering career forward.",
  },
  {
    slug: "digital-baithak-nasir-hussain",
    title: "Digital Baithak: Navigating Careers ft. Nasir Hussain",
    speaker: "Nasir Hussain",
    role: "Career Strategist and Mentor",
    date: "2026-03-08",
    duration: "1h",
    status: "completed",
    category: "AI & Machine Learning",
    tags: ["career development", "networking", "skills"],
    description:
      "Mentorship-focused session on skill stacking, networks, and long-term career navigation.",
  },
  {
    slug: "ai-interview-masterclass-july",
    title: "AI Interview Masterclass for Interns",
    speaker: "Intern Next Mentors",
    role: "Interview Coaches",
    date: "2026-07-25",
    duration: "90m",
    status: "upcoming",
    category: "Career Development",
    tags: ["interviews", "AI practice", "confidence"],
    description:
      "Live walkthrough of AI mock interviews, feedback loops, and how to convert practice into offers.",
  },
];

export function getWebinar(slug: string) {
  return webinars.find((w) => w.slug === slug);
}
