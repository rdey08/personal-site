import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { DetailArticle } from "@/components/DetailArticle";

// Detail pages exist only for flagship-tier projects (PLAN §3).
export function generateStaticParams() {
  return getProjects()
    .filter((p) => p.meta.tier === "flagship")
    .map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.meta.title, description: project.meta.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.meta.tier !== "flagship") notFound();

  const { meta, body } = project;
  const subtitle = [
    meta.role,
    formatPeriod({ start: meta.period.start, end: meta.period.end }),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <DetailArticle
      title={meta.title}
      subtitle={subtitle}
      chips={meta.stack}
      chipsLabel="Stack"
      backHref="/projects"
      backLabel="Projects"
      body={body}
    />
  );
}
