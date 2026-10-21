import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/Resume.pdf",
        destination: "/resume.pdf",
      },
    ];
  },
};

export default nextConfig;
