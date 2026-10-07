import { redirect } from "next/navigation";
import { RoverDashboard } from "@/features/rover-dashboard/components/RoverDashboard";
import { getSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  if (!(await getSession())) redirect("/login");

  return <RoverDashboard />;
}
