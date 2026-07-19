import { getInternship } from "@/data/internships";

export type TaskGuideline = {
  taskBrief: string;
  companyExpectation: string;
  whatYouMustDo: string[];
  acceptanceCriteria: string[];
  deliverables: string[];
  evaluationNotes: string[];
};

type PhaseKey = "t1" | "t2" | "t3" | "t4" | "t5";

type TrackGuideSet = Record<PhaseKey, TaskGuideline>;

function taskKey(taskId: string): PhaseKey {
  const raw = taskId.split(":").pop() || "t1";
  if (raw === "t1" || raw === "t2" || raw === "t3" || raw === "t4" || raw === "t5") {
    return raw;
  }
  return "t1";
}

const guides: Record<string, TrackGuideSet> = {
  "frontend-development": {
    t1: {
      taskBrief:
        "Prepare a professional frontend development workspace and define measurable internship goals for the next 8 weeks.",
      companyExpectation:
        "The company expects you to arrive work-ready: correct tools installed, Git/GitHub habits set, and a written plan that shows you understand how frontend work is delivered in a product team.",
      whatYouMustDo: [
        "Install Node.js LTS, a code editor (VS Code recommended), Git, and a modern browser with DevTools",
        "Create a public GitHub repository named intern-next-frontend-portfolio",
        "Initialize the repo with a README covering: About you, tools installed, weekly goals for 8 weeks",
        "Create a simple starter folder structure (e.g. week-01, notes, assets)",
        "Write 5 measurable goals (example: “Build a responsive landing page with Flexbox/Grid by week 2”)",
        "Push your first commit and verify the repo opens publicly",
      ],
      acceptanceCriteria: [
        "Repo is public and contains a clear README",
        "Tools list is complete and realistic for HTML/CSS/JS/React work",
        "Goals are specific, time-bound, and related to frontend delivery",
        "At least one commit exists with setup notes",
      ],
      deliverables: [
        "GitHub repository URL",
        "README.md with goals and tool list",
        "Optional screenshots of installed tools / VS Code",
      ],
      evaluationNotes: [
        "Mentors check clarity of goals and readiness, not fancy design yet",
        "Missing public repo or empty README = incomplete",
      ],
    },
    t2: {
      taskBrief:
        "Complete guided frontend skill drills that prove you can structure pages, style responsively, and use JavaScript for interaction.",
      companyExpectation:
        "The company expects junior-level proof that you can ship UI pieces independently: clean HTML semantics, responsive CSS, and basic JS/React interactivity without broken layouts.",
      whatYouMustDo: [
        "Build Exercise A: a semantic HTML landing section (nav, hero, features, footer)",
        "Build Exercise B: make that layout fully responsive (mobile → desktop) using Flexbox/Grid",
        "Build Exercise C: add interactivity (e.g. mobile menu toggle, tab switcher, or form validation) with JavaScript or React",
        "Organize each exercise in separate folders with short notes in PRACTICE.md",
        "Take screenshots of desktop and mobile views for each exercise",
        "Push all exercises to your GitHub repo",
      ],
      acceptanceCriteria: [
        "Three distinct exercises are present and runnable/viewable",
        "Layouts do not break on mobile width (~375px)",
        "Interactivity works without console errors",
        "PRACTICE.md explains what you built and what you learned",
      ],
      deliverables: [
        "GitHub repo with exercise folders",
        "PRACTICE.md",
        "Desktop + mobile screenshots",
      ],
      evaluationNotes: [
        "Mentors care about structure and responsiveness more than visual polish",
        "Copy-paste-only submissions without explanation may be rejected",
      ],
    },
    t3: {
      taskBrief:
        "Ship a small but complete frontend mini-project that a product team could demo to stakeholders.",
      companyExpectation:
        "The company expects a finished MVP UI: clear user flow, responsive design, readable code, and documentation so another developer can run it in under 5 minutes.",
      whatYouMustDo: [
        "Choose one mini-project: portfolio site, product landing page, dashboard UI, or task board UI",
        "Implement at least 4 screens/sections with consistent styling",
        "Use React (preferred) or structured HTML/CSS/JS",
        "Ensure mobile responsiveness and basic accessibility (alt text, labels, contrast)",
        "Write README with: project purpose, features, setup, how to run, screenshots",
        "Deploy optionally (Vercel/Netlify) and link the live URL in README",
      ],
      acceptanceCriteria: [
        "Project runs locally with documented steps",
        "Core user flow works end-to-end",
        "UI is responsive and visually coherent",
        "README includes screenshots and feature list",
      ],
      deliverables: [
        "GitHub repo of the mini-project",
        "README + screenshots",
        "Optional live demo link",
      ],
      evaluationNotes: [
        "Incomplete mega-features score lower than a polished small MVP",
        "Broken install/run instructions = major deduction",
      ],
    },
    t4: {
      taskBrief:
        "Document a frontend industry case study: problem, users, constraints, UI decisions, and outcome.",
      companyExpectation:
        "The company expects you to think like a product engineer — not only code, but explain why UI choices were made and how they serve users and business goals.",
      whatYouMustDo: [
        "Pick a case (e.g. redesign a checkout page, build an internship dashboard, improve mobile navigation)",
        "Write CASE-STUDY.md with sections: Problem, Users, Constraints, Research/Assumptions, Solution, UI decisions, Results, Next steps",
        "Include wireframe images or UI screenshots showing before/after or key states",
        "Explain at least 3 trade-offs (e.g. speed vs polish, library vs custom CSS)",
        "Link related code from your mini-project if applicable",
        "Push the case study to GitHub",
      ],
      acceptanceCriteria: [
        "Case study is complete and readable by a hiring manager",
        "Decisions are justified with user/business reasoning",
        "Visual evidence (screens/wireframes) is included",
        "Trade-offs and limitations are stated honestly",
      ],
      deliverables: [
        "CASE-STUDY.md (or PDF)",
        "Supporting images",
        "GitHub link",
      ],
      evaluationNotes: [
        "Generic essays without UI evidence will be rejected",
        "Clarity and structure matter as much as design quality",
      ],
    },
    t5: {
      taskBrief:
        "Polish your frontend portfolio package, apply feedback, and prepare certificate-ready submission.",
      companyExpectation:
        "The company expects production hygiene: cleaned repos, fixed bugs, consistent naming, strong README, and a portfolio that can be shown to clients or hiring partners.",
      whatYouMustDo: [
        "Revisit tasks t1–t4 and list bugs, missing docs, and UI issues",
        "Fix layout bugs, dead links, and console errors",
        "Improve README quality across repos (badges optional, clear setup required)",
        "Create FINAL-PORTFOLIO.md linking setup, exercises, mini-project, and case study",
        "Remove unused files and any secrets/API keys",
        "Submit the polished GitHub package for mentor verification",
      ],
      acceptanceCriteria: [
        "All linked projects open and run",
        "No obvious broken UI states on main flows",
        "FINAL-PORTFOLIO.md is complete",
        "Repos is tidy and professional",
      ],
      deliverables: [
        "Updated GitHub links",
        "FINAL-PORTFOLIO.md",
        "Short changelog of improvements",
      ],
      evaluationNotes: [
        "This task decides certificate readiness",
        "Sloppy final packaging can block approval even if earlier work was good",
      ],
    },
  },

  "backend-development": {
    t1: {
      taskBrief:
        "Set up a backend engineering workspace and define API/database learning goals for the internship.",
      companyExpectation:
        "The company expects you to be ready for server-side work: runtime installed, Git workflow ready, and a plan that shows you understand APIs, databases, and secure basics.",
      whatYouMustDo: [
        "Install Node.js LTS, Git, Postman/Insomnia, and MongoDB (local or Atlas)",
        "Create public repo intern-next-backend-portfolio",
        "Write README with tools, environment versions, and 8-week backend goals",
        "Document how you will structure projects (routes, controllers, models)",
        "Push first commit with setup checklist completed",
      ],
      acceptanceCriteria: [
        "Public repo + README exists",
        "MongoDB/API tools are listed with versions",
        "Goals mention APIs, auth, validation, and deployment basics",
      ],
      deliverables: ["GitHub URL", "README setup + goals", "Optional screenshots of Postman/Mongo"],
      evaluationNotes: ["Readiness and clarity are graded, not production APIs yet"],
    },
    t2: {
      taskBrief:
        "Practice core backend skills: REST endpoints, validation, and database CRUD.",
      companyExpectation:
        "The company expects proof you can build reliable endpoints a frontend team can consume — correct status codes, validation, and basic data persistence.",
      whatYouMustDo: [
        "Create a small Express (or equivalent) API with at least 4 endpoints (CRUD on one resource)",
        "Add request validation and meaningful error responses",
        "Connect MongoDB and persist data for create/read/update/delete",
        "Test all endpoints in Postman and export a collection or screenshot results",
        "Document endpoints in API.md (method, path, body, response)",
        "Push code + docs to GitHub",
      ],
      acceptanceCriteria: [
        "CRUD works end-to-end against the database",
        "Invalid requests return clear errors (not crashes)",
        "API.md is accurate",
        "No hardcoded secrets committed",
      ],
      deliverables: ["GitHub repo", "API.md", "Postman evidence"],
      evaluationNotes: ["Broken DB connection or crashing server = incomplete"],
    },
    t3: {
      taskBrief:
        "Deliver a mini backend service with authentication and one business feature.",
      companyExpectation:
        "The company expects a service that looks like real internship output: auth, protected routes, and one useful domain feature with clean project structure.",
      whatYouMustDo: [
        "Build a mini API (e.g. notes app, internship tracker, task manager)",
        "Implement register/login (JWT or sessions) and protect at least 2 routes",
        "Add one business module beyond auth (create/list/update own resources)",
        "Use env files for secrets (.env.example committed, .env ignored)",
        "Write README with setup, env vars, and example requests",
        "Push and verify another developer can run it",
      ],
      acceptanceCriteria: [
        "Auth flow works",
        "Protected routes reject unauthorized users",
        "Feature module works for authenticated user",
        "README allows local run without guessing",
      ],
      deliverables: ["GitHub repo", "README + .env.example", "Sample requests"],
      evaluationNotes: ["Committed passwords/secrets will fail review"],
    },
    t4: {
      taskBrief:
        "Write a backend case study covering architecture, security choices, and API design decisions.",
      companyExpectation:
        "The company expects you to explain system design clearly — why endpoints, models, and auth choices fit a business problem.",
      whatYouMustDo: [
        "Document Problem → Users → API design → Data model → Auth/security → Trade-offs → Results",
        "Include a simple architecture diagram (image or Mermaid/text)",
        "Explain status codes, validation strategy, and error handling approach",
        "Discuss at least one scalability or security improvement for later",
        "Push CASE-STUDY.md to GitHub",
      ],
      acceptanceCriteria: [
        "Case study is complete and technical",
        "Data model and auth are explained",
        "Trade-offs are realistic",
      ],
      deliverables: ["CASE-STUDY.md", "Diagram", "GitHub link"],
      evaluationNotes: ["UI-only writeups without API/architecture detail are rejected"],
    },
    t5: {
      taskBrief:
        "Harden and polish your backend portfolio for mentor/certificate review.",
      companyExpectation:
        "The company expects production-minded cleanup: stable scripts, docs, no secrets, and a portfolio index of your API work.",
      whatYouMustDo: [
        "Fix bugs from earlier tasks and improve error handling",
        "Ensure npm scripts (dev/start) work",
        "Add FINAL-PORTFOLIO.md linking all backend work",
        "Remove debug logs and unused code",
        "Confirm .gitignore covers .env and node_modules",
      ],
      acceptanceCriteria: [
        "Service starts cleanly",
        "Docs are accurate",
        "Portfolio index is complete",
      ],
      deliverables: ["Updated repos", "FINAL-PORTFOLIO.md", "Changelog"],
      evaluationNotes: ["Certificate readiness depends on this polish pass"],
    },
  },

  "flutter-mobile-app": {
    t1: {
      taskBrief: "Set up Flutter/Dart environment and define mobile internship goals.",
      companyExpectation:
        "The company expects a working Flutter toolchain and a plan for building cross-platform UI with good mobile UX habits.",
      whatYouMustDo: [
        "Install Flutter SDK, Android Studio/VS Code Flutter plugins, and an emulator or physical device",
        "Run flutter doctor and fix critical issues",
        "Create repo intern-next-flutter-portfolio with README goals",
        "Document device/emulator you will use for demos",
        "Push setup notes and flutter doctor summary",
      ],
      acceptanceCriteria: [
        "flutter doctor shows a usable device target",
        "Public repo + goals README exist",
      ],
      deliverables: ["GitHub URL", "flutter doctor output in README", "Goals"],
      evaluationNotes: ["If Flutter cannot run a sample app, task is incomplete"],
    },
    t2: {
      taskBrief: "Practice Flutter UI widgets, navigation, and basic state.",
      companyExpectation:
        "The company expects you to build usable mobile screens with navigation and state — not only static mock UI.",
      whatYouMustDo: [
        "Build 3 practice screens (e.g. list, detail, form)",
        "Implement navigation between screens",
        "Add basic state (setState/Provider/Riverpod — any one)",
        "Capture emulator screenshots",
        "Document widgets used in PRACTICE.md",
      ],
      acceptanceCriteria: [
        "App runs on emulator/device",
        "Navigation and state updates work",
        "Screenshots included",
      ],
      deliverables: ["GitHub project", "PRACTICE.md", "Screenshots"],
      evaluationNotes: ["Crashes on open = incomplete"],
    },
    t3: {
      taskBrief: "Ship a Flutter mini-app with a complete primary user flow.",
      companyExpectation:
        "The company expects a demoable mobile MVP (e.g. habit tracker, notes, internship checklist) with clean UI and README run steps.",
      whatYouMustDo: [
        "Define app purpose and 4+ screens",
        "Implement create/read flow for main data",
        "Add basic validation and empty states",
        "Optional Firebase/local storage for persistence",
        "Write README with run instructions and screenshots",
      ],
      acceptanceCriteria: [
        "Main flow works without crashes",
        "UI is coherent on phone size",
        "README is enough to run the app",
      ],
      deliverables: ["GitHub repo", "README + screenshots"],
      evaluationNotes: ["Focus on UX completeness over many half features"],
    },
    t4: {
      taskBrief: "Document a mobile product case study: UX decisions, platform constraints, and outcomes.",
      companyExpectation:
        "The company expects mobile product thinking: why navigation, state, and UI patterns fit user needs on small screens.",
      whatYouMustDo: [
        "Write CASE-STUDY.md for your mini-app",
        "Cover Problem, Personas, Information architecture, UI decisions, Offline/device constraints, Results",
        "Include screen flow images",
        "Explain at least 3 mobile-specific decisions",
      ],
      acceptanceCriteria: [
        "Case study is detailed and visual",
        "Mobile constraints are addressed",
      ],
      deliverables: ["CASE-STUDY.md", "Flow images", "GitHub link"],
      evaluationNotes: ["Desktop-web case studies without mobile context are rejected"],
    },
    t5: {
      taskBrief: "Polish Flutter portfolio and prepare certificate package.",
      companyExpectation:
        "The company expects a stable demo build, cleaned code, and a portfolio summary suitable for client review.",
      whatYouMustDo: [
        "Fix UI overflow/bugs",
        "Clean warnings where practical",
        "Add FINAL-PORTFOLIO.md",
        "Ensure README run steps still work",
      ],
      acceptanceCriteria: ["App launches and main flow works", "Portfolio index complete"],
      deliverables: ["Updated repo", "FINAL-PORTFOLIO.md"],
      evaluationNotes: ["Demo must be mentor-runnable"],
    },
  },

  "ui-ux-design": {
    t1: {
      taskBrief: "Set up a Figma workspace and define UX research/design goals for the internship.",
      companyExpectation:
        "The company expects organized design files, naming discipline, and a plan that mirrors a real product design process.",
      whatYouMustDo: [
        "Create a Figma account/file for Intern Next UX work",
        "Set up pages: Research, Wireframes, UI, Prototype, Handoff",
        "Write goals for usability, wireframing, prototyping, and design system basics",
        "Share Figma link with view access in README on GitHub",
      ],
      acceptanceCriteria: ["Figma file structure exists", "Goals documented", "Share link works"],
      deliverables: ["Figma link", "GitHub README with goals"],
      evaluationNotes: ["Private unshared files cannot be reviewed"],
    },
    t2: {
      taskBrief: "Practice user flows, low-fi wireframes, and usability notes for one product problem.",
      companyExpectation:
        "The company expects evidence you can map user journeys and wireframe solutions before visual UI.",
      whatYouMustDo: [
        "Pick a problem (e.g. internship apply flow)",
        "Create user flow diagram",
        "Wireframe 5+ key screens in low-fi",
        "Annotate UX decisions and pain points",
        "Export images into GitHub or Figma pages",
      ],
      acceptanceCriteria: ["Flow + wireframes complete", "Annotations are clear"],
      deliverables: ["Figma pages", "Exported images", "PRACTICE notes"],
      evaluationNotes: ["Skipping wireframes and jumping to pretty UI is incomplete"],
    },
    t3: {
      taskBrief: "Deliver a hi-fi UI kit + clickable prototype for a core product flow.",
      companyExpectation:
        "The company expects a prototype stakeholders can click through, with consistent components and visual hierarchy.",
      whatYouMustDo: [
        "Design hi-fi screens for one flow (min 5 screens)",
        "Create reusable components (buttons, inputs, cards)",
        "Build a clickable Figma prototype",
        "Document design tokens (color/type/spacing) briefly",
        "Share prototype link",
      ],
      acceptanceCriteria: ["Prototype is clickable", "Components are consistent", "Flow is complete"],
      deliverables: ["Figma prototype link", "UI screens", "Short design notes"],
      evaluationNotes: ["Static unrelated mockups without flow fail review"],
    },
    t4: {
      taskBrief: "Write a UX case study covering research insights, iterations, and final design rationale.",
      companyExpectation:
        "The company expects portfolio-quality storytelling: problem → research → iterations → solution → impact.",
      whatYouMustDo: [
        "Write CASE-STUDY.md/PDF with full UX narrative",
        "Include research assumptions or short user interview notes",
        "Show before/after or iteration snapshots",
        "Explain accessibility considerations",
      ],
      acceptanceCriteria: ["Narrative is complete", "Iterations shown", "Decisions justified"],
      deliverables: ["Case study", "Visual evidence", "Links"],
      evaluationNotes: ["Pretty screens without process are not enough"],
    },
    t5: {
      taskBrief: "Polish design files for handoff and certificate review.",
      companyExpectation:
        "The company expects tidy layers, named frames, and a handoff-ready package for engineering.",
      whatYouMustDo: [
        "Rename frames/components cleanly",
        "Add handoff notes (spacing, states, assets)",
        "Create FINAL-PORTFOLIO summary with all Figma links",
        "Fix inconsistent styles",
      ],
      acceptanceCriteria: ["Files are organized", "Handoff notes exist", "Portfolio summary complete"],
      deliverables: ["Updated Figma", "FINAL-PORTFOLIO.md"],
      evaluationNotes: ["Messy unnamed layers can block approval"],
    },
  },

  "digital-marketing": {
    t1: {
      taskBrief: "Set up marketing workspace and define campaign learning goals.",
      companyExpectation:
        "The company expects a marketer who plans with metrics: clear goals, channel strategy outline, and organized documentation.",
      whatYouMustDo: [
        "Create repo/docs folder for marketing internship assets",
        "Define ICP (ideal customer profile) for a sample product",
        "Set 8-week goals across SEO, social, content, analytics",
        "List tools you will use (Canva, Search Console concepts, Meta/LinkedIn, GA basics)",
      ],
      acceptanceCriteria: ["ICP documented", "Goals are metric-oriented", "Tool list present"],
      deliverables: ["GitHub/docs link", "Goals + ICP"],
      evaluationNotes: ["Vague goals without metrics are incomplete"],
    },
    t2: {
      taskBrief: "Practice SEO + content + social post planning with measurable KPIs.",
      companyExpectation:
        "The company expects channel execution skills: keyword intent, content briefs, and a social calendar tied to KPIs.",
      whatYouMustDo: [
        "Do keyword research for 10 terms and map intent",
        "Write 1 SEO content brief and 1 sample post/article outline",
        "Create a 2-week social content calendar (min 8 posts)",
        "Define KPIs (CTR, reach, signups, etc.)",
      ],
      acceptanceCriteria: ["Keyword sheet exists", "Calendar is complete", "KPIs defined"],
      deliverables: ["Sheets/docs in repo", "Calendar", "Brief"],
      evaluationNotes: ["Random posts without strategy fail"],
    },
    t3: {
      taskBrief: "Run a mini campaign plan end-to-end (even if simulated) with creatives and tracking plan.",
      companyExpectation:
        "The company expects a campaign package ready for manager approval: objective, creatives, copy, budget logic, and measurement.",
      whatYouMustDo: [
        "Choose campaign objective (awareness/leads)",
        "Create 3 ad creatives + primary copy variants",
        "Write landing message/CTA alignment notes",
        "Define tracking events and weekly reporting template",
      ],
      acceptanceCriteria: ["Full campaign package present", "Creatives + copy included", "Tracking plan clear"],
      deliverables: ["Campaign folder", "Creatives", "Report template"],
      evaluationNotes: ["Missing CTA/measurement plan = incomplete"],
    },
    t4: {
      taskBrief: "Produce a marketing case study with results analysis (real or simulated dataset).",
      companyExpectation:
        "The company expects analytical thinking: what worked, what failed, and what you would optimize next.",
      whatYouMustDo: [
        "Write CASE-STUDY.md with funnel metrics",
        "Analyze at least one channel performance table",
        "Recommend 3 optimizations with expected impact",
      ],
      acceptanceCriteria: ["Analysis is data-based", "Recommendations are actionable"],
      deliverables: ["Case study", "Metrics table"],
      evaluationNotes: ["Opinion-only writeups without numbers fail"],
    },
    t5: {
      taskBrief: "Polish marketing portfolio and reporting pack for certificate review.",
      companyExpectation:
        "The company expects a clean portfolio a growth lead can review quickly.",
      whatYouMustDo: [
        "Organize all docs/creatives",
        "Add FINAL-PORTFOLIO index",
        "Improve clarity of KPIs and outcomes",
      ],
      acceptanceCriteria: ["Portfolio is navigable", "All links work"],
      deliverables: ["FINAL-PORTFOLIO.md", "Updated assets"],
      evaluationNotes: ["Disorganized folders can block approval"],
    },
  },

  "cyber-security": {
    t1: {
      taskBrief: "Set up a defensive security lab workspace and define learning goals.",
      companyExpectation:
        "The company expects safe lab practices, basic networking literacy, and a clear plan for SOC-style defensive skills.",
      whatYouMustDo: [
        "Prepare a lab environment (VM recommended) and document tools (Wireshark, basic Linux, etc.)",
        "Write safety rules: no scanning systems without permission",
        "Define 8-week goals for networking, logs, hardening, incident basics",
        "Create repo intern-next-cyber-portfolio",
      ],
      acceptanceCriteria: ["Lab notes exist", "Ethics/safety statement included", "Goals are defensive-focused"],
      deliverables: ["GitHub README", "Lab setup notes"],
      evaluationNotes: ["Offensive activity on unauthorized targets is grounds for rejection"],
    },
    t2: {
      taskBrief: "Practice networking fundamentals, log review, and vulnerability hygiene checklists.",
      companyExpectation:
        "The company expects practical defensive exercises: understand traffic/logs and apply hardening checklists.",
      whatYouMustDo: [
        "Complete a networking basics worksheet (ports, protocols, OSI/TCP-IP mapping)",
        "Review a sample log set and flag suspicious events (can be provided/sample)",
        "Create a system hardening checklist for a Linux or Windows endpoint",
        "Document findings in PRACTICE.md",
      ],
      acceptanceCriteria: ["Worksheet complete", "Log findings explained", "Checklist is actionable"],
      deliverables: ["PRACTICE.md", "Checklist", "Evidence screenshots"],
      evaluationNotes: ["No evidence of practice = incomplete"],
    },
    t3: {
      taskBrief: "Deliver a mini SOC-style mini-project: detection notes + response playbook for one threat scenario.",
      companyExpectation:
        "The company expects incident-ready documentation: how you detect, triage, contain, and report a threat.",
      whatYouMustDo: [
        "Choose a scenario (phishing, brute force, malware alert)",
        "Write detection signals and triage steps",
        "Create an incident response playbook (detect → contain → eradicate → recover → lessons)",
        "Include a sample report template for managers",
      ],
      acceptanceCriteria: ["Playbook is complete", "Scenario is realistic", "Report template included"],
      deliverables: ["Playbook doc", "Report template", "GitHub link"],
      evaluationNotes: ["Generic copy without scenario detail fails"],
    },
    t4: {
      taskBrief: "Write a security case study on risk assessment and mitigation for a small company system.",
      companyExpectation:
        "The company expects risk-based thinking: assets, threats, likelihood/impact, and prioritized mitigations.",
      whatYouMustDo: [
        "Identify assets and threats for a sample app/company",
        "Create a risk matrix",
        "Propose mitigations with priority and owners",
        "Write CASE-STUDY.md",
      ],
      acceptanceCriteria: ["Risk matrix present", "Mitigations prioritized", "Business impact explained"],
      deliverables: ["Case study", "Risk matrix"],
      evaluationNotes: ["Tool lists without risk analysis are incomplete"],
    },
    t5: {
      taskBrief: "Polish cyber portfolio and finalize certificate package.",
      companyExpectation:
        "The company expects ethical, well-documented defensive portfolio artifacts.",
      whatYouMustDo: [
        "Clean docs and remove any sensitive real credentials",
        "Add FINAL-PORTFOLIO.md",
        "Ensure all scenarios include ethics notes",
      ],
      acceptanceCriteria: ["No secrets", "Portfolio index complete"],
      deliverables: ["FINAL-PORTFOLIO.md", "Updated docs"],
      evaluationNotes: ["Unsafe practices block certification"],
    },
  },

  "data-science": {
    t1: {
      taskBrief: "Set up a Python data science environment and define analysis goals.",
      companyExpectation:
        "The company expects a reproducible environment (Python, Jupyter/Notebooks, pandas) and a plan for cleaning, visualization, and insight delivery.",
      whatYouMustDo: [
        "Install Python, Jupyter/VS Code, pandas, matplotlib/seaborn",
        "Create repo intern-next-data-portfolio",
        "Write environment setup + 8-week goals in README",
        "Prepare a /notebooks folder structure",
      ],
      acceptanceCriteria: ["Environment documented", "Repo structure ready", "Goals are analysis-focused"],
      deliverables: ["GitHub URL", "README"],
      evaluationNotes: ["If notebooks cannot run, later tasks will fail"],
    },
    t2: {
      taskBrief: "Practice data cleaning, EDA, and visualization on a sample dataset.",
      companyExpectation:
        "The company expects clean methodology: handle missing values, explore distributions, and communicate findings with charts.",
      whatYouMustDo: [
        "Choose a public dataset and load it in a notebook",
        "Perform cleaning (nulls, types, duplicates)",
        "Create EDA with at least 4 visualizations",
        "Write findings in markdown cells",
      ],
      acceptanceCriteria: ["Notebook runs top-to-bottom", "Cleaning steps explained", "Charts support insights"],
      deliverables: ["Notebook", "Dataset source link", "Key insights summary"],
      evaluationNotes: ["Charts without interpretation are incomplete"],
    },
    t3: {
      taskBrief: "Deliver a mini data project that answers a business question with clear recommendations.",
      companyExpectation:
        "The company expects insight-to-action: a notebook/report that a manager can use to make a decision.",
      whatYouMustDo: [
        "Define a business question",
        "Analyze data and build supporting visuals",
        "Provide 3 recommendations with evidence",
        "Export a short executive summary (markdown/PDF)",
      ],
      acceptanceCriteria: ["Question is clear", "Recommendations are evidence-based", "Notebook reproducible"],
      deliverables: ["Project notebook", "Executive summary"],
      evaluationNotes: ["Model complexity is optional; clarity is mandatory"],
    },
    t4: {
      taskBrief: "Write a data case study covering methodology, limitations, and business impact.",
      companyExpectation:
        "The company expects transparent analytics: assumptions, bias/limitations, and why the method fits the question.",
      whatYouMustDo: [
        "Document Problem → Data → Method → Insights → Limitations → Impact",
        "Discuss data quality issues faced",
        "Suggest next experiments",
      ],
      acceptanceCriteria: ["Limitations discussed", "Method justified", "Impact stated"],
      deliverables: ["CASE-STUDY.md", "Supporting charts"],
      evaluationNotes: ["Overclaiming results without evidence fails review"],
    },
    t5: {
      taskBrief: "Polish notebooks and package data portfolio for certificate review.",
      companyExpectation:
        "The company expects reproducible notebooks and a clean portfolio index.",
      whatYouMustDo: [
        "Restart/run all notebooks and fix errors",
        "Add FINAL-PORTFOLIO.md",
        "Ensure dataset sources are cited",
      ],
      acceptanceCriteria: ["Notebooks run", "Sources cited", "Portfolio complete"],
      deliverables: ["Updated notebooks", "FINAL-PORTFOLIO.md"],
      evaluationNotes: ["Broken notebooks block approval"],
    },
  },

  "cloud-computing": {
    t1: {
      taskBrief: "Set up cloud learning accounts/tools and define infrastructure goals.",
      companyExpectation:
        "The company expects safe account hygiene, basic cloud vocabulary, and a plan covering compute, storage, networking, and deployment.",
      whatYouMustDo: [
        "Create/prepare AWS free-tier or equivalent learning account (or localcloud tools if restricted)",
        "Enable MFA and document billing alarms if using cloud",
        "Write goals for compute/storage/networking/devops intro",
        "Create repo intern-next-cloud-portfolio",
      ],
      acceptanceCriteria: ["Security hygiene notes present", "Goals documented", "Repo ready"],
      deliverables: ["README", "Account safety checklist"],
      evaluationNotes: ["No production account misuse; keep free-tier safe"],
    },
    t2: {
      taskBrief: "Practice core cloud services: deploy a simple static/app workload and document architecture.",
      companyExpectation:
        "The company expects hands-on service usage with clear architecture notes, not only theory screenshots.",
      whatYouMustDo: [
        "Deploy a simple static site or containerized hello service",
        "Use at least storage + compute/hosting concepts",
        "Document architecture and costs/risks",
        "Capture console screenshots",
      ],
      acceptanceCriteria: ["Workload is reachable/demoable", "Architecture notes exist"],
      deliverables: ["Docs + screenshots", "Repo with IaC/notes if any"],
      evaluationNotes: ["Theory-only submissions incomplete"],
    },
    t3: {
      taskBrief: "Deliver a mini cloud project with CI-lite deployment notes and monitoring basics.",
      companyExpectation:
        "The company expects deployment discipline: repeatable steps, env config, and basic health checks.",
      whatYouMustDo: [
        "Deploy an app with documented repeatable steps",
        "Add basic monitoring/logging notes",
        "Create rollback/rebuild instructions",
      ],
      acceptanceCriteria: ["Deployment steps work", "Monitoring approach documented"],
      deliverables: ["Project docs", "Runbook"],
      evaluationNotes: ["Undocumented click-ops without steps fails"],
    },
    t4: {
      taskBrief: "Write a cloud architecture case study with trade-offs (cost, reliability, security).",
      companyExpectation:
        "The company expects architecture judgment: why services were chosen and what you would change at scale.",
      whatYouMustDo: [
        "Document requirements and architecture diagram",
        "Discuss cost/security/reliability trade-offs",
        "Propose improvements for production",
      ],
      acceptanceCriteria: ["Diagram present", "Trade-offs discussed"],
      deliverables: ["CASE-STUDY.md", "Diagram"],
      evaluationNotes: ["Service name-dropping without rationale fails"],
    },
    t5: {
      taskBrief: "Polish cloud portfolio and clean up resources.",
      companyExpectation:
        "The company expects you to avoid bill surprises: tear down unused resources and package docs cleanly.",
      whatYouMustDo: [
        "Delete/stop unused cloud resources",
        "Confirm billing alarms",
        "Add FINAL-PORTFOLIO.md",
      ],
      acceptanceCriteria: ["Cleanup confirmed", "Portfolio complete"],
      deliverables: ["FINAL-PORTFOLIO.md", "Cleanup checklist"],
      evaluationNotes: ["Leaving expensive resources running is a critical fail"],
    },
  },

  "graphic-designing": {
    t1: {
      taskBrief: "Set up design tool workspace and define branding/visual goals.",
      companyExpectation:
        "The company expects organized source files and goals aligned to brand, social, and print-ready outputs.",
      whatYouMustDo: [
        "Set up Photoshop/Illustrator/Figma (as available)",
        "Create asset folders and naming convention",
        "Define 8-week goals for branding, social creatives, typography",
        "Publish a README with tool list and goals",
      ],
      acceptanceCriteria: ["Folder structure ready", "Goals clear", "Tools listed"],
      deliverables: ["GitHub/Drive index", "Goals doc"],
      evaluationNotes: ["No workspace organization = incomplete"],
    },
    t2: {
      taskBrief: "Practice typography, layout, and social creative formats.",
      companyExpectation:
        "The company expects on-brand creatives with correct dimensions and visual hierarchy.",
      whatYouMustDo: [
        "Design 6 social creatives (mixed sizes)",
        "Create 1 logo exploration sheet (3 concepts)",
        "Document type/color choices",
      ],
      acceptanceCriteria: ["Correct export sizes", "Hierarchy is clear", "Concepts presented"],
      deliverables: ["Export PNGs", "Source files link", "Notes"],
      evaluationNotes: ["Low-effort templates without customization fail"],
    },
    t3: {
      taskBrief: "Deliver a mini brand kit for a fictional/real small business.",
      companyExpectation:
        "The company expects a usable brand package: logo, colors, type, and sample applications.",
      whatYouMustDo: [
        "Create logo + variations",
        "Define color palette and type system",
        "Apply brand to 3 mockups (card, post, poster)",
        "Package a brand PDF/one-pager",
      ],
      acceptanceCriteria: ["Brand kit is consistent", "Mockups included"],
      deliverables: ["Brand kit", "Mockups", "Source files"],
      evaluationNotes: ["Inconsistent styles across mockups fail"],
    },
    t4: {
      taskBrief: "Write a design case study explaining creative direction and feedback iterations.",
      companyExpectation:
        "The company expects process storytelling and rationale behind visual decisions.",
      whatYouMustDo: [
        "Document brief → concepts → critique → final",
        "Show rejected concepts and why",
        "Explain accessibility/contrast considerations",
      ],
      acceptanceCriteria: ["Iterations shown", "Rationale clear"],
      deliverables: ["CASE-STUDY.pdf/md", "Visuals"],
      evaluationNotes: ["Final art without process is incomplete"],
    },
    t5: {
      taskBrief: "Polish exports and prepare graphic design portfolio for certificate review.",
      companyExpectation:
        "The company expects print/digital-ready exports and a clean portfolio index.",
      whatYouMustDo: [
        "Fix resolution/export issues",
        "Normalize naming",
        "Create FINAL-PORTFOLIO index",
      ],
      acceptanceCriteria: ["Exports are correct", "Portfolio navigable"],
      deliverables: ["FINAL-PORTFOLIO", "Final exports"],
      evaluationNotes: ["Blurry/wrong-size exports can block approval"],
    },
  },

  "machine-learning": {
    t1: {
      taskBrief: "Set up ML Python environment and define modeling goals.",
      companyExpectation:
        "The company expects reproducible ML setup and goals covering data prep, training, evaluation, and documentation.",
      whatYouMustDo: [
        "Install Python, Jupyter, numpy, pandas, scikit-learn",
        "Create repo intern-next-ml-portfolio",
        "Write goals for supervised learning projects and evaluation metrics",
      ],
      acceptanceCriteria: ["Environment documented", "Repo ready"],
      deliverables: ["README", "Requirements file"],
      evaluationNotes: ["Missing requirements.txt/environment notes hurts later tasks"],
    },
    t2: {
      taskBrief: "Practice ML pipeline basics: split, train, evaluate a simple model.",
      companyExpectation:
        "The company expects correct experimental method — not just high accuracy claims.",
      whatYouMustDo: [
        "Pick a beginner dataset",
        "Do train/test split",
        "Train at least 2 algorithms",
        "Compare metrics and discuss results",
      ],
      acceptanceCriteria: ["Notebook reproducible", "Metrics compared fairly", "Leakage avoided"],
      deliverables: ["Notebook", "Metrics table"],
      evaluationNotes: ["Training on test data is a critical fail"],
    },
    t3: {
      taskBrief: "Deliver a mini ML project with problem framing, model, and evaluation report.",
      companyExpectation:
        "The company expects a business-relevant ML mini-project with honest evaluation and next steps.",
      whatYouMustDo: [
        "Define prediction problem and success metric",
        "Build baseline + improved model",
        "Error analysis on failures",
        "Write project report",
      ],
      acceptanceCriteria: ["Baseline exists", "Evaluation is rigorous", "Report clear"],
      deliverables: ["Project notebook", "Report"],
      evaluationNotes: ["Accuracy-only reporting without context is weak"],
    },
    t4: {
      taskBrief: "Write an ML case study covering features, metrics, ethics, and limitations.",
      companyExpectation:
        "The company expects responsible ML documentation: bias/limitations and deployment risks.",
      whatYouMustDo: [
        "Document full experiment story",
        "Discuss data bias and ethical risks",
        "Propose monitoring if deployed",
      ],
      acceptanceCriteria: ["Ethics/limitations included", "Metrics justified"],
      deliverables: ["CASE-STUDY.md"],
      evaluationNotes: ["Ignoring ethics/limitations fails senior review standards"],
    },
    t5: {
      taskBrief: "Polish ML portfolio and finalize certificate package.",
      companyExpectation:
        "The company expects clean experiment repos and clear reproduction steps.",
      whatYouMustDo: [
        "Fix notebook errors",
        "Pin dependencies",
        "Add FINAL-PORTFOLIO.md",
      ],
      acceptanceCriteria: ["Reproducible runs", "Portfolio complete"],
      deliverables: ["Updated project", "FINAL-PORTFOLIO.md"],
      evaluationNotes: ["Non-reproducible work blocks approval"],
    },
  },

  "video-editing": {
    t1: {
      taskBrief: "Set up editing software workspace and define content production goals.",
      companyExpectation:
        "The company expects organized media bins, backup habits, and goals for pacing, sound, color, and exports.",
      whatYouMustDo: [
        "Install Premiere/CapCut/DaVinci (any primary NLE)",
        "Create project folder structure (footage, audio, exports, project files)",
        "Define 8-week goals for short-form and narrative edits",
      ],
      acceptanceCriteria: ["Folder structure ready", "Tools listed", "Goals clear"],
      deliverables: ["Setup doc", "Goals"],
      evaluationNotes: ["Disorganized media management fails professional standards"],
    },
    t2: {
      taskBrief: "Practice cutting, pacing, captions, and basic sound design on short videos.",
      companyExpectation:
        "The company expects platform-ready shorts with clean cuts, readable captions, and balanced audio.",
      whatYouMustDo: [
        "Edit 3 short videos (15–60s)",
        "Add captions and basic color correction",
        "Balance voice/music levels",
        "Export platform-correct ratios",
      ],
      acceptanceCriteria: ["3 exports delivered", "Audio is clear", "Captions readable"],
      deliverables: ["Exported videos", "Project notes"],
      evaluationNotes: ["Clipped audio or unreadable captions fail"],
    },
    t3: {
      taskBrief: "Deliver a mini branded video project with story structure and motion basics.",
      companyExpectation:
        "The company expects a complete piece (hook → value → CTA) suitable for social/campaign use.",
      whatYouMustDo: [
        "Write a short script/storyboard",
        "Edit a 45–90s branded video",
        "Add simple motion (lower thirds/transitions) tastefully",
        "Provide thumbnail frame",
      ],
      acceptanceCriteria: ["Story structure clear", "CTA present", "Export quality acceptable"],
      deliverables: ["Final video", "Storyboard/script", "Thumbnail"],
      evaluationNotes: ["Overdecorated chaotic edits score lower than clean storytelling"],
    },
    t4: {
      taskBrief: "Write a video production case study: brief, edit decisions, feedback, final outcome.",
      companyExpectation:
        "The company expects reasoning behind pacing, music, and visual choices tied to audience goals.",
      whatYouMustDo: [
        "Document brief and audience",
        "Explain cut decisions and music choice",
        "Show before/after versions if possible",
      ],
      acceptanceCriteria: ["Decisions justified", "Audience fit explained"],
      deliverables: ["CASE-STUDY.md", "Version links"],
      evaluationNotes: ["Final file without process notes is incomplete"],
    },
    t5: {
      taskBrief: "Polish exports and package video portfolio for certificate review.",
      companyExpectation:
        "The company expects correctly exported finals and an easy-to-review showreel/index.",
      whatYouMustDo: [
        "Fix export settings and loudness",
        "Create a short showreel or ordered portfolio list",
        "Add FINAL-PORTFOLIO.md",
      ],
      acceptanceCriteria: ["Exports play correctly", "Portfolio ordered"],
      deliverables: ["Final exports", "FINAL-PORTFOLIO.md"],
      evaluationNotes: ["Wrong aspect ratio/export errors can block approval"],
    },
  },

  "chatbot-development": {
    t1: {
      taskBrief: "Set up chatbot/NLP tooling and define conversational product goals.",
      companyExpectation:
        "The company expects clear bot scope, tooling readiness, and goals for intents, flows, and handoff UX.",
      whatYouMustDo: [
        "Choose stack (Dialogflow/Botpress/Rasa/custom API + frontend)",
        "Define bot persona and target user jobs-to-be-done",
        "Create repo intern-next-chatbot-portfolio with goals",
      ],
      acceptanceCriteria: ["Stack chosen", "Persona defined", "Goals documented"],
      deliverables: ["README", "Persona doc"],
      evaluationNotes: ["No scope definition = incomplete"],
    },
    t2: {
      taskBrief: "Practice intents, entities, and dialogue flows for a narrow use case.",
      companyExpectation:
        "The company expects a working conversation design with fallback handling — not only happy-path scripts.",
      whatYouMustDo: [
        "Define 8+ intents and sample utterances",
        "Build a flow with branching and fallback",
        "Test confusing user inputs and improve responses",
        "Document flow in PRACTICE.md",
      ],
      acceptanceCriteria: ["Intents covered", "Fallback exists", "Test notes included"],
      deliverables: ["Bot project/export", "PRACTICE.md"],
      evaluationNotes: ["Happy-path-only bots fail review"],
    },
    t3: {
      taskBrief: "Deliver a mini chatbot MVP integrated with a simple backend or webhook action.",
      companyExpectation:
        "The company expects an MVP that completes a real task (FAQ, booking lead, internship Q&A) with measurable success.",
      whatYouMustDo: [
        "Implement MVP conversation for one business goal",
        "Add at least one integration/action (form save, API call, ticket note)",
        "Create test script of 10 conversations",
        "Write README with demo steps",
      ],
      acceptanceCriteria: ["MVP goal completable", "Integration works", "Test script included"],
      deliverables: ["Repo/demo", "Test script", "README"],
      evaluationNotes: ["Demo must be reproducible for mentors"],
    },
    t4: {
      taskBrief: "Write a conversational AI case study covering UX writing, failures, and improvement plan.",
      companyExpectation:
        "The company expects analysis of conversation quality, containment rate ideas, and UX writing quality.",
      whatYouMustDo: [
        "Document bot goals and success metrics",
        "Analyze failure cases from tests",
        "Propose NLU/flow improvements",
        "Discuss handoff to human support",
      ],
      acceptanceCriteria: ["Failure analysis present", "Metrics defined", "Handoff plan included"],
      deliverables: ["CASE-STUDY.md"],
      evaluationNotes: ["Ignoring fallback/human handoff is incomplete"],
    },
    t5: {
      taskBrief: "Polish chatbot MVP and prepare certificate portfolio package.",
      companyExpectation:
        "The company expects stable demo flows, cleaned responses, and a portfolio index.",
      whatYouMustDo: [
        "Fix broken intents/responses",
        "Improve tone consistency",
        "Add FINAL-PORTFOLIO.md",
      ],
      acceptanceCriteria: ["Demo stable", "Tone consistent", "Portfolio complete"],
      deliverables: ["Updated bot", "FINAL-PORTFOLIO.md"],
      evaluationNotes: ["Flaky demos can block approval"],
    },
  },
};

const fallbackGuide: TaskGuideline = {
  taskBrief: "Complete this internship milestone with clear proof of work.",
  companyExpectation:
    "The company expects professional documentation, a public GitHub (or shareable) link, and evidence that you understood and finished the assigned outcome.",
  whatYouMustDo: [
    "Read the task title and description carefully",
    "Produce the required files/project for this milestone",
    "Document what you did and what you learned",
    "Submit GitHub link and optional attachments",
  ],
  acceptanceCriteria: [
    "Deliverables match the task description",
    "Work is reviewable by a mentor",
    "Submission includes GitHub URL",
  ],
  deliverables: ["GitHub URL", "Documentation", "Optional supporting files"],
  evaluationNotes: ["Incomplete or private unreadable work cannot be approved"],
};

export function getTaskGuideline(taskId: string, trackSlug = ""): TaskGuideline {
  const key = taskKey(taskId);
  const slug = trackSlug || taskId.split(":")[0] || "";
  const set = guides[slug];
  if (set?.[key]) return set[key];

  const meta = getInternship(slug);
  if (!meta) return fallbackGuide;

  return {
    ...fallbackGuide,
    taskBrief: `${fallbackGuide.taskBrief} (${meta.title})`,
    companyExpectation: `${fallbackGuide.companyExpectation} This task is part of the ${meta.title} track.`,
  };
}
