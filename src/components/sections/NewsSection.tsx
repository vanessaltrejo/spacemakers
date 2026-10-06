import { NewsCarousel } from "@/components/news/NewsCarousel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { NewsItem } from "@/types/content";

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <section aria-labelledby="news-title" className="container-page pt-24 pb-16 lg:pt-36 lg:pb-22">
      <NewsCarousel
        news={news}
        header={<SectionHeader title="Newsletter" titleId="news-title" withRule={false} />}
      />
    </section>
  );
}
