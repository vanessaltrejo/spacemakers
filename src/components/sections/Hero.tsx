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

      {/* Planet */}
      <motion.div
        style={{ y: planetY, scale: planetScale }}
        className="absolute inset-x-0 bottom-0 h-[30%] origin-bottom sm:h-auto sm:aspect-[2000/525]"
      >
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.8, ease: easeOutExpo }}
          className="relative size-full"
        >
          <Image
            src="/images/hero-planet.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent,black_30%)]"
          />
          <span
            aria-hidden="true"
            className="absolute top-[38%] left-[73.5%] size-28 -translate-1/2 animate-flare rounded-full bg-[radial-gradient(circle,rgba(255,240,200,0.85)_0%,rgba(255,170,90,0.3)_35%,transparent_70%)] mix-blend-screen sm:size-48"
          />
        </motion.div>
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-page relative z-10 flex flex-1 flex-col items-center pt-[9vh] text-center sm:pt-[10vh]"
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

        <motion.p {...fadeUp(0.9)} className="mt-6 max-w-lg text-base leading-relaxed text-starlight/70 sm:text-lg">
          {content.subtitle}
        </motion.p>

        <motion.div {...fadeUp(1.05)} className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={content.primaryCta.href} variant="cobalt" withArrow>
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="ghost">
            {content.secondaryCta.label}
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* HUD readouts */}
      <motion.div
        {...fadeUp(1.4)}
        className="container-page relative z-10 hidden items-end justify-center pb-8 md:flex"
      >
        <a href="#nosotros" className="label-mono flex flex-col items-center gap-3 text-mist hover:text-starlight">
          Scroll
          <motion.span
            aria-hidden="true"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-10 w-px bg-starlight/60"
          />
        </a>
      </motion.div>
    </section>
  );
}
