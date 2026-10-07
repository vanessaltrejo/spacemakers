import { Navbar } from "@/components/layout/Navbar";
import { SiteDocument, siteMetadata, siteViewport } from "@/components/layout/SiteDocument";
import { getSiteInfo } from "@/services/contentService";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/** Root layout for auth pages: the navbar only, no footer. */
export default async function AuthLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteInfo();

  return (
    <SiteDocument>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-cream focus:px-4 focus:py-2 focus:text-void"
      >
        Saltar al contenido
      </a>
      <Navbar navigation={site.navigation} joinCta={site.joinCta} />
      <main id="contenido">{children}</main>
    </SiteDocument>
  );
}
