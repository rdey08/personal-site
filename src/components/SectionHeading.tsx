// Editorial section heading: hairline rule, serif index numeral, small-caps
// label, optional trailing action. Replaces bare uppercase h2s.

import type { ReactNode } from "react";

export function SectionHeading({
  index,
  title,
  action,
}: {
  index?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-t border-line pt-5">
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
