import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResearchThread, getResearchThreads } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { DetailArticle } from "@/components/DetailArticle";

export function generateStaticParams() {
  return getResearchThreads().map((t) => ({ slug: t.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const thread = getResearchThread(slug);
  if (!thread) return {};
  return {
    title: thread.meta.title,
    description: thread.meta.summary,
    alternates: { canonical: `/research/${slug}` },
  };
}

export default async function ResearchThreadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thread = getResearchThread(slug);
  if (!thread) notFound();

  const { meta, body } = thread;
  return (
    <DetailArticle
      title={meta.title}
      subtitle={`${meta.role} · ${meta.org} · ${formatPeriod(meta.period)}`}
      chips={meta.methods}
      chipsLabel="Methods"
      backHref="/research"
      backLabel="Research"
      body={body}
    />
  );
}
