import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, getNewsItem } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { ArrowRightIcon } from "@/components/icons";

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};
  return {
    title: item.meta.text,
    description: item.meta.text,
    alternates: { canonical: `/news/${slug}` },
  };
}

function fullDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  const { meta, body } = item;
  const related = meta.href;
  const relatedLabel = meta.linkLabel ?? "Read more";
  const relatedInternal = related?.startsWith("/");

  return (
    <Section as="article" className="stagger pt-12 pb-8 sm:pt-16">
      <Link
        href="/news"
        className="text-sm font-medium text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
      >
        ← News
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          News
        </p>
        <h1 className="mt-3 max-w-[30ch] font-serif text-3xl font-medium tracking-tight text-balance text-ink-strong sm:text-4xl">
          {meta.text}
        </h1>
        <time
          dateTime={meta.date}
          className="mt-4 block text-sm text-ink-muted"
        >
          {fullDate(meta.date)}
        </time>
      </header>

      {body && (
        <div className="mt-8">
          <Prose>
            <Mdx source={body} />
          </Prose>
        </div>
      )}

      {related && (
        <aside className="mt-10 max-w-[var(--measure)] rounded-md border border-line bg-paper-raised p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
            Related
          </p>
          {relatedInternal ? (
            <Link
              href={related}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-strong"
            >
              {relatedLabel}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <a
              href={related}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-strong"
            >
              {relatedLabel} ↗
            </a>
          )}
        </aside>
      )}

      <footer className="mt-14 border-t border-line pt-8">
        <Link
          href="/news"
          className="text-sm font-medium text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
        >
          ← Back to News
        </Link>
      </footer>
    </Section>
  );
}
