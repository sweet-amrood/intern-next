"use client";

import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SupportChat } from "@/components/layout/SupportChat";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 text-foreground">{children}</main>
      <Footer />
      <SupportChat />
    </>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Shell>{children}</Shell>
      </AuthProvider>
    </ThemeProvider>
  );
}
