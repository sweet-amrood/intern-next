"use client";

import { useEffect, useState } from "react";
import { EnrollPanel } from "@/components/internship/EnrollPanel";
import { SEATS_PER_SECTION } from "@/data/internships";

export function LiveEnrollAside({ slug, title }: { slug: string; title: string }) {
  const [seatsLeft, setSeatsLeft] = useState(SEATS_PER_SECTION);
  const [openSection, setOpenSection] = useState(1);
  const [seatsPerSection, setSeatsPerSection] = useState(SEATS_PER_SECTION);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch("/api/internships");
      const data = await res.json();
      const match = (data.internships ?? []).find(
        (i: { slug: string }) => i.slug === slug,
      );
      if (alive && match) {
        setSeatsLeft(match.seatsLeft);
        setOpenSection(match.openSection);
        setSeatsPerSection(match.seatsPerSection);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  return (
    <EnrollPanel
      slug={slug}
      title={title}
      seatsLeft={seatsLeft}
      openSection={openSection}
      seatsPerSection={seatsPerSection}
    />
  );
}
