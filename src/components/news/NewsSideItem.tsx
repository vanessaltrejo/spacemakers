"use client";

import { motion } from "motion/react";
import { NewsStageCover } from "@/components/news/NewsStageCover";
import { toneStyles } from "@/components/pillars/toneStyles";
import { formatShortDate } from "@/lib/formatDate";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsItem } from "@/types/content";

interface NewsSideItemProps {
  item: NewsItem;
  /** First row: no top padding, so it lines up with the top of the lead cover. */
  flushTop?: boolean;
  onSelect: (id: string) => void;
}

/** Side story: a button that brings the story to the lead slot when pressed. */
export function NewsSideItem({ item, flushTop = false, onSelect }: NewsSideItemProps) {
  const toneStyle = toneStyles[newsCategories[item.category].tone];

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      aria-label={`Ver en grande: ${item.title}`}
      className={`group grid w-full cursor-pointer grid-cols-[7.5rem_1fr] items-center gap-4 pb-5 text-left min-[480px]:grid-cols-[13rem_1fr] min-[480px]:gap-5 sm:grid-cols-[15rem_1fr] ${
        flushTop ? "" : "pt-5"
      }`}
    >
      <div className="relative aspect-[900/430]">
        <NewsStageCover item={item} />
      </div>

      {/* Keyed by story: when the slot changes hands, the new text fades in. */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <time dateTime={item.publishedAt} className={`label-mono block ${toneStyle.text}`}>
          {formatShortDate(item.publishedAt)}
        </time>
        <span className="mt-2 block text-body leading-snug font-normal tracking-tight text-starlight transition-colors group-hover:text-gold min-[480px]:text-h2">
          {item.title}
        </span>
        <span className="mt-1 block text-caption text-mist">{item.location}</span>
      </motion.div>
    </button>
  );
}
