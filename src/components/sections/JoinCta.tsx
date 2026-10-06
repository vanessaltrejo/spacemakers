"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { StatusDot } from "@/components/ui/StatusDot";
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
      aria-labelledby="join-title"
      className="container-page scroll-mt-20 py-12"
    >
      <div className="relative overflow-hidden border border-line bg-gradient-to-br from-[#140b0c] via-void to-void">
        {/* Mars bleeds off the bottom-right corner; the mask trims the photo to the planet's disc. */}
        <motion.div
          aria-hidden="true"
          style={{ scale: marsScale, x: marsX }}
          className="pointer-events-none absolute right-0 bottom-0 aspect-[710/545] h-[85%] origin-bottom-right opacity-35 md:h-[78%] md:opacity-100 xl:h-[92%]"
        >
          <Image
            src={content.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 70vw"
            className="object-cover [mask-image:radial-gradient(ellipse_53.5%_69.7%_at_55%_69%,black_96%,transparent_100%)]"
          />
          {/* Orbit rings centered on the planet's disc */}
          <svg
            viewBox="0 0 100 100"
            className="absolute top-[69%] left-[55%] w-[132%] -translate-1/2 animate-orbit overflow-visible"
          >
            <circle cx="50" cy="50" r="49" fill="none" stroke="rgb(237 186 59 / 0.35)" strokeWidth="0.15" strokeDasharray="0.6 1.2" />
            <circle cx="50" cy="1" r="0.9" fill="#edba3b" />
          </svg>
          <svg
            viewBox="0 0 100 100"
            className="absolute top-[69%] left-[55%] w-[114%] -translate-1/2 animate-orbit overflow-visible [animation-direction:reverse] [animation-duration:60s]"
          >
            <circle cx="50" cy="50" r="49" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="0.15" />
            <circle cx="99" cy="50" r="0.7" fill="#c9356f" />
          </svg>
        </motion.div>

        <div className="relative max-w-2xl space-y-6 px-6 py-16 sm:px-12 md:max-w-[58%] lg:py-24 xl:max-w-[50%]">
          <Reveal>
            <p className="label-mono flex items-center gap-3 text-mars">
              <StatusDot colorClassName="bg-mars" />
              {content.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="join-title" className="text-4xl leading-[1.05] font-light tracking-[-0.035em] text-starlight xl:text-6xl">
              {content.titleLead} <span className="text-gold">{content.titleEmphasis}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md leading-relaxed text-mist">{content.description}</p>
          </Reveal>
          <Reveal delay={0.3} className="pt-4">
            <ButtonLink href={content.ctaHref} variant="cobalt" withArrow>
              {content.ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
