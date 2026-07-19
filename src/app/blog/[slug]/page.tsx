import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPost } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-mesh min-h-screen pb-20">
      <div className="container-page max-w-3xl py-12 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-brand">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {post.author} · {post.date} · {post.readTime} read
        </p>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-ink md:text-lg">
          {post.content.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
