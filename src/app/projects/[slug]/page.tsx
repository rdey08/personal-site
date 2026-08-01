import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { getProject, getProjects, getResearchThreads } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { DetailArticle } from "@/components/DetailArticle";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";

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
  return pageMetadata({
    title: project.meta.title,
    description: project.meta.summary,
    path: `/projects/${slug}`,
    publishedTime: `${project.meta.period.start}-01`,
  });
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

  // Onward link: another flagship project if one exists, else the featured
  // research thread; the reader flows between the two flagships.
  const otherFlagship = getProjects().find(
    (p) => p.meta.tier === "flagship" && p.meta.slug !== slug,
  );
  const featuredThread = getResearchThreads().find((t) => t.meta.featured);
  const next = otherFlagship
    ? {
        href: `/projects/${otherFlagship.meta.slug}`,
        eyebrow: "Engineering",
        title: otherFlagship.meta.title,
      }
    : featuredThread
      ? {
          href: `/research/${featuredThread.meta.slug}`,
          eyebrow: "Research",
          title: featuredThread.meta.title,
        }
      : undefined;

  const metaRows = [
    ...(meta.role ? [{ label: "Role", value: meta.role }] : []),
    {
      label: "Period",
      value: formatPeriod({ start: meta.period.start, end: meta.period.end }),
    },
    // The running application, when there is one to point at. Shown as the
    // host and path rather than the bare URL, and it reuses the site-wide
    // external-link arrow.
    ...(meta.links?.demo
      ? [
          {
            label: "Live site",
            value: (
              <a
                href={meta.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-external text-ink transition-colors duration-[--duration-fast] hover:text-accent"
              >
                {meta.links.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <span
                  aria-hidden="true"
                  className="link-arrow ml-1 text-accent"
                >
                  ↗
                </span>
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <ArticleJsonLd
        title={meta.title}
        description={meta.summary}
        path={`/projects/${slug}`}
        sectionName="Projects"
        sectionPath="/projects"
      />
      <DetailArticle
        eyebrow="Engineering"
        title={meta.title}
        meta={metaRows}
        chips={meta.stack}
        chipsLabel="Stack"
        backHref="/projects"
        backLabel="Projects"
        body={body}
        next={next}
      />
    </>
  );
}
