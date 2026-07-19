import { internships } from "@/data/internships";

export type MockDifficulty = "beginner" | "intermediate" | "advanced";

export type MockQuestion = {
  id: string;
  prompt: string;
  type: "behavioral" | "technical" | "situational";
  hints: string[];
  keywords: string[];
  difficulty: MockDifficulty;
};

export type MockTrackBank = {
  slug: string;
  title: string;
  category: string;
  skills: string[];
  questions: MockQuestion[];
};

function q(
  id: string,
  type: MockQuestion["type"],
  difficulty: MockDifficulty,
  prompt: string,
  hints: string[],
  keywords: string[],
): MockQuestion {
  return { id, type, difficulty, prompt, hints, keywords };
}

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const banksBySlug: Record<string, MockQuestion[]> = {
  "frontend-development": [
    q("fe-1", "technical", "beginner", "A button click does nothing in React. How do you find whether the issue is event binding, state, or a parent re-render?", ["Reproduce", "Inspect handlers", "State updates"], ["onclick", "state", "render", "handler", "console", "debug"]),
    q("fe-2", "technical", "beginner", "CSS looks fine on desktop but breaks on mobile. What is your debugging checklist?", ["Viewport", "Media queries", "Overflow"], ["responsive", "media", "viewport", "flex", "overflow", "mobile"]),
    q("fe-3", "situational", "intermediate", "Users report the UI freezes when a large list loads. How would you diagnose and fix it?", ["Profiling", "Virtualization", "Memoization"], ["list", "performance", "virtual", "memo", "lazy", "render"]),
    q("fe-4", "technical", "intermediate", "Your API returns data but the screen shows stale values. What causes this and how do you fix it?", ["Cache", "Deps array", "Fetch timing"], ["stale", "cache", "useeffect", "state", "refetch", "dependency"]),
    q("fe-5", "situational", "intermediate", "Design a reusable form component that supports validation and loading states. What trade-offs do you make?", ["Props API", "Validation", "Accessibility"], ["form", "validation", "props", "loading", "a11y", "reuse"]),
    q("fe-6", "technical", "advanced", "How would you reduce layout shift and improve LCP on a content-heavy homepage?", ["Images", "Fonts", "Critical CSS"], ["lcp", "cls", "performance", "image", "font", "critical"]),
    q("fe-7", "situational", "advanced", "A production-only hydration mismatch appears after deploy. How do you isolate the root cause?", ["SSR vs client", "Date/random", "Browser APIs"], ["hydration", "ssr", "mismatch", "client", "server", "deploy"]),
    q("fe-8", "technical", "beginner", "Explain controlled vs uncontrolled inputs. When is each better?", ["State ownership", "Simplicity"], ["controlled", "uncontrolled", "input", "state", "form", "ref"]),
    q("fe-9", "situational", "intermediate", "Product wants dark mode. How do you implement theme switching without breaking existing components?", ["Tokens", "CSS variables", "Persistence"], ["theme", "dark", "css", "variable", "token", "localstorage"]),
    q("fe-10", "technical", "advanced", "How do you structure frontend state across server cache, URL state, and local UI state?", ["Ownership", "Libraries", "Boundaries"], ["state", "cache", "url", "context", "server", "local"]),
    q("fe-11", "behavioral", "beginner", "Describe a UI bug you fixed. What was broken, how did you find it, and what changed?", ["Symptom", "Root cause", "Fix"], ["bug", "fixed", "debug", "ui", "cause", "result"]),
    q("fe-12", "situational", "intermediate", "The design uses many custom animations and the page feels janky. What do you optimize first?", ["FPS", "Compositing", "Reduce work"], ["animation", "jank", "fps", "gpu", "transform", "performance"]),
  ],
  "backend-development": [
    q("be-1", "technical", "beginner", "An API endpoint returns 500 only in production. How do you debug it step by step?", ["Logs", "Env vars", "Reproduce"], ["logs", "500", "environment", "error", "reproduce", "monitor"]),
    q("be-2", "technical", "beginner", "How do you validate request payloads and return useful error messages?", ["Schema", "Status codes", "Messages"], ["validation", "schema", "400", "payload", "error", "sanitize"]),
    q("be-3", "situational", "intermediate", "Two requests update the same record at once and data becomes wrong. How do you prevent that?", ["Transactions", "Locks", "Versioning"], ["race", "transaction", "lock", "concurrency", "atomic", "version"]),
    q("be-4", "technical", "intermediate", "Design authentication for a student dashboard API. What do you store, and how do sessions expire?", ["JWT/cookies", "Hashing", "Expiry"], ["auth", "jwt", "cookie", "session", "hash", "expire"]),
    q("be-5", "situational", "intermediate", "A slow MongoDB query is timing out under load. What do you check and change?", ["Indexes", "Explain plan", "Projection"], ["index", "query", "slow", "explain", "projection", "load"]),
    q("be-6", "technical", "advanced", "How would you design rate limiting for a public apply endpoint?", ["Keying", "Windows", "Abuse cases"], ["rate", "limit", "throttle", "ip", "abuse", "window"]),
    q("be-7", "situational", "advanced", "You need to migrate a live collection schema without downtime. What’s your plan?", ["Dual write", "Backfill", "Rollback"], ["migration", "backfill", "dual", "rollback", "schema", "zero"]),
    q("be-8", "technical", "beginner", "REST vs RPC-style endpoints for an internship portal — when do you choose each?", ["Resources", "Actions", "Caching"], ["rest", "rpc", "resource", "endpoint", "cache", "action"]),
    q("be-9", "situational", "intermediate", "Passwords were logged by mistake in a staging service. What do you do immediately and long-term?", ["Contain", "Rotate", "Prevent"], ["password", "rotate", "log", "secret", "incident", "sanitize"]),
    q("be-10", "technical", "advanced", "How do you structure retries and idempotency for payment or enrollment webhooks?", ["Idempotency keys", "Backoff", "Dedup"], ["idempotent", "retry", "webhook", "backoff", "dedup", "key"]),
    q("be-11", "behavioral", "beginner", "Tell me about an API bug you shipped. How did you detect it and prevent repeats?", ["Detection", "Fix", "Tests"], ["bug", "api", "test", "monitor", "fix", "prevent"]),
    q("be-12", "situational", "intermediate", "Clients complain about inconsistent pagination results. What could cause that and how do you fix it?", ["Sort stability", "Cursors", "Filters"], ["pagination", "cursor", "sort", "offset", "stable", "filter"]),
  ],
  "flutter-mobile-app": [
    q("fl-1", "technical", "beginner", "A Flutter widget rebuilds too often and the UI stutters. How do you find and stop unnecessary rebuilds?", ["DevTools", "const", "Keys"], ["rebuild", "const", "devtools", "performance", "setstate", "provider"]),
    q("fl-2", "technical", "beginner", "Explain when to use StatelessWidget vs StatefulWidget with a concrete example.", ["Ownership of state", "Lifecycle"], ["stateless", "stateful", "state", "lifecycle", "widget", "ui"]),
    q("fl-3", "situational", "intermediate", "The app works on Android but crashes on iOS after a plugin update. How do you debug?", ["Platform channels", "Versions", "Logs"], ["ios", "android", "plugin", "crash", "version", "log"]),
    q("fl-4", "technical", "intermediate", "How do you manage app-wide auth state and protected routes in Flutter?", ["State mgmt", "Guards", "Persistence"], ["auth", "provider", "riverpod", "route", "secure", "storage"]),
    q("fl-5", "situational", "intermediate", "Images load slowly on poor networks. What strategies improve perceived performance?", ["Caching", "Placeholders", "Compression"], ["cache", "image", "network", "placeholder", "compress", "lazy"]),
    q("fl-6", "technical", "advanced", "Design offline-first sync for a task checklist app using local DB + API.", ["Conflict rules", "Queue", "Merge"], ["offline", "sync", "sqlite", "queue", "conflict", "cache"]),
    q("fl-7", "situational", "advanced", "Release builds fail with tree-shaking/minification issues but debug works. What’s your approach?", ["Proguard", "Build flags", "Isolate"], ["release", "minify", "proguard", "build", "debug", "isolate"]),
    q("fl-8", "technical", "beginner", "How do you handle form validation and error messages cleanly in Flutter?", ["Controllers", "Validators", "UX"], ["form", "validation", "controller", "error", "textfield", "ux"]),
    q("fl-9", "situational", "intermediate", "Push notifications arrive twice for the same event. How do you diagnose and fix it?", ["Token lifecycle", "Dedup", "Backend"], ["notification", "fcm", "token", "dedup", "duplicate", "handler"]),
    q("fl-10", "technical", "advanced", "Compare Provider, Riverpod, and Bloc for a mid-size Flutter internship project. When would you pick each?", ["Complexity", "Testability", "Team fit"], ["provider", "riverpod", "bloc", "state", "test", "architecture"]),
    q("fl-11", "behavioral", "beginner", "Describe a Flutter UI polish task you did. What changed for the user?", ["Before", "Change", "Impact"], ["ui", "polish", "flutter", "user", "improved", "result"]),
    q("fl-12", "situational", "intermediate", "Deep links open the wrong screen after a navigation refactor. How do you fix routing safely?", ["Route table", "Tests", "Fallbacks"], ["deeplink", "route", "navigation", "fallback", "stack", "test"]),
  ],
  "ui-ux-design": [
    q("ux-1", "technical", "beginner", "A signup flow has high drop-off on step 2. How do you investigate with UX methods?", ["Funnel", "Heuristics", "Tests"], ["dropoff", "funnel", "usability", "heuristic", "friction", "research"]),
    q("ux-2", "technical", "beginner", "What’s the difference between a wireframe, mockup, and prototype? When do you use each?", ["Fidelity", "Purpose"], ["wireframe", "mockup", "prototype", "fidelity", "figma", "flow"]),
    q("ux-3", "situational", "intermediate", "Stakeholders want more features on the home screen. How do you push back with design rationale?", ["Goals", "Hierarchy", "Evidence"], ["priority", "hierarchy", "stakeholder", "evidence", "focus", "goal"]),
    q("ux-4", "technical", "intermediate", "Design an accessible internship application form. Which a11y issues do you prevent?", ["Labels", "Errors", "Contrast"], ["a11y", "label", "contrast", "keyboard", "error", "aria"]),
    q("ux-5", "situational", "intermediate", "Users ignore a primary CTA. What design experiments would you run?", ["Placement", "Copy", "Contrast"], ["cta", "experiment", "copy", "contrast", "placement", "conversion"]),
    q("ux-6", "technical", "advanced", "How do you build and maintain a design system for a growing product team?", ["Tokens", "Components", "Governance"], ["design system", "token", "component", "variant", "documentation", "consistency"]),
    q("ux-7", "situational", "advanced", "Research findings conflict with a founder’s preferred layout. How do you facilitate a decision?", ["Data", "Options", "Risk"], ["research", "decision", "tradeoff", "evidence", "facilitate", "risk"]),
    q("ux-8", "technical", "beginner", "How do you run a quick usability test with 5 students for a dashboard redesign?", ["Tasks", "Observe", "Insights"], ["usability", "test", "task", "observe", "insight", "interview"]),
    q("ux-9", "situational", "intermediate", "Mobile and desktop need different information density. How do you adapt the same flow?", ["Breakpoints", "Progressive disclosure"], ["responsive", "mobile", "desktop", "density", "disclosure", "layout"]),
    q("ux-10", "technical", "advanced", "Map a user journey for ‘apply → enroll → first task submit’. Where are the anxiety points?", ["Moments", "Emotions", "Fixes"], ["journey", "anxiety", "touchpoint", "onboarding", "submit", "friction"]),
    q("ux-11", "behavioral", "beginner", "Tell me about feedback that changed your design. What did you learn?", ["Feedback", "Change", "Lesson"], ["feedback", "iterate", "learned", "design", "changed", "user"]),
    q("ux-12", "situational", "intermediate", "Engineers say a prototype is too complex to build this sprint. How do you rescope without killing the goal?", ["MVP", "Phasing", "Must-haves"], ["mvp", "scope", "phase", "priority", "must", "tradeoff"]),
  ],
  "digital-marketing": [
    q("dm-1", "technical", "beginner", "A campaign gets clicks but almost no applications. What do you diagnose first?", ["Landing", "Offer", "Targeting"], ["conversion", "landing", "targeting", "ctr", "offer", "friction"]),
    q("dm-2", "technical", "beginner", "SEO vs paid social for promoting internships — when do you use each?", ["Intent", "Speed", "Budget"], ["seo", "paid", "intent", "budget", "organic", "campaign"]),
    q("dm-3", "situational", "intermediate", "CPC rose 40% this week with the same creatives. What could be wrong and how do you respond?", ["Auction", "Fatigue", "Quality"], ["cpc", "fatigue", "quality", "audience", "creative", "bid"]),
    q("dm-4", "technical", "intermediate", "Which funnel metrics would you track weekly for internship acquisition?", ["Awareness → Apply"], ["funnel", "ctr", "cpa", "conversion", "impression", "application"]),
    q("dm-5", "situational", "intermediate", "Organic reach dropped on Instagram. What content and distribution tests do you run?", ["Formats", "Hooks", "Timing"], ["reach", "content", "hook", "reel", "engagement", "distribution"]),
    q("dm-6", "technical", "advanced", "Design an attribution approach when users discover Intern Next on social but apply days later.", ["UTM", "Assisted", "Limitations"], ["attribution", "utm", "assisted", "conversion", "touchpoint", "analytics"]),
    q("dm-7", "situational", "advanced", "Leadership wants vanity metrics. How do you reframe reporting around pipeline quality?", ["North star", "Quality proxies"], ["metric", "quality", "pipeline", "cpa", "retention", "report"]),
    q("dm-8", "technical", "beginner", "Write a sharp value proposition for a virtual internship aimed at university students.", ["Audience", "Outcome", "Proof"], ["value", "students", "internship", "outcome", "proof", "message"]),
    q("dm-9", "situational", "intermediate", "A lookalike audience underperforms. What do you change in targeting and creative?", ["Seed quality", "Messaging"], ["lookalike", "audience", "seed", "creative", "targeting", "segment"]),
    q("dm-10", "technical", "advanced", "How would you structure A/B tests for landing page headlines without polluting data?", ["Sample size", "Duration", "One variable"], ["ab", "test", "sample", "significance", "headline", "control"]),
    q("dm-11", "behavioral", "beginner", "Describe a campaign idea you would run for Intern Next and how you’d measure success.", ["Idea", "Channel", "KPI"], ["campaign", "measure", "kpi", "channel", "content", "result"]),
    q("dm-12", "situational", "intermediate", "Applications spike but show-up for onboarding is low. What marketing + ops fixes do you propose?", ["Expectation", "Reminders", "Nurture"], ["onboarding", "reminder", "nurture", "expectation", "retention", "followup"]),
  ],
  "cyber-security": [
    q("cs-1", "technical", "beginner", "A phishing email reaches student inboxes. What immediate steps do you take?", ["Contain", "Report", "Educate"], ["phishing", "report", "contain", "email", "awareness", "incident"]),
    q("cs-2", "technical", "beginner", "Explain CIA triad with one internship-platform example for each.", ["Confidentiality", "Integrity", "Availability"], ["cia", "confidentiality", "integrity", "availability", "security", "example"]),
    q("cs-3", "situational", "intermediate", "You find an open S3/bucket-like public storage with resumes. What’s your response plan?", ["Access revoke", "Notify", "Audit"], ["exposure", "bucket", "access", "audit", "notify", "secure"]),
    q("cs-4", "technical", "intermediate", "How do you harden a Node API against common OWASP risks (injection, auth flaws)?", ["Validation", "Authz", "Headers"], ["owasp", "injection", "auth", "sanitize", "header", "authorize"]),
    q("cs-5", "situational", "intermediate", "Suspicious login attempts spike overnight. How do you investigate with limited tooling?", ["Logs", "Geo/IP", "Lockouts"], ["bruteforce", "login", "log", "ip", "lockout", "alert"]),
    q("cs-6", "technical", "advanced", "Design a basic SOC triage workflow for alerts from a web app WAF.", ["Severity", "Playbooks", "Escalation"], ["soc", "triage", "waf", "alert", "playbook", "escalate"]),
    q("cs-7", "situational", "advanced", "A dependency has a critical CVE. How do you patch without breaking production?", ["Assess", "Stage", "Rollback"], ["cve", "dependency", "patch", "stage", "rollback", "risk"]),
    q("cs-8", "technical", "beginner", "What’s the difference between authentication and authorization? Give an API example.", ["Identity vs permission"], ["authentication", "authorization", "permission", "role", "token", "access"]),
    q("cs-9", "situational", "intermediate", "Interns share screenshots with API keys in Discord. What controls stop this next time?", ["Secrets mgmt", "Training", "Scanning"], ["secret", "key", "rotate", "vault", "scan", "policy"]),
    q("cs-10", "technical", "advanced", "How would you threat-model the internship apply + file upload flow?", ["Assets", "Threats", "Mitigations"], ["threat", "model", "upload", "asset", "mitigation", "attack"]),
    q("cs-11", "behavioral", "beginner", "Tell me about a security habit you follow while coding or browsing. Why does it matter?", ["Habit", "Risk", "Benefit"], ["habit", "secure", "password", "update", "risk", "practice"]),
    q("cs-12", "situational", "intermediate", "Logs show SQL-like payloads in search. How do you confirm and mitigate injection risk?", ["Confirm", "Parameterized queries", "WAF"], ["sql", "injection", "parameter", "sanitize", "waf", "payload"]),
  ],
  "data-science": [
    q("ds-1", "technical", "beginner", "Your dataset has many missing values. How do you decide between drop, impute, or flag?", ["Pattern", "Impact", "Leakage"], ["missing", "impute", "drop", "null", "bias", "feature"]),
    q("ds-2", "technical", "beginner", "Explain train/validation/test splits and why random leakage is dangerous.", ["Generalization", "Leakage"], ["train", "test", "validation", "leakage", "split", "overfit"]),
    q("ds-3", "situational", "intermediate", "A model accuracy is high but business users say predictions are useless. What do you check?", ["Metric mismatch", "Class balance", "Threshold"], ["metric", "precision", "recall", "threshold", "business", "imbalance"]),
    q("ds-4", "technical", "intermediate", "How do you detect and handle outliers in a student engagement dataset?", ["Visualize", "Robust stats", "Domain rules"], ["outlier", "boxplot", "robust", "zscore", "clean", "distribution"]),
    q("ds-5", "situational", "intermediate", "Feature importance disagrees with stakeholder intuition. How do you investigate?", ["Correlation", "Confounders", "Explainability"], ["feature", "importance", "correlation", "shap", "confound", "explain"]),
    q("ds-6", "technical", "advanced", "Design an experiment to measure whether a new onboarding flow improves completion rate.", ["Hypothesis", "Sample", "Significance"], ["experiment", "ab", "hypothesis", "significance", "completion", "control"]),
    q("ds-7", "situational", "advanced", "Pipeline fails nightly after a schema change upstream. How do you make it resilient?", ["Contracts", "Alerts", "Backfills"], ["pipeline", "schema", "alert", "contract", "backfill", "etl"]),
    q("ds-8", "technical", "beginner", "Pandas vs SQL for cleaning a medium CSV — when do you prefer each?", ["Scale", "Iteration", "Join complexity"], ["pandas", "sql", "clean", "join", "csv", "transform"]),
    q("ds-9", "situational", "intermediate", "Charts look impressive but hide uncertainty. How do you communicate results responsibly?", ["CI", "Caveats", "Audience"], ["uncertainty", "confidence", "caveat", "visualize", "communicate", "bias"]),
    q("ds-10", "technical", "advanced", "How would you reduce overfitting on a small labeled internship dataset?", ["Regularization", "CV", "Simpler models"], ["overfit", "regularization", "cross", "validation", "simple", "augment"]),
    q("ds-11", "behavioral", "beginner", "Describe a data cleaning mistake and what process you added afterward.", ["Mistake", "Impact", "Process"], ["clean", "mistake", "process", "check", "quality", "learned"]),
    q("ds-12", "situational", "intermediate", "Two dashboards show different ‘active users’ numbers. How do you reconcile definitions?", ["Metric dictionary", "Source of truth"], ["metric", "definition", "dashboard", "reconcile", "source", "truth"]),
  ],
  "cloud-computing": [
    q("cc-1", "technical", "beginner", "An EC2/VM instance is unreachable. What’s your first troubleshooting path?", ["Status checks", "SG/NACL", "Routes"], ["instance", "security group", "ssh", "network", "status", "route"]),
    q("cc-2", "technical", "beginner", "Explain the difference between IaaS, PaaS, and SaaS with one example each.", ["Control vs managed"], ["iaas", "paas", "saas", "managed", "infrastructure", "service"]),
    q("cc-3", "situational", "intermediate", "Your cloud bill spiked overnight. How do you find and stop the cost drivers?", ["Cost explorer", "Idle resources", "Alerts"], ["cost", "billing", "idle", "alert", "rightsizing", "usage"]),
    q("cc-4", "technical", "intermediate", "How would you design secure storage for internship certificates and resumes?", ["IAM", "Encryption", "Least privilege"], ["s3", "iam", "encrypt", "bucket", "policy", "access"]),
    q("cc-5", "situational", "intermediate", "A deploy broke production DNS for 10 minutes. What postmortem actions do you take?", ["Rollback", "Runbook", "Checks"], ["dns", "deploy", "rollback", "postmortem", "runbook", "health"]),
    q("cc-6", "technical", "advanced", "Design a highly available web app architecture across two availability zones.", ["LB", "Multi-AZ", "Health checks"], ["ha", "load balancer", "multi-az", "failover", "health", "redundant"]),
    q("cc-7", "situational", "advanced", "Containers keep restarting in production. How do you debug resource and config issues?", ["Logs", "Probes", "Limits"], ["container", "restart", "oom", "probe", "limit", "log"]),
    q("cc-8", "technical", "beginner", "What is the purpose of IAM roles vs long-lived access keys?", ["Least privilege", "Rotation"], ["iam", "role", "key", "permission", "rotate", "policy"]),
    q("cc-9", "situational", "intermediate", "CI/CD deploys succeed but users still see old assets. What cloud/CDN issues do you check?", ["Cache", "Invalidation", "Versions"], ["cdn", "cache", "invalidate", "deploy", "version", "asset"]),
    q("cc-10", "technical", "advanced", "How do you implement blue/green or canary releases for a Node API on cloud?", ["Traffic split", "Metrics", "Rollback"], ["canary", "blue", "green", "traffic", "rollback", "metric"]),
    q("cc-11", "behavioral", "beginner", "Tell me about a time you fixed an environment mismatch (local vs cloud).", ["Diff", "Fix", "Prevention"], ["environment", "config", "mismatch", "env", "fixed", "prevent"]),
    q("cc-12", "situational", "intermediate", "Backups exist but restore was never tested. How do you validate disaster recovery?", ["Restore drill", "RTO/RPO"], ["backup", "restore", "rto", "rpo", "drill", "recovery"]),
  ],
  "graphic-designing": [
    q("gd-1", "technical", "beginner", "A logo looks sharp in Illustrator but blurry on web. What went wrong and how do you export correctly?", ["Vectors", "Formats", "Sizes"], ["svg", "png", "export", "resolution", "vector", "logo"]),
    q("gd-2", "technical", "beginner", "Explain visual hierarchy for an internship poster. What should users see first?", ["Contrast", "Scale", "CTA"], ["hierarchy", "contrast", "cta", "poster", "focal", "typography"]),
    q("gd-3", "situational", "intermediate", "Client asks for ‘more colors’ and the brand becomes messy. How do you guide them?", ["Palette system", "Examples"], ["brand", "palette", "consistency", "guide", "color", "system"]),
    q("gd-4", "technical", "intermediate", "How do you set up typography pairing and spacing for a social campaign series?", ["Scale", "Rhythm", "Legibility"], ["typography", "spacing", "pairing", "grid", "legible", "campaign"]),
    q("gd-5", "situational", "intermediate", "Design must work for print and Instagram. What file/setup differences do you plan for?", ["CMYK/RGB", "Bleed", "Safe area"], ["print", "cmyk", "rgb", "bleed", "safe", "export"]),
    q("gd-6", "technical", "advanced", "Build a mini brand kit (logo, colors, type, components) for a student product. What’s essential?", ["Tokens", "Usage rules"], ["brand kit", "logo", "guideline", "component", "usage", "token"]),
    q("gd-7", "situational", "advanced", "Stakeholders reject designs without clear feedback. How do you structure a critique session?", ["Goals", "Criteria", "Alternatives"], ["critique", "feedback", "criteria", "alternative", "goal", "iterate"]),
    q("gd-8", "technical", "beginner", "When do you choose raster vs vector for icons and illustrations?", ["Scale", "Detail"], ["raster", "vector", "icon", "illustrator", "photoshop", "scale"]),
    q("gd-9", "situational", "intermediate", "A campaign asset set is inconsistent across designers. How do you enforce quality quickly?", ["Templates", "Checklist"], ["template", "checklist", "consistency", "asset", "style", "qa"]),
    q("gd-10", "technical", "advanced", "How do you prepare accessible color contrast and alt-ready creatives for web use?", ["Contrast ratios", "Text in images"], ["contrast", "accessibility", "alt", "color", "wcag", "readable"]),
    q("gd-11", "behavioral", "beginner", "Describe a design you revised after critique. What improved?", ["Feedback", "Change", "Result"], ["critique", "revise", "improved", "design", "feedback", "result"]),
    q("gd-12", "situational", "intermediate", "Deadline is tonight and copy keeps changing. How do you protect layout quality under pressure?", ["Modular layouts", "Lock styles"], ["deadline", "modular", "template", "lock", "priority", "scope"]),
  ],
  "machine-learning": [
    q("ml-1", "technical", "beginner", "Your model overfits training data. What are three concrete fixes you try first?", ["Regularize", "More data", "Simpler model"], ["overfit", "regularization", "dropout", "data", "simple", "validation"]),
    q("ml-2", "technical", "beginner", "Accuracy vs F1 — when is accuracy misleading?", ["Imbalance", "Costs"], ["accuracy", "f1", "precision", "recall", "imbalance", "metric"]),
    q("ml-3", "situational", "intermediate", "A classifier predicts ‘approved’ for almost everyone. How do you diagnose it?", ["Class balance", "Threshold", "Features"], ["bias", "threshold", "class", "imbalance", "feature", "baseline"]),
    q("ml-4", "technical", "intermediate", "Explain train/test leakage with a realistic internship-data example.", ["Future info", "Preprocessing"], ["leakage", "preprocess", "split", "future", "feature", "invalid"]),
    q("ml-5", "situational", "intermediate", "Offline metrics look good but live recommendations feel random. What do you check?", ["Distribution shift", "Latency", "Logging"], ["shift", "online", "offline", "latency", "logging", "monitor"]),
    q("ml-6", "technical", "advanced", "How would you design a baseline-to-model workflow for predicting task completion risk?", ["Baseline", "Features", "Evaluation"], ["baseline", "feature", "evaluate", "model", "pipeline", "risk"]),
    q("ml-7", "situational", "advanced", "Label quality is noisy because mentors disagree. How do you improve supervision signal?", ["Guidelines", "Agreement", "Relabel"], ["label", "agreement", "guideline", "noise", "annotate", "quality"]),
    q("ml-8", "technical", "beginner", "What is cross-validation and why use it on small datasets?", ["Variance", "Robust estimate"], ["cross", "validation", "fold", "estimate", "small", "variance"]),
    q("ml-9", "situational", "intermediate", "Feature engineering helps a lot in notebook but is too slow in production. What’s your plan?", ["Precompute", "Simplify", "Cache"], ["feature", "production", "precompute", "cache", "latency", "pipeline"]),
    q("ml-10", "technical", "advanced", "Compare logistic regression, random forest, and a small neural net for tabular data. When each?", ["Interpretability", "Data size", "Nonlinearity"], ["logistic", "forest", "neural", "tabular", "interpret", "nonlinear"]),
    q("ml-11", "behavioral", "beginner", "Tell me about an ML experiment that failed. What did you learn about evaluation?", ["Hypothesis", "Result", "Lesson"], ["experiment", "failed", "metric", "learned", "evaluate", "bias"]),
    q("ml-12", "situational", "intermediate", "Stakeholders want ‘AI’ but a rules baseline may be enough. How do you decide?", ["ROI", "Complexity", "Data readiness"], ["baseline", "roi", "complexity", "rules", "data", "decide"]),
  ],
  "video-editing": [
    q("ve-1", "technical", "beginner", "A timeline export looks washed out compared to the preview. What do you check?", ["Color space", "Scopes", "Export settings"], ["color", "export", "preview", "lut", "scope", "settings"]),
    q("ve-2", "technical", "beginner", "How do you structure a 60-second internship promo: hook, story, CTA?", ["Pacing", "Message"], ["hook", "pacing", "cta", "story", "promo", "cut"]),
    q("ve-3", "situational", "intermediate", "Audio is out of sync after edits. How do you diagnose and fix it?", ["Frame rate", "Relink", "Waveforms"], ["audio", "sync", "framerate", "waveform", "relink", "drift"]),
    q("ve-4", "technical", "intermediate", "Explain when to cut on action vs jump cut for social content.", ["Energy", "Continuity"], ["cut", "jump", "action", "continuity", "pace", "edit"]),
    q("ve-5", "situational", "intermediate", "Client wants more text on screen but readability suffers on mobile. What’s your approach?", ["Safe margins", "Hierarchy", "Timing"], ["caption", "mobile", "readable", "safe", "timing", "hierarchy"]),
    q("ve-6", "technical", "advanced", "Design a repeatable editing template for weekly webinar highlight reels.", ["Sequences", "Presets", "Brand kit"], ["template", "preset", "sequence", "brand", "highlight", "workflow"]),
    q("ve-7", "situational", "advanced", "Footage codecs differ and playback stutters. How do you optimize the edit workflow?", ["Proxies", "Transcode", "Scratch disks"], ["proxy", "transcode", "codec", "playback", "performance", "media"]),
    q("ve-8", "technical", "beginner", "What is B-roll and how do you use it to hide jump cuts in an interview?", ["Coverage", "Motivation"], ["broll", "interview", "jump", "coverage", "cutaway", "edit"]),
    q("ve-9", "situational", "intermediate", "Music licensing is unclear for a student campaign video. What do you do?", ["Rights", "Alternatives", "Attribution"], ["license", "music", "copyright", "royalty", "attribution", "safe"]),
    q("ve-10", "technical", "advanced", "How do you color grade for consistency across clips shot in different lighting?", ["Matching", "Scopes", "Secondary"], ["grade", "match", "scope", "secondary", "exposure", "white"]),
    q("ve-11", "behavioral", "beginner", "Describe an edit you reworked after feedback. What changed in pacing or clarity?", ["Feedback", "Change", "Result"], ["feedback", "pace", "clarity", "rework", "edit", "result"]),
    q("ve-12", "situational", "intermediate", "Deadline is 2 hours and you have 40 minutes of raw clips. How do you prioritize the edit?", ["Selects", "Story spine", "Polish later"], ["selects", "priority", "deadline", "rough", "cut", "polish"]),
  ],
  "chatbot-development": [
    q("cb-1", "technical", "beginner", "Users say the bot misunderstands intents. How do you improve training data and utterances?", ["Examples", "Confusion matrix", "Entities"], ["intent", "utterance", "training", "entity", "nlu", "confusion"]),
    q("cb-2", "technical", "beginner", "What’s the difference between intents, entities, and dialog context?", ["NLU vs state"], ["intent", "entity", "context", "dialog", "slot", "state"]),
    q("cb-3", "situational", "intermediate", "The bot loops when users answer vaguely. How do you redesign the flow?", ["Clarifying prompts", "Fallbacks", "Exit paths"], ["fallback", "loop", "clarify", "flow", "handoff", "repair"]),
    q("cb-4", "technical", "intermediate", "Design a FAQ chatbot for internship status checks. Which integrations do you need?", ["Auth", "API", "Templates"], ["faq", "api", "auth", "status", "template", "integration"]),
    q("cb-5", "situational", "intermediate", "Bot confidence is high but answers are wrong for edge cases. What do you change?", ["Thresholds", "Rules", "Human handoff"], ["confidence", "threshold", "handoff", "edge", "rule", "accuracy"]),
    q("cb-6", "technical", "advanced", "How would you evaluate chatbot quality beyond ‘accuracy’ (latency, containment, CSAT)?", ["Metrics suite"], ["containment", "csat", "latency", "metric", "evaluation", "handoff"]),
    q("cb-7", "situational", "advanced", "Prompt injection / jailbreak attempts appear in logs. How do you harden the bot?", ["Guardrails", "Filtering", "Scopes"], ["jailbreak", "guardrail", "filter", "prompt", "safety", "policy"]),
    q("cb-8", "technical", "beginner", "When should a chatbot escalate to a human mentor/support agent?", ["Frustration", "Risk", "Low confidence"], ["escalate", "human", "confidence", "support", "frustration", "handoff"]),
    q("cb-9", "situational", "intermediate", "Users switch language mid-conversation. How do you handle multilingual flows?", ["Detect", "Route", "Fallback"], ["language", "multilingual", "detect", "route", "fallback", "locale"]),
    q("cb-10", "technical", "advanced", "Design conversation state for a multi-step internship application assistant.", ["Slots", "Validation", "Resume"], ["slot", "state", "application", "validate", "resume", "flow"]),
    q("cb-11", "behavioral", "beginner", "Tell me about improving a confusing conversation flow. What metric moved?", ["Before", "Change", "Metric"], ["flow", "improved", "metric", "clarity", "fallback", "result"]),
    q("cb-12", "situational", "intermediate", "The bot works in staging but fails with live CRM data. How do you debug integration issues?", ["Contracts", "Auth", "Error mapping"], ["integration", "api", "auth", "staging", "error", "contract"]),
  ],
};

export const mockTrackBanks: MockTrackBank[] = internships.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
  skills: item.skills,
  questions: banksBySlug[item.slug] || [],
}));

export function getMockTrackBank(slug: string) {
  return mockTrackBanks.find((t) => t.slug === slug);
}

export function difficultyRank(d: MockDifficulty) {
  if (d === "beginner") return 1;
  if (d === "intermediate") return 2;
  return 3;
}

export function pickRandomQuestions(
  slug: string,
  difficulty: MockDifficulty = "intermediate",
  count?: number,
) {
  const bank = getMockTrackBank(slug);
  if (!bank?.questions.length) return [] as MockQuestion[];

  const maxRank = difficultyRank(difficulty);
  const eligible = bank.questions.filter((q) => difficultyRank(q.difficulty) <= maxRank);
  const pool = eligible.length ? eligible : bank.questions;

  const target =
    count ??
    (difficulty === "beginner" ? 4 : difficulty === "advanced" ? 6 : 5);

  return shuffle(pool).slice(0, Math.min(target, pool.length));
}
