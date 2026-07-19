import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <article className="container-page max-w-3xl py-16 md:py-20 prose-headings:font-display">
        <h1 className="font-display text-4xl font-extrabold text-ink">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted">Last updated: July 2026</p>
        <div className="mt-8 space-y-5 text-muted leading-relaxed">
          <p>
            By accessing Intern Next you agree to use the platform lawfully and respectfully. You
            are responsible for the accuracy of information you submit during applications,
            task submissions, and profile updates.
          </p>
          <p>
            Internship placements, certificates, and job listings are subject to eligibility and
            review. Demo accounts in this rebuild store data locally in your browser only.
          </p>
          <p>
            Content on Intern Next is protected. You may not scrape, resell, or misrepresent
            certificates or affiliations without written permission.
          </p>
          <p>
            Questions: contact issues@internee.pk or +92 312 3023645.
          </p>
        </div>
      </article>
    </div>
  );
}
