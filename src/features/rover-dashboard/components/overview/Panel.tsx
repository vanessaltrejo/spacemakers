import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  /** No inner padding, for content (like a table) that spans the card edge to edge. */
  flush?: boolean;
  children: ReactNode;
}

/** Card with a title row, the base container of every overview block. */
export function Panel({ title, subtitle, action, className = "", flush = false, children }: PanelProps) {
  return (
    <section className={`flex min-w-0 flex-col rounded-xl border border-line bg-hull ${flush ? "" : "p-5"} ${className}`}>
      <header className={`mb-4 flex items-start justify-between gap-3 ${flush ? "p-5 pb-0" : ""}`}>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-cream">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-sm text-mist">{subtitle}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
