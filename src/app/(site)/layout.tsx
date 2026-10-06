import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getSiteInfo } from "@/services/contentService";

/** Shared chrome (navbar + footer) for every public page. */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteInfo();

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-cream focus:px-4 focus:py-2 focus:text-void"
      >
        Saltar al contenido
      </a>
      <Navbar navigation={site.navigation} joinCta={site.joinCta} />
      <main id="contenido">{children}</main>
      <Footer site={site} />
    </>
  );
}
