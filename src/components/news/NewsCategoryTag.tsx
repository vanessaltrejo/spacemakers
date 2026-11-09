import { toneStyles } from "@/components/pillars/toneStyles";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsCategory } from "@/types/content";

interface NewsCategoryTagProps {
  category: NewsCategory;
}

/** Category name in the category color. */
export function NewsCategoryTag({ category }: NewsCategoryTagProps) {
  const { label, tone } = newsCategories[category];
  return <span className={`label-mono ${toneStyles[tone].text}`}>{label}</span>;
}
