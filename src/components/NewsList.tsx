import Link from "next/link";
import type { NewsItem } from "@/content/schema";

function dateLabel(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

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
    <ul className="space-y-4">
      {shown.map(({ meta }, i) => (
        <li key={i} className="flex gap-4">
          <time className="w-20 shrink-0 pt-0.5 text-sm text-ink-faint tabular-nums">
            {dateLabel(meta.date)}
          </time>
          <p className="leading-relaxed text-ink">
            {meta.href ? (
              meta.href.startsWith("/") ? (
                <Link
                  href={meta.href}
                  className="underline decoration-line decoration-1 underline-offset-2 transition-colors hover:decoration-accent"
                >
                  {meta.text}
                </Link>
              ) : (
                <a
                  href={meta.href}
                  className="underline decoration-line decoration-1 underline-offset-2 transition-colors hover:decoration-accent"
                >
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
