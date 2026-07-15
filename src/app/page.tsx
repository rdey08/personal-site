import Link from "next/link";
import {
  getNews,
  getProject,
  getProjects,
  getResearchThreads,
  getSite,
} from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { Section } from "@/components/Section";
import { ResearchCard } from "@/components/ResearchCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsList } from "@/components/NewsList";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";

export default function Home() {
  const site = getSite();
  const research = getResearchThreads().find((t) => t.meta.featured);
  const elsa = getProject("elsa-pds");
  const featuredProjects = getProjects().filter(
    (p) => p.meta.featured && p.meta.tier === "project",
  );
  const news = getNews();

  return (
    <>
      {/* Hero */}
      <Section className="pt-16 pb-4 sm:pt-24">
        <h1 className="text-4xl font-medium text-ink-strong sm:text-5xl">
          {site.meta.name}
        </h1>
        <p className="mt-3 max-w-[52ch] text-lg text-ink-muted">
          {site.meta.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <a
            href={site.meta.links.github}
            className="text-accent hover:text-accent-strong"
          >
            GitHub
          </a>
          <a
            href={site.meta.links.linkedin}
            className="text-accent hover:text-accent-strong"
          >
            LinkedIn
          </a>
          <ObfuscatedEmail
            email={site.meta.email}
            className="text-accent hover:text-accent-strong"
          />
          <a
            href={site.meta.cvPdf}
            className="text-accent hover:text-accent-strong"
          >
            CV ↓
          </a>
        </div>
      </Section>

      {/* Research interest — the 30-second scan target */}
      <Section className="py-10">
        <div className="max-w-[var(--measure)] text-ink [&_p]:text-lg [&_p]:leading-[1.7]">
          <Mdx source={site.body} />
        </div>
      </Section>

      {/* Two flagship threads */}
      <Section className="py-10">
        <h2 className="mb-6 text-sm font-medium tracking-wide text-ink-muted uppercase">
          Selected work
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {research && (
            <ResearchCard thread={research.meta} eyebrow="Research" />
          )}
          {elsa && <ProjectCard project={elsa.meta} eyebrow="Engineering" />}
        </div>
      </Section>

      {/* Featured projects strip */}
      {featuredProjects.length > 0 && (
        <Section className="py-10">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:text-accent-strong"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.meta.slug} project={p.meta} />
            ))}
          </div>
        </Section>
      )}

      {/* News */}
      {news.length > 0 && (
        <Section className="py-10">
          <h2 className="mb-6 text-sm font-medium tracking-wide text-ink-muted uppercase">
            News
          </h2>
          <NewsList items={news} limit={5} />
        </Section>
      )}
    </>
  );
}
