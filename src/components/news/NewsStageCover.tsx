"use client";

import { motion } from "motion/react";
import { NewsCover } from "@/components/news/NewsCover";
import { toneStyles } from "@/components/pillars/toneStyles";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsItem } from "@/types/content";

/** Shared by the lead and side covers so the hand-off between slots feels like one gesture. */
const COVER_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;

interface NewsStageCoverProps {
  item: NewsItem;
  priority?: boolean;
}

/**
 * Framed cover that travels between the lead slot and the side slots (`layoutId`).
 * It fills its (relative, sized) slot; lead and side slots share one aspect ratio
 * so the photo is never stretched while it moves.
 */
export function NewsStageCover({ item, priority = false }: NewsStageCoverProps) {
  const toneStyle = toneStyles[newsCategories[item.category].tone];

  return (
    <motion.div
      layoutId={`news-cover-${item.id}`}
      transition={COVER_TRANSITION}
      className="absolute inset-0 overflow-hidden border border-line transition-colors group-hover:border-line-strong"
    >
      <NewsCover item={item} priority={priority} sizes="(min-width: 1024px) 55vw, 100vw" />
      <span aria-hidden="true" className={`absolute top-0 left-0 h-0.5 w-16 ${toneStyle.background}`} />
    </motion.div>
  );
}
