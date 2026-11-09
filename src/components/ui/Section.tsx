import type { ReactNode } from "react";
import { toneStyles } from "@/components/pillars/toneStyles";
import type { AccentTone } from "@/types/content";

interface SectionProps {
  id: string;
  title: string;
  /** Short line under the title, in the left column. */
  description?: string;
  tone?: AccentTone;
  /** Black, minimal look (no top rule or bar). Used outside the project pages. */
  plain?: boolean;
  children: ReactNode;
}

/**
 * Page section: title in a narrow left column (sticky on desktop), content on the right.
 * Uses the full width instead of stacking a centered title over the content.
 */
export function Section({ id, title, description, tone = "ember", plain = false, children }: SectionProps) {
  const toneStyle = toneStyles[tone];

  return (
    <section aria-labelledby={id} className={`container-page ${plain ? "pt-12 lg:pt-16" : "pt-10 lg:pt-14"}`}>
      <div className={`grid gap-5 lg:grid-cols-12 lg:gap-10 ${plain ? "" : "border-t border-line-strong pt-5"}`}>
        <header className="lg:col-span-3">
          <div className="lg:sticky lg:top-6">
            {!plain && <span aria-hidden="true" className={`mb-4 block h-1 w-10 ${toneStyle.background}`} />}
            <h2 id={id} className="font-headline flex items-center gap-3 text-h2 text-gold">
              {plain && <span aria-hidden="true" className={`size-2 shrink-0 ${toneStyle.background}`} />}
              {title}
            </h2>
            {description && <p className="mt-3 text-caption text-mist">{description}</p>}
          </div>
        </header>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
