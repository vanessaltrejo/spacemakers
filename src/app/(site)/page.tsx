import { Hero } from "@/components/sections/Hero";
import { NewsOfTheDay } from "@/components/news/NewsOfTheDay";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { getHomeContent, getNewsOfTheDay } from "@/services/contentService";

/** Home: hero, the note of the day and the allies ticker. Everything else lives in its own page. */
export default async function HomePage() {
  const [content, newsOfTheDay] = await Promise.all([getHomeContent(), getNewsOfTheDay()]);

  return (
    <>
      <Hero content={content.hero} />
      {newsOfTheDay && <NewsOfTheDay item={newsOfTheDay} moreHref="/newsletter" />}
      <PartnersMarquee partners={content.partners} />
    </>
  );
}
