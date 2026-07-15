import Link from "next/link";
import { Mdx } from "@/lib/mdx";
import { Section } from "./Section";
import { MetaChips } from "./MetaChips";
import { Prose } from "./Prose";

// Shared layout for research and flagship-project detail pages.
export function DetailArticle({
  title,
  subtitle,
  chips,
  chipsLabel,
  backHref,
  backLabel,
  body,
}: {
  title: string;
  subtitle?: string;
  chips?: readonly string[];
  chipsLabel?: string;
  backHref: string;
  backLabel: string;
  body: string;
}) {
  return (
    <Section as="article" className="pt-12 pb-8 sm:pt-16">
      <Link
        href={backHref}
        className="text-sm font-medium text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
      >
        ← {backLabel}
      </Link>

      <header className="mt-6 border-b border-line pb-8">
        <h1 className="text-3xl font-medium text-ink-strong sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-ink-muted">{subtitle}</p>}
        {chips && chips.length > 0 && (
          <div className="mt-4">
            <MetaChips items={chips} label={chipsLabel} />
          </div>
        )}
      </header>

      <div className="mt-8">
        <Prose>
          <Mdx source={body} />
        </Prose>
      </div>
    </Section>
  );
}
