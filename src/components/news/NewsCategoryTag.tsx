import { toneStyles } from "@/components/pillars/toneStyles";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsCategory } from "@/types/content";

interface NewsCategoryTagProps {
  category: NewsCategory;
}

/** Colored dot + category name, in the telemetry voice of the site. */
export function NewsCategoryTag({ category }: NewsCategoryTagProps) {
  const { label, tone } = newsCategories[category];
  const toneStyle = toneStyles[tone];

  return (
    <span className={`label-mono inline-flex items-center gap-2 ${toneStyle.text}`}>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${toneStyle.background}`} />
      {label}
    </span>
  );
}
