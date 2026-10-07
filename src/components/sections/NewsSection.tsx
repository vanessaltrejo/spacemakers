import { NewsShowcase } from "@/components/news/NewsShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { NewsItem } from "@/types/content";

/** Stories on stage: one lead plus five on the side. */
const STAGE_STORIES = 6;

interface NewsSectionProps {
  /** Stories sorted newest first. */
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  const stories = news.slice(0, STAGE_STORIES);

  if (stories.length === 0) return null;

  return (
    <section aria-labelledby="news-title" className="container-page pt-12 pb-24 lg:pb-36">
      <SectionHeader title="Newsletter" titleId="news-title" withRule={false} />

      <Reveal className="mt-6 lg:mt-8">
        <NewsShowcase stories={stories} />
      </Reveal>
    </section>
  );
}
