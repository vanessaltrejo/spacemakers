import type { ReactNode } from "react";
import { DashboardSidebar } from "@/features/rover-dashboard/components/DashboardSidebar";

interface DashboardShellProps {
  /** Signed-in username, or null when there is no session. */
  username: string | null;
  children: ReactNode;
}

/** Sidebar + content offset. Lives in the feature folder so its classes are in the dashboard's Tailwind build. */
export function DashboardShell({ username, children }: DashboardShellProps) {
  return (
    <>
      <DashboardSidebar username={username} />
      <div className="pl-16 md:pl-56">{children}</div>
    </>
  );
}
