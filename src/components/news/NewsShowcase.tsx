"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { NewsLeadStory } from "@/components/news/NewsLeadStory";
import { NewsSideItem } from "@/components/news/NewsSideItem";
import { NewsStageCover } from "@/components/news/NewsStageCover";
import type { NewsItem } from "@/types/content";

/** Distance from the viewport top under which the lead is scrolled back into view (sticky navbar). */
const LEAD_VISIBLE_OFFSET = 80;

interface NewsShowcaseProps {
  /** Stories to show; the first one starts as the lead. */
  stories: NewsItem[];
}

/**
 * "Stage Manager" newsletter: one large lead story plus a column of smaller ones.
 * Pressing a side story swaps it with the lead — the covers glide between slots —
 * so no story needs its own page.
 */
export function NewsShowcase({ stories }: NewsShowcaseProps) {
  const [order, setOrder] = useState<string[]>(() => stories.map((story) => story.id));
  const leadRef = useRef<HTMLDivElement>(null);

  const byId = new Map(stories.map((story) => [story.id, story]));
  const ordered = order.flatMap((id) => byId.get(id) ?? []);
  const [lead, ...side] = ordered;

  const bringToLead = (id: string) => {
    setOrder((current) => {
      const slot = current.indexOf(id);
      if (slot < 1) return current;
      const next = [...current];
      [next[0], next[slot]] = [next[slot], next[0]];
      return next;
    });

    // On narrow screens the lead sits above the list: keep it in sight after the swap.
    const top = leadRef.current?.getBoundingClientRect().top ?? 0;
    if (top < LEAD_VISIBLE_OFFSET) leadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!lead) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[62fr_38fr] lg:gap-12">
      <div ref={leadRef}>
        <div className="relative aspect-[900/430]">
          <NewsStageCover key={lead.id} item={lead} priority />
        </div>

        {/* Every story is stacked in the same cell so the block keeps the height of the tallest one. */}
        <div className="grid" aria-live="polite">
          {stories.map((story) => {
            const isLead = story.id === lead.id;
            return (
              <motion.div
                key={story.id}
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: isLead ? 1 : 0, y: isLead ? 0 : 10 }}
                transition={{ duration: 0.5, delay: isLead ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
                inert={!isLead}
              >
                <NewsLeadStory item={story} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <ul className="divide-y divide-line">
        {side.map((story, index) => (
          <li key={story.id}>
            <NewsSideItem item={story} flushTop={index === 0} onSelect={bringToLead} />
          </li>
        ))}
      </ul>
    </div>
  );
}
