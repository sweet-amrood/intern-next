export type Internship = {
  id: string;
  title: string;
  slug: string;
  duration: string;
  mode: string;
  category: string;
  description: string;
  skills: string[];
  seatsPerSection: number;
  image: string;
};

export const SEATS_PER_SECTION = 50;

export const internships: Internship[] = [
  {
    id: "1",
    title: "Frontend Development",
    slug: "frontend-development",
    duration: "2 Months",
    mode: "Remote",
    category: "Development",
    description:
      "Build modern interfaces with HTML, CSS, JavaScript, and React. Ship portfolio projects that mirror industry workflows.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/frontend.svg",
  },
  {
    id: "2",
    title: "Backend Development",
    slug: "backend-development",
    duration: "2 Months",
    mode: "Remote",
    category: "Development",
    description:
      "Design APIs, databases, and scalable services. Practice authentication, validation, and deployment fundamentals.",
    skills: ["Node.js", "Express", "MongoDB", "REST"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/backend.svg",
  },
  {
    id: "3",
    title: "Flutter Mobile App",
    slug: "flutter-mobile-app",
    duration: "2 Months",
    mode: "Remote",
    category: "Mobile",
    description:
      "Create cross-platform apps with Flutter and Dart. Focus on UI, state, and publishing-ready polish.",
    skills: ["Flutter", "Dart", "Firebase", "UI"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/flutter.svg",
  },
  {
    id: "4",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    duration: "2 Months",
    mode: "Remote",
    category: "Design",
    description:
      "Master Figma workflows, wireframes, prototypes, and design systems used by product teams.",
    skills: ["Figma", "Wireframing", "Prototyping", "Research"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/uiux.svg",
  },
  {
    id: "5",
    title: "Digital Marketing",
    slug: "digital-marketing",
    duration: "2 Months",
    mode: "Remote",
    category: "Marketing",
    description:
      "Run campaigns across SEO, social, and content. Measure results and build a growth portfolio.",
    skills: ["SEO", "Social Media", "Analytics", "Content"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/marketing.svg",
  },
  {
    id: "6",
    title: "Cyber Security",
    slug: "cyber-security",
    duration: "2 Months",
    mode: "Remote",
    category: "Security",
    description:
      "Learn defensive security practices, threat analysis, and hands-on labs aligned with industry roles.",
    skills: ["Networking", "SOC Basics", "Linux", "Risk"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/security.svg",
  },
  {
    id: "7",
    title: "Data Science",
    slug: "data-science",
    duration: "2 Months",
    mode: "Remote",
    category: "Data",
    description:
      "Work with Python, data cleaning, visualization, and introductory machine learning projects.",
    skills: ["Python", "Pandas", "Visualization", "ML Basics"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/data.svg",
  },
  {
    id: "8",
    title: "Cloud Computing",
    slug: "cloud-computing",
    duration: "2 Months",
    mode: "Remote",
    category: "Cloud",
    description:
      "Explore cloud fundamentals, compute, storage, and deployment patterns used by modern teams.",
    skills: ["AWS Basics", "Linux", "Networking", "DevOps Intro"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/cloud.svg",
  },
  {
    id: "9",
    title: "Graphic Designing",
    slug: "graphic-designing",
    duration: "2 Months",
    mode: "Remote",
    category: "Design",
    description:
      "Produce brand assets, social creatives, and print-ready work using industry design tools.",
    skills: ["Illustrator", "Photoshop", "Branding", "Typography"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/graphic.svg",
  },
  {
    id: "10",
    title: "Machine Learning",
    slug: "machine-learning",
    duration: "2 Months",
    mode: "Remote",
    category: "Data",
    description:
      "Train models, evaluate performance, and document experiments for a job-ready ML portfolio.",
    skills: ["Python", "Scikit-learn", "Numpy", "Evaluation"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/ml.svg",
  },
  {
    id: "11",
    title: "Video Editing",
    slug: "video-editing",
    duration: "2 Months",
    mode: "Remote",
    category: "Media",
    description:
      "Edit narrative and social videos with pacing, color, sound, and export best practices.",
    skills: ["Premiere", "After Effects", "Color", "Audio"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/video.svg",
  },
  {
    id: "12",
    title: "Chatbot Development",
    slug: "chatbot-development",
    duration: "2 Months",
    mode: "Remote",
    category: "AI",
    description:
      "Build conversational agents with intents, flows, and practical deployment scenarios.",
    skills: ["Dialogflow", "NLP Basics", "APIs", "UX Writing"],
    seatsPerSection: SEATS_PER_SECTION,
    image: "/posters/chatbot.svg",
  },
];

export function getInternship(slug: string) {
  return internships.find((i) => i.slug === slug);
}

export function tasksForTrack(title: string, slug = "") {
  const base = title.replace(/ Internship$/i, "");
  const due = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };
  const empty = {
    githubUrl: "",
    files: [] as { name: string; url: string; size: number }[],
    submissionNote: "",
    submittedAt: null as Date | null,
    trackSlug: slug,
  };
  const pid = (id: string) => (slug ? `${slug}:${id}` : id);
  return [
    {
      id: pid("t1"),
      title: `${base}: setup workspace & goals`,
      module: "Phase 1 · Foundation",
      due: due(3),
      status: "todo" as const,
      description: `Set up your ${base} tools, repo/docs, and write clear learning goals.`,
      ...empty,
    },
    {
      id: pid("t2"),
      title: `${base}: core skills practice`,
      module: "Phase 2 · Practical Skills",
      due: due(10),
      status: "todo" as const,
      description: `Complete guided exercises that mirror real ${base} workflows.`,
      ...empty,
    },
    {
      id: pid("t3"),
      title: `${base}: mini project delivery`,
      module: "Phase 2 · Practical Skills",
      due: due(18),
      status: "todo" as const,
      description: "Ship a small project with README, screenshots, and reflection notes.",
      ...empty,
    },
    {
      id: pid("t4"),
      title: `${base}: industry case study`,
      module: "Phase 3 · Industry Projects",
      due: due(28),
      status: "todo" as const,
      description: "Document problem, process, decisions, and outcomes for your main project.",
      ...empty,
    },
    {
      id: pid("t5"),
      title: `${base}: peer review & polish`,
      module: "Phase 3 · Industry Projects",
      due: due(35),
      status: "todo" as const,
      description: "Apply feedback, fix edge cases, and prepare certificate submission package.",
      ...empty,
    },
  ];
}

export function certificatesForTrack(title: string, slug = "") {
  const pid = (id: string) => (slug ? `${slug}:${id}` : id);
  return [
    {
      id: pid("c1"),
      title: `${title} — Foundation Badge`,
      status: "pending" as const,
      issuedAt: null,
      trackSlug: slug,
    },
    {
      id: pid("c2"),
      title: `${title} — Milestone Badge`,
      status: "pending" as const,
      issuedAt: null,
      trackSlug: slug,
    },
    {
      id: pid("c3"),
      title: `${title} Certificate`,
      status: "pending" as const,
      issuedAt: null,
      trackSlug: slug,
    },
  ];
}
