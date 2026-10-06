"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the middle band of the viewport.
 * When several qualify at once (e.g. cards on the same row), the first one in
 * `sectionIds` order wins, so the navbar highlight stays predictable.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const orderedIds = idsKey.split(",");
    const visibleIds = new Set<string>();
    const elements = orderedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        });
        const firstVisible = orderedIds.find((id) => visibleIds.has(id));
        if (firstVisible) setActiveId(firstVisible);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
