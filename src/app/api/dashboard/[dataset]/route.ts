import { isDashboardDataset, readDashboardDataset } from "@/features/rover-dashboard/services/dashboardDataService";
import { getSession } from "@/lib/auth/session";

export async function GET(_request: Request, { params }: RouteContext<"/api/dashboard/[dataset]">) {
  if (!(await getSession())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { dataset } = await params;
  if (!isDashboardDataset(dataset)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return new Response(await readDashboardDataset(dataset), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, no-store" },
  });
}
