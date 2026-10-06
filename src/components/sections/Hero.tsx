"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Starfield } from "@/components/ui/Starfield";
import { StatusDot } from "@/components/ui/StatusDot";
import { Typewriter } from "@/components/ui/Typewriter";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  content: HeroContent;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: easeOutExpo },
});

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Parallax: the planet sinks and grows slightly while the copy drifts up and fades.
  const planetY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative flex h-svh min-h-[620px] flex-col overflow-hidden bg-void pt-14"
    >
      <Starfield className="absolute inset-0 size-full" />

      {/* Planet: static photo; it only fades up from the dark on load */}
      <motion.div
        style={{ y: planetY, scale: planetScale }}
        className="absolute bottom-0 left-[-107%] aspect-[3.8/1] w-[220%] origin-bottom sm:left-0 sm:w-full"
      >
        {/* The planet photo (no movement) */}
        <motion.div
          initial={{ filter: "brightness(0.22)" }}
          animate={{ filter: "brightness(1)" }}
          transition={{ duration: 3.4, delay: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-earth.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 639px) 220vw, 100vw"
            className="object-cover object-top"
          />
        </motion.div>
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-page relative z-10 flex flex-1 flex-col items-center pt-[13vh] text-center sm:pt-[16vh]"
      >
        <motion.p {...fadeUp(0.2)} className="label-mono max-w-xs text-mist sm:max-w-none">
          <span className="mr-3 inline-flex align-middle">
            <StatusDot colorClassName="bg-nebula" />
          </span>
          {content.eyebrow}
        </motion.p>

        <h1
          id="hero-title"
          className="mt-6 text-5xl font-light tracking-[-0.045em] text-gold sm:text-6xl lg:text-[5vw] lg:whitespace-nowrap"
        >
          <motion.span
            className="block"
            initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: easeOutExpo }}
          >
            {content.title} <Typewriter words={content.rotatingWords} />
          </motion.span>
        </h1>

        <motion.div {...fadeUp(1.05)} className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={content.primaryCta.href} variant="cobalt" withArrow>
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="ghost">
            {content.secondaryCta.label}
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
