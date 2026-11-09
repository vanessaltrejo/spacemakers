import Link from "next/link";
import { formatShortDate } from "@/lib/formatDate";
import type { NewsItem } from "@/types/content";

interface NewsOfTheDayProps {
  item: NewsItem;
  /** Optional link to the full newsletter, shown under the story. */
  moreHref?: string;
}

/**
 * Highlighted external story. It is not hosted here: the link goes straight to the agency's
 * press room and opens in a new tab.
 */
export function NewsOfTheDay({ item, moreHref }: NewsOfTheDayProps) {
  if (!item.externalUrl || !item.source) return null;

  return (
    <section aria-labelledby="news-of-the-day" className="bg-cobalt/25">
      <div className="container-page grid gap-4 py-8 lg:grid-cols-[14rem_minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:py-10">
        <div>
          <h2 id="news-of-the-day" className="label-mono text-gold">
            Nota del día
          </h2>
          <p className="label-mono mt-2 text-mist">
            {item.source} · <time dateTime={item.publishedAt}>{formatShortDate(item.publishedAt)}</time>
          </p>
        </div>
        <div className="max-w-3xl">
          <p className="text-h2 font-normal text-starlight">{item.title}</p>
          <p className="mt-2 text-caption text-mist">{item.excerpt}</p>
        </div>
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 justify-self-start border border-gold px-5 text-caption font-medium text-gold transition-colors hover:bg-gold hover:text-void"
        >
          Leer en {item.source}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
        {moreHref && (
          <Link href={moreHref} className="text-caption text-mist transition-colors hover:text-gold lg:col-span-3">
            Ir al newsletter →
          </Link>
        )}
      </div>
    </section>
  );
}
