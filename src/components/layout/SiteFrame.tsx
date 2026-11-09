import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteInfo } from "@/services/contentService";

interface SiteFrameProps {
  /** Pages without a footer (login) leave this off. */
  withFooter?: boolean;
  children: ReactNode;
}

/** Skip link, sidebar, main content and optional footer shared by the public root layouts. */
export async function SiteFrame({ withFooter = false, children }: SiteFrameProps) {
  const site = await getSiteInfo();

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-cream focus:px-4 focus:py-2 focus:text-void"
      >
        Saltar al contenido
      </a>
      <SiteShell navigation={site.navigation}>
        <main id="contenido">{children}</main>
        {withFooter && <Footer site={site} />}
      </SiteShell>
    </>
  );
}
