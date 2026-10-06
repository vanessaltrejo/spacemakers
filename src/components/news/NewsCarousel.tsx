"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { NewsCard } from "@/components/news/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import type { AccentTone, NewsItem } from "@/types/content";

/** Same four accents used in the stats cards. */
const frameTones: AccentTone[] = ["ember", "orbit", "lime", "nebula"];

interface NewsCarouselProps {
  news: NewsItem[];
  /** Section heading, rendered on the left of the arrow controls. */
  header: ReactNode;
}

interface ArrowButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function ArrowButton({ direction, disabled, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "next" ? "Ver más noticias" : "Ver noticias anteriores"}
      className="flex size-11 items-center justify-center rounded-full border border-line-strong text-starlight transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30"
    >
      <span aria-hidden="true">{direction === "next" ? "→" : "←"}</span>
    </button>
  );
}

/**
 * News slider moved only by its arrows. The track is translated with a transform
 * (not a scroll container), so wheel / trackpad gestures over it always scroll the page.
 */
export function NewsCarousel({ news, header }: NewsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!viewport || !track || !firstCard) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const nextStep = firstCard.getBoundingClientRect().width + gap;
    const hiddenWidth = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const nextMaxIndex = Math.round(hiddenWidth / nextStep);

    setStep(nextStep);
    setMaxIndex(nextMaxIndex);
    setIndex((current) => Math.min(current, nextMaxIndex));
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, [measure]);

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        {header}
        {maxIndex > 0 && (
          <div className="flex shrink-0 gap-2">
            <ArrowButton
              direction="prev"
              disabled={index === 0}
              onClick={() => setIndex((current) => Math.max(0, current - 1))}
            />
            <ArrowButton
              direction="next"
              disabled={index >= maxIndex}
              onClick={() => setIndex((current) => Math.min(maxIndex, current + 1))}
            />
          </div>
        )}
      </div>

      <Reveal className="mt-6 lg:mt-8">
        <div ref={viewportRef} className="overflow-hidden">
          <motion.ul
            ref={trackRef}
            animate={{ x: -index * step }}
            transition={{ type: "spring", stiffness: 220, damping: 32 }}
            className="flex gap-8"
          >
            {news.map((item, position) => (
              <li key={item.id} className="w-full shrink-0 md:w-[calc(50%-1rem)]">
                <NewsCard item={item} tone={frameTones[position % frameTones.length]} />
              </li>
            ))}
          </motion.ul>
        </div>
      </Reveal>
    </>
  );
}
