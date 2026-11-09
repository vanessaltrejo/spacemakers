"use client";

import Link from "next/link";
import { useState } from "react";
import { toneStyles } from "@/components/pillars/toneStyles";
import { researchCategories } from "@/lib/researchCategories";
import type { ResearchCategory, ResearchItem } from "@/types/content";

interface ResearchListProps {
  items: ResearchItem[];
}

/** Research cards with a category filter. */
export function ResearchList({ items }: ResearchListProps) {
  const [active, setActive] = useState<ResearchCategory | "all">("all");
  const visible = active === "all" ? items : items.filter((item) => item.category === active);
  const keys = Object.keys(researchCategories) as ResearchCategory[];

  const chip = (selected: boolean) =>
    `h-9 border px-3.5 text-caption transition-colors ${
      selected ? "border-gold bg-gold text-void" : "border-line-strong text-starlight hover:border-gold hover:text-gold"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")} className={chip(active === "all")}>
          Todas
        </button>
        {keys.map((key) => (
          <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)} className={chip(active === key)}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className={`size-1.5 ${toneStyles[researchCategories[key].tone].background}`} />
              {researchCategories[key].label}
            </span>
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line" aria-live="polite">
        {visible.map((item) => {
          const tone = toneStyles[researchCategories[item.category].tone];
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group grid gap-x-6 gap-y-1 py-4 md:grid-cols-[4rem_minmax(0,1fr)_13rem] md:items-baseline"
              >
                <span className="label-mono text-mist">{item.year}</span>
                <span>
                  <span className="block text-body text-starlight transition-colors group-hover:text-gold">{item.title}</span>
                  <span className="mt-1 block text-caption text-mist">{item.summary}</span>
                </span>
                <span className={`label-mono flex items-center gap-2 md:justify-end ${tone.text}`}>
                  <span aria-hidden="true" className={`size-1.5 shrink-0 ${tone.background}`} />
                  {researchCategories[item.category].label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
