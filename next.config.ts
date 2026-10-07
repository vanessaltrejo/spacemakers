import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dashboard datasets are read from disk at request time (see dashboardDataService.ts).
  outputFileTracingIncludes: {
    "/api/dashboard/*": ["./src/features/rover-dashboard/data/**/*"],
  },
};

export default nextConfig;
