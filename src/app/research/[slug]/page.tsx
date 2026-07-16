import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjects,
  getResearchThread,
  getResearchThreads,
} from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { DetailArticle } from "@/components/DetailArticle";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";

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

  // Onward link: another research thread if one exists, else the flagship
  // engineering project; the reader flows between the two flagships.
  const otherThread = getResearchThreads().find((t) => t.meta.slug !== slug);
  const flagshipProject = getProjects().find((p) => p.meta.tier === "flagship");
  const next = otherThread
    ? {
        href: `/research/${otherThread.meta.slug}`,
        eyebrow: "Research",
        title: otherThread.meta.title,
      }
    : flagshipProject
      ? {
          href: `/projects/${flagshipProject.meta.slug}`,
          eyebrow: "Engineering",
          title: flagshipProject.meta.title,
        }
      : undefined;

  return (
    <>
      <ArticleJsonLd
        title={meta.title}
        description={meta.summary}
        path={`/research/${slug}`}
        sectionName="Research"
        sectionPath="/research"
      />
      <DetailArticle
        eyebrow="Research"
        title={meta.title}
        meta={[
          { label: "Role", value: meta.role },
          { label: "Lab", value: meta.org },
          { label: "Period", value: formatPeriod(meta.period) },
        ]}
        chips={meta.methods}
        chipsLabel="Methods"
        backHref="/research"
        backLabel="Research"
        body={body}
        next={next}
      />
    </>
  );
}
