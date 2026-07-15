import Link from "next/link";
import type { ResearchThread } from "@/content/schema";
import { formatPeriod } from "@/lib/format";
import { MetaChips } from "./MetaChips";

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
      className="group block rounded-sm border border-line bg-paper-raised p-6 transition-all duration-[--duration-base] ease-[--ease-out-expo] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]"
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-medium tracking-wide text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h3 className="text-xl font-medium text-ink-strong">{thread.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">
        {thread.org} · {formatPeriod(thread.period)}
      </p>
      <p className="mt-3 leading-relaxed text-ink">{thread.summary}</p>
      <div className="mt-4">
        <MetaChips items={thread.methods} label="Methods" />
      </div>
      <p className="mt-4 text-sm font-medium text-accent">
        Read the write-up{" "}
        <span className="inline-block transition-transform duration-[--duration-fast] group-hover:translate-x-0.5">
          →
        </span>
      </p>
    </Link>
  );
}
