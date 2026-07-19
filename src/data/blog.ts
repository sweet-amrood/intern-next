export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "join-whatsapp-community-career-growth",
    title: "Join the Intern Next WhatsApp Community for Career Growth",
    excerpt:
      "Network with peers, get career tips, and stay close to internship openings inside the Intern Next community.",
    category: "Community",
    author: "Intern Next Team",
    date: "2026-07-17",
    readTime: "2 min",
    content: [
      "Building a career is easier when you are surrounded by people solving the same problems. Our WhatsApp community connects students, mentors, and alumni across Pakistan.",
      "Members share opportunities, portfolio feedback, and interview experiences. Ambassadors also post campus event updates and learning challenges.",
      "If you are starting your first internship, join early. Consistency beats perfection — show up, ask questions, and ship small projects every week.",
    ],
  },
  {
    slug: "mastering-your-early-career-pakistan",
    title: "Mastering Your Early Career: Essential Tips for Pakistani Students",
    excerpt:
      "Practical habits for navigating internships, portfolios, and first jobs in Pakistan’s tech market.",
    category: "Career Tips",
    author: "Ayesha Akram",
    date: "2026-07-17",
    readTime: "5 min",
    content: [
      "Early career growth is less about knowing everything and more about proving you can learn fast. Employers hire evidence: projects, clarity, and reliability.",
      "Treat every internship task like a portfolio piece. Write short READMEs, record before/after screenshots, and ask for structured feedback.",
      "Network intentionally. One warm introduction from an ambassador, mentor, or alumni can open more doors than fifty cold applications.",
    ],
  },
  {
    slug: "ai-lms-career-success-guide",
    title: "Mastering the AI LMS for Career Success",
    excerpt:
      "How to use Intern Next learning tools and AI practice features to accelerate job readiness.",
    category: "Career Tips",
    author: "Ayesha Akram",
    date: "2026-07-17",
    readTime: "4 min",
    content: [
      "AI tools are amplifiers. Used well, they help you draft resumes, rehearse interviews, and identify skill gaps faster.",
      "Combine LMS lessons with Task Portal milestones. Theory without shipping stays fragile; shipping without feedback stays random.",
      "Track weekly outcomes: one completed task, one mock interview, one portfolio update. That rhythm compounds.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
