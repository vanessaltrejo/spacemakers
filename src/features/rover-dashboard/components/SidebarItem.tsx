import type { ReactNode } from "react";

interface SidebarItemContentProps {
  icon: ReactNode;
  label: string;
}

const baseClasses = "flex h-9 w-full items-center gap-2.5 rounded-full border px-3 transition-colors";

const idleClasses =
  "border-transparent text-starlight/70 hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold";

/** The item for the page being viewed: filled and outlined in gold so it's obvious where you are. */
const activeClasses = "border-gold/60 bg-gold/15 text-gold";

/** Classes for a sidebar item. Idle and active styles are exclusive so they never fight each other. */
export function sidebarItemClassName(isActive = false, extra = ""): string {
  return `${baseClasses} ${isActive ? activeClasses : idleClasses} ${extra}`.trim();
}

/** Icon + label. */
export function SidebarItemContent({ icon, label }: SidebarItemContentProps) {
  return (
    <>
      <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </>
  );
}
