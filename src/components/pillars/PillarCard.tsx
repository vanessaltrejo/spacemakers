"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import { toneStyles } from "@/components/pillars/toneStyles";
import type { Pillar } from "@/types/content";

interface PillarCardProps {
  pillar: Pillar;
  order: number;
  onSelect: (pillar: Pillar) => void;
}

/** Updates CSS variables so a radial "spotlight" follows the cursor across the card. */
const trackPointer = (event: MouseEvent<HTMLElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
};

export function PillarCard({ pillar, order, onSelect }: PillarCardProps) {
  const tone = toneStyles[pillar.tone];
  const glowStyle = { "--glow": tone.glowRgb } as CSSProperties;

  return (
    <motion.article
      id={pillar.anchor}
      aria-labelledby={`${pillar.id}-title`}
      onMouseMove={trackPointer}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: order * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      style={glowStyle}
      className={`group relative flex scroll-mt-20 flex-col border border-white/50 bg-hull p-6 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_20px_60px_-20px_rgba(var(--glow),0.45)] sm:p-8 lg:p-10 ${tone.border}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(var(--glow), 0.12), transparent 60%)",
        }}
      />

      <div className="relative aspect-[484/300] overflow-hidden">
        <Image
          src={pillar.image.src}
          alt={pillar.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <p className={`mt-8 font-mono text-xs tracking-[0.2em] uppercase ${tone.text}`}>
        Pilar {pillar.index} · {pillar.category}
      </p>
      <h3 id={`${pillar.id}-title`} className="mt-3 font-sans text-2xl font-medium text-white">
        {pillar.title}
      </h3>
      <p className="mt-4 flex-1 font-sans leading-relaxed text-mist">{pillar.summary}</p>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/70 pt-6">
        <p className="font-mono text-xs tracking-widest text-mist uppercase">
          {pillar.meta.label}: {pillar.meta.value}
        </p>
        <button
          type="button"
          onClick={() => onSelect(pillar)}
          aria-haspopup="dialog"
          className={`shrink-0 px-5 py-2 font-sans text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${tone.button}`}
        >
          Ver Más
          <span className="sr-only"> sobre {pillar.title}</span>
        </button>
      </div>
    </motion.article>
  );
}
