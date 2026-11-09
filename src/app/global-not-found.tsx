import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { SiteDocument } from "@/components/layout/SiteDocument";

export const metadata: Metadata = {
  title: "Página no encontrada | Space Makers",
};

/** 404 for URLs that match no route at all (the app has several root layouts, so Next needs this one). */
export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFoundContent />
    </SiteDocument>
  );
}
