export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  postedAt: string;
  description: string;
  requirements: string[];
  tags: string[];
};

export const jobCategories = [
  "All",
  "Web Development",
  "Mobile",
  "Design",
  "Marketing",
  "Data",
  "Security",
  "AI",
] as const;

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Junior Frontend Developer",
    company: "Nexora Labs",
    location: "Karachi · Hybrid",
    type: "Full-time",
    category: "Web Development",
    salary: "PKR 80k–120k",
    postedAt: "2026-07-10",
    description:
      "Join a product team shipping customer-facing dashboards. You will build reusable UI, collaborate with design, and improve performance.",
    requirements: [
      "Solid HTML, CSS, and JavaScript",
      "React fundamentals",
      "Git and collaborative workflows",
      "Portfolio or internship projects preferred",
    ],
    tags: ["React", "TypeScript", "CSS"],
  },
  {
    id: "j2",
    title: "React Intern → Full-time Track",
    company: "BrightStack",
    location: "Lahore · Remote",
    type: "Internship",
    category: "Web Development",
    salary: "Stipend + PPO",
    postedAt: "2026-07-12",
    description:
      "Three-month internship with a path to full-time. Work on production features with mentorship and weekly reviews.",
    requirements: ["React basics", "Willingness to learn", "Good communication"],
    tags: ["React", "Mentorship"],
  },
  {
    id: "j3",
    title: "Flutter Developer",
    company: "AppVista",
    location: "Islamabad · On-site",
    type: "Full-time",
    category: "Mobile",
    salary: "PKR 100k–150k",
    postedAt: "2026-07-08",
    description:
      "Build and maintain consumer mobile apps. Own features end-to-end and ship polished releases.",
    requirements: ["Flutter & Dart", "REST APIs", "Play Store / App Store familiarity"],
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    id: "j4",
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    location: "Remote · Pakistan",
    type: "Contract",
    category: "Design",
    salary: "PKR 70k–110k",
    postedAt: "2026-07-14",
    description:
      "Design web and mobile experiences for SaaS clients. Create wireframes, prototypes, and handoff-ready systems.",
    requirements: ["Figma expertise", "Portfolio of case studies", "Basic HTML/CSS awareness"],
    tags: ["Figma", "Prototyping"],
  },
  {
    id: "j5",
    title: "Digital Marketing Associate",
    company: "GrowthHive",
    location: "Karachi · Hybrid",
    type: "Full-time",
    category: "Marketing",
    salary: "PKR 60k–90k",
    postedAt: "2026-07-11",
    description:
      "Own social calendars, campaign reporting, and content experiments for education and tech brands.",
    requirements: ["Social media ops", "Basic analytics", "Strong written English/Urdu"],
    tags: ["SEO", "Social", "Content"],
  },
  {
    id: "j6",
    title: "Data Analyst",
    company: "InsightGrid",
    location: "Lahore · Hybrid",
    type: "Full-time",
    category: "Data",
    salary: "PKR 90k–130k",
    postedAt: "2026-07-09",
    description:
      "Turn raw datasets into dashboards and insights. Partner with product and growth teams.",
    requirements: ["SQL", "Excel/Sheets", "Python or BI tools", "Clear storytelling"],
    tags: ["SQL", "Python", "Dashboards"],
  },
  {
    id: "j7",
    title: "SOC Analyst (Junior)",
    company: "SecurePeak",
    location: "Islamabad · On-site",
    type: "Full-time",
    category: "Security",
    salary: "PKR 85k–125k",
    postedAt: "2026-07-07",
    description:
      "Monitor alerts, triage incidents, and document findings in a growing security operations team.",
    requirements: ["Networking basics", "Linux familiarity", "Curiosity about threats"],
    tags: ["SOC", "SIEM", "Linux"],
  },
  {
    id: "j8",
    title: "AI Content Engineer Intern",
    company: "PromptForge",
    location: "Remote · Pakistan",
    type: "Internship",
    category: "AI",
    salary: "Stipend",
    postedAt: "2026-07-13",
    description:
      "Prototype LLM-powered tools, evaluate outputs, and help ship internal AI assistants.",
    requirements: ["Python basics", "Prompt experimentation", "Product sense"],
    tags: ["LLM", "Python", "Prompts"],
  },
  {
    id: "j9",
    title: "Backend Node.js Developer",
    company: "CloudMint",
    location: "Karachi · Remote",
    type: "Full-time",
    category: "Web Development",
    salary: "PKR 110k–160k",
    postedAt: "2026-07-06",
    description:
      "Design APIs, improve reliability, and collaborate with frontend on delivery of customer features.",
    requirements: ["Node.js", "MongoDB or Postgres", "REST design", "Testing mindset"],
    tags: ["Node.js", "API", "MongoDB"],
  },
  {
    id: "j10",
    title: "Graphic Designer",
    company: "BrandNorth",
    location: "Multan · Hybrid",
    type: "Part-time",
    category: "Design",
    salary: "PKR 40k–70k",
    postedAt: "2026-07-15",
    description:
      "Create social creatives, pitch decks, and brand assets for startups and agencies.",
    requirements: ["Illustrator/Photoshop", "Typography sense", "Fast iteration"],
    tags: ["Branding", "Social Creatives"],
  },
  {
    id: "j11",
    title: "Machine Learning Intern",
    company: "DataNest PK",
    location: "Lahore · Hybrid",
    type: "Internship",
    category: "Data",
    salary: "Stipend",
    postedAt: "2026-07-05",
    description:
      "Support applied ML projects: feature prep, model training, and evaluation notebooks.",
    requirements: ["Python", "Pandas", "Scikit-learn basics", "Documentation habits"],
    tags: ["ML", "Python", "Notebooks"],
  },
  {
    id: "j12",
    title: "Product Marketing Intern",
    company: "Launchline",
    location: "Remote · Pakistan",
    type: "Internship",
    category: "Marketing",
    salary: "Stipend",
    postedAt: "2026-07-16",
    description:
      "Help craft positioning, landing copy, and launch checklists for SaaS products.",
    requirements: ["Clear writing", "Curiosity about products", "Basic Canva/Figma"],
    tags: ["Copy", "Launches", "Research"],
  },
];

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}
