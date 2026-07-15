import Link from "next/link";
import { Mdx } from "@/lib/mdx";
import { Section } from "./Section";
import { MetaChips } from "./MetaChips";
import { Prose } from "./Prose";

// Shared layout for research and flagship-project detail pages: eyebrow,
// serif display title, a definition-list metadata grid, then measured prose.
export function DetailArticle({
  eyebrow,
  title,
  meta,
  chips,
  chipsLabel,
  backHref,
  backLabel,
  body,
}: {
  eyebrow: string;
  title: string;
  meta: { label: string; value: string }[];
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

      <header className="mt-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-[24ch] font-serif text-4xl font-medium tracking-tight text-balance text-ink-strong sm:text-5xl">
          {title}
        </h1>

        <dl className="mt-8 grid grid-cols-[max-content_1fr] gap-x-8 gap-y-2 border-y border-line py-5 text-sm">
          {meta.map(({ label, value }) => (
            <div key={label} className="contents">
              <dt className="text-xs font-medium tracking-[0.08em] text-ink-faint uppercase">
                {label}
              </dt>
              <dd className="text-ink">{value}</dd>
            </div>
          ))}
          {chips && chips.length > 0 && (
            <div className="contents">
              <dt className="text-xs font-medium tracking-[0.08em] text-ink-faint uppercase">
                {chipsLabel ?? "Tags"}
              </dt>
              <dd>
                <MetaChips items={chips} label={chipsLabel} />
              </dd>
            </div>
          )}
        </dl>
      </header>

      <div className="mt-10">
        <Prose>
          <Mdx source={body} />
        </Prose>
      </div>
    </Section>
  );
}
