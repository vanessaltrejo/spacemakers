import type { ReactNode } from "react";
import { toneStyles } from "@/components/pillars/toneStyles";
import type { AccentTone } from "@/types/content";

interface PageHeaderProps {
  title: string;
  lead?: ReactNode;
  tone: AccentTone;
  /** Quick figures shown to the right of the lead, separated by hairlines. */
  facts?: { label: string; value: string }[];
}

/** Plain page opener on the black background: title, lead and a row of figures. */
export function PageHeader({ title, lead, tone, facts = [] }: PageHeaderProps) {
  const toneStyle = toneStyles[tone];

  return (
    <header className="container-page pt-8 lg:pt-12">
      <h1 className="font-headline text-h1 text-gold">{title}</h1>
      <div className={lead || facts.length > 0 ? "mt-5 grid gap-8 lg:grid-cols-12 lg:items-end" : undefined}>
        {lead && <div className="max-w-2xl text-h2 leading-snug font-normal text-starlight lg:col-span-7">{lead}</div>}
        {facts.length > 0 && (
          <dl className="flex gap-8 lg:col-span-5 lg:justify-end">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l border-line-strong pl-4">
                <dd className={`font-headline whitespace-nowrap text-h2 ${toneStyle.text}`}>{fact.value}</dd>
                <dt className="label-mono mt-1 text-mist">{fact.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
