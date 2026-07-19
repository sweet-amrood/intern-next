"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { RolePickerModal } from "@/components/auth/RolePickerModal";

const USER_CACHE_KEY = "internee_user_v1";

export type Workspace = "student" | "admin";

export type AppliedJob = {
  jobId: string;
  appliedAt: string;
  title: string;
  company: string;
};

export type UserTask = {
  id: string;
  title: string;
  module: string;
  due: string;
  status: "todo" | "submitted" | "approved";
  description: string;
  githubUrl: string;
  files: Array<{ name: string; url: string; size: number }>;
  submissionNote: string;
  submittedAt: string | null;
  trackSlug: string;
};

export type UserCertificate = {
  id: string;
  title: string;
  status: "earned" | "pending";
  issuedAt: string | null;
  trackSlug: string;
};

export type EnrollmentInfo = {
  slug: string;
  title: string;
  section: number;
  enrolledAt: string;
  skills: string[];
  canDropCourse: boolean;
  dropDeadline: string | null;
  tasks: UserTask[];
  certificates: UserCertificate[];
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  roles: Array<"student" | "admin">;
  hasBothRoles: boolean;
  skills: string[];
  portfolio: string;
  bio: string;
  internship: string;
  enrollmentSlug: string;
  enrollmentSection: number | null;
  enrolledAt: string | null;
  enrollments: EnrollmentInfo[];
  enrollmentCount: number;
  maxEnrollments: number;
  canEnrollMore: boolean;
  canDropCourse: boolean;
  dropDeadline: string | null;
};

export type InternshipApplication = {
  id: string;
  slug: string;
  trackTitle: string;
  status: "pending" | "approved" | "rejected";
  fullName: string;
  email: string;
  phone: string;
  university: string;
  semester: string;
  city: string;
  createdAt?: string;
};

type FullUser = UserProfile & {
  appliedJobs: AppliedJob[];
  tasks: UserTask[];
  certificates: UserCertificate[];
};

type AuthContextValue = {
  user: UserProfile | null;
  appliedJobs: AppliedJob[];
  tasks: UserTask[];
  certificates: UserCertificate[];
  applications: InternshipApplication[];
  ready: boolean;
  error: string | null;
  isEnrolled: boolean;
  signIn: (email: string, password: string) => Promise<string | false>;
  signUp: (name: string, email: string, password: string) => Promise<string | false>;
  signInWithGoogle: (credential: string) => Promise<string | false>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<boolean>;
  applyToJob: (job: { id: string; title: string; company: string }) => Promise<boolean>;
  dropCourse: (reason: string, slug?: string) => Promise<boolean>;
  submitTask: (payload: {
    taskId: string;
    githubUrl: string;
    submissionNote: string;
    files: File[];
  }) => Promise<boolean>;
  hasApplied: (jobId: string) => boolean;
  refreshApplications: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  activeWorkspace: Workspace | null;
  hasBothRoles: boolean;
  selectWorkspace: (workspace: Workspace) => void;
  switchWorkspace: (workspace: Workspace) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function splitUser(full: FullUser | null) {
  if (!full) {
    return {
      user: null as UserProfile | null,
      appliedJobs: [] as AppliedJob[],
      tasks: [] as UserTask[],
      certificates: [] as UserCertificate[],
    };
  }
  const { appliedJobs, tasks, certificates, ...user } = full;
  return { user, appliedJobs, tasks, certificates };
}

function readCache(): FullUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(USER_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FullUser;
  } catch {
    return null;
  }
}

function writeCache(user: FullUser | null) {
  if (typeof window === "undefined") return;
  try {
    if (!user) sessionStorage.removeItem(USER_CACHE_KEY);
    else sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [full, setFull] = useState<FullUser | null>(null);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);

  const applyFull = useCallback((payload: FullUser | null) => {
    if (!payload) {
      setFull(null);
      writeCache(null);
      setActiveWorkspace(null);
      return;
    }
    const roles = Array.isArray(payload.roles)
      ? payload.roles.filter((r): r is "student" | "admin" => r === "student" || r === "admin")
      : payload.role === "admin"
        ? (["admin"] as Array<"student" | "admin">)
        : (["student"] as Array<"student" | "admin">);
    const uniqueRoles = Array.from(new Set(roles));
    const both = uniqueRoles.includes("admin") && uniqueRoles.includes("student");
    const normalized: FullUser = {
      ...payload,
      role: uniqueRoles.includes("admin") && !uniqueRoles.includes("student") ? "admin" : "student",
      roles: uniqueRoles.length ? uniqueRoles : ["student"],
      hasBothRoles: both,
      enrollments: payload.enrollments ?? [],
      enrollmentCount: payload.enrollmentCount ?? payload.enrollments?.length ?? 0,
      maxEnrollments: payload.maxEnrollments ?? 3,
      canEnrollMore: payload.canEnrollMore ?? (payload.enrollments?.length ?? 0) < 3,
      canDropCourse: Boolean(payload.canDropCourse),
      dropDeadline: payload.dropDeadline ?? null,
      tasks: (payload.tasks ?? []).map((t) => ({
        ...t,
        githubUrl: t.githubUrl ?? "",
        files: t.files ?? [],
        submissionNote: t.submissionNote ?? "",
        submittedAt: t.submittedAt ?? null,
        trackSlug: t.trackSlug ?? "",
      })),
      certificates: (payload.certificates ?? []).map((c) => ({
        ...c,
        trackSlug: c.trackSlug ?? "",
      })),
    };
    setFull(normalized);
    writeCache(normalized);
    if (!both) {
      setActiveWorkspace(
        uniqueRoles.includes("admin") && !uniqueRoles.includes("student")
          ? "admin"
          : "student",
      );
    }
  }, []);

  const refreshApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/internships/apply", { credentials: "include" });
      if (!res.ok) {
        setApplications([]);
        return;
      }
      const data = await res.json();
      setApplications(data.applications ?? []);
    } catch {
      setApplications([]);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      applyFull(data.user ?? null);
      if (data.user) void refreshApplications();
      else setApplications([]);
    } catch {
      applyFull(null);
      setApplications([]);
    }
  }, [applyFull, refreshApplications]);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setFull(cached);
      setReady(true);
    }

    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (!alive) return;
        applyFull(data.user ?? null);
        if (data.user) {
          const appsRes = await fetch("/api/internships/apply", { credentials: "include" });
          if (appsRes.ok) {
            const appsData = await appsRes.json();
            if (alive) setApplications(appsData.applications ?? []);
          }
        } else {
          setApplications([]);
        }
      } catch {
        if (alive) {
          applyFull(null);
          setApplications([]);
        }
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [applyFull]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Sign in failed");
          return false;
        }
        applyFull(data.user);
        void refreshApplications();
        if (data.user?.hasBothRoles || data.redirectTo === "__select__") {
          return "__select__";
        }
        return (
          (typeof data.redirectTo === "string" && data.redirectTo) ||
          (data.user?.role === "admin" ? "/admin" : "/dashboard")
        );
      } catch {
        setError("Could not reach server. Is MongoDB running?");
        return false;
      }
    },
    [applyFull, refreshApplications],
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      setError(null);
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Sign up failed");
          return false;
        }
        applyFull(data.user);
        setApplications([]);
        return (
          (typeof data.redirectTo === "string" && data.redirectTo) || "/dashboard"
        );
      } catch {
        setError("Could not reach server. Is MongoDB running?");
        return false;
      }
    },
    [applyFull],
  );

  const signInWithGoogle = useCallback(
    async (credential: string) => {
      setError(null);
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ credential }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Google sign-in failed");
          return false;
        }
        applyFull(data.user);
        void refreshApplications();
        if (data.user?.hasBothRoles || data.redirectTo === "__select__") {
          return "__select__";
        }
        return (
          (typeof data.redirectTo === "string" && data.redirectTo) ||
          (data.user?.role === "admin" ? "/admin" : "/dashboard")
        );
      } catch {
        setError("Could not complete Google sign-in.");
        return false;
      }
    },
    [applyFull, refreshApplications],
  );

  const selectWorkspace = useCallback(
    (workspace: Workspace) => {
      setActiveWorkspace(workspace);
      router.replace(workspace === "admin" ? "/admin" : "/dashboard");
    },
    [router],
  );

  const switchWorkspace = useCallback(
    (workspace: Workspace) => {
      setActiveWorkspace(workspace);
      router.push(workspace === "admin" ? "/admin" : "/dashboard");
    },
    [router],
  );

  const signOut = useCallback(async () => {
    setError(null);
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setActiveWorkspace(null);
    applyFull(null);
    setApplications([]);
  }, [applyFull]);

  const updateProfile = useCallback(
    async (patch: Partial<UserProfile>) => {
      setError(null);
      try {
        const res = await fetch("/api/user/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(patch),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Update failed");
          return false;
        }
        applyFull(data.user);
        return true;
      } catch {
        setError("Could not update profile");
        return false;
      }
    },
    [applyFull],
  );

  const applyToJob = useCallback(
    async (job: { id: string; title: string; company: string }) => {
      setError(null);
      try {
        const res = await fetch("/api/user/apply-job", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(job),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Apply failed");
          return false;
        }
        applyFull(data.user);
        return true;
      } catch {
        setError("Could not apply to job");
        return false;
      }
    },
    [applyFull],
  );

  const dropCourse = useCallback(
    async (reason: string, slug?: string) => {
      setError(null);
      try {
        const res = await fetch("/api/internships/drop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ reason, slug }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Could not drop course");
          return false;
        }
        applyFull(data.user);
        return true;
      } catch {
        setError("Could not drop course");
        return false;
      }
    },
    [applyFull],
  );

  const submitTask = useCallback(
    async (payload: {
      taskId: string;
      githubUrl: string;
      submissionNote: string;
      files: File[];
    }) => {
      setError(null);
      try {
        const form = new FormData();
        form.append("taskId", payload.taskId);
        form.append("githubUrl", payload.githubUrl);
        form.append("submissionNote", payload.submissionNote);
        payload.files.forEach((f) => form.append("files", f));

        const res = await fetch("/api/user/tasks", {
          method: "PATCH",
          credentials: "include",
          body: form,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Task update failed");
          return false;
        }
        applyFull(data.user);
        return true;
      } catch {
        setError("Could not update task");
        return false;
      }
    },
    [applyFull],
  );

  const { user, appliedJobs, tasks, certificates } = splitUser(full);
  const isEnrolled = Boolean(user?.enrollments?.length || user?.enrollmentSlug);
  const hasBothRoles = Boolean(user?.hasBothRoles);

  const hasApplied = useCallback(
    (jobId: string) => appliedJobs.some((j) => j.jobId === jobId),
    [appliedJobs],
  );

  const value = useMemo(
    () => ({
      user,
      appliedJobs,
      tasks,
      certificates,
      applications,
      ready,
      error,
      isEnrolled,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      applyToJob,
      dropCourse,
      submitTask,
      hasApplied,
      refreshApplications,
      clearError: () => setError(null),
      refreshUser,
      activeWorkspace,
      hasBothRoles,
      selectWorkspace,
      switchWorkspace,
    }),
    [
      user,
      appliedJobs,
      tasks,
      certificates,
      applications,
      ready,
      error,
      isEnrolled,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      applyToJob,
      dropCourse,
      submitTask,
      hasApplied,
      refreshApplications,
      refreshUser,
      activeWorkspace,
      hasBothRoles,
      selectWorkspace,
      switchWorkspace,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {ready && hasBothRoles && !activeWorkspace && (
        <RolePickerModal onSelect={selectWorkspace} />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
