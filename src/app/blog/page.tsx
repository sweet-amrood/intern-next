import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog",
  description: "Career tips, community updates, and practical insights from Intern Next.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Our blog</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-ink md:text-5xl">
            Explore the Intern Next Blog
          </h1>
          <p className="mt-4 text-muted md:text-lg">
            Expert insights on careers, product thinking, and building job-ready skills.
          </p>
        </div>

        <Link
          href={`/blog/${featured.slug}`}
          className="mt-12 block rounded-3xl border border-border bg-surface p-8 transition hover:border-brand/40 md:p-10"
        >
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            Featured
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-3xl text-muted">{featured.excerpt}</p>
          <p className="mt-4 text-sm text-muted">
            {featured.date} · {featured.readTime} read
          </p>
        </Link>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-border bg-surface p-6 hover:border-brand/40"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                {post.category}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{post.title}</h3>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              <p className="mt-4 text-xs text-muted">
                {post.author} · {post.date}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-dark p-8 text-center text-white md:p-12">
          <h2 className="font-display text-3xl font-bold">Build Skills With Practical Insights</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/internship">Explore Internships</Button>
            <Button href="/studentambassadors" variant="secondary" className="border-white/20 bg-transparent text-white hover:bg-white/10">
              Become Ambassador
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
