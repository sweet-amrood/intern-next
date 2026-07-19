import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Application } from "@/lib/models/Application";
import { Track } from "@/lib/models/Track";

function iso(value?: Date | string | null) {
  if (!value) return null;
  return typeof value === "string" ? value : new Date(value).toISOString();
}

export async function buildAdminSnapshot() {
  await connectDB();

  const [users, applications, tracks] = await Promise.all([
    User.find({}).sort({ createdAt: -1 }).lean(),
    Application.find({}).sort({ createdAt: -1 }).lean(),
    Track.find({}).lean(),
  ]);

  const students = users.filter((u) => {
    const roles =
      Array.isArray(u.roles) && u.roles.length
        ? u.roles
        : u.role === "admin"
          ? ["admin"]
          : ["student"];
    return roles.includes("student");
  });
  const admins = users.filter((u) => {
    const roles =
      Array.isArray(u.roles) && u.roles.length
        ? u.roles
        : u.role === "admin"
          ? ["admin"]
          : ["student"];
    return roles.includes("admin");
  });

  let submittedTasks = 0;
  let approvedTasks = 0;
  let todoTasks = 0;
  let activeEnrollments = 0;

  const taskQueue: Array<{
    userId: string;
    userName: string;
    userEmail: string;
    trackSlug: string;
    trackTitle: string;
    taskId: string;
    title: string;
    module: string;
    status: string;
    githubUrl: string;
    submissionNote: string;
    files: Array<{ name: string; url: string; size: number }>;
    submittedAt: string | null;
    due: string;
  }> = [];

  const enrollmentRows: Array<{
    userId: string;
    userName: string;
    userEmail: string;
    slug: string;
    title: string;
    section: number;
    enrolledAt: string | null;
    progress: number;
    submitted: number;
    approved: number;
    total: number;
  }> = [];

  const taskStudentsMap = new Map<
    string,
    {
      userId: string;
      userName: string;
      userEmail: string;
      enrollments: Array<{
        slug: string;
        title: string;
        section: number;
        total: number;
        submitted: number;
        approved: number;
        todo: number;
      }>;
      submittedCount: number;
      approvedCount: number;
      todoCount: number;
      lastSubmittedAt: string | null;
    }
  >();

  for (const u of students) {
    const enrollments = Array.isArray(u.enrollments) ? u.enrollments : [];
    activeEnrollments += enrollments.length;

    const userId = String(u._id);
    let userSubmitted = 0;
    let userApproved = 0;
    let userTodo = 0;
    let lastSubmittedAt: string | null = null;
    const userEnrollmentSummaries: Array<{
      slug: string;
      title: string;
      section: number;
      total: number;
      submitted: number;
      approved: number;
      todo: number;
    }> = [];

    for (const e of enrollments) {
      const tasks = Array.isArray(e.tasks) ? e.tasks : [];
      const approved = tasks.filter((t) => t.status === "approved").length;
      const submitted = tasks.filter((t) => t.status === "submitted").length;
      const todo = tasks.filter((t) => t.status === "todo").length;
      approvedTasks += approved;
      submittedTasks += submitted;
      todoTasks += todo;
      userSubmitted += submitted;
      userApproved += approved;
      userTodo += todo;
      const total = tasks.length || 1;
      userEnrollmentSummaries.push({
        slug: e.slug,
        title: e.title,
        section: e.section,
        total: tasks.length,
        submitted,
        approved,
        todo,
      });
      enrollmentRows.push({
        userId,
        userName: u.name,
        userEmail: u.email,
        slug: e.slug,
        title: e.title,
        section: e.section,
        enrolledAt: iso(e.enrolledAt),
        progress: Math.round((approved / total) * 100),
        submitted,
        approved,
        total: tasks.length,
      });

      for (const t of tasks) {
        if (t.status === "submitted") {
          const submittedAt = iso(t.submittedAt);
          if (
            submittedAt &&
            (!lastSubmittedAt || new Date(submittedAt) > new Date(lastSubmittedAt))
          ) {
            lastSubmittedAt = submittedAt;
          }
          taskQueue.push({
            userId,
            userName: u.name,
            userEmail: u.email,
            trackSlug: e.slug,
            trackTitle: e.title,
            taskId: t.id,
            title: t.title,
            module: t.module,
            status: t.status,
            githubUrl: t.githubUrl || "",
            submissionNote: t.submissionNote || "",
            files: Array.isArray(t.files)
              ? t.files.map((f) => ({
                  name: f.name,
                  url: f.url,
                  size: Number(f.size || 0),
                }))
              : [],
            submittedAt,
            due: t.due,
          });
        }
      }
    }

    if (enrollments.length > 0) {
      taskStudentsMap.set(userId, {
        userId,
        userName: u.name,
        userEmail: u.email,
        enrollments: userEnrollmentSummaries,
        submittedCount: userSubmitted,
        approvedCount: userApproved,
        todoCount: userTodo,
        lastSubmittedAt,
      });
    }
  }

  const taskStudents = Array.from(taskStudentsMap.values()).sort((a, b) => {
    if (b.submittedCount !== a.submittedCount) return b.submittedCount - a.submittedCount;
    const ta = a.lastSubmittedAt ? new Date(a.lastSubmittedAt).getTime() : 0;
    const tb = b.lastSubmittedAt ? new Date(b.lastSubmittedAt).getTime() : 0;
    return tb - ta;
  });

  taskQueue.sort((a, b) => {
    const ta = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
    const tb = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
    return tb - ta;
  });

  const pendingApps = applications.filter((a) => a.status === "pending").length;
  const approvedApps = applications.filter((a) => a.status === "approved").length;
  const rejectedApps = applications.filter((a) => a.status === "rejected").length;

  return {
    updatedAt: new Date().toISOString(),
    stats: {
      students: students.length,
      admins: admins.length,
      pendingApplications: pendingApps,
      approvedApplications: approvedApps,
      rejectedApplications: rejectedApps,
      activeEnrollments,
      submittedTasks,
      approvedTasks,
      todoTasks,
      tracks: tracks.length,
    },
    users: users.map((u) => {
      const roles = Array.isArray(u.roles) && u.roles.length
        ? Array.from(
            new Set(
              u.roles.filter((r): r is "student" | "admin" => r === "student" || r === "admin"),
            ),
          )
        : u.role === "admin"
          ? (["admin"] as Array<"student" | "admin">)
          : (["student"] as Array<"student" | "admin">);
      return {
        id: String(u._id),
        name: u.name,
        email: u.email,
        role: roles.includes("admin") && !roles.includes("student") ? "admin" : "student",
        roles,
        authProvider: u.authProvider || "local",
        enrollmentCount: Array.isArray(u.enrollments) ? u.enrollments.length : 0,
        enrollments: (u.enrollments || []).map((e) => ({
          slug: e.slug,
          title: e.title,
          section: e.section,
          enrolledAt: iso(e.enrolledAt),
        })),
        appliedJobs: (u.appliedJobs || []).length,
        createdAt: iso((u as { createdAt?: Date }).createdAt) || null,
      };
    }),
    applications: applications.map((a) => ({
      id: String(a._id),
      userId: String(a.userId),
      slug: a.slug,
      trackTitle: a.trackTitle,
      fullName: a.fullName,
      email: a.email,
      phone: a.phone,
      university: a.university,
      semester: a.semester,
      city: a.city,
      status: a.status,
      motivation: a.motivation || "",
      portfolio: a.portfolio || "",
      linkedin: a.linkedin || "",
      createdAt: iso((a as { createdAt?: Date }).createdAt),
      reviewedAt: iso(a.reviewedAt),
    })),
    enrollments: enrollmentRows,
    taskQueue,
    taskStudents,
    tracks: tracks.map((t) => ({
      slug: t.slug,
      title: t.title,
      enrolledCount: t.enrolledCount,
      seatsPerSection: t.seatsPerSection,
    })),
  };
}

export type AdminSnapshot = Awaited<ReturnType<typeof buildAdminSnapshot>>;
