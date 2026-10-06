"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * Used by the navbar to highlight the matching link while scrolling.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const elements = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
