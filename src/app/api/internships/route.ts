import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Track, SEATS_PER_SECTION, sectionForCount, seatsLeftInOpenSection } from "@/lib/models/Track";
import { internships } from "@/data/internships";

export async function GET() {
  try {
    await connectDB();
    const tracks = await Track.find({}).lean();
    const bySlug = new Map(tracks.map((t) => [t.slug, t]));

    const data = internships.map((item) => {
      const live = bySlug.get(item.slug);
      const enrolledCount = live?.enrolledCount ?? 0;
      const seatsPerSection = live?.seatsPerSection ?? SEATS_PER_SECTION;
      return {
        ...item,
        enrolledCount,
        openSection: sectionForCount(enrolledCount, seatsPerSection),
        seatsLeft: seatsLeftInOpenSection(enrolledCount, seatsPerSection),
        seatsPerSection,
      };
    });

    return NextResponse.json({ internships: data });
  } catch (error) {
    console.error("internships list error", error);
    return NextResponse.json(
      {
        internships: internships.map((item) => ({
          ...item,
          enrolledCount: 0,
          openSection: 1,
          seatsLeft: SEATS_PER_SECTION,
          seatsPerSection: SEATS_PER_SECTION,
        })),
      },
      { status: 200 },
    );
  }
}
