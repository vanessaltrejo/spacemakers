import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { JoinCta } from "@/components/sections/JoinCta";
import { NewsSection } from "@/components/sections/NewsSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { getHomeContent } from "@/services/contentService";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <Hero content={content.hero} />
      <About content={content.about} />
      <StatsSection stats={content.stats} />
      <PartnersMarquee partners={content.partners} />
      <PillarsSection pillars={content.pillars} />
      <JoinCta content={content.recruitment} />
      <NewsSection news={content.news} />
    </>
  );
}
