import mongoose, { Schema, models, model, type Model } from "mongoose";

export type ICourseDrop = {
  userId: mongoose.Types.ObjectId;
  slug: string;
  trackTitle: string;
  section: number | null;
  reason: string;
  enrolledAt: Date | null;
  droppedAt: Date;
};

const CourseDropSchema = new Schema<ICourseDrop>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    slug: { type: String, required: true },
    trackTitle: { type: String, required: true },
    section: { type: Number, default: null },
    reason: { type: String, required: true, trim: true },
    enrolledAt: { type: Date, default: null },
    droppedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const CourseDrop: Model<ICourseDrop> =
  (models.CourseDrop as Model<ICourseDrop>) ||
  model<ICourseDrop>("CourseDrop", CourseDropSchema);
