import { NewsCategoryTag } from "@/components/news/NewsCategoryTag";
import { NewsDetailList } from "@/components/news/NewsDetailList";
import type { NewsItem } from "@/types/content";

/** How many paragraphs of the story are shown under the lead cover. */
const DESCRIPTION_PARAGRAPHS = 2;

interface NewsLeadStoryProps {
  item: NewsItem;
}

/** Text of the lead story: category, title, description and quick facts on the right. */
export function NewsLeadStory({ item }: NewsLeadStoryProps) {
  const hasDetails = Boolean(item.details?.length);

  return (
    <article className="pt-5">
      <NewsCategoryTag category={item.category} />
      <h3 className="mt-3 text-h1 leading-tight font-normal text-starlight">{item.title}</h3>

      <div className={`mt-4 grid gap-6 ${hasDetails ? "md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10" : ""}`}>
        <div className="max-w-2xl space-y-3 text-body text-mist">
          {(item.body ?? [item.excerpt]).slice(0, DESCRIPTION_PARAGRAPHS).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {item.details && <NewsDetailList details={item.details} />}
      </div>
    </article>
  );
}
