import type { Metadata } from "next";
import { NewsArchive } from "@/components/news/NewsArchive";
import { NewsOfTheDay } from "@/components/news/NewsOfTheDay";
import { NewsShowcase } from "@/components/news/NewsShowcase";
import { SubscribeForm } from "@/components/news/SubscribeForm";
import { Section } from "@/components/ui/Section";
import { getNews, getNewsOfTheDay, getSiteInfo } from "@/services/contentService";

export const metadata: Metadata = {
  title: "Newsletter | Space Makers",
  description: "Noticias, eventos y competencias de Space Makers, y una nota del día de las agencias espaciales.",
};

/** Stories on the front page: one lead plus five on the side. */
const FRONT_PAGE_STORIES = 6;

export default async function NewsletterPage() {
  const [news, newsOfTheDay, site] = await Promise.all([getNews(), getNewsOfTheDay(), getSiteInfo()]);

  const today = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeZone: site.timeZone,
  }).format(new Date());

  const frontPage = news.slice(0, FRONT_PAGE_STORIES);
  const older = news.slice(FRONT_PAGE_STORIES);

  return (
    <>
      <header className="container-page pt-8 lg:pt-12">
        <h1 className="font-headline text-h1 text-gold">Newsletter</h1>
        <p className="label-mono mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 border-y-4 border-double border-line-strong py-3 text-mist">
          <span>Monterrey, Nuevo León</span>
          <time dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
        </p>
      </header>

      {newsOfTheDay && (
        <div className="mt-6">
          <NewsOfTheDay item={newsOfTheDay} />
        </div>
      )}

      <section aria-label="Portada" className="container-page pt-10 lg:pt-14">
        <NewsShowcase stories={frontPage} />
      </section>

      {older.length > 0 && (
        <Section plain id="archive" title="Archivo" tone="lime" description="Notas anteriores, de la más reciente a la más antigua.">
          <NewsArchive stories={older} />
        </Section>
      )}

      <Section plain id="subscribe" title="Recibe el newsletter" tone="nebula" description="Una nota del día de las agencias espaciales y lo nuevo de Space Makers. Sin cuenta, solo tu correo.">
        <SubscribeForm />
      </Section>
      <div className="pb-14" />
    </>
  );
}
