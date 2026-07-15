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
      <h1 className="text-3xl font-medium text-ink-strong sm:text-4xl">
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
