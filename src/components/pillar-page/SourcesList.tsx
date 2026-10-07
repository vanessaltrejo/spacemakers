import type { SourceLink } from "@/types/content";

interface SourcesListProps {
  sources: SourceLink[];
}

export function SourcesList({ sources }: SourcesListProps) {
  return (
    <section aria-labelledby="sources-title" className="container-page pt-20 lg:pt-28">
      <div className="border-t border-line pt-6">
        <h2 id="sources-title" className="label-mono text-mist">
          Fuentes
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-starlight/70 underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold"
              >
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
