import type { Project } from "@/content/schema";
import { formatPeriod } from "@/lib/format";

// Compact list for leadership-tier entries — supporting detail, not cards that
// compete with the technical work for attention.
export function LeadershipList({ items }: { items: { meta: Project }[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="divide-y divide-line border-t border-line">
      {items.map(({ meta }) => (
        <li key={meta.slug} className="py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-medium text-ink-strong">
              {meta.role ? `${meta.role}, ` : ""}
              {meta.title}
            </h3>
            <span className="text-sm text-ink-faint tabular-nums">
              {formatPeriod({ start: meta.period.start, end: meta.period.end })}
            </span>
          </div>
          <p className="mt-1 leading-relaxed text-ink">{meta.summary}</p>
        </li>
      ))}
    </ul>
  );
}
