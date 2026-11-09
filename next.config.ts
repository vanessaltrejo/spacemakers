import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Several root layouts, so unmatched URLs need an explicit 404 page (app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
  // Colaboraciones now lives inside the Ciencia y Colabs page.
  async redirects() {
    return [{ source: "/colaboraciones", destination: "/ciencia#colaboraciones", permanent: false }];
  },
  // Dashboard datasets are read from disk at request time (see dashboardDataService.ts).
  outputFileTracingIncludes: {
    "/api/dashboard/*": ["./src/features/rover-dashboard/data/**/*"],
  },
};

export default nextConfig;
