import Link from "next/link";
import { MetaChips } from "./MetaChips";
import { ArrowRightIcon } from "./icons";

// Full-width split card for flagship work — the loudest unit in the card
// system, visually distinct from regular ProjectCards so the importance
// hierarchy is legible at a glance. Left column: identity (eyebrow, display
// title, meta line, link affordance). Right column: substance (summary +
// methods/stack).
export function FlagshipCard({
  href,
  eyebrow,
  title,
  metaLine,
  summary,
  chips,
  chipsLabel,
}: {
  href: string;
  eyebrow: string;
  title: string;
  metaLine: string;
  summary: string;
  chips: readonly string[];
  chipsLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-md border border-line bg-paper-raised p-6 transition-all duration-[--duration-base] ease-[--ease-out-expo] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] hover:bg-paper-raised-hover hover:shadow-[var(--shadow-card-hover)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
        <div className="flex flex-col">
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {eyebrow}
          </p>
          <h3 className="font-serif text-2xl font-medium tracking-tight text-balance text-ink-strong sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm text-ink-faint">{metaLine}</p>
          <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent sm:mt-auto sm:pt-6">
            Read the write-up
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5" />
          </p>
        </div>
        <div>
          <p className="leading-relaxed text-pretty text-ink">{summary}</p>
          <div className="mt-5">
            <MetaChips items={chips} label={chipsLabel} />
          </div>
        </div>
      </div>
    </Link>
  );
}
