import { Schema, models, model, type Model } from "mongoose";

export const SEATS_PER_SECTION = 50;

export type ITrack = {
  slug: string;
  title: string;
  enrolledCount: number;
  seatsPerSection: number;
};

const TrackSchema = new Schema<ITrack>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    enrolledCount: { type: Number, default: 0 },
    seatsPerSection: { type: Number, default: SEATS_PER_SECTION },
  },
  { timestamps: true },
);

export const Track: Model<ITrack> =
  (models.Track as Model<ITrack>) || model<ITrack>("Track", TrackSchema);

export function sectionForCount(enrolledCount: number, seatsPerSection = SEATS_PER_SECTION) {
  return Math.floor(enrolledCount / seatsPerSection) + 1;
}

export function seatsLeftInOpenSection(
  enrolledCount: number,
  seatsPerSection = SEATS_PER_SECTION,
) {
  const filled = enrolledCount % seatsPerSection;
  return filled === 0 ? seatsPerSection : seatsPerSection - filled;
}
