"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { toneStyles } from "@/components/pillars/toneStyles";
import type { Pillar } from "@/types/content";

interface PillarCardProps {
  pillar: Pillar;
  order: number;
}

/** Mission module card. The whole card links to the pillar page. */
export function PillarCard({ pillar, order }: PillarCardProps) {
  const tone = toneStyles[pillar.tone];

  return (
    <motion.article
      aria-labelledby={`${pillar.id}-title`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: order * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-void"
    >
      {/* Accent bar that draws in on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 ${tone.background}`}
      />

      <div className="relative mx-6 mt-6 aspect-[4/3] overflow-hidden lg:mx-8 lg:mt-8">
        <Image
          src={pillar.image.src}
          alt={pillar.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover grayscale-[60%] transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        {/* Scan line sweeping across the image on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/3 -translate-y-full bg-gradient-to-b from-transparent via-white/10 to-transparent transition-transform duration-[1.2s] ease-out group-hover:translate-y-[300%]"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pt-6 pb-6 lg:px-8 lg:pb-8">
        <h3 id={`${pillar.id}-title`} className={`text-2xl font-normal tracking-tight ${tone.text}`}>
          {pillar.title}
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-mist">{pillar.summary}</p>

        <dl className="mt-6 border-t border-line">
          {[pillar.meta, ...pillar.specs.slice(0, 1)].map((spec) => (
            <div key={spec.label} className="label-mono flex justify-between border-b border-line py-2.5">
              <dt className="text-mist">{spec.label}</dt>
              <dd className="text-starlight">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/${pillar.slug}`}
          className={`mt-6 flex items-center justify-between text-sm font-medium after:absolute after:inset-0 ${tone.text}`}
        >
          Ver más
          <span className="sr-only"> sobre {pillar.title}</span>
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full border border-current/50"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
