import { toneStyles } from "@/components/pillars/toneStyles";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsCategory, NewsDetail } from "@/types/content";

interface NewsDetailListProps {
  details: NewsDetail[];
  category: NewsCategory;
}

const iconPaths: Record<NewsDetail["kind"], string[]> = {
  // map pin
  location: ["M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z", "M12 12.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"],
  // chain link
  link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"],
  // calendar with clock hands
  schedule: ["M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z", "M8 3.5V8M16 3.5V8M4 11h16", "M12 13.5V16l1.8 1.2"],
};

const mapSearchUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** Icon + text rows (place, link, schedule). Rows with a destination are links. */
export function NewsDetailList({ details, category }: NewsDetailListProps) {
  const toneStyle = toneStyles[newsCategories[category].tone];

  return (
    <ul className="space-y-3 text-sm">
      {details.map((detail) => {
        const href = detail.href ?? (detail.kind === "location" ? mapSearchUrl(detail.label) : undefined);
        const content = (
          <>
            <svg
              viewBox="0 0 24 24"
              className={`mt-0.5 size-4 shrink-0 ${toneStyle.text}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {iconPaths[detail.kind].map((path) => (
                <path key={path} d={path} />
              ))}
            </svg>
            <span>{detail.label}</span>
          </>
        );

        return (
          <li key={`${detail.kind}-${detail.label}`}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-starlight/90 underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold"
              >
                {content}
              </a>
            ) : (
              <p className="flex gap-3 text-starlight/90">{content}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
