import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getInternship } from "@/data/internships";
import { InternshipApplyForm } from "@/components/internship/InternshipApplyForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getInternship(slug);
  if (!item) return { title: "Apply" };
  return { title: `Apply · ${item.title}`, description: `Apply for ${item.title} internship` };
}

export default async function InternshipApplyPage({ params }: Props) {
  const { slug } = await params;
  const item = getInternship(slug);
  if (!item) notFound();

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <div className="container-page py-12 md:py-16">
        <Link
          href={`/internship/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {item.title}
        </Link>
        <div className="mt-8 max-w-3xl">
          <InternshipApplyForm slug={item.slug} title={item.title} />
        </div>
      </div>
    </div>
  );
}
