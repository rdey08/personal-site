import Link from "next/link";
import type { ResearchThread } from "@/content/schema";
import { formatPeriod } from "@/lib/format";
import { MetaChips } from "./MetaChips";
import { ArrowRightIcon } from "./icons";

// Used on home (as the Research flagship card) and the research index.
export function ResearchCard({
  thread,
  eyebrow,
}: {
  thread: ResearchThread;
  eyebrow?: string;
}) {
  return (
    <Link
      href={`/research/${thread.slug}`}
      className="group block rounded-md border border-line bg-paper-raised p-6 transition-all duration-[--duration-base] ease-[--ease-out-expo] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] hover:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)] sm:p-7"
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h3 className="font-serif text-2xl font-medium tracking-tight text-balance text-ink-strong">
        {thread.title}
      </h3>
      <p className="mt-2 text-sm text-ink-faint">
        {thread.org} · {formatPeriod(thread.period)}
      </p>
      <p className="mt-3 leading-relaxed text-pretty text-ink">
        {thread.summary}
      </p>
      <div className="mt-5">
        <MetaChips items={thread.methods} label="Methods" />
      </div>
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Read the write-up
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}
