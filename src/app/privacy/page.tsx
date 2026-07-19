import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="bg-mesh min-h-screen pb-20">
      <article className="container-page max-w-3xl py-16 md:py-20">
        <h1 className="font-display text-4xl font-extrabold text-ink">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated: July 2026</p>
        <div className="mt-8 space-y-5 text-muted leading-relaxed">
          <p>
            Intern Next collects information you provide — such as name, email, phone, and
            application details — to operate internships, learning, and career services.
          </p>
          <p>
            We use data to improve the product, communicate updates, prevent fraud, and support
            certification workflows. Log files may include IP address, browser type, and visit timing.
          </p>
          <p>
            This demo rebuild stores session and profile data in your browser&apos;s localStorage.
            Clear site data anytime to remove it.
          </p>
          <p>
            Contact: issues@internee.pk
          </p>
        </div>
      </article>
    </div>
  );
}
