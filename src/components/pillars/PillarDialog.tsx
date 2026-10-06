"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { toneStyles } from "@/components/pillars/toneStyles";
import type { Pillar } from "@/types/content";

interface PillarDialogProps {
  pillar: Pillar | null;
  onClose: () => void;
}

/** Accessible detail modal: Escape / backdrop closes it, focus moves in and is restored on close. */
export function PillarDialog({ pillar, onClose }: PillarDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pillar) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [pillar, onClose]);

  return (
    <AnimatePresence>
      {pillar && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-void/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pillar-dialog-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto border border-white/20 bg-hull"
          >
            <div className="relative aspect-[16/7]">
              <Image src={pillar.image.src} alt={pillar.image.alt} fill sizes="768px" className="object-cover" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-hull to-transparent" />
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-void/70 text-xl text-white transition-colors hover:bg-white hover:text-void"
            >
              ×
            </button>

            <div className="-mt-12 relative space-y-5 p-6 sm:p-10">
              <p className={`font-mono text-xs tracking-[0.2em] uppercase ${toneStyles[pillar.tone].text}`}>
                Pilar {pillar.index} · {pillar.category}
              </p>
              <h3 id="pillar-dialog-title" className="font-display text-3xl font-light text-gold sm:text-4xl">
                {pillar.title}
              </h3>
              <p className="leading-relaxed text-starlight/85">{pillar.description}</p>

              <dl className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
                {[pillar.meta, ...pillar.specs].map((spec) => (
                  <div key={spec.label} className="bg-hull p-4">
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">{spec.label}</dt>
                    <dd className="mt-1 font-sans text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
