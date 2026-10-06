import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { JoinCta } from "@/components/sections/JoinCta";
import { NewsSection } from "@/components/sections/NewsSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { getHomeContent, getSiteInfo } from "@/services/contentService";

export default async function HomePage() {
  const [site, content] = await Promise.all([getSiteInfo(), getHomeContent()]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-cream focus:px-4 focus:py-2 focus:text-void"
      >
        Saltar al contenido
      </a>
      <Navbar navigation={site.navigation} joinCta={site.joinCta} />
      <main id="contenido">
        <Hero title={site.tagline} />
        <About content={content.about} />
        <PartnersMarquee partners={content.partners} />
        <PillarsSection pillars={content.pillars} />
        <StatsSection stats={content.stats} />
        <JoinCta content={content.recruitment} />
        <NewsSection news={content.news} />
      </main>
      <Footer site={site} />
    </>
  );
}
