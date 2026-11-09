export type KpiTone = "default" | "gold" | "info" | "good" | "warn";

interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: KpiTone;
  /** 0–100. Draws a thin progress bar under the value. */
  progress?: number;
}

const toneClasses: Record<KpiTone, { value: string; bar: string }> = {
  default: { value: "text-cream", bar: "bg-gold" },
  gold: { value: "text-gold", bar: "bg-gold" },
  info: { value: "text-orbit-bright", bar: "bg-orbit-bright" },
  good: { value: "text-lime", bar: "bg-lime" },
  warn: { value: "text-mars", bar: "bg-mars" },
};

/** One headline number with a short label and an optional hint or progress bar. */
export function KpiCard({ label, value, hint, tone = "default", progress }: KpiCardProps) {
  const classes = toneClasses[tone];

  return (
    <div className="rounded-xl border border-line bg-hull p-4">
      <p className="text-sm text-mist">{label}</p>
      <p className={`mt-2 text-3xl leading-none font-bold tabular-nums ${classes.value}`}>{value}</p>
      {progress !== undefined ? (
        <div
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <div className={`h-full rounded-full ${classes.bar}`} style={{ width: `${progress}%` }} />
        </div>
      ) : null}
      {hint ? <p className="mt-2 text-xs text-mist">{hint}</p> : null}
    </div>
  );
}
