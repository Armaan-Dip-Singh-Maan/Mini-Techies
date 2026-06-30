import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      // Safety net so old internal-style paths land on the new home.
      // NOTE: The primary 301 from qa-enterprises.com/mini-techies must be
      // configured on the QA Enterprises side (different domain); see README.
      {
        source: "/mini-techies",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mini-techies/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
