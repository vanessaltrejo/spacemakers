import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Control de Kyutech · SpaceMakers",
};

/** Placeholder: intentionally blank until the Kyutech control view is designed. */
export default async function KyutechControlPage() {
  if (!(await getSession())) redirect("/login");

  return <main />;
}
