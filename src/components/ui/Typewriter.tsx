"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

interface TypewriterProps {
  /** Words cycled in order. The first one is shown on first paint. */
  words: string[];
  className?: string;
}

const TYPE_DELAY_MS = 95;
const DELETE_DELAY_MS = 50;
const HOLD_DELAY_MS = 2000;
const GAP_DELAY_MS = 350;

type Phase = "holding" | "deleting" | "typing";

/** Types a word, holds it, deletes it, then moves on to the next one in a loop. */
export function Typewriter({ words, className }: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    if (prefersReducedMotion || words.length < 2) return;

    const targetWord = words[wordIndex];
    let delay: number;
    let step: () => void;

    if (phase === "holding") {
      delay = HOLD_DELAY_MS;
      step = () => setPhase("deleting");
    } else if (phase === "deleting") {
      if (text.length === 0) {
        delay = GAP_DELAY_MS;
        step = () => {
          setWordIndex((current) => (current + 1) % words.length);
          setPhase("typing");
        };
      } else {
        delay = DELETE_DELAY_MS;
        step = () => setText((current) => current.slice(0, -1));
      }
    } else if (text.length === targetWord.length) {
      delay = 0;
      step = () => setPhase("holding");
    } else {
      delay = TYPE_DELAY_MS;
      step = () => setText(targetWord.slice(0, text.length + 1));
    }

    const timeoutId = window.setTimeout(step, delay);
    return () => window.clearTimeout(timeoutId);
  }, [phase, text, wordIndex, words, prefersReducedMotion]);

  // The longest word is rendered invisibly to reserve its width, so the text before it never shifts.
  const longestWord = words.reduce((longest, word) => (word.length > longest.length ? word : longest), "");

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true" className={`inline-grid ${className ?? ""}`}>
        <span className="invisible col-start-1 row-start-1">{longestWord}</span>
        <span className="col-start-1 row-start-1 justify-self-center whitespace-nowrap lg:justify-self-start">
          {text}
          <span className="ml-1 inline-block h-[0.8em] w-[0.06em] translate-y-[0.08em] animate-blink bg-current" />
        </span>
      </span>
    </>
  );
}
