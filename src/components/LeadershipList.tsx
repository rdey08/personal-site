import type { Project } from "@/content/schema";
import { formatPeriod } from "@/lib/format";

// Compact list for leadership-tier entries, supporting detail, not cards that
// compete with the technical work for attention.
export function LeadershipList({ items }: { items: { meta: Project }[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="divide-y divide-line">
      {items.map(({ meta }) => (
        <li key={meta.slug} className="py-6 first:pt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-ink-strong">
              {meta.role && <span className="font-semibold">{meta.role}</span>}
              {meta.role && " · "}
              <span className={meta.role ? "text-ink-muted" : "font-semibold"}>
                {meta.title}
              </span>
            </h3>
            <span className="text-xs font-medium tracking-[0.08em] text-ink-faint uppercase tabular-nums">
              {formatPeriod({ start: meta.period.start, end: meta.period.end })}
            </span>
          </div>
          <p className="mt-2 max-w-[var(--measure)] leading-relaxed text-pretty text-ink">
            {meta.summary}
          </p>
        </li>
      ))}
    </ul>
  );
}
