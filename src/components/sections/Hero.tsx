"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Starfield } from "@/components/ui/Starfield";

interface HeroProps {
  title: string;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export function Hero({ title }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Parallax: the planet sinks and grows slightly while the title drifts up and fades.
  const planetY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const words = title.split(" ");

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-label="Inicio"
      className="relative flex h-[78svh] min-h-[480px] items-start justify-center overflow-hidden bg-void pt-14 sm:h-auto sm:aspect-[2000/800] sm:max-h-svh"
    >
      <Starfield className="absolute inset-0 size-full" />

      <motion.div
        style={{ y: planetY, scale: planetScale }}
        className="absolute inset-x-0 bottom-0 h-[50%] origin-bottom sm:h-auto sm:aspect-[2000/525]"
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
          {/* Pulsing glow layered over the sunrise baked into the planet image */}
          <span
            aria-hidden="true"
            className="absolute top-[38%] left-[73.5%] size-28 -translate-1/2 animate-flare rounded-full bg-[radial-gradient(circle,rgba(255,240,200,0.85)_0%,rgba(255,170,90,0.3)_35%,transparent_70%)] mix-blend-screen sm:size-48"
          />
        </motion.div>
      </motion.div>

      <motion.h1
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mt-[12vh] px-4 text-center font-display text-4xl font-light tracking-tight text-gold sm:mt-[5%] sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4 + index * 0.15, ease: easeOutExpo }}
          >
            {word}
            {index < words.length - 1 && " "}
          </motion.span>
        ))}
      </motion.h1>

      <motion.a
        href="#nosotros"
        aria-label="Desplazarse a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-starlight/70 uppercase sm:flex"
      >
        Explorar
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-starlight/80 to-transparent"
        />
      </motion.a>

      {/* Nebula divider that draws itself from the center */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease: easeOutExpo }}
        className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-nebula shadow-[0_0_24px_rgba(201,53,111,0.8)]"
      />
    </section>
  );
}
