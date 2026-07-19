import { Schema, models, model, type Model } from "mongoose";

export type AppliedJobDoc = {
  jobId: string;
  title: string;
  company: string;
  appliedAt: Date;
};

export type TaskFileDoc = {
  name: string;
  url: string;
  size: number;
};

export type TaskDoc = {
  id: string;
  title: string;
  module: string;
  due: string;
  status: "todo" | "submitted" | "approved";
  description: string;
  githubUrl: string;
  files: TaskFileDoc[];
  submissionNote: string;
  submittedAt: Date | null;
  trackSlug: string;
};

export type CertificateDoc = {
  id: string;
  title: string;
  status: "earned" | "pending";
  issuedAt: string | null;
  trackSlug: string;
};

export type EnrollmentDoc = {
  slug: string;
  title: string;
  section: number;
  enrolledAt: Date;
  skills: string[];
  tasks: TaskDoc[];
  certificates: CertificateDoc[];
};

export type UserRole = "student" | "admin";

export type IUser = {
  name: string;
  email: string;
  passwordHash?: string | null;
  googleId?: string | null;
  authProvider: "local" | "google" | "both";
  role: UserRole;
  roles: UserRole[];
  skills: string[];
  portfolio: string;
  bio: string;
  internship: string;
  enrollmentSlug: string;
  enrollmentSection: number | null;
  enrolledAt: Date | null;
  enrollments: EnrollmentDoc[];
  appliedJobs: AppliedJobDoc[];
  tasks: TaskDoc[];
  certificates: CertificateDoc[];
  lastReminderAt?: Date | null;
};

const AppliedJobSchema = new Schema<AppliedJobDoc>(
  {
    jobId: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    appliedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const TaskFileSchema = new Schema<TaskFileDoc>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
  },
  { _id: false },
);

const TaskSchema = new Schema<TaskDoc>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    module: { type: String, required: true },
    due: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "submitted", "approved"],
      default: "todo",
    },
    description: { type: String, required: true },
    githubUrl: { type: String, default: "" },
    files: { type: [TaskFileSchema], default: [] },
    submissionNote: { type: String, default: "" },
    submittedAt: { type: Date, default: null },
    trackSlug: { type: String, default: "" },
  },
  { _id: false },
);

const CertificateSchema = new Schema<CertificateDoc>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["earned", "pending"], required: true },
    issuedAt: { type: String, default: null },
    trackSlug: { type: String, default: "" },
  },
  { _id: false },
);

const EnrollmentSchema = new Schema<EnrollmentDoc>(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    section: { type: Number, required: true },
    enrolledAt: { type: Date, required: true },
    skills: { type: [String], default: [] },
    tasks: { type: [TaskSchema], default: [] },
    certificates: { type: [CertificateSchema], default: [] },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, default: null },
    googleId: { type: String, default: null, index: true },
    authProvider: {
      type: String,
      enum: ["local", "google", "both"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      index: true,
    },
    roles: {
      type: [String],
      enum: ["student", "admin"],
      default: ["student"],
    },
    skills: { type: [String], default: [] },
    portfolio: { type: String, default: "" },
    bio: { type: String, default: "" },
    internship: { type: String, default: "" },
    enrollmentSlug: { type: String, default: "" },
    enrollmentSection: { type: Number, default: null },
    enrolledAt: { type: Date, default: null },
    enrollments: { type: [EnrollmentSchema], default: [] },
    appliedJobs: { type: [AppliedJobSchema], default: [] },
    tasks: { type: [TaskSchema], default: [] },
    certificates: { type: [CertificateSchema], default: [] },
    lastReminderAt: { type: Date, default: null },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV !== "production" && models.User) {
  delete models.User;
}

export const User: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);
