import type { ReactNode } from "react";
import { Section } from "./Section";

export function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: ReactNode;
}) {
  return (
    <Section className="pt-16 pb-8 sm:pt-20">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-balance text-ink-strong sm:text-5xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-3 max-w-[var(--measure)] text-lg text-ink-muted">
          {lead}
        </p>
      )}
    </Section>
  );
}
