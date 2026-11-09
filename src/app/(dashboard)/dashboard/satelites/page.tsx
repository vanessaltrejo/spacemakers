import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Control de Satélite · SpaceMakers",
};

/** Placeholder: intentionally blank until the satellite control view is designed. */
export default async function SatelliteControlPage() {
  if (!(await getSession())) redirect("/login");

  return <main />;
}
