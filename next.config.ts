import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "www.internee.pk", pathname: "/**" },
      { protocol: "https", hostname: "internee.pk", pathname: "/**" },
      { protocol: "https", hostname: "image.lexica.art", pathname: "/**" },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  async redirects() {
    return [
      { source: "/jobs/public", destination: "/jobs", permanent: false },
      { source: "/internships", destination: "/internship", permanent: false },
      { source: "/internships/:path*", destination: "/internship/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
