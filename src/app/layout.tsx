import type { Metadata } from "next";
import { Great_Vibes, Manrope, Syne } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const signature = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Intern Next | Pakistan's Virtual Internship Platform",
    template: "%s | Intern Next",
  },
  description:
    "Build skills, get experience, and land your job with Pakistan's largest virtual internship platform. Task portal, certifications, job portal, and AI career tools.",
  keywords: [
    "virtual internship",
    "Pakistan internships",
    "Intern Next",
    "task portal",
    "tech careers",
  ],
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
  },
  openGraph: {
    title: "Intern Next — Unlock Your Career Potential",
    description:
      "Pakistan's virtual internship platform for hands-on skills, certifications, and job readiness.",
    url: "https://www.internee.pk",
    siteName: "Intern Next",
    locale: "en_PK",
    type: "website",
  },
};

const themeInitScript = `
(function() {
  try {
    var key = 'internee-theme';
    var stored = localStorage.getItem(key);
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${signature.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
