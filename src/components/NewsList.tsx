import Link from "next/link";
import type { NewsItem } from "@/content/schema";

function dateLabel(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const linkClass =
  "underline decoration-line decoration-1 underline-offset-[3px] transition-colors duration-[--duration-fast] hover:decoration-accent hover:text-ink-strong";

export function NewsList({
  items,
  limit,
}: {
  items: { meta: NewsItem }[];
  limit?: number;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  if (shown.length === 0) return null;
  return (
    <ul className="divide-y divide-line">
      {shown.map(({ meta }, i) => (
        <li key={i} className="flex gap-6 py-4 first:pt-0 last:pb-0">
          <time
            dateTime={meta.date}
            className="w-20 shrink-0 pt-0.5 text-xs font-medium tracking-[0.08em] text-ink-faint uppercase tabular-nums"
          >
            {dateLabel(meta.date)}
          </time>
          <p className="leading-relaxed text-pretty text-ink">
            {meta.href ? (
              meta.href.startsWith("/") ? (
                <Link href={meta.href} className={linkClass}>
                  {meta.text}
                </Link>
              ) : (
                <a href={meta.href} className={linkClass}>
                  {meta.text}
                </a>
              )
            ) : (
              meta.text
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
