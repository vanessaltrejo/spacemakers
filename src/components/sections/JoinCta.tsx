"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Recruitment } from "@/types/content";

interface JoinCtaProps {
  content: Recruitment;
}

export function JoinCta({ content }: JoinCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // Mars slowly "approaches" while the section crosses the viewport.
  const marsScale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1]);
  const marsX = useTransform(scrollYProgress, [0, 0.6], ["8%", "0%"]);

  return (
    <section
      id="unete"
      ref={sectionRef}
      aria-labelledby="join-heading"
      className="container-page scroll-mt-20 py-10"
    >
      <div className="relative overflow-hidden border-l border-nebula/40 bg-gradient-to-r from-[#1a1012] via-[#120c0d] to-void">
        {/* Mars bleeds off the bottom-right corner; the mask trims the photo to the planet's disc. */}
        <motion.div
          aria-hidden="true"
          style={{ scale: marsScale, x: marsX }}
          className="pointer-events-none absolute right-0 bottom-0 aspect-[710/545] h-[85%] origin-bottom-right opacity-35 md:h-[72%] md:opacity-100 xl:h-[88%]"
        >
          <Image
            src={content.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 70vw"
            className="object-cover [mask-image:radial-gradient(ellipse_53.5%_69.7%_at_55%_69%,black_96%,transparent_100%)]"
          />
        </motion.div>

        <div className="relative max-w-2xl space-y-6 px-6 py-14 sm:px-12 md:max-w-[58%] lg:py-20 xl:max-w-[54%]">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-mars uppercase">{content.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="join-heading" className="font-sans text-4xl leading-tight text-white xl:text-5xl">
              {content.titleLead}
              <br />
              <span className="font-semibold text-gold">{content.titleEmphasis}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-lg leading-relaxed text-starlight/70">{content.description}</p>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-wrap items-center gap-6 pt-4">
            <a
              href={content.ctaHref}
              className="group relative overflow-hidden bg-cream px-7 py-4 font-mono text-sm font-bold tracking-[0.2em] text-void uppercase transition-transform hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover:translate-x-0"
              />
              <span className="relative">{content.ctaLabel}</span>
            </a>
            <p className="font-mono text-xs tracking-[0.2em] text-mist uppercase">{content.deadlineLabel}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
