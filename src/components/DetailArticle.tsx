import Link from "next/link";
import { Mdx } from "@/lib/mdx";
import { Section } from "./Section";
import { MetaChips } from "./MetaChips";
import { Prose } from "./Prose";

// Shared layout for research and flagship-project detail pages: eyebrow,
// serif display title, a definition-list metadata grid, then measured prose.
// `next` renders a bottom cross-link so long write-ups don't dead-end.
export function DetailArticle({
  eyebrow,
  title,
  meta,
  chips,
  chipsLabel,
  backHref,
  backLabel,
  body,
  next,
}: {
  eyebrow: string;
  title: string;
  meta: { label: string; value: string }[];
  chips?: readonly string[];
  chipsLabel?: string;
  backHref: string;
  backLabel: string;
  body: string;
  next?: { href: string; eyebrow: string; title: string };
}) {
  return (
    <Section as="article" className="stagger pt-12 pb-8 sm:pt-16">
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

      {/* Bottom nav — a way onward after a long read, instead of a dead end. */}
      <footer className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
        <Link
          href={backHref}
          className="text-sm font-medium text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
        >
          ← Back to {backLabel}
        </Link>
        {next && (
          <Link href={next.href} className="group sm:text-right">
            <p className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Up next · {next.eyebrow}
            </p>
            <p className="mt-1 font-serif text-lg font-medium tracking-tight text-ink-strong transition-colors duration-[--duration-fast] group-hover:text-accent">
              {next.title} →
            </p>
          </Link>
        )}
      </footer>
    </Section>
  );
}
