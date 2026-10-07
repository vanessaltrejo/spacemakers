import type { Metadata, Viewport } from "next";
import { DashboardShell } from "@/features/rover-dashboard/components/DashboardShell";
import { fontVariables } from "@/lib/fonts";
import { getSession } from "@/lib/auth/session";
import "@/features/rover-dashboard/styles/dashboard.css";

export const metadata: Metadata = {
  title: "Control de Rover · SpaceMakers",
  description: "Control de Rover y gestión de backlog de ingeniería para URC 2027.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

/**
 * Separate root layout: the dashboard's global CSS never loads on the public site and vice versa.
 * Moving between the two triggers a full page load, which is expected after login/logout.
 */
export default async function DashboardRootLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();

  return (
    <html lang="es" className={`dark ${fontVariables} antialiased`}>
      <body suppressHydrationWarning>
        <DashboardShell username={session?.username ?? null}>{children}</DashboardShell>
      </body>
    </html>
  );
}
