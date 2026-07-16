// Editorial section heading: hairline rule, serif index numeral, small-caps
// label, optional trailing action. Replaces bare uppercase h2s.

import type { ReactNode } from "react";

export function SectionHeading({
  index,
  title,
  action,
  rule = true,
}: {
  index?: string;
  title: string;
  action?: ReactNode;
  rule?: boolean;
}) {
  return (
    <div className="relative mb-8 flex items-baseline gap-4 pt-5">
      {/* Hairline that draws across on scroll (static line when the browser
          lacks scroll-driven animations — see globals.css). */}
      {rule && (
        <span
          aria-hidden="true"
          className="rule-draw absolute top-0 left-0 h-px w-full bg-line-strong"
        />
      )}
      {index && (
        <span
          aria-hidden="true"
          className="font-serif text-sm text-accent italic tabular-nums"
        >
          {index}
        </span>
      )}
      <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
        {title}
      </h2>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}
