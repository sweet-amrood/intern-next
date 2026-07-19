const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, PageBreak, LevelFormat } = require("docx");
const fs = require("fs");
const path = require("path");

const brand = "Intern Next";
const thin = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const borders = { top: thin, bottom: thin, left: thin, right: thin };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        size: opts.size || 22,
        font: "Calibri",
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color || "222222",
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32, font: "Calibri", color: "1B5E20" })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, size: 26, font: "Calibri", color: "2E7D32" })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Calibri", color: "333333" })],
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360 },
    children: [new TextRun({ text: `•  ${text}`, size: 21, font: "Calibri" })],
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    borders,
    width: { size: opts.width || 2340, type: WidthType.DXA },
    shading: opts.header ? { fill: "E8F5E9" } : undefined,
    children: [
      new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({
            text,
            bold: !!opts.header || !!opts.bold,
            size: 18,
            font: "Calibri",
          }),
        ],
      }),
    ],
  });
}

function twoColTable(rows, widths = [2400, 6960]) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, i) =>
      new TableRow({
        children: [
          cell(r[0], { width: widths[0], header: i === 0, bold: i === 0 }),
          cell(r[1], { width: widths[1], header: i === 0 }),
        ],
      }),
    ),
  });
}

function threeColTable(rows, widths = [2800, 2800, 3760]) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, i) =>
      new TableRow({
        children: [
          cell(r[0], { width: widths[0], header: i === 0 }),
          cell(r[1], { width: widths[1], header: i === 0 }),
          cell(r[2], { width: widths[2], header: i === 0 }),
        ],
      }),
    ),
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        styles: [{ id: "Normal", run: { font: "Calibri", size: 22 } }],
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 720, right: 720 },
        },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [new TextRun({ text: brand.toUpperCase(), bold: true, size: 48, font: "Calibri", color: "2E7D32" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [new TextRun({ text: "Project Documentation", bold: true, size: 36, font: "Calibri" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Features · Setup & Usage · Component Development · APIs · Testing · Maintenance",
              size: 20,
              font: "Calibri",
              color: "555555",
              italics: true,
            }),
          ],
        }),
        p(`Platform: Pakistan's virtual internship platform (brand: ${brand})`),
        p("Document type: Submission-level technical & user documentation"),
        p("Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MongoDB · Framer Motion"),
        p(`Generated for internship Frontend / Full-stack submission — ${new Date().toLocaleDateString("en-GB")}`),

        new Paragraph({ children: [new PageBreak()] }),

        h1("1. Introduction"),
        p(
          `${brand} is a full-stack web application that helps students discover virtual internship tracks, apply and enroll, complete mentor-reviewed tasks, earn badges and certificates, practice AI mock interviews, and apply to jobs — all from one dashboard. Admins review applications and task submissions in a live console.`,
        ),
        p(
          "This document describes project features, how to install and use the system, how React components are structured and reused, API surfaces, client-side validation, animations, testing, and maintenance notes.",
        ),

        h2("1.1 Objectives"),
        bullet("Deliver a responsive, production-style internship platform UI in React/Next.js."),
        bullet("Support authenticated student and admin journeys with MongoDB persistence."),
        bullet("Provide interactive UI (forms, sliders, animations) with client-side validation."),
        bullet("Document components and workflows for handover and internship assessment."),

        h2("1.2 Scope"),
        bullet("Marketing pages, internship catalog, job portal, blog, webinars, AI tools pages."),
        bullet("Auth (email/password + Google), student dashboard, admin console."),
        bullet("Task portal, certificates/badges PDF download, contact & newsletter email."),
        bullet("Out of scope for marketing CMS: blog/jobs/webinars content is file-based under src/data."),

        h1("2. Technology Stack"),
        twoColTable([
          ["Layer", "Technology"],
          ["Framework", "Next.js 15 App Router + React 19 + TypeScript"],
          ["Styling", "Tailwind CSS v4 + shared CSS variables (brand green)"],
          ["Motion", "Framer Motion (fade/stagger/scroll + carousel)"],
          ["Database", "MongoDB + Mongoose"],
          ["Auth", "JWT (jose) in httpOnly cookie, bcryptjs, Google Sign-In"],
          ["Email", "Nodemailer (SMTP)"],
          ["Certificates", "html2canvas + jsPDF"],
          ["Testing", "Vitest + React Testing Library"],
          ["Icons", "Lucide React"],
        ]),

        h1("3. System Features"),

        h2("3.1 Public / Marketing"),
        bullet("Homepage sections: Hero, Partners, Internship Tracks, Task Portal, Instructor Portal, Professional Development, AI Mock Interviews, How It Works, AI Career Path, Testimonials carousel, Bottom CTA."),
        bullet("Internship catalog with posters, detail pages, and apply flow."),
        bullet("Job portal with search/filter and job detail pages."),
        bullet("Blog, webinars, graduate program, startup journey, student ambassadors pages."),
        bullet("Contact form and floating Support Chat widget."),
        bullet("Light/dark theme toggle with persisted preference."),

        h2("3.2 Authentication"),
        bullet("Sign up / Sign in with client-side validation."),
        bullet("Google Sign-In (optional; requires Google client IDs)."),
        bullet("Session: JWT in httpOnly cookie (internee_session)."),
        bullet("Roles: student, admin (dual-role users can switch workspace)."),
        bullet("Middleware protects dashboard, apply routes, and admin."),

        h2("3.3 Student Features"),
        bullet("Apply to up to 3 internship tracks; pending review then enrollment."),
        bullet("Dashboard overview: progress bar, enrollments, drop window when allowed."),
        bullet("Tasks grouped by course; submit work for mentor review."),
        bullet("Badges unlock by progress; full certificate download at 100% approved."),
        bullet("Job applications from the job portal tracked in dashboard."),
        bullet("Profile editing."),
        bullet("AI Mock Interview: pick track, timed questions (≥50 words), scored report."),

        h2("3.4 Admin Features"),
        bullet("Live overview (stream/polling)."),
        bullet("Approve or reject internship applications (enrollment + email on approve)."),
        bullet("User list management."),
        bullet("Task review per student (approve / send back)."),
        bullet("Enrollments overview."),

        h2("3.5 Frontend Guideline Coverage"),
        twoColTable([
          ["Requirement", "How this project meets it"],
          ["Responsive Design & UI", "Tailwind breakpoints; mobile hamburger nav; adaptive layouts"],
          ["Interactive & Dynamic UI", "Framer Motion; Testimonials carousel; dynamic filters/catalogs"],
          ["Form Validation", "src/lib/validate.ts on contact, auth, internship apply"],
          ["Code Quality & Testing", "Vitest + RTL; 16 tests; shared UI/Button and design tokens"],
          ["Documentation", "This Word document + README.md"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        h1("4. Installation & Environment Setup"),

        h2("4.1 Prerequisites"),
        bullet("Node.js 18+ and npm"),
        bullet("MongoDB running locally (or Atlas URI)"),
        bullet("Optional: Gmail/SMTP for emails; Google OAuth client for Google Sign-In"),

        h2("4.2 Install Steps"),
        p("1. Open a terminal in the project root."),
        p("2. Install dependencies:"),
        p("npm install", { italics: true }),
        p("3. Copy environment file (Windows):"),
        p("copy .env.example .env.local", { italics: true }),
        p("4. Edit .env.local with your secrets (AUTH_SECRET, admin credentials, SMTP if needed)."),
        p("5. Start MongoDB. Default URI: mongodb://127.0.0.1:27017/internee"),
        p("6. Run the app:"),
        p("npm run dev", { italics: true }),
        p("7. Open http://localhost:3000"),

        h2("4.3 npm Scripts"),
        threeColTable([
          ["Script", "Command", "Purpose"],
          ["Development", "npm run dev", "Local server with hot reload"],
          ["Production build", "npm run build", "Optimized Next.js build"],
          ["Production start", "npm run start", "Serve the production build"],
          ["Lint", "npm run lint", "ESLint check"],
          ["Tests", "npm test", "Run Vitest once"],
          ["Test watch", "npm run test:watch", "Watch mode for TDD"],
        ]),

        h2("4.4 Environment Variables"),
        threeColTable([
          ["Variable", "Required", "Purpose"],
          ["MONGODB_URI", "Yes", "Mongo connection string"],
          ["AUTH_SECRET", "Yes", "JWT signing secret"],
          ["ADMIN_EMAIL", "Yes*", "Seeded admin account email"],
          ["ADMIN_PASSWORD", "Yes*", "Seeded admin password"],
          ["APP_URL", "Recommended", "Base URL for emails/links"],
          ["SMTP_* / SMTP_FROM", "Optional", "Transactional email"],
          ["COMPANY_EMAIL", "Optional", "Inbox for contact messages"],
          ["GOOGLE_CLIENT_ID", "Optional", "Server Google token verify"],
          ["NEXT_PUBLIC_GOOGLE_CLIENT_ID", "Optional", "Client Google button"],
          ["CRON_SECRET", "Optional", "Protect reminder cron route"],
          ["OPENAI_API_KEY", "Optional", "Richer mock-interview tips"],
        ], [3200, 1600, 4560]),
        p("* Admin is seeded/used for admin console access. Change defaults before any public deploy."),

        new Paragraph({ children: [new PageBreak()] }),

        h1("5. Usage Guide"),

        h2("5.1 Student Journey"),
        bullet("Create an account at /sign-up (or Google Sign-In)."),
        bullet("Browse /internship, open a track, click Apply, complete the form."),
        bullet("Wait for admin approval (pending appears on dashboard)."),
        bullet("After enrollment, open /dashboard/tasks and submit work."),
        bullet("Track badges/certificates at /dashboard/certificates."),
        bullet("Practice interviews at /aimock; apply to jobs at /jobs."),

        h2("5.2 Admin Journey"),
        bullet("Sign in with ADMIN_EMAIL / ADMIN_PASSWORD (or a dual-role account)."),
        bullet("Open /admin for live overview."),
        bullet("Approve applications under /admin/applications."),
        bullet("Review student tasks under /admin/tasks → select user."),
        bullet("Use Workspace Switch (if dual-role) to jump into student dashboard."),

        h2("5.3 Contact & Newsletter"),
        bullet("Contact page validates name, email, subject, message then POSTs /api/contact."),
        bullet("Footer newsletter POSTs /api/newsletter."),
        bullet("Support Chat widget posts the same contact API."),

        h1("6. Application Architecture"),

        h2("6.1 Folder Structure (high level)"),
        bullet("src/app — App Router pages and API route handlers"),
        bullet("src/components — Reusable React UI (home, layout, auth, internship, certificates, aimock, ui)"),
        bullet("src/lib — Auth, DB, mail, validation, certificates, motion helpers, models"),
        bullet("src/data — Static catalogs (internships, jobs, blog, webinars, mock interviews)"),
        bullet("src/hooks — Client hooks (e.g. useAdminLive)"),
        bullet("public — Static assets (logo.svg, internship posters)"),
        bullet("docs — Project documentation (this file)"),

        h2("6.2 Auth & Session Flow"),
        p("1. Signup/login verifies credentials (bcrypt) or Google ID token."),
        p("2. Server issues JWT; stores it in httpOnly cookie internee_session."),
        p("3. middleware.ts guards protected routes and redirects based on role."),
        p("4. AuthProvider (src/lib/auth.tsx) loads GET /api/auth/me and exposes user helpers to components."),
        p("5. Logout clears the cookie via POST /api/auth/logout."),

        h2("6.3 Data Persistence"),
        threeColTable([
          ["Model", "File", "Stores"],
          ["User", "models/User.ts", "Profile, roles, enrollments, tasks, certs, jobs"],
          ["Application", "models/Application.ts", "Internship applications"],
          ["Track", "models/Track.ts", "Sections / seat counts"],
          ["CourseDrop", "models/CourseDrop.ts", "Drop history"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        h1("7. Component Development & Usage"),
        p(
          "Components are React Client or Server Components under src/components. Prefer composing existing UI (Button, BrandLogo, motion helpers) over duplicating styles. Props should stay typed with TypeScript. Avoid code comments unless required; keep naming self-explanatory.",
        ),

        h2("7.1 Development Guidelines"),
        bullet("Use Tailwind utility classes with existing CSS variables (--brand, --ink, --muted, etc.)."),
        bullet("For motion, import variants from src/lib/motion.ts (fadeUp, staggerContainer)."),
        bullet("For forms, run validate* helpers from src/lib/validate.ts before fetch."),
        bullet("Use Button from src/components/ui/Button for consistent CTAs (href or onClick)."),
        bullet("Keep marketing content data-driven via src/data when possible."),
        bullet("Mark interactive files with \"use client\" only when hooks/events are required."),

        h2("7.2 Layout Components"),
        threeColTable([
          ["Component", "Path", "Usage"],
          ["BrandLogo", "layout/BrandLogo.tsx", "Navbar/Footer brand mark + wordmark"],
          ["Navbar", "layout/Navbar.tsx", "Responsive nav; desktop links + mobile drawer"],
          ["Footer", "layout/Footer.tsx", "Links, newsletter, socials"],
          ["ThemeToggle", "layout/ThemeToggle.tsx", "Light/dark toggle"],
          ["WorkspaceSwitch", "layout/WorkspaceSwitch.tsx", "Student ↔ Admin workspace"],
          ["SupportChat", "layout/SupportChat.tsx", "Floating support → contact API"],
          ["Providers", "providers.tsx", "Wraps theme + auth + chrome"],
        ]),

        h2("7.3 Auth Components"),
        threeColTable([
          ["Component", "Path", "Usage"],
          ["AuthShell", "auth/AuthShell.tsx", "Shared chrome for sign-in/up pages"],
          ["GoogleSignInButton", "auth/GoogleSignInButton.tsx", "Google ID token login"],
          ["RolePickerModal", "auth/RolePickerModal.tsx", "Choose workspace when dual-role"],
        ]),

        h2("7.4 Home / Marketing Components"),
        threeColTable([
          ["Component", "Path", "Usage"],
          ["Hero", "home/Hero.tsx", "First-viewport brand CTA + live progress preview"],
          ["Partners", "home/Partners.tsx", "Partner marquee strip"],
          ["InternshipTracks", "home/InternshipTracks.tsx", "Featured tracks grid"],
          ["TaskPortal", "home/TaskPortal.tsx", "Task portal marketing block"],
          ["InstructorPortal", "home/InstructorPortal.tsx", "Instructor CTA section"],
          ["ProfessionalDev", "home/ProfessionalDev.tsx", "Stats + learning journey"],
          ["AiMockInterviews", "home/AiMockInterviews.tsx", "Mock interview marketing"],
          ["HowItWorks", "home/HowItWorks.tsx", "3-step flow"],
          ["AiCareerPath", "home/AiCareerPath.tsx", "AI career tools teaser"],
          ["Testimonials", "home/Testimonials.tsx", "Animated carousel (prev/next)"],
          ["BottomCta", "home/BottomCta.tsx", "Final conversion band"],
        ]),

        h2("7.5 Internship Components"),
        threeColTable([
          ["Component", "Path", "Usage"],
          ["InternshipCatalog", "internship/InternshipCatalog.tsx", "Browse/filter tracks"],
          ["InternshipPoster", "internship/InternshipPoster.tsx", "Poster image for a track"],
          ["InternshipApplyForm", "internship/InternshipApplyForm.tsx", "Validated application form"],
          ["EnrollPanel", "internship/EnrollPanel.tsx", "Enrollment CTA panel"],
          ["LiveEnrollAside", "internship/LiveEnrollAside.tsx", "Live seats / enroll aside"],
        ]),

        h2("7.6 Certificates & Mock Interview"),
        threeColTable([
          ["Component", "Path", "Usage"],
          ["CertificateDocument", "certificates/CertificateDocument.tsx", "Printable certificate layout"],
          ["DownloadCertificateButton", "certificates/DownloadCertificateButton.tsx", "Export PDF/image"],
          ["EarnedBadgesGrid", "certificates/EarnedBadgesGrid.tsx", "Show unlocked badges"],
          ["BadgeIcons", "certificates/BadgeIcons.tsx", "SVG badge icons"],
          ["MockInterviewApp", "aimock/MockInterviewApp.tsx", "Full mock interview flow"],
        ]),

        h2("7.7 Shared UI"),
        threeColTable([
          ["Component", "Path", "Usage"],
          ["Button", "ui/Button.tsx", "Primary/secondary/sizes; link or button"],
        ]),

        h2("7.8 Example: Using BrandLogo"),
        p('import { BrandLogo } from "@/components/layout/BrandLogo";'),
        p('<Link href="/"><BrandLogo priority /></Link>', { italics: true }),
        p("Props: className, markClassName, showWordmark (default true), priority (Next/Image)."),

        h2("7.9 Example: Using Validation"),
        p('import { validateContactForm } from "@/lib/validate";'),
        p("On submit: const check = validateContactForm({...}); if (!check.ok) show check.errors / check.message."),

        h2("7.10 Example: Motion"),
        p('import { motion } from "framer-motion";'),
        p('import { fadeUp, staggerContainer } from "@/lib/motion";'),
        p("Wrap lists with variants={staggerContainer} and children with variants={fadeUp}; use whileInView for scroll sections."),

        new Paragraph({ children: [new PageBreak()] }),

        h1("8. Routes Reference"),

        h2("8.1 Public Pages"),
        threeColTable([
          ["Route", "Type", "Description"],
          ["/", "Public", "Homepage"],
          ["/about", "Public", "About platform"],
          ["/contact", "Public", "Contact form"],
          ["/internship", "Public", "Catalog"],
          ["/internship/[slug]", "Public", "Track detail"],
          ["/internship/[slug]/apply", "Auth", "Apply form"],
          ["/jobs", "Public", "Job portal list"],
          ["/jobs/[id]", "Public", "Job detail"],
          ["/blog", "Public", "Blog index"],
          ["/webinars", "Public", "Webinars"],
          ["/aimock", "Public UI*", "Mock interviews (*start requires sign-in)"],
          ["/sign-in", "Public", "Login"],
          ["/sign-up", "Public", "Register"],
          ["/privacy", "/terms", "Legal pages"],
        ]),

        h2("8.2 Student Dashboard"),
        threeColTable([
          ["Route", "Type", "Description"],
          ["/dashboard", "Protected", "Overview"],
          ["/dashboard/tasks", "Protected", "Tasks by course"],
          ["/dashboard/certificates", "Protected", "Badges & certificates"],
          ["/dashboard/jobs", "Protected", "Job applications"],
          ["/dashboard/profile", "Protected", "Edit profile"],
        ]),

        h2("8.3 Admin"),
        threeColTable([
          ["Route", "Type", "Description"],
          ["/admin", "Admin", "Overview"],
          ["/admin/applications", "Admin", "Approve/reject"],
          ["/admin/users", "Admin", "Users"],
          ["/admin/tasks", "Admin", "Students with submissions"],
          ["/admin/tasks/[userId]", "Admin", "Per-user task review"],
          ["/admin/enrollments", "Admin", "Enrollments"],
        ]),

        h1("9. API Reference"),
        threeColTable([
          ["Method & Path", "Auth", "Purpose"],
          ["POST /api/auth/signup", "Public", "Create user"],
          ["POST /api/auth/login", "Public", "Login + cookie"],
          ["POST /api/auth/logout", "Session", "Clear cookie"],
          ["POST /api/auth/google", "Public", "Google login"],
          ["GET /api/auth/me", "Session", "Current user"],
          ["PATCH /api/user/profile", "Session", "Update profile"],
          ["POST /api/user/apply-job", "Session", "Apply to job"],
          ["PATCH /api/user/tasks", "Session", "Update task status"],
          ["GET /api/internships", "Public", "Internship list"],
          ["POST /api/internships/apply", "Session", "Submit application"],
          ["POST /api/internships/approve", "Admin", "Approve application"],
          ["POST /api/internships/enroll", "Session/Admin", "Enrollment helper"],
          ["POST /api/internships/drop", "Session", "Drop course"],
          ["GET /api/admin/overview", "Admin", "Dashboard snapshot"],
          ["GET /api/admin/stream", "Admin", "Live updates stream"],
          ["…/admin/applications|users|tasks", "Admin", "Admin CRUD/review"],
          ["POST /api/contact", "Public", "Contact message"],
          ["POST /api/newsletter", "Public", "Newsletter signup"],
          ["POST /api/aimock/evaluate", "Session", "Score mock interview"],
          ["GET /api/cron/reminders", "Secret", "Task reminders"],
        ], [3600, 1400, 4360]),

        new Paragraph({ children: [new PageBreak()] }),

        h1("10. Form Validation"),
        p("Central module: src/lib/validate.ts"),
        bullet("Helpers: required, min/max length, isEmail, isPhonePK, passwordRules, passwordsMatch, minWords, isOptionalUrl."),
        bullet("Composed validators: validateContactForm, validateSignInForm, validateSignUpForm, validateInternshipApplyForm."),
        bullet("UX pattern: set fieldErrors for inline messages; block submit until ok."),
        bullet("Unit tests: src/lib/validate.test.ts."),

        h1("11. Animations & Dynamic UI"),
        bullet("Shared presets in src/lib/motion.ts."),
        bullet("Home sections (TaskPortal, InstructorPortal, ProfessionalDev, AiMockInterviews, AiCareerPath, BottomCta, Hero, HowItWorks, Partners, InternshipTracks) animate on scroll or mount."),
        bullet("Testimonials: AnimatePresence carousel with previous/next controls (tested)."),
        bullet("Contact, Jobs, Dashboard: page-level motion for engagement."),

        h1("12. Testing"),
        p("Framework: Vitest + jsdom + React Testing Library. Config: vitest.config.ts. Setup: src/test/setup.ts."),
        threeColTable([
          ["Test file", "Covers", "Command"],
          ["validate.test.ts", "Form validators", "npm test"],
          ["Button.test.tsx", "UI Button", "npm test"],
          ["Testimonials.test.tsx", "Carousel controls", "npm test"],
          ["mock-interviews.test.ts", "Question bank/picking", "npm test"],
        ]),
        p("All 16 tests are expected to pass via npm test before submission demos."),

        h1("13. Branding & Assets"),
        bullet("Brand name: Intern Next"),
        bullet("Logo: public/logo.svg (IN mark)"),
        bullet("Favicon: src/app/icon.svg + metadata icons"),
        bullet("Wordmark helper: BrandLogo component"),
        bullet("Poster art: public/posters/*.svg"),

        h1("14. Maintenance Guide"),

        h2("14.1 Adding a New Page"),
        p("1. Create src/app/<route>/page.tsx."),
        p("2. Reuse layout chrome via Providers (Navbar/Footer automatic except /admin)."),
        p("3. Add nav link in Navbar if needed."),
        p("4. Use motion + Tailwind patterns consistent with existing pages."),

        h2("14.2 Adding a New Component"),
        p("1. Place under the correct folder (home/, layout/, etc.)."),
        p("2. Export a named function component."),
        p("3. Prefer props over globals; type props explicitly."),
        p("4. Add a RTL test if the component has meaningful interaction."),

        h2("14.3 Adding Internship Content"),
        p("Update src/data/internships.ts and optional poster under public/posters. Task guidelines live in src/data/task-guidelines.ts."),

        h2("14.4 Security Maintenance"),
        bullet("Rotate AUTH_SECRET and admin password regularly."),
        bullet("Never commit .env.local."),
        bullet("Keep SMTP and Google secrets private."),
        bullet("Use HTTPS and strong AUTH_SECRET in production."),
        bullet("Session cookies are httpOnly; avoid putting tokens in localStorage for auth."),

        h2("14.5 Known Maintenance Notes"),
        bullet("Marketing blogs/jobs/webinars are static data files — edit TypeScript data to update content."),
        bullet("Optional OpenAI improves mock-interview tips; heuristic scoring still works without it."),
        bullet("External learn.* links may still point to legacy domains where product LMS lives."),

        h1("15. Submission Checklist (Frontend Tasks)"),
        bullet("Responsive React UI with adaptive navigation — Done"),
        bullet("Interactive UI with animations, forms, slider — Done"),
        bullet("Client-side form validation — Done"),
        bullet("Cohesive HTML/CSS (Tailwind) design — Done"),
        bullet("Component tests with Vitest/RTL — Done"),
        bullet("Documentation for component development & usage — This document"),

        h1("16. Conclusion"),
        p(
          `${brand} demonstrates a complete virtual internship platform with responsive UI, animated interactions, validated forms, authenticated student/admin workflows, and automated tests. This documentation supports installation, usage, component reuse, API integration, and ongoing maintenance for internship submission and team handover.`,
        ),

        h2("Document Control"),
        p("Title: Intern Next — Project Documentation"),
        p("Format: Microsoft Word (.docx)"),
        p("Location: docs/Intern-Next-Documentation.docx"),
        p("Audience: Mentors, examiners, developers"),
      ],
    },
  ],
});

async function main() {
  const outDir = path.join(process.cwd(), "docs");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "Intern-Next-Documentation.docx");
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote", outPath, `(${buffer.length} bytes)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
