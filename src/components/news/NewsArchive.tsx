import { toneStyles } from "@/components/pillars/toneStyles";
import { formatShortDate } from "@/lib/formatDate";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsItem } from "@/types/content";

interface NewsArchiveProps {
  stories: NewsItem[];
}

/** Compact list: date, title, category. */
export function NewsArchive({ stories }: NewsArchiveProps) {
  return (
    <ul className="border-t border-line">
      {stories.map((item) => (
        <li
          key={item.id}
          className="grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1 border-b border-line py-4 sm:grid-cols-[8rem_1fr_9rem] sm:items-baseline"
        >
          <time dateTime={item.publishedAt} className="label-mono text-mist">
            {formatShortDate(item.publishedAt)}
          </time>
          <span className="text-body text-starlight">{item.title}</span>
          <span className={`label-mono col-start-2 sm:col-start-auto sm:text-right ${toneStyles[newsCategories[item.category].tone].text}`}>
            {newsCategories[item.category].label}
          </span>
        </li>
      ))}
    </ul>
  );
}
