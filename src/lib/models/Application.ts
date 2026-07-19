import mongoose, { Schema, models, model, type Model } from "mongoose";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type IApplication = {
  userId: mongoose.Types.ObjectId;
  slug: string;
  trackTitle: string;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  address: string;
  semester: string;
  city: string;
  experience: string;
  portfolio: string;
  linkedin: string;
  motivation: string;
  status: ApplicationStatus;
  reviewedAt: Date | null;
};

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    slug: { type: String, required: true, index: true },
    trackTitle: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    university: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    experience: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    motivation: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    reviewedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

ApplicationSchema.index({ userId: 1, slug: 1, status: 1 });

export const Application: Model<IApplication> =
  (models.Application as Model<IApplication>) ||
  model<IApplication>("Application", ApplicationSchema);
